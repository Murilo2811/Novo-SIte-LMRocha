'use client'

import React, { useState, useEffect } from 'react'
import { useTranslation } from '../../hooks/useTranslation'

export const AgeGate: React.FC = () => {
  const [showGate, setShowGate] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    // Verificar se o cookie age_verified existe
    const cookies = document.cookie.split(';')
    const isVerified = cookies.some((c) => c.trim().startsWith('age_verified=true'))
    if (!isVerified) {
      const timer = setTimeout(() => setShowGate(true), 0)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleConfirm = () => {
    // Definir cookie por 30 dias
    const date = new Date()
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000)
    document.cookie = `age_verified=true; expires=${date.toUTCString()}; path=/; SameSite=Lax; Secure`
    setShowGate(false)
  }

  const handleReject = () => {
    window.location.href = 'https://www.google.com'
  }

  if (!showGate) return null

  return (
    <div className="age-gate-overlay">
      <div className="age-gate-container glass">
        <div className="logo-wrapper">
          {/* Logo LM Rocha de fallback */}
          <div className="logo-text">LM ROCHA</div>
          <div className="logo-subtext">DISTRIBUIDORA</div>
        </div>
        
        <h2 className="age-gate-title">{t('ageGate.title')}</h2>
        <p className="age-gate-text">{t('ageGate.text')}</p>
        
        <div className="age-gate-buttons">
          <button onClick={handleConfirm} className="btn btn-primary btn-block">
            {t('ageGate.yes')}
          </button>
          <button onClick={handleReject} className="btn-reject">
            {t('ageGate.no')}
          </button>
        </div>
      </div>

      <style jsx>{`
        .age-gate-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(10, 10, 10, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 24px;
        }

        .age-gate-container {
          max-width: 500px;
          width: 100%;
          padding: 40px;
          border-radius: var(--border-radius-md);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          background: rgba(30, 28, 26, 0.85);
          border: 1px solid rgba(255, 204, 102, 0.2);
          color: #f5f2eb;
        }

        .logo-wrapper {
          margin-bottom: 24px;
        }

        .logo-text {
          font-size: 2.2rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--primary);
          line-height: 1;
        }

        .logo-subtext {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          color: #ffffff;
          margin-top: 4px;
        }

        .age-gate-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .age-gate-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #d1c9bd;
          margin-bottom: 32px;
        }

        .age-gate-buttons {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .btn-block {
          width: 100%;
          padding: 16px;
        }

        .btn-reject {
          background: transparent;
          border: none;
          color: #aca399;
          font-family: var(--font-barlow);
          font-size: 0.9rem;
          text-decoration: underline;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .btn-reject:hover {
          color: #ff5555;
        }
      `}</style>
    </div>
  )
}

export default AgeGate
