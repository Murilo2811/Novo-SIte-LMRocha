'use client'

import React from 'react'
import { useTranslation } from '../../../hooks/useTranslation'

export default function QuemSomosPage() {
  const { t } = useTranslation()

  // Link WhatsApp de contato
  const whatsappUrl = 'https://api.whatsapp.com/send?phone=5521969560379&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20LM%20Rocha.'

  return (
    <div className="about-page">
      {/* Banner */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="container about-hero-content">
          <h1 className="title-lg text-gold italic-bold">{t('about.title')}</h1>
          <p className="about-hero-subtitle">{t('about.subtitle')}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container about-grid">
          {/* Left: Text Content */}
          <div className="about-main-content">
            <h2 className="title-md history-title">{t('about.historyTitle')}</h2>
            <p className="about-text">{t('about.historyText1')}</p>
            <p className="about-text">{t('about.historyText2')}</p>

            {/* MVV Cards Grid */}
            <div className="mvv-grid">
              <div className="mvv-card glass">
                <h3 className="mvv-title text-gold">{t('about.values.missionTitle')}</h3>
                <p className="mvv-text">{t('about.values.missionText')}</p>
              </div>

              <div className="mvv-card glass">
                <h3 className="mvv-title text-gold">{t('about.values.visionTitle')}</h3>
                <p className="mvv-text">{t('about.values.visionText')}</p>
              </div>

              <div className="mvv-card glass" style={{ gridColumn: 'span 2' }}>
                <h3 className="mvv-title text-gold">{t('about.values.valuesTitle')}</h3>
                <p className="mvv-text">{t('about.values.valuesText')}</p>
              </div>
            </div>
          </div>

          {/* Right: Sidebar Fale Conosco */}
          <aside className="about-sidebar">
            <div className="sidebar-card glass">
              <h3 className="sidebar-title text-gold">Fale Conosco</h3>
              <p className="sidebar-desc">
                Tem dúvidas sobre nosso portfólio de produtos ou deseja abrir um cadastro de revendedor? Fale agora com nossa equipe.
              </p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-block">
                {t('common.whatsappText')}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <style jsx>{`
        .about-page {
          background-color: var(--background);
          color: var(--foreground);
        }

        .about-hero {
          position: relative;
          background-image: url('/images/site/WhatsApp-Image-2020-07-22-at-10.14.53-2.jpeg'); /* Foto real do acervo */
          background-size: cover;
          background-position: center;
          height: 300px;
          display: flex;
          align-items: center;
          color: #ffffff;
        }

        .about-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 15, 14, 0.85);
          z-index: 1;
        }

        .about-hero-content {
          position: relative;
          z-index: 2;
        }

        .about-hero-subtitle {
          font-size: 1.2rem;
          color: #aca399;
          margin-top: 8px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 48px;
        }

        @media (max-width: 921px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .history-title {
          margin-bottom: 24px;
          position: relative;
          display: inline-block;
        }

        .history-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 40px;
          height: 3px;
          background-color: var(--primary);
        }

        .about-text {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--foreground-muted);
          margin-bottom: 20px;
        }

        /* Mission Vision Values Grid */
        .mvv-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-top: 40px;
        }

        @media (max-width: 544px) {
          .mvv-grid {
            grid-template-columns: 1fr;
          }
          .mvv-grid > :last-child {
            grid-column: span 1 !important;
          }
        }

        .mvv-card {
          padding: 24px;
          border-radius: var(--border-radius-md);
          background: var(--surface-card);
          border: 1px solid var(--surface-border);
        }

        .mvv-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .mvv-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--foreground-muted);
        }

        /* Sidebar card */
        .sidebar-card {
          padding: 32px;
          border-radius: var(--border-radius-md);
          background-color: var(--surface-card);
          border: 1px solid var(--surface-border);
          position: sticky;
          top: 100px;
        }

        .sidebar-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .sidebar-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--foreground-muted);
          margin-bottom: 24px;
        }

        .btn-block {
          width: 100%;
        }
      `}</style>
    </div>
  )
}
