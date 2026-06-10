import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '../../../lib/rate-limiter'
import mockCatalog from '../../../data/mock-catalog.json'

// Esta função simula a chamada que futuramente será feita para o ERP Alterdata Bimer
async function fetchProductsFromERP() {
  // Atualmente retorna os dados mockados locais.
  // Futuramente, pode ser alterado para:
  // const res = await fetch('https://api.alterdata.com.br/bimer/v1/produtos', { headers: { ... } })
  // return res.json()
  return mockCatalog
}

export async function GET(req: NextRequest) {
  // Rate limiting (máximo 30 consultas por minuto por IP para catálogo)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '127.0.0.1'
  const limitResult = rateLimit(ip, 'catalogo', { limit: 30, windowMs: 60 * 1000 })

  if (limitResult.isBlocked) {
    return new NextResponse(
      JSON.stringify({ error: 'Muitas requisições no catálogo. Tente novamente mais tarde.' }),
      { 
        status: 429, 
        headers: { 
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil(limitResult.resetTime / 1000))
        } 
      }
    )
  }

  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const query = searchParams.get('q')?.toLowerCase()
    
    // Paginação
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const offset = (page - 1) * limit

    // Obter produtos da fonte de dados (mock ou ERP)
    let products = await fetchProductsFromERP()

    // Filtrar por Categoria
    if (category && category !== 'all') {
      products = products.filter(p => p.category === category)
    }

    // Filtrar por busca textual (nome ou marca)
    if (query) {
      products = products.filter(
        p => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query)
      )
    }

    const total = products.length
    const paginatedProducts = products.slice(offset, offset + limit)

    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching catalog:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
