import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'
import { I18nProvider } from '../context/I18nContext'
import AgeGate from '../components/layout/AgeGate'
import './globals.css'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'LM Rocha Distribuidora — Rio de Janeiro',
  description: 'LM Rocha Distribuidora - Desde 2006 distribuindo fumo, charutos e acessórios no Rio de Janeiro. Confiança, segurança e credibilidade.',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={barlow.variable}>
      <body>
        <I18nProvider>
          <AgeGate />
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
