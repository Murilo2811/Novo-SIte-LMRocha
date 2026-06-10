'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslation } from '../../hooks/useTranslation'

export const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer className="footer-section">
      <div className="container footer-grid">
        {/* Col 1: Brand Info */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <span className="logo-main">LM ROCHA</span>
            <span className="logo-sub">DISTRIBUIDORA</span>
          </div>
          <p className="footer-about-text">{t('footer.aboutText')}</p>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="footer-col links-col">
          <h3 className="footer-title">{t('footer.quickLinks')}</h3>
          <ul className="footer-links">
            <li><Link href="/">{t('nav.home')}</Link></li>
            <li><Link href="/quem-somos">{t('nav.about')}</Link></li>
            <li><Link href="/nossas-marcas">{t('nav.brands')}</Link></li>
            <li><Link href="/catalogos">{t('nav.catalogs')}</Link></li>
            <li><Link href="/seja-nosso-cliente">{t('nav.client')}</Link></li>
            <li><Link href="/trabalhe-conosco">{t('nav.careers')}</Link></li>
            <li><Link href="/contato">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        {/* Col 3: Contact Details */}
        <div className="footer-col contact-col">
          <h3 className="footer-title">{t('footer.contact')}</h3>
          <div className="contact-info">
            <p className="contact-item font-semibold">
              <strong>Endereço:</strong><br />
              {t('footer.address')}
            </p>
            <p className="contact-item">
              <strong>Telefone:</strong><br />
              <a href="tel:5521969560379">{t('footer.phone')}</a>
            </p>
            <p className="contact-item">
              <strong>E-mail:</strong><br />
              <a href={`mailto:${t('footer.email')}`}>{t('footer.email')}</a>
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright-text">{t('footer.rights')}</p>
        </div>
      </div>

      <style jsx>{`
        .footer-section {
          background-color: var(--primary);
          color: #0c0a09;
          padding-top: 60px;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 48px;
          padding-bottom: 40px;
        }

        @media (max-width: 921px) {
          .footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 32px;
          }
        }

        @media (max-width: 544px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .footer-col {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          display: flex;
          flex-direction: column;
          line-height: 1;
          margin-bottom: 20px;
        }

        .logo-main {
          font-size: 1.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #0c0a09;
        }

        .logo-sub {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          color: rgba(12, 10, 9, 0.7);
          margin-top: 2px;
        }

        .footer-about-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(12, 10, 9, 0.8);
        }

        .footer-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #0c0a09;
          position: relative;
          padding-bottom: 8px;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 30px;
          height: 2px;
          background-color: #0c0a09;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .footer-links li a {
          font-size: 0.95rem;
          font-weight: 500;
          color: rgba(12, 10, 9, 0.8);
          transition: color var(--transition-fast);
        }

        .footer-links li a:hover {
          color: #ffffff;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-item {
          font-size: 0.95rem;
          line-height: 1.5;
          color: rgba(12, 10, 9, 0.8);
        }

        .contact-item strong {
          color: #0c0a09;
        }

        .contact-item a {
          color: rgba(12, 10, 9, 0.8);
          transition: color var(--transition-fast);
        }

        .contact-item a:hover {
          color: #ffffff;
        }

        .footer-bottom {
          background-color: rgba(0, 0, 0, 0.05);
          padding: 24px 0;
          text-align: center;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
        }

        .copyright-text {
          font-size: 0.85rem;
          color: rgba(12, 10, 9, 0.6);
        }
      `}</style>
    </footer>
  )
}

export default Footer
