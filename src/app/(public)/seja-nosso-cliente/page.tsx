'use client'

import React from 'react'
import { useTranslation } from '../../../hooks/useTranslation'
import ContactForm from '../../../components/sections/ContactForm'

export default function SejaClientePage() {
  const { t } = useTranslation()

  return (
    <div className="client-page">
      {/* Banner */}
      <section className="client-hero">
        <div className="client-hero-overlay"></div>
        <div className="container client-hero-content">
          <h1 className="title-lg text-gold italic-bold">{t('nav.client')}</h1>
          <p className="client-hero-subtitle">Abasteça seu comércio com as melhores marcas de tabaco e charutos</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container form-container">
          <div className="info-block">
            <h2 className="title-md font-bold text-gold">Abra seu cadastro de revendedor</h2>
            <p className="info-desc">
              Trabalhamos exclusivamente no modelo B2B (Distribuição Comercial para estabelecimentos com CNPJ ativo no ramo de tabacaria, conveniência, adegas ou minimercados).
            </p>
            <div className="benefit-list">
              <div className="benefit-item">
                <span className="benefit-icon">✔</span>
                <div>
                  <h4>Entrega rápida no Rio de Janeiro</h4>
                  <p>Logística ágil e frota dedicada para agilizar sua reposição de estoque.</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✔</span>
                <div>
                  <h4>Preços competitivos de fábrica</h4>
                  <p>Parcerias diretas com as marcas garantem as melhores margens de lucro.</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✔</span>
                <div>
                  <h4>Suporte especializado de vendas</h4>
                  <p>Nossos promotores ajudam na montagem do mix ideal para o seu ponto de venda.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="form-block">
            <ContactForm formType="client" />
          </div>
        </div>
      </section>

      <style jsx>{`
        .client-page {
          background-color: var(--background);
          color: var(--foreground);
        }

        .client-hero {
          position: relative;
          background-image: url('/images/site/WhatsApp-Image-2020-07-14-at-23.09.03-2.jpeg'); /* Foto real do acervo */
          background-size: cover;
          background-position: center;
          height: 300px;
          display: flex;
          align-items: center;
          color: #ffffff;
        }

        .client-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 15, 14, 0.85);
          z-index: 1;
        }

        .client-hero-content {
          position: relative;
          z-index: 2;
        }

        .client-hero-subtitle {
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

        .benefit-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .benefit-icon {
          background-color: rgba(255, 204, 102, 0.15);
          color: var(--primary-dark);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .benefit-item h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .benefit-item p {
          font-size: 0.95rem;
          color: var(--foreground-muted);
          line-height: 1.4;
        }

        .form-block {
          width: 100%;
        }
      `}</style>
    </div>
  )
}
