import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Painel de Controle</h1>
        <p>Visão geral do sistema de gestão escolar</p>
      </div>

      <div className="cards-grid">
        <div className="metric-card">
          <div className="metric-info">
            <p>Total de Alunos</p>
            <h3>342</h3>
          </div>
          <div className="metric-icon icon-alunos">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <p>Cursos Ativos</p>
            <h3>12</h3>
          </div>
          <div className="metric-icon icon-cursos">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <p>Matrículas (Mês)</p>
            <h3>23</h3>
          </div>
          <div className="metric-icon icon-matriculas">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <p>Atendimentos Hoje</p>
            <h3>8</h3>
          </div>
          <div className="metric-icon icon-atendimentos">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-title-wrapper">
          <h2>Atividades Recentes</h2>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
        </div>
        
        <div className="activity-item">
          <div className="activity-details">
            <span className="activity-tag tag-matricula">Matrícula</span>
            <span className="activity-text">Ana Oliveira - Ensino Médio</span>
          </div>
          <span className="activity-time">Há 15 min</span>
        </div>

        <div className="activity-item">
          <div className="activity-details">
            <span className="activity-tag tag-mensagem">Mensagem</span>
            <span className="activity-text">João Silva enviou uma mensagem</span>
          </div>
          <span className="activity-time">Há 30 min</span>
        </div>

        <div className="activity-item">
          <div className="activity-details">
            <span className="activity-tag tag-agendamento">Agendamento</span>
            <span className="activity-text">Nova reunião com Maria Santos</span>
          </div>
          <span className="activity-time">Há 1 hora</span>
        </div>

        <div className="activity-item">
          <div className="activity-details">
            <span className="activity-tag tag-cadastro">Cadastro</span>
            <span className="activity-text">Novo aluno: Pedro Costa</span>
          </div>
          <span className="activity-time">Há 2 horas</span>
        </div>
      </div>

      <div className="section-card">
        <div className="section-title-wrapper">
          <h2>Hoje</h2>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        </div>

        <div className="agenda-list">
          <div className="agenda-item">
            <div className="agenda-info">
              <h4>Maria Santos</h4>
              <p>Reunião Pedagógica</p>
            </div>
            <span className="agenda-time">09:00</span>
          </div>

          <div className="agenda-item">
            <div className="agenda-info">
              <h4>João Silva</h4>
              <p>Atendimento Financeiro</p>
            </div>
            <span className="agenda-time">11:00</span>
          </div>

          <div className="agenda-item">
            <div className="agenda-info">
              <h4>Carlos Oliveira</h4>
              <p>Orientação Acadêmica</p>
            </div>
            <span className="agenda-time">14:00</span>
          </div>
        </div>

        <button className="btn-ver-todos" onClick={() => navigate('/agendamento')}>Ver Todos os Agendamentos</button>
      </div>

      <div className="section-card">
        <div className="section-title-wrapper">
          <h2>Cursos Mais Procurados</h2>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        </div>

        <div className="cursos-procurados-grid">
          <div className="curso-mini-card">
            <h4>Ensino Fundamental I</h4>
            <div className="progress-container">
              <div className="progress-info">
                <span>Ocupação</span>
                <span>98/120</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '81%', backgroundColor: '#4f46e5' }}></div>
              </div>
              <span style={{ fontSize: '10px', color: '#94a3b8' }}>81% ocupado</span>
            </div>
          </div>

          <div className="curso-mini-card">
            <h4>Ensino Médio</h4>
            <div className="progress-container">
              <div className="progress-info">
                <span>Ocupação</span>
                <span>75/80</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '93%', backgroundColor: '#4f46e5' }}></div>
              </div>
              <span style={{ fontSize: '10px', color: '#94a3b8' }}>93% ocupado</span>
            </div>
          </div>

          <div className="curso-mini-card">
            <h4>Ensino Fundamental II</h4>
            <div className="progress-container">
              <div className="progress-info">
                <span>Ocupação</span>
                <span>87/100</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '87%', backgroundColor: '#4f46e5' }}></div>
              </div>
              <span style={{ fontSize: '10px', color: '#94a3b8' }}>87% ocupado</span>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <button className="btn-action btn-gerenciar-alunos" onClick={() => navigate('/alunos')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
            Gerenciar Alunos
          </button>
          <button className="btn-action btn-gerenciar-cursos" onClick={() => navigate('/cursos')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            Gerenciar Cursos
          </button>
        </div>
      </div>
    </div>
  );
}