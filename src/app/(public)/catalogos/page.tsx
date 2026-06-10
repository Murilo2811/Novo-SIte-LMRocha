'use client'

import React, { useState, useEffect } from 'react'
import { useTranslation } from '../../../hooks/useTranslation'

interface Product {
  id: string
  name: string
  category: string
  brand: string
  description: string
  price: number
  features: Record<string, string>
}

export default function CatalogosPage() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [accordionOpen, setAccordionOpen] = useState(true)

  // Categorias disponíveis baseadas nas chaves e dados
  const categories = [
    { id: 'all', name: t('catalogs.all') },
    { id: 'charutos', name: 'Charutos' },
    { id: 'fumo', name: 'Fumo para Cigarro' },
    { id: 'papel', name: 'Papel para Cigarro' },
    { id: 'filtros', name: 'Filtros' },
    { id: 'acessorios', name: 'Acessórios' }
  ]

  // Efeito de busca de dados via API
  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true)
      try {
        const url = `/api/catalogo?category=${activeCategory}&q=${searchQuery}`
        const res = await fetch(url)
        const data = await res.json()
        if (data.products) {
          setProducts(data.products)
        }
      } catch (err) {
        console.error('Error loading catalog data:', err)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(fetchCatalog, 300) // Debounce sutil para buscas
    return () => clearTimeout(timer)
  }, [activeCategory, searchQuery])

  return (
    <div className="catalog-page">
      {/* Banner */}
      <section className="catalog-hero">
        <div className="catalog-hero-overlay"></div>
        <div className="container catalog-hero-content">
          <h1 className="title-lg text-gold italic-bold">{t('catalogs.title')}</h1>
          <p className="catalog-hero-subtitle">{t('catalogs.subtitle')}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container">
          
          {/* Catalog 2026 Accordion */}
          <div className="accordion-card glass">
            <button 
              className="accordion-header"
              onClick={() => setAccordionOpen(!accordionOpen)}
            >
              <h2 className="accordion-title text-gold">{t('catalogs.accordionTitle')}</h2>
              <span className={`accordion-icon ${accordionOpen ? 'open' : ''}`}>▼</span>
            </button>
            
            {accordionOpen && (
              <div className="accordion-content">
                <p>
                  Oferecemos um portfólio completo de marcas premium para abastecer seu estabelecimento comercial (tabacarias, revendas, lojas de conveniência). 
                  Nosso catálogo conta com distribuição direta e as melhores condições comerciais do mercado do Rio de Janeiro.
                </p>
              </div>
            )}
          </div>

          {/* Catalog Controls (Filter + Search) */}
          <div className="catalog-controls">
            {/* Filter tabs */}
            <div className="category-tabs">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`category-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Buscar produto ou marca..."
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="catalog-loading">{t('common.loading')}</div>
          ) : products.length === 0 ? (
            <div className="catalog-empty">{t('catalogs.noProducts')}</div>
          ) : (
            <div className="grid grid-cols-3 gap-3 products-grid">
              {products.map(prod => (
                <div key={prod.id} className="product-card hover-lift glass">
                  <div className="product-info-top">
                    <span className="product-brand">{prod.brand}</span>
                    <span className="product-category-label">{prod.category}</span>
                  </div>
                  <h3 className="product-name">{prod.name}</h3>
                  <p className="product-desc">{prod.description}</p>
                  
                  {/* Specifications */}
                  <div className="product-specs">
                    <h4 className="specs-title">{t('catalogs.details')}</h4>
                    <ul className="specs-list">
                      {Object.entries(prod.features).map(([key, value]) => (
                        <li key={key}>
                          <span className="spec-key">{key.replace('_', ' ')}:</span> {value}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="product-footer">
                    <span className="product-price">
                      R$ {prod.price.toFixed(2)}
                    </span>
                    <a 
                      href={`https://api.whatsapp.com/send?phone=5521969560379&text=${encodeURIComponent(`Olá, tenho interesse no produto: ${prod.name} (Marca: ${prod.brand})`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-request"
                    >
                      {t('catalogs.interestCTA')}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .catalog-page {
          background-color: var(--background);
          color: var(--foreground);
        }

        .catalog-hero {
          position: relative;
          background-image: url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1470&auto=format&fit=crop'); /* Fumaça preta/estúdio */
          background-size: cover;
          background-position: center;
          height: 300px;
          display: flex;
          align-items: center;
          color: #ffffff;
        }

        .catalog-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 15, 14, 0.85);
          z-index: 1;
        }

        .catalog-hero-content {
          position: relative;
          z-index: 2;
        }

        .catalog-hero-subtitle {
          font-size: 1.2rem;
          color: #aca399;
          margin-top: 8px;
        }

        /* Accordion */
        .accordion-card {
          margin-bottom: 40px;
          padding: 24px 32px;
          border-radius: var(--border-radius-md);
          background-color: var(--surface-card);
          border: 1px solid var(--surface-border);
        }

        .accordion-header {
          width: 100%;
          background: transparent;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          padding: 0;
        }

        .accordion-title {
          font-size: 1.35rem;
          margin: 0;
          text-align: left;
        }

        .accordion-icon {
          color: var(--primary);
          font-size: 0.9rem;
          transition: transform var(--transition-fast);
        }

        .accordion-icon.open {
          transform: rotate(180deg);
        }

        .accordion-content {
          margin-top: 16px;
          font-size: 1rem;
          line-height: 1.6;
          color: var(--foreground-muted);
          border-top: 1px solid var(--surface-border);
          padding-top: 16px;
        }

        /* Controls */
        .catalog-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .category-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .category-tab-btn {
          font-family: var(--font-barlow);
          font-size: 0.9rem;
          font-weight: 700;
          background: var(--surface-card);
          border: 1px solid var(--surface-border);
          padding: 10px 20px;
          border-radius: var(--border-radius-full);
          color: var(--foreground-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .category-tab-btn:hover, .category-tab-btn.active {
          background-color: var(--primary);
          color: #0a0000;
          border-color: var(--primary);
        }

        .search-box {
          min-width: 280px;
        }

        @media (max-width: 921px) {
          .catalog-controls {
            flex-direction: column;
            align-items: stretch;
          }
          .search-box {
            width: 100%;
          }
        }

        /* Grid */
        .products-grid {
          margin-top: 20px;
        }

        .product-card {
          background-color: var(--surface-card);
          border: 1px solid var(--surface-border);
          border-radius: var(--border-radius-md);
          padding: 32px;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .product-info-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .product-brand {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--primary-dark);
        }

        .product-category-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          background-color: rgba(0,0,0,0.05);
          padding: 2px 8px;
          border-radius: 4px;
          color: var(--foreground-muted);
        }

        [data-theme="dark"] .product-category-label {
          background-color: rgba(255,255,255,0.05);
        }

        .product-name {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .product-desc {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--foreground-muted);
          margin-bottom: 20px;
          flex-grow: 1;
        }

        /* Specs */
        .product-specs {
          border-top: 1px solid var(--surface-border);
          padding-top: 16px;
          margin-bottom: 24px;
        }

        .specs-title {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--foreground-muted);
          margin-bottom: 8px;
        }

        .specs-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 0.85rem;
        }

        .specs-list li {
          margin-bottom: 4px;
          color: var(--foreground-muted);
        }

        .spec-key {
          font-weight: 600;
          text-transform: capitalize;
          color: var(--foreground);
        }

        /* Footer card */
        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--surface-border);
          padding-top: 20px;
        }

        .product-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--foreground);
        }

        .btn-request {
          font-family: var(--font-barlow);
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #0a0000;
          background-color: var(--primary);
          padding: 8px 16px;
          border-radius: var(--border-radius-full);
          transition: background-color var(--transition-fast);
        }

        .btn-request:hover {
          background-color: var(--primary-hover);
        }

        .catalog-loading, .catalog-empty {
          text-align: center;
          padding: 60px 0;
          font-size: 1.2rem;
          color: var(--foreground-muted);
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
