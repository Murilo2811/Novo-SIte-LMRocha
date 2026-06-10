import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '../../../lib/rate-limiter'
import { sendEmail } from '../../../lib/email'
import { 
  contactFormSchema, 
  clientFormSchema, 
  careersFormSchema 
} from '../../../lib/validation'

export async function POST(req: NextRequest) {
  // Obter o IP do cliente de forma segura
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '127.0.0.1'

  // Aplicar Rate Limiting (máximo 5 requisições por minuto por IP)
  const limitResult = rateLimit(ip, 'contato', { limit: 5, windowMs: 60 * 1000 })

  if (limitResult.isBlocked) {
    return new NextResponse(
      JSON.stringify({ error: 'Muitas requisições. Tente novamente mais tarde.' }),
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
    const body = await req.json()
    const { formType, ...data } = body

    let subject = ''
    let textContent = ''
    let whatsappText = ''

    const targetPhone = '5521969560379' // WhatsApp da empresa

    if (formType === 'contact') {
      const parsed = contactFormSchema.safeParse(data)
      if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
      }
      const { name, phone, subject: mailSub, message } = parsed.data
      subject = `Contato Site: ${mailSub}`
      textContent = `Nome: ${name}\nTelefone: ${phone}\nAssunto: ${mailSub}\nMensagem:\n${message}`
      whatsappText = `Olá! Meu nome é ${name}. Gostaria de falar sobre "${mailSub}". Mensagem: ${message}`

    } else if (formType === 'client') {
      const parsed = clientFormSchema.safeParse(data)
      if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
      }
      const { companyName, cnpj, contactName, phone, email, cityState, message } = parsed.data
      subject = `Cadastro de Cliente: ${companyName}`
      textContent = `Empresa: ${companyName}\nCNPJ: ${cnpj}\nContato: ${contactName}\nTelefone: ${phone}\nE-mail: ${email}\nCidade/Estado: ${cityState}\nMensagem adicional:\n${message || 'Nenhuma'}`
      whatsappText = `Olá! Quero me cadastrar como cliente. Empresa: ${companyName}, CNPJ: ${cnpj}, Contato: ${contactName}, Cidade/Estado: ${cityState}.`

    } else if (formType === 'careers') {
      const parsed = careersFormSchema.safeParse(data)
      if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
      }
      const { name, email, phone, position, message } = parsed.data
      subject = `Trabalhe Conosco: ${name} - ${position}`
      textContent = `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nCargo de Interesse: ${position}\nMensagem:\n${message}`
      whatsappText = `Olá! Gostaria de me candidatar para a vaga de ${position}. Meu nome é ${name}.`

    } else {
      return NextResponse.json({ error: 'Tipo de formulário inválido.' }, { status: 400 })
    }

    // Enviar por e-mail (SMTP real ou simulado)
    const emailSent = await sendEmail({
      subject,
      text: textContent
    })

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Falha ao processar o formulário. Tente novamente.' },
        { status: 500 }
      )
    }

    // Gerar link do WhatsApp formatado
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(whatsappText)}`

    return NextResponse.json({
      success: true,
      message: 'Formulário enviado com sucesso!',
      whatsappUrl
    })

  } catch (error) {
    console.error('Error processing contact request:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
