import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/admin/login',
    error: '/admin/error',
  },
})

export const config = {
  // Protege a rota /admin e todas as suas sub-rotas, exceto /admin/login e /admin/error
  matcher: [
    '/admin/((?!login|error|api|_next/static|_next/image|favicon.ico).*)',
    '/admin'
  ],
}
