'use client'

import React, { useState } from 'react'
import { useTranslation } from '../../../hooks/useTranslation'

interface Brand {
  id: string
  name: string
  logo: string
  category: string
  tagline: string
}

export default function NossasMarcasPage() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('all')

  const brands: Brand[] = [
    {
      id: 'gran-honduras',
      name: 'Gran Honduras',
      logo: '/images/site/Logo-Gran-Honduras-10-09-2018-269x300.png',
      category: 'charutos',
      tagline: 'Charutos premium hondurenhos de alta qualidade'
    },
    {
      id: 'alonso-menendez',
      name: 'Alonso Menendez',
      logo: '/images/site/Logo_Alonso-Menendez.jpg',
      category: 'charutos',
      tagline: 'Tradição e sabor inigualável em charutos'
    },
    {
      id: 'gran-caboclo',
      name: 'Gran Caboclo',
      logo: '/images/site/Gran-Caboclo-300x231.jpg',
      category: 'charutos',
      tagline: 'Charutos nacionais de excelência'
    },
    {
      id: 'siboney',
      name: 'Siboney',
      logo: '/images/site/Novo-Logo-SIBONEY-Extenso-COMPLETO-5-300x150.png',
      category: 'charutos',
      tagline: 'Charutos cubanos de longa tradição'
    },
    {
      id: 'vibe-tobacco',
      name: 'Vibe Tobacco',
      logo: '/images/site/Logo_vibe_tobacco-212x300.png',
      category: 'fumo',
      tagline: 'Fumo premium de corte fino para cigarro'
    },
    {
      id: 'raw',
      name: 'RAW Rolling Papers',
      logo: '/images/site/Logo-Raw_Rolling_Papers.png',
      category: 'papel',
      tagline: 'Papéis naturais não branqueados para cigarro'
    },
    {
      id: 'king-blunt',
      name: 'King Blunt',
      logo: '/images/site/King_Blunt_2.jpg',
      category: 'papel',
      tagline: 'Blunts e papéis especiais premium'
    },
    {
      id: 'king-paper',
      name: 'King Paper',
      logo: '/images/site/King_Paper-1024x310.jpg',
      category: 'papel',
      tagline: 'Papéis de alta performance para cigarro'
    },
    {
      id: 'clipper',
      name: 'Clipper',
      logo: '/images/site/Clipper-Logo-2.png',
      category: 'acessorios',
      tagline: 'Isqueiros e acessórios de alta durabilidade'
    },
    {
      id: 'don-paiol',
      name: 'Don Paiol',
      logo: '/images/site/Logo_Don_Paiol_Preta-300x294.png',
      category: 'acessorios',
      tagline: 'Cachimbos e acessórios artesanais brasileiros'
    },
    {
      id: 'sao-jorge',
      name: 'São Jorge',
      logo: '/images/site/Logo_Sao_Jorge-300x300.png',
      category: 'fumo',
      tagline: 'Fumo de qualidade com tradição nacional'
    },
    {
      id: 'bem-bolado',
      name: 'Bem Bolado',
      logo: '/images/site/Logo_Bem_Bolado.png',
      category: 'acessorios',
      tagline: 'Acessórios modernos para amantes do cigarro'
    },
    {
      id: 'nf',
      name: 'NF',
      logo: '/images/site/Logo_NF-300x167.png',
      category: 'papel',
      tagline: 'Papéis finos e filtros de qualidade superior'
    },
    {
      id: 'talvis',
      name: 'Talvis',
      logo: '/images/site/Logo-Talvis.png',
      category: 'acessorios',
      tagline: 'Acessórios e complementos para tabaco'
    },
    {
      id: 'volcano',
      name: 'Volcano',
      logo: '/images/site/volcano.png',
      category: 'acessorios',
      tagline: 'Vaporizadores e acessórios tecnológicos'
    },
    {
      id: 'aleda',
      name: 'Aleda Celulose',
      logo: '/images/site/aLeda_Celulose-r3x0l2smvbz8ev26mo94vswltpqwhtwtdqx2046e2g.jpg',
      category: 'papel',
      tagline: 'Papéis de celulose natural transparente'
    },
    {
      id: '4e20',
      name: '4/20 Free Time',
      logo: '/images/site/4e20_free_time-300x169.jpg',
      category: 'papel',
      tagline: 'Papéis e acessórios para consumidores modernos'
    }
  ]

  const filters = [
    { id: 'all', label: 'Todas as Marcas' },
    { id: 'charutos', label: 'Charutos' },
    { id: 'fumo', label: 'Fumo' },
    { id: 'papel', label: 'Papéis' },
    { id: 'acessorios', label: 'Acessórios' }
  ]

  const filteredBrands = activeFilter === 'all'
    ? brands
    : brands.filter(b => b.category === activeFilter)

  return (
    <div className="brands-page">
      {/* Banner */}
      <section className="brands-hero">
        <div className="brands-hero-overlay"></div>
        <div className="container brands-hero-content">
          <h1 className="title-lg text-gold italic-bold">{t('brands.title')}</h1>
          <p className="brands-hero-subtitle">{t('brands.subtitle')}</p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="filter-section section-padding">
        <div className="container">
          <div className="filter-bar">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Brand Count */}
          <p className="brand-count">
            <span className="count-number">{filteredBrands.length}</span> marcas distribuídas
          </p>

          {/* Brand Logo Grid */}
          <div className="brands-grid">
            {filteredBrands.map(brand => (
              <div key={brand.id} className="brand-card glass hover-lift">
                <div className="brand-logo-wrapper">
                  <img
                    src={brand.logo}
                    alt={`Logo ${brand.name}`}
                    className="brand-logo-img"
                  />
                </div>
                <div className="brand-info">
                  <h3 className="brand-name">{brand.name}</h3>
                  <span className="brand-category-tag">{brand.category}</span>
                  <p className="brand-tagline">{brand.tagline}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Bottom */}
          <div className="brands-cta glass">
            <h2 className="cta-title text-gold">Distribua as melhores marcas do mercado</h2>
            <p className="cta-desc">
              Abra seu cadastro de revendedor e tenha acesso a todo nosso portfólio premium com as melhores condições comerciais do Rio de Janeiro.
            </p>
            <a href="/seja-nosso-cliente" className="btn btn-primary">Seja Nosso Cliente</a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .brands-page {
          background-color: var(--background);
          color: var(--foreground);
        }

        .brands-hero {
          position: relative;
          background-image: url('/images/site/King_Blunt_2.jpg');
          background-size: cover;
          background-position: center;
          height: 300px;
          display: flex;
          align-items: center;
          color: #ffffff;
        }

        .brands-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 15, 14, 0.85);
          z-index: 1;
        }

        .brands-hero-content {
          position: relative;
          z-index: 2;
        }

        .brands-hero-subtitle {
          font-size: 1.2rem;
          color: #aca399;
          margin-top: 8px;
        }

        /* Filter */
        .filter-section {
          padding-bottom: 80px;
        }

        .filter-bar {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 16px;
        }

        .filter-btn {
          font-family: var(--font-barlow);
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 10px 24px;
          border-radius: var(--border-radius-full);
          border: 1px solid var(--surface-border);
          background: var(--surface-card);
          color: var(--foreground-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-btn:hover, .filter-btn.active {
          background: var(--primary);
          color: #0a0000;
          border-color: var(--primary);
          box-shadow: 0 4px 12px rgba(255, 204, 102, 0.3);
        }

        .brand-count {
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

        /* Brand Grid */
        .brands-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 64px;
        }

        @media (max-width: 1024px) {
          .brands-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .brands-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .brands-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Brand Card */
        .brand-card {
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

        .brand-card:hover {
          border-color: rgba(255, 204, 102, 0.4);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        .brand-logo-wrapper {
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

        .brand-logo-img {
          max-width: 100%;
          max-height: 85px;
          width: auto;
          height: auto;
          object-fit: contain;
        }

        .brand-info {
          width: 100%;
        }

        .brand-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 6px;
          letter-spacing: 0.02em;
        }

        .brand-category-tag {
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

        .brand-tagline {
          font-size: 0.82rem;
          line-height: 1.4;
          color: var(--foreground-muted);
          margin: 0;
        }

        /* Bottom CTA */
        .brands-cta {
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

        @media (max-width: 544px) {
          .brands-cta {
            padding: 32px 20px;
          }

          .cta-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}
