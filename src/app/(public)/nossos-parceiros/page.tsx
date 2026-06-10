'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '../../../hooks/useTranslation'

interface Partner {
  id: string
  name: string
  logo: string | null
  category: string
  description: string
}

const partners: Partner[] = [
  // Com logo disponível
  {
    id: 'raw',
    name: 'RAW Rolling Papers',
    logo: '/images/site/Logo-Raw_Rolling_Papers.png',
    category: 'papeis',
    description: 'Papéis naturais não branqueados, referência mundial em qualidade'
  },
  {
    id: 'alonso-menendez',
    name: 'Alonso Menendez',
    logo: '/images/site/Logo_Alonso-Menendez.jpg',
    category: 'charutos',
    description: 'Tradição e sabor inigualável em charutos premium'
  },
  {
    id: 'talvis',
    name: 'Talvis',
    logo: '/images/site/Logo-Talvis.png',
    category: 'charutos',
    description: 'Charutos e acessórios de reconhecida qualidade'
  },
  {
    id: 'bem-bolado',
    name: 'Bem Bolado',
    logo: '/images/site/Logo_Bem_Bolado.png',
    category: 'papeis',
    description: 'Papéis e acessórios modernos para o mercado tabagista'
  },
  {
    id: 'clipper',
    name: 'Clipper',
    logo: '/images/site/Clipper-Logo-2.png',
    category: 'acessorios',
    description: 'Isqueiros e acessórios reconhecidos mundialmente'
  },
  {
    id: 'aleda',
    name: 'aLeda Celulose',
    logo: '/images/site/aLeda_Celulose-r3x0l2smvbz8ev26mo94vswltpqwhtwtdqx2046e2g.jpg',
    category: 'papeis',
    description: 'Papéis de celulose natural transparente de origem brasileira'
  },
  {
    id: 'king-paper',
    name: 'King Paper',
    logo: '/images/site/King_Paper-1024x310.jpg',
    category: 'papeis',
    description: 'Papéis de alta performance para o consumidor exigente'
  },
  {
    id: 'king-blunt',
    name: 'King Blunt',
    logo: '/images/site/King_Blunt_2.jpg',
    category: 'papeis',
    description: 'Blunts e papéis especiais de referência no mercado'
  },
  {
    id: 'volcano',
    name: 'Volcano',
    logo: '/images/site/volcano.png',
    category: 'acessorios',
    description: 'Gás e acessórios de alta performance para isqueiros'
  },
  // Sem logo — cards estilizados
  {
    id: 'dannemann',
    name: 'Dannemann',
    logo: null,
    category: 'charutos',
    description: 'Tradição centenária em charutos nacionais de prestígio'
  },
  {
    id: 'dona-flor',
    name: 'Dona Flor',
    logo: null,
    category: 'charutos',
    description: 'Charutos brasileiros com charme e personalidade únicos'
  },
  {
    id: 'titan',
    name: 'Titan',
    logo: null,
    category: 'charutos',
    description: 'Charutos robustos com sabor marcante e consistente'
  },
  {
    id: 'dipalha',
    name: 'Dipalha',
    logo: null,
    category: 'palheiros',
    description: 'Palheiros de qualidade com tradição no mercado brasileiro'
  },
  {
    id: 'souza-paiol',
    name: 'Souza Paiol',
    logo: null,
    category: 'palheiros',
    description: 'Palheiros artesanais com receita e tradição consolidadas'
  },
  {
    id: 'jack-paiol',
    name: 'Jack Paiol',
    logo: null,
    category: 'palheiros',
    description: 'Palheiros com sabor autêntico para o consumidor nacional'
  },
  {
    id: 'parvathi',
    name: 'Parvathi',
    logo: null,
    category: 'fumo',
    description: 'Fumo de qualidade com blend equilibrado e refinado'
  },
  {
    id: 'hi-tobacco',
    name: 'Hi Tobacco',
    logo: null,
    category: 'fumo',
    description: 'Fumo especial voltado ao público jovem e moderno'
  },
  {
    id: 'sasso',
    name: 'Sasso',
    logo: null,
    category: 'fumo',
    description: 'Fumo tradicional com blend característico e consistente'
  },
  {
    id: 'smoking',
    name: 'Smoking',
    logo: null,
    category: 'papeis',
    description: 'Papéis de qualidade europeia com presença global'
  },
  {
    id: 'papelito',
    name: 'Papelito',
    logo: null,
    category: 'papeis',
    description: 'Papéis finos de rolagem com excelente acabamento'
  }
]

const categoryLabels: Record<string, string> = {
  all: 'Todos',
  charutos: 'Charutos',
  fumo: 'Fumo',
  papeis: 'Papéis',
  palheiros: 'Palheiros',
  acessorios: 'Acessórios'
}

export default function NossosParceirosPage() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? partners
    : partners.filter(p => p.category === activeFilter)

  return (
    <div className="partners-page">
      {/* Banner */}
      <section className="partners-hero">
        <div className="partners-hero-overlay" />
        <div className="container partners-hero-content">
          <h1 className="title-lg text-gold italic-bold">Nossos Parceiros</h1>
          <p className="partners-hero-subtitle">
            Fabricantes e fornecedores parceiros que integram nosso ecossistema comercial
          </p>
        </div>
      </section>

      {/* Intro strip */}
      <section className="intro-strip">
        <div className="container intro-inner">
          <p className="intro-text">
            Além das marcas que distribuímos com exclusividade, a LM Rocha mantém relações comerciais com{' '}
            <strong>fabricantes e fornecedores parceiros</strong> de todo o setor tabagista, garantindo um
            portfólio amplo e diversificado para nossos clientes.
          </p>
          <Link href="/nossas-marcas" className="intro-link">
            Ver Nossas Marcas exclusivas →
          </Link>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section-padding grid-section">
        <div className="container">
          {/* Filter Bar */}
          <div className="filter-bar">
            {Object.entries(categoryLabels).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className={`filter-btn ${activeFilter === id ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="partner-count">
            <span className="count-number">{filtered.length}</span> parceiros encontrados
          </p>

          {/* Partners Grid */}
          <div className="partners-grid">
            {filtered.map(partner => (
              <div key={partner.id} className="partner-card hover-lift">
                {partner.logo ? (
                  <div className="partner-logo-wrapper">
                    <img
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      className="partner-logo-img"
                    />
                  </div>
                ) : (
                  <div className="partner-initials-wrapper">
                    <span className="partner-initials">
                      {partner.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                    </span>
                  </div>
                )}
                <div className="partner-info">
                  <h3 className="partner-name">{partner.name}</h3>
                  <span className="partner-category-tag">{categoryLabels[partner.category]}</span>
                  <p className="partner-desc">{partner.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="partners-cta glass">
            <h2 className="cta-title text-gold">Quer ser nosso parceiro?</h2>
            <p className="cta-desc">
              Entre em contato e descubra como a LM Rocha pode ajudar a distribuir sua marca
              em todo o estado do Rio de Janeiro.
            </p>
            <div className="cta-actions">
              <Link href="/contato" className="btn btn-primary">Fale Conosco</Link>
              <Link href="/seja-nosso-cliente" className="btn btn-outline">Seja Nosso Cliente</Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .partners-page {
          background-color: var(--background);
          color: var(--foreground);
        }

        /* ── Hero ─────────────────────────────────────── */
        .partners-hero {
          position: relative;
          background-image: url('/images/site/WhatsApp-Image-2020-07-22-at-07.29.18.jpeg');
          background-size: cover;
          background-position: center;
          height: 300px;
          display: flex;
          align-items: center;
          color: #ffffff;
        }

        .partners-hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 8, 5, 0.88);
          z-index: 1;
        }

        .partners-hero-content {
          position: relative;
          z-index: 2;
        }

        .partners-hero-subtitle {
          font-size: 1.15rem;
          color: #aca399;
          margin-top: 10px;
          max-width: 560px;
        }

        /* ── Intro strip ──────────────────────────────── */
        .intro-strip {
          background-color: var(--surface-card);
          border-bottom: 1px solid var(--surface-border);
          padding: 28px 0;
        }

        .intro-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }

        .intro-text {
          font-size: 0.97rem;
          line-height: 1.65;
          color: var(--foreground-muted);
          max-width: 700px;
          margin: 0;
        }

        .intro-text strong {
          color: var(--foreground);
        }

        .intro-link {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--primary);
          white-space: nowrap;
          letter-spacing: 0.03em;
          transition: color var(--transition-fast);
          flex-shrink: 0;
        }

        .intro-link:hover {
          color: var(--primary-hover);
        }

        /* ── Filter ───────────────────────────────────── */
        .grid-section {
          padding-bottom: 80px;
        }

        .filter-bar {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 14px;
        }

        .filter-btn {
          font-family: var(--font-barlow);
          font-size: 0.88rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 9px 22px;
          border-radius: var(--border-radius-full);
          border: 1px solid var(--surface-border);
          background: var(--surface-card);
          color: var(--foreground-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: var(--primary);
          color: #0a0000;
          border-color: var(--primary);
          box-shadow: 0 4px 12px rgba(255, 204, 102, 0.3);
        }

        .partner-count {
          text-align: center;
          font-size: 0.95rem;
          color: var(--foreground-muted);
          margin-bottom: 48px;
        }

        .count-number {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--primary-dark);
        }

        /* ── Grid ─────────────────────────────────────── */
        .partners-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 64px;
        }

        @media (max-width: 1024px) {
          .partners-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 768px) {
          .partners-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }

        /* ── Partner Card ─────────────────────────────── */
        .partner-card {
          background: var(--surface-card);
          border: 1px solid var(--surface-border);
          border-radius: var(--border-radius-md);
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all var(--transition-smooth);
          cursor: default;
        }

        .partner-card:hover {
          border-color: rgba(255, 204, 102, 0.4);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .partner-logo-wrapper {
          width: 100%;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          background: #ffffff;
          border-radius: var(--border-radius-sm);
          padding: 12px;
        }

        .partner-logo-img {
          max-width: 100%;
          max-height: 85px;
          width: auto;
          height: auto;
          object-fit: contain;
        }

        .partner-initials-wrapper {
          width: 100%;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          background: linear-gradient(135deg, rgba(255, 204, 102, 0.12), rgba(255, 204, 102, 0.04));
          border: 1px solid rgba(255, 204, 102, 0.2);
          border-radius: var(--border-radius-sm);
        }

        .partner-initials {
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .partner-info { width: 100%; }

        .partner-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 6px;
          letter-spacing: 0.02em;
        }

        .partner-category-tag {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--primary-dark);
          background: rgba(255, 204, 102, 0.12);
          padding: 3px 10px;
          border-radius: var(--border-radius-full);
          margin-bottom: 8px;
        }

        .partner-desc {
          font-size: 0.82rem;
          line-height: 1.45;
          color: var(--foreground-muted);
          margin: 0;
        }

        /* ── Bottom CTA ───────────────────────────────── */
        .partners-cta {
          background: var(--surface-card);
          border: 1px solid var(--surface-border);
          border-radius: var(--border-radius-md);
          padding: 48px;
          text-align: center;
        }

        .cta-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .cta-desc {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--foreground-muted);
          max-width: 600px;
          margin: 0 auto 32px;
        }

        .cta-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 28px;
          border: 2px solid var(--primary);
          border-radius: var(--border-radius-full);
          color: var(--primary);
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.03em;
          text-decoration: none;
          background: transparent;
          transition: all var(--transition-smooth);
        }

        .btn-outline:hover {
          background: var(--primary);
          color: #0a0000;
        }

        @media (max-width: 544px) {
          .partners-cta { padding: 32px 20px; }
          .cta-title { font-size: 1.5rem; }
          .intro-inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  )
}
