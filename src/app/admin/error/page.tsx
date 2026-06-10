'use client'

import React from 'react'
import Link from 'next/link'

export default function AdminErrorPage() {
  return (
    <div className="error-page">
      <div className="error-card glass">
        <div className="error-icon-wrapper">
          <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>

        <h2 className="error-title">Acesso Negado</h2>
        <p className="error-desc">
          O e-mail da sua conta Google não está autorizado para acessar esta área administrativa.
          Entre em contato com o administrador do sistema para liberar seu acesso.
        </p>

        <div className="error-actions">
          <Link href="/admin/login" className="btn btn-primary btn-block">
            Tentar Outra Conta
          </Link>
          <Link href="/" className="back-link">
            Voltar para o site
          </Link>
        </div>
      </div>

      <style jsx>{`
        .error-page {
          background-color: #0f0f0e;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .error-card {
          max-width: 440px;
          width: 100%;
          padding: 40px;
          border-radius: var(--border-radius-md);
          background: rgba(30, 28, 26, 0.85);
          border: 1px solid rgba(255, 85, 85, 0.2);
          text-align: center;
          color: #ffffff;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        .error-icon-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        .error-icon {
          width: 64px;
          height: 64px;
          color: #ff5555;
        }

        .error-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #ff5555;
        }

        .error-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #aca399;
          margin-bottom: 32px;
        }

        .error-actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
        }

        .btn-block {
          width: 100%;
          padding: 14px;
        }

        .back-link {
          font-size: 0.9rem;
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
