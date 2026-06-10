'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const handleLogin = () => {
    signIn('google', { callbackUrl: '/admin' })
  }

  return (
    <div className="login-page">
      <div className="login-card glass">
        <div className="logo-wrapper">
          <img src="/images/logo.png" alt="LM Rocha Logo" className="logo-image" />
          <div className="logo-subtext">PAINEL ADMIN</div>
        </div>

        <h2 className="login-title">Acesso Restrito</h2>
        <p className="login-desc">
          Este é um painel restrito a administradores. Para acessar, utilize uma conta Google autorizada.
        </p>

        <button onClick={handleLogin} className="btn-google">
          <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Entrar com Google
        </button>

        <Link href="/" className="back-link">
          Voltar para o site
        </Link>
      </div>

      <style jsx>{`
        .login-page {
          background-color: #0f0f0e;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .login-card {
          max-width: 420px;
          width: 100%;
          padding: 40px;
          border-radius: var(--border-radius-md);
          background: rgba(30, 28, 26, 0.85);
          border: 1px solid rgba(255, 204, 102, 0.15);
          text-align: center;
          color: #ffffff;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        .logo-wrapper {
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .logo-image {
          height: 60px;
          width: auto;
          object-fit: contain;
        }

        .logo-subtext {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          color: #ffffff;
          margin-top: 8px;
        }

        .login-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .login-desc {
          font-size: 0.9rem;
          line-height: 1.5;
          color: #aca399;
          margin-bottom: 32px;
        }

        .btn-google {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-family: var(--font-barlow);
          font-weight: 700;
          font-size: 0.95rem;
          color: #0f0f0e;
          background-color: #ffffff;
          border: 1px solid #e6dfd5;
          padding: 14px 28px;
          border-radius: var(--border-radius-full);
          cursor: pointer;
          width: 100%;
          transition: all var(--transition-fast);
          margin-bottom: 24px;
        }

        .btn-google:hover {
          background-color: #f7f5f0;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
        }

        .google-icon {
          flex-shrink: 0;
        }

        .back-link {
          font-size: 0.85rem;
          color: #aca399;
          text-decoration: underline;
        }

        .back-link:hover {
          color: var(--primary);
        }
      `}</style>
    </div>
  )
}
