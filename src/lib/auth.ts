import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock_secret',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 dia de sessão
  },
  callbacks: {
    async signIn({ user }) {
      const email = user.email
      if (!email) return false

      // Obter lista branca de e-mails permitidos (separados por vírgula no .env)
      const allowedEmailsEnv = process.env.ALLOWED_ADMIN_EMAILS || ''
      const allowedEmails = allowedEmailsEnv
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean)

      // Por padrão, se não configurado no .env, permite o e-mail padrão do usuário
      const defaultAdmin = 'contato@lmrocha.com.br'
      if (email.toLowerCase() === defaultAdmin) {
        return true
      }

      // Validar se o e-mail está na lista
      return allowedEmails.includes(email.toLowerCase())
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login', // custom login page if needed, or defaults
    error: '/admin/error',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback_secret_minimum_32_characters_long_for_jwt_signing',
}
