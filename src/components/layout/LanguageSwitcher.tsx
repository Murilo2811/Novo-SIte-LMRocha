'use client'

import React from 'react'
import { useTranslation, Locale } from '../../context/I18nContext'

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useTranslation()

  const toggleLanguage = () => {
    const nextLocale: Locale = locale === 'pt-BR' ? 'en' : 'pt-BR'
    setLocale(nextLocale)
  }

  return (
    <button 
      onClick={toggleLanguage}
      className="lang-switcher-btn"
      aria-label="Switch Language"
    >
      <span className={`lang-flag ${locale === 'pt-BR' ? 'active' : ''}`}>BR</span>
      <span className="lang-divider">|</span>
      <span className={`lang-flag ${locale === 'en' ? 'active' : ''}`}>EN</span>

      <style jsx>{`
        .lang-switcher-btn {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 204, 102, 0.2);
          padding: 6px 12px;
          border-radius: var(--border-radius-full);
          color: var(--foreground);
          font-family: var(--font-barlow);
          font-weight: 600;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .lang-switcher-btn:hover {
          background: rgba(255, 204, 102, 0.15);
          border-color: var(--primary);
        }

        .lang-flag {
          opacity: 0.5;
          transition: opacity var(--transition-fast), color var(--transition-fast);
        }

        .lang-flag.active {
          opacity: 1;
          color: var(--primary);
        }

        .lang-divider {
          margin: 0 6px;
          opacity: 0.3;
          color: var(--foreground);
        }
      `}</style>
    </button>
  )
}

export default LanguageSwitcher
