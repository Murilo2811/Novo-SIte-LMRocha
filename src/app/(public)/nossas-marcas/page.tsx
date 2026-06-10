'use client'

import React, { useState } from 'react'
import { useTranslation } from '../../../hooks/useTranslation'

interface Brand {
  id: string
  name: string
  logoText: string
  tagline: string
  features: string[]
  products: string[]
}

export default function NossasMarcasPage() {
  const { t } = useTranslation()
  const [activeBrandId, setActiveBrandId] = useState('1')
  const [activeTab, setActiveTab] = useState<'features' | 'products'>('features')

  const brands: Brand[] = [
    {
      id: '1',
      name: 'Cohiba',
      logoText: 'COHIBA',
      tagline: 'A marca cubana mais famosa do planeta.',
      features: [
        'Produzido em Cuba na lendária fábrica El Laguito',
        'Tabaco submetido a fermentação tripla para máxima sofisticação',
        'Considerada a marca de maior prestígio no mundo dos Habanos',
        'Lâminas internas selecionadas nas melhores plantações de Vuelta Abajo'
      ],
      products: [
        'Cohiba Robusto (Bitola Robusto)',
        'Cohiba Siglo II (Bitola Corona)',
        'Cohiba Lanceros (Bitola Gran Panetela)',
        'Cohiba Behike 52 (Bitola Laguito No. 4)'
      ]
    },
    {
      id: '2',
      name: 'Montecristo',
      logoText: 'MONTECRISTO',
      tagline: 'O padrão global de sabor e consistência.',
      features: [
        'Fundada em 1935, inspirada no livro O Conde de Monte Cristo',
        'Sabor inconfundível terroso de fortaleza média a forte',
        'A marca de charutos premium cubanos mais vendida do mundo',
        'Produção artesanal Totalmente a Mano com tripas longas'
      ],
      products: [
        'Montecristo No. 4 (Bitola Mareva)',
        'Montecristo No. 2 (Bitola Pirámide)',
        'Montecristo Joyitas (Bitola Laguito No. 3)',
        'Montecristo Edmundo (Bitola Robusto Extra)'
      ]
    },
    {
      id: '3',
      name: 'Smoking',
      logoText: 'SMOKING',
      tagline: 'Liderança global em papéis para cigarro.',
      features: [
        'Origem espanhola com mais de um século de história e inovação',
        'Combustão lenta certificada e goma arábica 100% natural',
        'Compromisso ecológico com papéis de reflorestamento controlado',
        'Variedade completa de espessuras, larguras e materiais (arroz, cânhamo)'
      ],
      products: [
        'Smoking Deluxe King Size (Papel ultrafino)',
        'Smoking Brown King Size (Papel não branqueado)',
        'Smoking Master (Combustão extra lenta)',
        'Smoking Organic (Papel de cânhamo 100% orgânico)'
      ]
    },
    {
      id: '4',
      name: 'Hi Tobacco',
      logoText: 'HI TOBACCO',
      tagline: 'Fumo puro e sem aditivos para uma experiência natural.',
      features: [
        'Blend premium de folhas douradas de Virginia selecionadas',
        'Livre de aditivos químicos, conservantes ou aromatizantes artificiais',
        'Corte fino ideal para confecção manual',
        'Embalagem hermética com tripla camada que mantém a umidade ideal'
      ],
      products: [
        'Hi Tobacco Golden Virginia (Suave e encorpado)',
        'Hi Tobacco Organic (Tabaco orgânico certificado)',
        'Hi Tobacco Virginia Blend (Clássico equilibrado)'
      ]
    }
  ]

  const activeBrand = brands.find(b => b.id === activeBrandId) || brands[0]

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

      {/* Interactive Tabs Section */}
      <section className="section-padding">
        <div className="container">
          <div className="brands-selector">
            {brands.map(brand => (
              <button
                key={brand.id}
                onClick={() => {
                  setActiveBrandId(brand.id)
                  setActiveTab('features')
                }}
                className={`brand-selector-btn ${activeBrandId === brand.id ? 'active' : ''}`}
              >
                {brand.name}
              </button>
            ))}
          </div>

          <div className="brand-display-card glass">
            <div className="brand-header-info">
              <div className="brand-logo-mock">{activeBrand.logoText}</div>
              <h2 className="brand-name-title text-gold">{activeBrand.name}</h2>
              <p className="brand-tagline">{activeBrand.tagline}</p>
            </div>

            <div className="brand-tab-menu">
              <button
                onClick={() => setActiveTab('features')}
                className={`brand-tab-btn ${activeTab === 'features' ? 'active' : ''}`}
              >
                {t('brands.tabs.features')}
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`brand-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
              >
                {t('brands.tabs.products')}
              </button>
            </div>

            <div className="brand-tab-content">
              {activeTab === 'features' ? (
                <ul className="brand-list">
                  {activeBrand.features.map((feat, idx) => (
                    <li key={idx} className="brand-list-item">
                      <span className="bullet">✦</span> {feat}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="brand-list">
                  {activeBrand.products.map((prod, idx) => (
                    <li key={idx} className="brand-list-item">
                      <span className="bullet">✔</span> {prod}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
          background-image: url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1470&auto=format&fit=crop'); /* Fumaça/estúdio */
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

        .brands-selector {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .brand-selector-btn {
          font-family: var(--font-barlow);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--foreground-muted);
          background: var(--surface-card);
          border: 1px solid var(--surface-border);
          padding: 12px 28px;
          border-radius: var(--border-radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .brand-selector-btn:hover, .brand-selector-btn.active {
          background: var(--primary);
          color: #0a0000;
          border-color: var(--primary);
          box-shadow: 0 4px 12px rgba(255, 204, 102, 0.3);
        }

        .brand-display-card {
          max-width: 800px;
          margin: 0 auto;
          padding: 48px;
          border-radius: var(--border-radius-md);
          background: var(--surface-card);
          border: 1px solid var(--surface-border);
        }

        @media (max-width: 544px) {
          .brand-display-card {
            padding: 24px;
          }
        }

        .brand-header-info {
          text-align: center;
          margin-bottom: 32px;
          border-bottom: 1px solid var(--surface-border);
          padding-bottom: 32px;
        }

        .brand-logo-mock {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          color: var(--foreground);
          margin-bottom: 12px;
        }

        .brand-name-title {
          font-size: 1.8rem;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .brand-tagline {
          font-size: 1.1rem;
          color: var(--foreground-muted);
          font-style: italic;
        }

        .brand-tab-menu {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-bottom: 24px;
        }

        .brand-tab-btn {
          font-family: var(--font-barlow);
          font-size: 0.95rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--foreground-muted);
          background: transparent;
          border: none;
          padding: 8px 16px;
          cursor: pointer;
          position: relative;
          transition: color var(--transition-fast);
        }

        .brand-tab-btn.active {
          color: var(--primary-dark);
        }

        .brand-tab-btn.active::after {
          content: '';
          position: absolute;
          left: 15%;
          bottom: 0;
          width: 70%;
          height: 3px;
          background-color: var(--primary);
        }

        .brand-list {
          list-style: none;
          padding: 0;
          margin: 0;
          max-width: 600px;
          margin: 0 auto;
        }

        .brand-list-item {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--foreground-muted);
          margin-bottom: 12px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .bullet {
          color: var(--primary-dark);
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}
