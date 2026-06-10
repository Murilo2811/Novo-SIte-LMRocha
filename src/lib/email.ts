import nodemailer from 'nodemailer'

interface EmailOptions {
  subject: string
  text: string
  html?: string
}

/**
 * Envia um e-mail formatado utilizando o Nodemailer.
 * Caso as variáveis de ambiente SMTP não estejam configuradas, simula o envio no console.
 */
export async function sendEmail({ subject, text, html }: EmailOptions): Promise<boolean> {
  const targetEmail = process.env.CONTACT_EMAIL || 'contato@lmrocha.com.br'

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = parseInt(process.env.SMTP_PORT || '587')
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpSecure = process.env.SMTP_SECURE === 'true' // true para 465, false para outras portas

  // Verificar se as configurações mínimas do SMTP existem
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn('--- SMTP NOT CONFIGURATED ---')
    console.log(`To: ${targetEmail}`)
    console.log(`Subject: ${subject}`)
    console.log(`Content:\n${text}`)
    console.log('------------------------------')
    // Retorna verdadeiro para simular sucesso no envio durante testes/local
    return true
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const info = await transporter.sendMail({
      from: `"LM Rocha Site" <${smtpUser}>`,
      to: targetEmail,
      subject: subject,
      text: text,
      html: html || text.replace(/\n/g, '<br>'),
    })

    console.log(`Email sent: ${info.messageId}`)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    // Retorna falso se houver erro ao conectar com o SMTP real
    return false
  }
}
