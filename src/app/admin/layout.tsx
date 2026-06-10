'use client'

import React from 'react'
import { SessionProvider, useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Componente Interno do Layout para acessar useSession
function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  // Evita renderizar elementos administrativos em páginas de login ou erro
  const isAuthPage = pathname.includes('/admin/login') || pathname.includes('/admin/error')

  if (isAuthPage) {
    return <>{children}</>
  }

  if (status === 'loading') {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Verificando credenciais...</p>
        <style jsx>{`
          .admin-loading {
            background-color: #0f0f0e;
            color: #ffffff;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: var(--font-barlow);
          }
          .spinner {
            border: 4px solid rgba(255, 204, 102, 0.1);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border-left-color: var(--primary);
            animation: spin 1s linear infinite;
            margin-bottom: 16px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  // Se não autenticado (o middleware deve barrar, mas garante por segurança)
  if (status === 'unauthenticated') {
    return (
      <div className="admin-unauth">
        <p>Acesso não autorizado. Redirecionando para login...</p>
        <script dangerouslySetInnerHTML={{ __html: `window.location.href = '/admin/login';` }} />
      </div>
    )
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Contatos / Leads', path: '/admin/contatos' },
    { name: 'Configurar Catálogo', path: '/admin/catalogo' }
  ]

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <Link href="/admin">
            <span className="brand-title">LM ROCHA</span>
            <span className="brand-tag">PAINEL CONTROLE</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <Link 
                  href={item.path} 
                  className={`sidebar-link ${pathname === item.path ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleSignOut} className="btn-logout">
            Sair da Conta
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header glass">
          <div className="header-left">
            <h2>{menuItems.find(m => m.path === pathname)?.name || 'Administração'}</h2>
          </div>
          <div className="header-right">
            {session?.user && (
              <div className="admin-user-profile">
                {session.user.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt="Avatar" className="user-avatar" />
                )}
                <div className="user-info">
                  <span className="user-name">{session.user.name}</span>
                  <span className="user-email">{session.user.email}</span>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="admin-body">
          {children}
        </main>
      </div>

      <style jsx global>{`
        body {
          background-color: #0f0f0e !important;
          color: #f5f2eb !important;
        }
      `}</style>
      <style jsx>{`
        .admin-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          min-height: 100vh;
          font-family: var(--font-barlow);
          background-color: #0f0f0e;
          color: #f5f2eb;
        }

        .admin-sidebar {
          background-color: #171715;
          border-right: 1px solid rgba(255, 204, 102, 0.1);
          display: flex;
          flex-direction: column;
          padding: 24px;
        }

        .sidebar-brand {
          margin-bottom: 40px;
        }

        .brand-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
          display: block;
          letter-spacing: 0.05em;
        }

        .brand-tag {
          font-size: 0.65rem;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.2em;
          display: block;
          margin-top: 2px;
        }

        .sidebar-nav {
          flex-grow: 1;
        }

        .sidebar-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sidebar-link {
          display: block;
          padding: 12px 20px;
          border-radius: var(--border-radius-sm);
          color: #aca399;
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .sidebar-link:hover, .sidebar-link.active {
          background-color: rgba(255, 204, 102, 0.1);
          color: var(--primary);
        }

        .sidebar-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 20px;
        }

        .btn-logout {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255, 85, 85, 0.3);
          color: #ff5555;
          padding: 10px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          font-family: var(--font-barlow);
          font-weight: 700;
          transition: all var(--transition-fast);
        }

        .btn-logout:hover {
          background-color: #ff5555;
          color: #ffffff;
        }

        /* Main Area */
        .admin-main {
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow-y: auto;
        }

        .admin-header {
          height: 80px;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 204, 102, 0.1);
          background-color: rgba(23, 23, 21, 0.8);
        }

        .header-left h2 {
          font-size: 1.5rem;
          color: #ffffff;
          margin: 0;
        }

        .admin-user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--primary);
        }

        .user-info {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .user-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: #ffffff;
        }

        .user-email {
          font-size: 0.75rem;
          color: #aca399;
        }

        .admin-body {
          padding: 40px;
          flex-grow: 1;
        }

        @media (max-width: 768px) {
          .admin-layout {
            grid-template-columns: 1fr;
          }
          .admin-sidebar {
            display: none;
          }
          .admin-header {
            padding: 0 20px;
          }
          .admin-body {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  )
}

// Provedor de Sessão encapsulado
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  )
}
