'use client'

import Link from 'next/link'
import HeroSection from '../../components/sections/HeroSection'
import { useTranslation } from '../../hooks/useTranslation'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="section-padding features-section">
        <div className="container">
          <h2 className="section-title title-md text-center">
            {t('home.featuresTitle')}
          </h2>

          <div className="grid grid-cols-3 gap-3 features-grid">
            {/* Feature 1 */}
            <div className="feature-card hover-lift">
              <div className="feature-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="feature-icon">
                  <path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM256 128c-70.58 0-128 57.42-128 128s57.42 128 128 128s128-57.42 128-128S326.6 128 256 128z"/>
                </svg>
              </div>
              <h3 className="feature-title">{t('home.feature1Title')}</h3>
              <p className="feature-desc">{t('home.feature1Desc')}</p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card hover-lift">
              <div className="feature-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="feature-icon">
                  <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/>
                </svg>
              </div>
              <h3 className="feature-title">{t('home.feature2Title')}</h3>
              <p className="feature-desc">{t('home.feature2Desc')}</p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card hover-lift">
              <div className="feature-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="feature-icon">
                  <path fill="currentColor" d="M280 32c-13.3 0-24 10.7-24 24v8c0 13.3 10.7 24 24 24h104c13.3 0 24-10.7 24-24v-8c0-13.3-10.7-24-24-24H280zm-72 80c-13.3 0-24 10.7-24 24v8c0 13.3 10.7 24 24 24h248c13.3 0 24-10.7 24-24v-8c0-13.3-10.7-24-24-24H208zm-96 80c-13.3 0-24 10.7-24 24v8c0 13.3 10.7 24 24 24h440c13.3 0 24-10.7 24-24v-8c0-13.3-10.7-24-24-24H112zm-88 80C10.7 272 0 282.7 0 296v8c0 13.3 10.7 24 24 24h608c13.3 0 24-10.7 24-24v-8c0-13.3-10.7-24-24-24H24z"/>
                </svg>
              </div>
              <h3 className="feature-title">{t('home.feature3Title')}</h3>
              <p className="feature-desc">{t('home.feature3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quem Somos Section */}
      <section className="section-padding about-section">
        <div className="container">
          <div className="about-grid">
            {/* Text block */}
            <div className="about-text-block">
              <span className="about-eyebrow">A EMPRESA</span>
              <h2 className="about-title title-md">
                {t('home.aboutSectionTitle')}
              </h2>
              <p className="about-paragraph">{t('home.aboutSectionText1')}</p>
              <p className="about-paragraph">{t('home.aboutSectionText2')}</p>
              <Link href="/quem-somos" className="btn btn-primary about-cta">
                {t('home.aboutSectionCTA')}
              </Link>
            </div>

            {/* Stats block */}
            <div className="about-stats-block">
              <div className="stat-card">
                <span className="stat-value">{t('home.aboutStat1Value')}</span>
                <span className="stat-label">{t('home.aboutStat1Label')}</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{t('home.aboutStat2Value')}</span>
                <span className="stat-label">{t('home.aboutStat2Label')}</span>
              </div>
              <div className="stat-card stat-card-wide">
                <span className="stat-value">{t('home.aboutStat3Value')}</span>
                <span className="stat-label">{t('home.aboutStat3Label')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Opportunity Section */}
      <section className="business-section">
        <div className="business-overlay" />
        <div className="container business-content">
          <div className="business-text">
            <span className="business-eyebrow">OPORTUNIDADE DE NEGÓCIO</span>
            <h2 className="business-title title-md">
              {t('home.businessTitle')}
            </h2>
            <p className="business-subtitle">{t('home.businessSubtitle')}</p>
            <p className="business-paragraph">{t('home.businessText')}</p>
            <div className="business-actions">
              <Link href="/nossas-marcas" className="btn btn-primary">
                {t('home.businessCTA1')}
              </Link>
              <Link href="/seja-nosso-cliente" className="btn btn-outline-light">
                {t('home.businessCTA2')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .home-page {
          background-color: var(--background);
        }

        /* ── Features ─────────────────────────────────── */
        .features-section {
          background-color: var(--surface-card);
          border-top: 1px solid var(--surface-border);
          border-bottom: 1px solid var(--surface-border);
        }

        .section-title {
          margin-bottom: 50px;
          color: var(--foreground);
          position: relative;
          display: inline-block;
          left: 50%;
          transform: translateX(-50%);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .section-title::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -10px;
          width: 60px;
          height: 3px;
          background-color: var(--primary);
        }

        .features-grid {
          margin-top: 20px;
        }

        .feature-card {
          background-color: var(--surface);
          border: 1px solid var(--surface-border);
          border-radius: var(--border-radius-md);
          padding: 40px 30px;
          text-align: center;
          transition: all var(--transition-smooth);
        }

        .feature-icon-wrapper {
          width: 70px;
          height: 70px;
          background-color: rgba(255, 204, 102, 0.15);
          color: var(--primary-dark);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
          transition: all var(--transition-smooth);
        }

        .feature-card:hover .feature-icon-wrapper {
          background-color: var(--primary);
          color: #0a0000;
          transform: rotateY(180deg);
        }

        .feature-icon {
          width: 32px;
          height: 32px;
        }

        .feature-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 16px;
        }

        .feature-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--foreground-muted);
        }

        /* ── Quem Somos ───────────────────────────────── */
        .about-section {
          background-color: var(--background);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 64px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .about-eyebrow {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--primary);
          margin-bottom: 14px;
        }

        .about-title {
          color: var(--foreground);
          margin-bottom: 28px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          position: relative;
          padding-bottom: 18px;
        }

        .about-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 50px;
          height: 3px;
          background-color: var(--primary);
        }

        .about-paragraph {
          font-size: 1rem;
          line-height: 1.75;
          color: var(--foreground-muted);
          margin-bottom: 18px;
        }

        .about-cta {
          margin-top: 12px;
          display: inline-flex;
        }

        .about-stats-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .stat-card {
          background-color: var(--surface);
          border: 1px solid var(--surface-border);
          border-radius: var(--border-radius-md);
          padding: 32px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color var(--transition-smooth), transform var(--transition-smooth);
        }

        .stat-card:hover {
          border-color: var(--primary);
          transform: translateY(-4px);
        }

        .stat-card-wide {
          grid-column: span 2;
        }

        .stat-value {
          font-size: 2.8rem;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .stat-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--foreground-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* ── Business Opportunity ─────────────────────── */
        .business-section {
          position: relative;
          background-image: url('/images/site/WhatsApp-Image-2020-07-14-at-23.09.02.jpeg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          padding: 100px 0;
          overflow: hidden;
        }

        .business-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(10, 8, 5, 0.92) 0%,
            rgba(20, 16, 10, 0.85) 60%,
            rgba(10, 8, 5, 0.95) 100%
          );
          z-index: 1;
        }

        .business-content {
          position: relative;
          z-index: 2;
        }

        .business-text {
          max-width: 680px;
        }

        .business-eyebrow {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--primary);
          margin-bottom: 14px;
        }

        .business-title {
          color: #ffffff;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          line-height: 1.2;
        }

        .business-subtitle {
          font-size: 1.15rem;
          font-weight: 500;
          color: var(--primary);
          margin-bottom: 24px;
          font-style: italic;
        }

        .business-paragraph {
          font-size: 1rem;
          line-height: 1.75;
          color: #aca399;
          margin-bottom: 40px;
          max-width: 580px;
        }

        .business-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-outline-light {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 28px;
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: var(--border-radius-full);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 0.03em;
          text-decoration: none;
          transition: all var(--transition-smooth);
          background: transparent;
        }

        .btn-outline-light:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: rgba(255, 204, 102, 0.08);
        }

        @media (max-width: 768px) {
          .business-section {
            background-attachment: scroll;
            padding: 70px 0;
          }

          .business-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  )
}
