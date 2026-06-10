'use client'

import React from 'react'
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

      <style jsx>{`
        .home-page {
          background-color: var(--background);
        }

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
      `}</style>
    </div>
  )
}
