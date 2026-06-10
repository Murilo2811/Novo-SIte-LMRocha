'use client'

import React from 'react'
import { useTranslation } from '../../hooks/useTranslation'
import ContactForm from './ContactForm'
import Link from 'next/link'

export const HeroSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <header className="hero-container">
      {/* Dark Overlay for premium look and readability */}
      <div className="hero-overlay"></div>

      <div className="container hero-content-grid">
        {/* Left Side: Call to Action */}
        <div className="hero-text-block">
          <span className="badge-since">{t('home.heroBadge')}</span>
          <h1 className="hero-title italic-bold title-lg">
            {t('home.heroTitle')}
          </h1>
          <p className="hero-subtitle">
            {t('home.heroSubtitle')}
          </p>
          <div className="hero-actions">
            <Link href="/seja-nosso-cliente" className="btn btn-primary">
              {t('home.ctaButton')}
            </Link>
          </div>
        </div>

        {/* Right Side: Floating Contact Form */}
        <div className="hero-form-block">
          <ContactForm formType="contact" />
        </div>
      </div>

      <style jsx>{`
        .hero-container {
          position: relative;
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          overflow: hidden;
          background-image: url('/images/site/WhatsApp-Image-2020-07-14-at-23.09.02-1.jpeg');
          background-size: cover;
          background-position: center;
          padding: 80px 0;
        }

        @media (max-width: 921px) {
          .hero-container {
            min-height: auto;
            padding: 60px 0;
          }
        }

        .video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .video-background iframe {
          width: 100vw;
          height: 56.25vw; /* Ratio 16:9 */
          min-height: 100vh;
          min-width: 177.77vh; /* Ratio 16:9 */
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(15, 15, 14, 0.9) 0%,
            rgba(20, 18, 15, 0.8) 50%,
            rgba(10, 10, 10, 0.95) 100%
          );
          z-index: 2;
        }

        .hero-content-grid {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 921px) {
          .hero-content-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .hero-text-block {
          color: #ffffff;
        }

        .badge-since {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--primary);
          border: 1px solid var(--primary);
          padding: 6px 16px;
          border-radius: var(--border-radius-full);
          margin-bottom: 24px;
          letter-spacing: 0.15em;
        }

        .hero-title {
          font-size: 3.5rem;
          line-height: 1.15;
          margin-bottom: 24px;
          color: #ffffff;
          text-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }

        .hero-subtitle {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #aca399;
          margin-bottom: 40px;
          max-width: 600px;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
        }

        .hero-form-block {
          width: 100%;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-subtitle {
            font-size: 1.05rem;
          }
        }
      `}</style>
    </header>
  )
}

export default HeroSection
