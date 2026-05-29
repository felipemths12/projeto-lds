import { useState, useEffect } from 'react';
import { Users, BookOpen, UserPlus, MessageSquare, TrendingUp, Calendar, UsersIcon, BookMarked } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { api } from '../services/api';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState({
    alunos: 0,
    cursos: 0,
    matriculas: 0,
    atendimentos: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [alunosRes, cursosRes, matriculasRes, atendimentosRes] = await Promise.all([
          api.get('/alunos').catch(() => []),
          api.get('/cursos').catch(() => []),
          api.get('/matriculas').catch(() => []),
          api.get('/atendimentos').catch(() => [])
        ]);
        
        setStats({
          alunos: alunosRes ? alunosRes.length : 0,
          cursos: cursosRes ? cursosRes.length : 0,
          matriculas: matriculasRes ? matriculasRes.length : 0,
          atendimentos: atendimentosRes ? atendimentosRes.length : 0
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <PageLayout 
      title="Painel de Controle" 
      subtitle="Visão geral do sistema de gestão escolar"
    >
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-info">
            <h3>Total de Alunos</h3>
            <div className="stat-value">{stats.alunos}</div>
          </div>
          <div className="stat-icon blue">
            <Users size={20} />
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h3>Cursos Ativos</h3>
            <div className="stat-value">{stats.cursos}</div>
          </div>
          <div className="stat-icon purple">
            <BookOpen size={20} />
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h3>Matrículas Totais</h3>
            <div className="stat-value">{stats.matriculas}</div>
          </div>
          <div className="stat-icon green">
            <UserPlus size={20} />
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h3>Atendimentos Totais</h3>
            <div className="stat-value">{stats.atendimentos}</div>
          </div>
          <div className="stat-icon dark">
            <MessageSquare size={20} />
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-main">
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Atividades Recentes</h2>
              <button className="section-action"><TrendingUp size={18} /></button>
            </div>
            
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-content">
                  <div className="activity-dot dot-green"></div>
                  <div className="activity-details">
                    <h4 className="text-green">Matrícula</h4>
                    <p>Ana Oliveira - Ensino Médio</p>
                  </div>
                </div>
                <span className="activity-time">Há 15 min</span>
              </div>
              
              <div className="activity-item">
                <div className="activity-content">
                  <div className="activity-dot dot-blue"></div>
                  <div className="activity-details">
                    <h4 className="text-blue">Mensagem</h4>
                    <p>João Silva enviou uma mensagem</p>
                  </div>
                </div>
                <span className="activity-time">Há 30 min</span>
              </div>
              
              <div className="activity-item">
                <div className="activity-content">
                  <div className="activity-dot dot-purple"></div>
                  <div className="activity-details">
                    <h4 className="text-purple">Agendamento</h4>
                    <p>Nova reunião com Maria Santos</p>
                  </div>
                </div>
                <span className="activity-time">Há 1 hora</span>
              </div>
              
              <div className="activity-item">
                <div className="activity-content">
                  <div className="activity-dot dot-gray"></div>
                  <div className="activity-details">
                    <h4 className="text-gray">Cadastro</h4>
                    <p>Novo aluno: Pedro Costa</p>
                  </div>
                </div>
                <span className="activity-time">Há 2 horas</span>
              </div>
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-header">
              <h2>Cursos Mais Procurados</h2>
              <button className="section-action"><BookOpen size={18} /></button>
            </div>
            
            <div className="courses-carousel">
              <div className="course-card-mini">
                <h4>Ensino Fundamental I</h4>
                <div className="course-stats">
                  <span>Ocupação</span>
                  <span>98/120</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '82%' }}></div>
                </div>
                <div className="course-occupancy">82% ocupado</div>
              </div>
              
              <div className="course-card-mini">
                <h4>Ensino Médio</h4>
                <div className="course-stats">
                  <span>Ocupação</span>
                  <span>75/80</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '94%' }}></div>
                </div>
                <div className="course-occupancy">94% ocupado</div>
              </div>
              
              <div className="course-card-mini">
                <h4>Ensino Fundamental II</h4>
                <div className="course-stats">
                  <span>Ocupação</span>
                  <span>87/100</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '87%' }}></div>
                </div>
                <div className="course-occupancy">87% ocupado</div>
              </div>
            </div>
          </section>
        </div>

        <div className="dashboard-sidebar">
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Hoje</h2>
              <button className="section-action"><Calendar size={18} /></button>
            </div>
            
            <div className="schedule-list">
              <div className="schedule-item">
                <div className="schedule-info">
                  <h4>Maria Santos</h4>
                  <p>Reunião Pedagógica</p>
                </div>
                <div className="schedule-time">09:00</div>
              </div>
              
              <div className="schedule-item">
                <div className="schedule-info">
                  <h4>João Silva</h4>
                  <p>Atendimento Financeiro</p>
                </div>
                <div className="schedule-time">11:00</div>
              </div>
              
              <div className="schedule-item">
                <div className="schedule-info">
                  <h4>Carlos Oliveira</h4>
                  <p>Orientação Acadêmica</p>
                </div>
                <div className="schedule-time">14:00</div>
              </div>
            </div>
            
            <button className="btn-secondary">Ver Todos os Agendamentos</button>
          </section>
        </div>
      </div>

      <div className="dashboard-actions">
        <button className="btn-action btn-blue">
          <UsersIcon size={20} /> Gerenciar Alunos
        </button>
        <button className="btn-action btn-purple">
          <BookMarked size={20} /> Gerenciar Cursos
        </button>
      </div>
    </PageLayout>
  );
}
