'use client'

import React from 'react'

export default function AdminDashboardPage() {
  const stats = [
    { title: 'Contatos Gerais', count: 18, change: '+5 esta semana', type: 'contact' },
    { title: 'Solicitações B2B', count: 12, change: '+2 esta semana', type: 'b2b' },
    { title: 'Trabalhe Conosco', count: 6, change: 'Estável', type: 'careers' },
    { title: 'Status Integração Bimer', count: 'MOCK', change: 'Aguardando credenciais API', type: 'bimer' }
  ]

  const recentActivity = [
    { name: 'Distribuidora Fumaça Carioca', type: 'Cadastro B2B', time: 'Há 2 horas', status: 'Novo' },
    { name: 'Carlos Eduardo Souza', type: 'Contato Geral', time: 'Há 5 horas', status: 'Lido' },
    { name: 'Ana Carolina Mendes', type: 'Trabalhe Conosco', time: 'Ontem', status: 'Pendente' },
    { name: 'Tabacaria Imperador RJ', type: 'Cadastro B2B', time: 'Há 2 dias', status: 'Aprovado' }
  ]

  return (
    <div className="dashboard-content">
      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-3 stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card glass">
            <span className="stat-title">{stat.title}</span>
            <div className="stat-count-row">
              <span className="stat-count">{stat.count}</span>
            </div>
            <span className="stat-change">{stat.change}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 main-grid" style={{ marginTop: '40px' }}>
        {/* Graph representation */}
        <div className="dashboard-card glass">
          <h3 className="card-title">Volume de Contatos (Últimos 6 Meses)</h3>
          <div className="chart-mock">
            <div className="bar-wrapper">
              <div className="bar" style={{ height: '40%' }}></div>
              <span className="bar-label">Jan</span>
            </div>
            <div className="bar-wrapper">
              <div className="bar" style={{ height: '60%' }}></div>
              <span className="bar-label">Fev</span>
            </div>
            <div className="bar-wrapper">
              <div className="bar" style={{ height: '50%' }}></div>
              <span className="bar-label">Mar</span>
            </div>
            <div className="bar-wrapper">
              <div className="bar" style={{ height: '80%' }}></div>
              <span className="bar-label">Abr</span>
            </div>
            <div className="bar-wrapper">
              <div className="bar" style={{ height: '95%' }}></div>
              <span className="bar-label">Mai</span>
            </div>
            <div className="bar-wrapper">
              <div className="bar-active" style={{ height: '70%' }}></div>
              <span className="bar-label active">Jun</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card glass">
          <h3 className="card-title">Atividades Recentes</h3>
          <div className="activity-list">
            {recentActivity.map((act, idx) => (
              <div key={idx} className="activity-item">
                <div className="activity-info">
                  <span className="activity-name">{act.name}</span>
                  <span className="activity-type">{act.type} • {act.time}</span>
                </div>
                <span className={`status-badge ${act.status.toLowerCase()}`}>
                  {act.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-content {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .stats-grid {
          margin-bottom: 20px;
        }

        .stat-card {
          padding: 24px;
          border-radius: var(--border-radius-md);
          background-color: var(--dark-surface-card);
          border: 1px solid var(--dark-surface-border);
          display: flex;
          flex-direction: column;
        }

        .stat-title {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--dark-foreground-muted);
          margin-bottom: 12px;
        }

        .stat-count {
          font-size: 2.2rem;
          font-weight: 700;
          color: #ffffff;
        }

        .stat-change {
          font-size: 0.8rem;
          color: var(--primary);
          margin-top: 8px;
          font-weight: 500;
        }

        .dashboard-card {
          background-color: var(--dark-surface-card);
          border: 1px solid var(--dark-surface-border);
          border-radius: var(--border-radius-md);
          padding: 32px;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 24px;
          color: #ffffff;
        }

        /* Chart Mock */
        .chart-mock {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 200px;
          padding: 10px 0;
          border-bottom: 1px solid var(--dark-surface-border);
        }

        .bar-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 12%;
        }

        .bar {
          background-color: rgba(255, 255, 255, 0.1);
          width: 100%;
          border-radius: 4px 4px 0 0;
          transition: background-color var(--transition-fast);
        }

        .bar-active {
          background-color: var(--primary);
          width: 100%;
          border-radius: 4px 4px 0 0;
          box-shadow: 0 4px 12px rgba(255, 204, 102, 0.3);
        }

        .bar-wrapper:hover .bar {
          background-color: rgba(255, 204, 102, 0.5);
        }

        .bar-label {
          font-size: 0.8rem;
          color: var(--dark-foreground-muted);
          margin-top: 8px;
        }

        .bar-label.active {
          color: var(--primary);
          font-weight: 700;
        }

        /* Activity List */
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .activity-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--dark-surface-border);
        }

        .activity-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .activity-info {
          display: flex;
          flex-direction: column;
        }

        .activity-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: #ffffff;
        }

        .activity-type {
          font-size: 0.75rem;
          color: var(--dark-foreground-muted);
        }

        .status-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: var(--border-radius-full);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-badge.novo {
          background-color: rgba(255, 204, 102, 0.15);
          color: var(--primary);
        }

        .status-badge.lido {
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--dark-foreground-muted);
        }

        .status-badge.pendente {
          background-color: rgba(255, 165, 0, 0.15);
          color: orange;
        }

        .status-badge.aprovado {
          background-color: rgba(37, 211, 102, 0.15);
          color: #25d366;
        }

        @media (max-width: 921px) {
          .main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
