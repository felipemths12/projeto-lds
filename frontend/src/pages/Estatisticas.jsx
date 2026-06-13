import { useState, useEffect } from 'react';
import './Estatisticas.css';
import api from '../services/api';

export default function Estatisticas() {
  const [estatisticas, setEstatisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  const carregarEstatisticas = async () => {
    try {
      setLoading(true);
      const resposta = await api.get('/estatisticas');
      setEstatisticas(resposta.data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      setErro('Não foi possível carregar as estatísticas. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="estatisticas-container" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h2 style={{ color: '#64748b' }}>Carregando dados do banco...</h2>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="estatisticas-container">
        <div style={{ padding: '20px', backgroundColor: '#fee2e2', color: '#ef4444', borderRadius: '8px' }}>
          {erro}
        </div>
      </div>
    );
  }

  if (!estatisticas) return null;

  return (
    <div className="estatisticas-container">
      <div className="estatisticas-header">
        <h1>Painel de Estatísticas</h1>
        <p>Visão geral e métricas em tempo real do banco de dados</p>
      </div>

      <div className="estatisticas-grid">
        {/* Card Alunos */}
        <div className="estat-card card-alunos">
          <div className="estat-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className="estat-title">Total de Alunos</div>
          <div className="estat-value">{estatisticas.totalAlunos}</div>
          <div className="estat-details">
            <div className="detail-row">
              <span className="detail-label"><span className="status-dot dot-blue"></span>Cadastros Únicos</span>
              <span className="detail-value">{estatisticas.totalAlunos}</span>
            </div>
          </div>
        </div>

        {/* Card Cursos */}
        <div className="estat-card card-cursos">
          <div className="estat-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          </div>
          <div className="estat-title">Cursos Ofertados</div>
          <div className="estat-value">{estatisticas.totalCursos}</div>
          <div className="estat-details">
            <div className="detail-row">
              <span className="detail-label"><span className="status-dot dot-green"></span>Ativos</span>
              <span className="detail-value">{estatisticas.cursosAtivos}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><span className="status-dot dot-red"></span>Inativos</span>
              <span className="detail-value">{estatisticas.cursosInativos}</span>
            </div>
          </div>
        </div>

        {/* Card Turmas */}
        <div className="estat-card card-turmas">
          <div className="estat-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className="estat-title">Turmas Criadas</div>
          <div className="estat-value">{estatisticas.totalTurmas}</div>
          <div className="estat-details">
            <div className="detail-row">
              <span className="detail-label"><span className="status-dot dot-yellow"></span>Vagas Disponíveis</span>
              <span className="detail-value">{estatisticas.vagasDisponiveis}</span>
            </div>
          </div>
        </div>

        {/* Card Matriculas */}
        <div className="estat-card card-matriculas">
          <div className="estat-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div className="estat-title">Matrículas Totais</div>
          <div className="estat-value">{estatisticas.totalMatriculas}</div>
          <div className="estat-details">
            <div className="detail-row">
              <span className="detail-label"><span className="status-dot dot-green"></span>Ativas</span>
              <span className="detail-value" style={{ color: '#10b981' }}>{estatisticas.matriculasAtivas}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><span className="status-dot dot-yellow"></span>Pendentes</span>
              <span className="detail-value" style={{ color: '#f59e0b' }}>{estatisticas.matriculasPendentes}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><span className="status-dot dot-red"></span>Inativas</span>
              <span className="detail-value" style={{ color: '#ef4444' }}>{estatisticas.matriculasInativas}</span>
            </div>
          </div>
        </div>

        {/* Card Funcionários */}
        <div className="estat-card card-funcionarios">
          <div className="estat-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
          </div>
          <div className="estat-title">Funcionários</div>
          <div className="estat-value">{estatisticas.totalFuncionarios}</div>
          <div className="estat-details">
            <div className="detail-row">
              <span className="detail-label"><span className="status-dot dot-purple"></span>Professores</span>
              <span className="detail-value">{estatisticas.totalProfessores}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><span className="status-dot dot-purple"></span>Admins/Atendentes</span>
              <span className="detail-value">{estatisticas.totalFuncionarios - estatisticas.totalProfessores}</span>
            </div>
          </div>
        </div>

        {/* Card Atendimentos */}
        <div className="estat-card card-atendimentos">
          <div className="estat-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          </div>
          <div className="estat-title">Atendimentos Gerais</div>
          <div className="estat-value">{estatisticas.totalAtendimentos}</div>
          <div className="estat-details">
            <div className="detail-row">
              <span className="detail-label"><span className="status-dot dot-yellow"></span>Em Aberto</span>
              <span className="detail-value" style={{ color: '#f59e0b' }}>{estatisticas.atendimentosAbertos}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><span className="status-dot dot-green"></span>Finalizados/Outros</span>
              <span className="detail-value">{estatisticas.totalAtendimentos - estatisticas.atendimentosAbertos}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
