'use client'

import React from 'react'
import { useTranslation } from '../../../hooks/useTranslation'
import ContactForm from '../../../components/sections/ContactForm'

export default function ContatoPage() {
  const { t } = useTranslation()

  return (
    <div className="contact-page">
      {/* Banner */}
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <div className="container contact-hero-content">
          <h1 className="title-lg text-gold italic-bold">{t('nav.contact')}</h1>
          <p className="contact-hero-subtitle">Entre em contato direto com a LM Rocha Distribuidora</p>
        </div>
      </section>

      {/* Main Section */}
      <section className="section-padding">
        <div className="container contact-grid">
          
          {/* Left: Contact Info and Map */}
          <div className="contact-info-block">
            <h2 className="title-md font-bold text-gold">Canais de Atendimento</h2>
            <p className="contact-intro-desc">
              Estamos disponíveis para atendê-lo através dos nossos contatos operacionais ou visite nossa sede comercial.
            </p>

            <div className="info-cards">
              <div className="info-detail-card glass">
                <h4>Endereço Operacional</h4>
                <p>{t('footer.address')}</p>
              </div>

              <div className="info-detail-card glass">
                <h4>Contatos Rápidos</h4>
                <p>
                  <strong>Telefone:</strong> <a href="tel:5521969560379">{t('footer.phone')}</a>
                  <br />
                  <strong>E-mail:</strong> <a href={`mailto:${t('footer.email')}`}>{t('footer.email')}</a>
                </p>
              </div>

              <div className="info-detail-card glass">
                <h4>Horário de Funcionamento</h4>
                <p>Segunda a Sexta-feira: das 08:00 às 18:00</p>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="map-wrapper glass">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.003923053702!2d-43.20815192381273!3d-22.801648033783777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997970d4f3b145%3A0xe6bf44cc79979fb!2sEstr.%20do%20Gale%C3%A3o%2C%202730%20-%20Ilha%20do%20Governador%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2021931-382!5e0!3m2!1spt-BR!2sbr!4v1717904000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="320"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa LM Rocha"
              ></iframe>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="form-block">
            <h2 className="title-md font-bold text-gold" style={{ marginBottom: '24px' }}>Envie uma Mensagem</h2>
            <ContactForm formType="contact" />
          </div>

        </div>
      </section>

      <style jsx>{`
        .contact-page {
          background-color: var(--background);
          color: var(--foreground);
        }

        .contact-hero {
          position: relative;
          background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop'); /* Escritório */
          background-size: cover;
          background-position: center;
          height: 300px;
          display: flex;
          align-items: center;
          color: #ffffff;
        }

        .contact-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 15, 14, 0.85);
          z-index: 1;
        }

        .contact-hero-content {
          position: relative;
          z-index: 2;
        }

        .contact-hero-subtitle {
          font-size: 1.2rem;
          color: #aca399;
          margin-top: 8px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: start;
        }

        @media (max-width: 921px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .contact-intro-desc {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--foreground-muted);
          margin-top: 16px;
          margin-bottom: 32px;
        }

        .info-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .info-detail-card {
          padding: 20px;
          border-radius: var(--border-radius-sm);
          background-color: var(--surface-card);
          border: 1px solid var(--surface-border);
        }

        .info-detail-card h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--primary-dark);
        }

        .info-detail-card p {
          font-size: 0.95rem;
          color: var(--foreground-muted);
          line-height: 1.5;
        }

        .info-detail-card a {
          color: var(--foreground-muted);
          text-decoration: underline;
        }

        .info-detail-card a:hover {
          color: var(--primary-dark);
        }

        .map-wrapper {
          border-radius: var(--border-radius-md);
          overflow: hidden;
          background-color: var(--surface-card);
          border: 1px solid var(--surface-border);
          padding: 8px;
        }

        .form-block {
          width: 100%;
        }
      `}</style>
    </div>
  )
}
