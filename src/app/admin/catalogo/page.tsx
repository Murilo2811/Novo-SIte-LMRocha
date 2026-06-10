'use client'

import React, { useState } from 'react'

export default function AdminCatalogoPage() {
  const [dataSource, setDataSource] = useState<'mock' | 'bimer'>('mock')
  const [bimerConfig, setBimerConfig] = useState({
    apiUrl: 'https://api.alterdata.com.br/bimer/v1',
    clientId: '',
    clientSecret: '',
    syncInterval: '24'
  })
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="catalogo-admin-page">
      <div className="grid grid-cols-2 gap-4">
        {/* Connection Settings */}
        <div className="admin-card glass">
          <h3 className="card-title">Fonte de Dados do Catálogo</h3>
          <p className="card-desc">
            Escolha se os produtos do catálogo serão carregados do arquivo local mockado ou integrados em tempo real com o ERP Alterdata Bimer.
          </p>

          <div className="source-selector">
            <button
              onClick={() => setDataSource('mock')}
              className={`source-btn ${dataSource === 'mock' ? 'active' : ''}`}
            >
              Mock Local (JSON)
            </button>
            <button
              onClick={() => setDataSource('bimer')}
              className={`source-btn ${dataSource === 'bimer' ? 'active' : ''}`}
            >
              Alterdata Bimer ERP API
            </button>
          </div>

          {dataSource === 'bimer' ? (
            <form onSubmit={handleSave} className="config-form">
              <div className="form-group">
                <label className="form-label">URL da API Bimer</label>
                <input
                  type="text"
                  className="form-control admin-input"
                  value={bimerConfig.apiUrl}
                  onChange={(e) => setBimerConfig({ ...bimerConfig, apiUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Client ID da API</label>
                <input
                  type="text"
                  className="form-control admin-input"
                  placeholder="Insira o Client ID fornecido pela Alterdata"
                  value={bimerConfig.clientId}
                  onChange={(e) => setBimerConfig({ ...bimerConfig, clientId: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Client Secret da API</label>
                <input
                  type="password"
                  className="form-control admin-input"
                  placeholder="••••••••••••••••"
                  value={bimerConfig.clientSecret}
                  onChange={(e) => setBimerConfig({ ...bimerConfig, clientSecret: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Intervalo de Sincronização (Horas)</label>
                <select
                  className="form-control admin-input"
                  value={bimerConfig.syncInterval}
                  onChange={(e) => setBimerConfig({ ...bimerConfig, syncInterval: e.target.value })}
                >
                  <option value="1">A cada 1 hora</option>
                  <option value="6">A cada 6 horas</option>
                  <option value="12">A cada 12 horas</option>
                  <option value="24">A cada 24 horas (Recomendado)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Salvar Configurações de Integração
              </button>

              {saved && (
                <div className="save-feedback">
                  Configurações salvas e fila de sincronização agendada!
                </div>
              )}
            </form>
          ) : (
            <div className="mock-info-box">
              <span className="info-badge">Ativo</span>
              <h4>Catálogo Mockado em Execução</h4>
              <p>
                Os produtos estão sendo lidos do arquivo <code>src/data/mock-catalog.json</code>. 
                Esta configuração é ideal para desenvolvimento e testes locais offline.
              </p>
            </div>
          )}
        </div>

        {/* Integration Status / Instructions */}
        <div className="admin-card glass">
          <h3 className="card-title">Instruções de Integração Bimer</h3>
          <div className="integration-instructions">
            <p>
              A integração com o ERP Alterdata Bimer utiliza a API RESTful do ERP para sincronizar:
            </p>
            <ul className="instruction-list">
              <li>Produtos ativos e famílias de mercadorias.</li>
              <li>Preços vigentes da tabela padrão.</li>
              <li>Imagens cadastradas no banco do ERP.</li>
              <li>Controle de estoque disponível.</li>
            </ul>

            <div className="instruction-step">
              <span className="step-num">1</span>
              <div>
                <h5>Obtenha as Credenciais</h5>
                <p>Solicite ao suporte da Alterdata as credenciais de cliente da API Bimer para o seu CNPJ.</p>
              </div>
            </div>

            <div className="instruction-step">
              <span className="step-num">2</span>
              <div>
                <h5>Habilite a Rota</h5>
                <p>Quando estiver pronto para o ambiente de produção, mude a chave de dados para &quot;Alterdata Bimer&quot; e salve.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .catalogo-admin-page {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .admin-card {
          background-color: var(--dark-surface-card);
          border: 1px solid var(--dark-surface-border);
          border-radius: var(--border-radius-md);
          padding: 32px;
          height: 100%;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: #ffffff;
        }

        .card-desc {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--dark-foreground-muted);
          margin-bottom: 24px;
        }

        .source-selector {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
        }

        .source-btn {
          flex: 1;
          font-family: var(--font-barlow);
          font-weight: 700;
          font-size: 0.9rem;
          padding: 14px 20px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          background: #0f0f0e;
          border: 1px solid var(--dark-surface-border);
          color: var(--dark-foreground-muted);
          transition: all var(--transition-fast);
        }

        .source-btn:hover, .source-btn.active {
          border-color: var(--primary);
          color: var(--primary);
          background-color: rgba(255, 204, 102, 0.05);
        }

        .admin-input {
          background-color: #0f0f0e;
          border-color: var(--dark-surface-border);
          color: #ffffff;
        }

        .admin-input:focus {
          border-color: var(--primary);
        }

        .mock-info-box {
          background-color: rgba(37, 211, 102, 0.05);
          border: 1px solid rgba(37, 211, 102, 0.2);
          border-radius: var(--border-radius-sm);
          padding: 24px;
          text-align: center;
        }

        .info-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          background-color: #25d366;
          color: #0f0f0e;
          padding: 2px 10px;
          border-radius: var(--border-radius-full);
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .mock-info-box h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: #ffffff;
        }

        .mock-info-box p {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--dark-foreground-muted);
        }

        .mock-info-box code {
          background-color: #0f0f0e;
          padding: 2px 6px;
          border-radius: 4px;
          color: var(--primary);
        }

        .save-feedback {
          background-color: rgba(37, 211, 102, 0.15);
          color: #25d366;
          padding: 12px;
          border-radius: var(--border-radius-sm);
          font-size: 0.9rem;
          font-weight: 600;
          margin-top: 16px;
          text-align: center;
          animation: fadeIn 0.3s ease-out;
        }

        /* Instructions list */
        .integration-instructions {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--dark-foreground-muted);
        }

        .instruction-list {
          list-style: square;
          padding-left: 20px;
          margin-top: 12px;
          margin-bottom: 24px;
        }

        .instruction-list li {
          margin-bottom: 8px;
        }

        .instruction-step {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-top: 24px;
        }

        .step-num {
          background-color: rgba(255, 204, 102, 0.15);
          color: var(--primary);
          border: 1px solid var(--primary);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .instruction-step h5 {
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .instruction-step p {
          font-size: 0.9rem;
          color: var(--dark-foreground-muted);
          line-height: 1.4;
        }

        @media (max-width: 921px) {
          .catalogo-admin-page > .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
