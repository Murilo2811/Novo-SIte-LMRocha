'use client'

import React from 'react'
import { useTranslation } from '../../../hooks/useTranslation'
import ContactForm from '../../../components/sections/ContactForm'

export default function TrabalheConoscoPage() {
  const { t } = useTranslation()

  return (
    <div className="careers-page">
      {/* Banner */}
      <section className="careers-hero">
        <div className="careers-hero-overlay"></div>
        <div className="container careers-hero-content">
          <h1 className="title-lg text-gold italic-bold">{t('nav.careers')}</h1>
          <p className="careers-hero-subtitle">Junte-se à equipe de vendas e logística da LM Rocha</p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="section-padding">
        <div className="container form-container">
          <div className="info-block">
            <h2 className="title-md font-bold text-gold">Faça parte da nossa história</h2>
            <p className="info-desc">
              Estamos sempre à procura de profissionais talentosos, dedicados e que compartilhem dos nossos valores de ética, integridade e foco no cliente. 
              Temos vagas frequentes para promotores de vendas, motoristas/entregadores, auxiliares de estoque e áreas administrativas.
            </p>
            <div className="careers-info-box glass">
              <h4>Enviar Currículo Físico?</h4>
              <p>
                Se preferir, você também pode entregar seu currículo em nossa sede operacional localizada na Ilha do Governador, ou enviar via e-mail direto para: 
                <br />
                <a href={`mailto:${t('footer.email')}`} className="text-gold font-bold">
                  {t('footer.email')}
                </a>
              </p>
            </div>
          </div>

          <div className="form-block">
            <ContactForm formType="careers" />
          </div>
        </div>
      </section>

      <style jsx>{`
        .careers-page {
          background-color: var(--background);
          color: var(--foreground);
        }

        .careers-hero {
          position: relative;
          background-image: url('/images/site/WhatsApp-Image-2020-07-22-at-10.14.53-1.jpeg'); /* Foto real do acervo */
          background-size: cover;
          background-position: center;
          height: 300px;
          display: flex;
          align-items: center;
          color: #ffffff;
        }

        .careers-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 15, 14, 0.85);
          z-index: 1;
        }

        .careers-hero-content {
          position: relative;
          z-index: 2;
        }

        .careers-hero-subtitle {
          font-size: 1.2rem;
          color: #aca399;
          margin-top: 8px;
        }

        .form-container {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 48px;
          align-items: start;
        }

        @media (max-width: 921px) {
          .form-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .info-block {
          padding-right: 20px;
        }

        .info-desc {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--foreground-muted);
          margin-top: 16px;
          margin-bottom: 32px;
        }

        .careers-info-box {
          padding: 24px;
          border-radius: var(--border-radius-md);
          background-color: var(--surface-card);
          border: 1px solid var(--surface-border);
        }

        .careers-info-box h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .careers-info-box p {
          font-size: 0.95rem;
          color: var(--foreground-muted);
          line-height: 1.5;
        }

        .form-block {
          width: 100%;
        }
      `}</style>
    </div>
  )
}
