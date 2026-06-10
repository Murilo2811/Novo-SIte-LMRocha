'use client'

import React, { useState } from 'react'

interface Lead {
  id: string
  name: string
  type: 'contact' | 'client' | 'careers'
  details: Record<string, string>
  date: string
  message: string
}

export default function AdminContatosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  // Dados fictícios de alta fidelidade
  const initialLeads: Lead[] = [
    {
      id: '1',
      name: 'Distribuidora Fumaça Carioca',
      type: 'client',
      date: '2026-06-09 20:30',
      message: 'Olá, temos 5 lojas de conveniência no Rio de Janeiro e gostaríamos de comprar charutos Cohiba e isqueiros Clipper em grande escala. Aguardo retorno comercial.',
      details: {
        'Razão Social': 'Fumaça Carioca Ltda',
        'CNPJ': '12.345.678/0001-99',
        'Contato': 'Thiago Alencar',
        'Telefone': '(21) 98888-7777',
        'E-mail': 'compras@fumacacarioca.com.br',
        'Cidade/Estado': 'Rio de Janeiro - RJ'
      }
    },
    {
      id: '2',
      name: 'Carlos Eduardo Souza',
      type: 'contact',
      date: '2026-06-09 17:15',
      message: 'Olá, gostaria de saber se vocês fazem entregas de mostruários para tabacarias na região serrana (Petrópolis).',
      details: {
        'Telefone': '(24) 99999-8888',
        'Assunto': 'Dúvida sobre Logística',
        'E-mail': 'carlosedu@gmail.com'
      }
    },
    {
      id: '3',
      name: 'Ana Carolina Mendes',
      type: 'careers',
      date: '2026-06-08 11:20',
      message: 'Sou formada em logística com 3 anos de experiência em roteirização de frotas. Gostaria de me candidatar para a vaga de supervisora.',
      details: {
        'E-mail': 'carol.mendes@hotmail.com',
        'Telefone': '(21) 97777-6666',
        'Cargo de Interesse': 'Logística / Supervisão'
      }
    },
    {
      id: '4',
      name: 'Tabacaria Imperador RJ',
      type: 'client',
      date: '2026-06-07 14:05',
      message: 'Gostaríamos de agendar a visita de um promotor de vendas LM Rocha para apresentar o portfólio Smoking e Hi Tobacco.',
      details: {
        'Razão Social': 'Tabacaria Imperador do Galeão Ltda',
        'CNPJ': '98.765.432/0001-11',
        'Contato': 'Augusto César',
        'Telefone': '(21) 96666-5555',
        'E-mail': 'imperador.rj@gmail.com',
        'Cidade/Estado': 'Rio de Janeiro - RJ'
      }
    }
  ]

  const getBadgeClass = (type: string) => {
    switch (type) {
      case 'client': return 'badge-client'
      case 'contact': return 'badge-contact'
      case 'careers': return 'badge-careers'
      default: return ''
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'client': return 'Cadastro Revendedor'
      case 'contact': return 'Contato Geral'
      case 'careers': return 'Trabalhe Conosco'
      default: return type
    }
  }

  const filteredLeads = initialLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || lead.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="contatos-page">
      {/* Search and Filters */}
      <div className="filter-bar glass">
        <input
          type="text"
          placeholder="Buscar nos contatos..."
          className="form-control search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select 
          className="form-control select-input"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Todos os Formulários</option>
          <option value="contact">Contato Geral</option>
          <option value="client">Cadastro Revendedor (B2B)</option>
          <option value="careers">Trabalhe Conosco</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-wrapper glass">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nome / Empresa</th>
              <th>Tipo de Lead</th>
              <th>Data de Recebimento</th>
              <th>Prévia da Mensagem</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map(lead => (
              <tr key={lead.id} className="table-row">
                <td className="font-bold">{lead.name}</td>
                <td>
                  <span className={`badge ${getBadgeClass(lead.type)}`}>
                    {getTypeText(lead.type)}
                  </span>
                </td>
                <td>{lead.date}</td>
                <td className="message-preview">{lead.message}</td>
                <td>
                  <button 
                    onClick={() => setSelectedLead(lead)} 
                    className="btn-action-view"
                  >
                    Visualizar
                  </button>
                </td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4">Nenhum registro encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="modal-overlay">
          <div className="modal-card glass">
            <div className="modal-header">
              <h3 className="text-gold">Detalhes do Lead</h3>
              <button onClick={() => setSelectedLead(null)} className="close-btn">×</button>
            </div>
            
            <div className="modal-body">
              <div className="modal-section">
                <h4>Informações de Contato</h4>
                <div className="details-grid">
                  {Object.entries(selectedLead.details).map(([key, val]) => (
                    <div key={key} className="detail-item">
                      <span className="detail-label">{key}:</span>
                      <span className="detail-val">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-section" style={{ marginTop: '24px' }}>
                <h4>Mensagem Enviada</h4>
                <p className="modal-message-box">{selectedLead.message}</p>
              </div>
            </div>

            <div className="modal-footer">
              {/* Contato direto no WhatsApp usando o telefone do lead */}
              {selectedLead.details['Telefone'] && (
                <a
                  href={`https://api.whatsapp.com/send?phone=55${selectedLead.details['Telefone'].replace(/[^\d]/g, '')}&text=Olá! Sou da LM Rocha e recebi sua solicitação no site.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ textTransform: 'none', padding: '10px 20px', fontSize: '0.9rem' }}
                >
                  Responder via WhatsApp
                </a>
              )}
              <button onClick={() => setSelectedLead(null)} className="btn btn-secondary" style={{ textTransform: 'none', padding: '10px 20px', fontSize: '0.9rem' }}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .contatos-page {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .filter-bar {
          display: flex;
          gap: 16px;
          padding: 20px;
          border-radius: var(--border-radius-sm);
          background-color: var(--dark-surface-card);
          border: 1px solid var(--dark-surface-border);
          margin-bottom: 24px;
        }

        .search-input {
          flex-grow: 1;
          background-color: #0f0f0e;
          border-color: var(--dark-surface-border);
        }

        .select-input {
          width: 240px;
          background-color: #0f0f0e;
          border-color: var(--dark-surface-border);
        }

        @media (max-width: 544px) {
          .filter-bar {
            flex-direction: column;
          }
          .select-input {
            width: 100%;
          }
        }

        .table-wrapper {
          border-radius: var(--border-radius-md);
          background-color: var(--dark-surface-card);
          border: 1px solid var(--dark-surface-border);
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.95rem;
        }

        .admin-table th {
          padding: 16px 24px;
          border-bottom: 1px solid var(--dark-surface-border);
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
        }

        .admin-table td {
          padding: 16px 24px;
          border-bottom: 1px solid var(--dark-surface-border);
          color: var(--dark-foreground);
        }

        .table-row:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }

        .message-preview {
          max-width: 300px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--dark-foreground-muted) !important;
        }

        .font-bold {
          font-weight: 700;
        }

        /* Badges */
        .badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--border-radius-full);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .badge-client {
          background-color: rgba(255, 204, 102, 0.15);
          color: var(--primary);
        }

        .badge-contact {
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--dark-foreground-muted);
        }

        .badge-careers {
          background-color: rgba(255, 165, 0, 0.15);
          color: orange;
        }

        .btn-action-view {
          background-color: transparent;
          border: 1px solid var(--primary);
          color: var(--primary);
          padding: 6px 16px;
          border-radius: var(--border-radius-full);
          cursor: pointer;
          font-family: var(--font-barlow);
          font-weight: 600;
          font-size: 0.85rem;
          transition: all var(--transition-fast);
        }

        .btn-action-view:hover {
          background-color: var(--primary);
          color: #0f0f0e;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 24px;
        }

        .modal-card {
          max-width: 600px;
          width: 100%;
          background-color: var(--dark-surface-card);
          border: 1px solid var(--dark-surface-border);
          border-radius: var(--border-radius-md);
          padding: 32px;
          color: #ffffff;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--dark-surface-border);
          padding-bottom: 16px;
        }

        .modal-header h3 {
          font-size: 1.4rem;
          margin: 0;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: var(--dark-foreground-muted);
          font-size: 2rem;
          cursor: pointer;
          line-height: 1;
        }

        .close-btn:hover {
          color: #ffffff;
        }

        .modal-section h4 {
          font-size: 0.95rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--dark-foreground-muted);
          margin-bottom: 12px;
          letter-spacing: 0.05em;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 544px) {
          .details-grid {
            grid-template-columns: 1fr;
          }
        }

        .detail-item {
          display: flex;
          flex-direction: column;
        }

        .detail-label {
          font-size: 0.8rem;
          color: var(--dark-foreground-muted);
          font-weight: 600;
        }

        .detail-val {
          font-size: 0.95rem;
          color: #ffffff;
          margin-top: 2px;
        }

        .modal-message-box {
          background-color: #0f0f0e;
          border: 1px solid var(--dark-surface-border);
          border-radius: var(--border-radius-sm);
          padding: 16px;
          font-size: 0.95rem;
          line-height: 1.6;
          color: #aca399;
        }

        .modal-footer {
          margin-top: 32px;
          border-top: 1px solid var(--dark-surface-border);
          padding-top: 20px;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
      `}</style>
    </div>
  )
}
