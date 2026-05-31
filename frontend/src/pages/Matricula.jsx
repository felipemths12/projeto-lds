import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Matricula.css';

export default function Matricula() {
  const navigate = useNavigate();
  
  const [etapa, setEtapa] = useState(1);
  const [termoBusca, setTermoBusca] = useState('');
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  const listaAlunos = [
    { id: 1, nome: "João Silva", cpf: "123.456.789-00" },
    { id: 2, nome: "Maria Santos", cpf: "987.654.321-00" },
    { id: 3, nome: "Pedro Costa", cpf: "456.789.123-00" },
    { id: 4, nome: "Ana Oliveira", cpf: "321.654.987-00" }
  ];

  const listaCursos = [
    { id: 1, nome: "Ensino Fundamental I", turno: "Manhã", valor: "850,00", vagasDisponiveis: 22 },
    { id: 2, nome: "Ensino Fundamental II", turno: "Manhã", valor: "950,00", vagasDisponiveis: 0 },
    { id: 3, nome: "Ensino Médio", turno: "Tarde", valor: "1.200,00", vagasDisponiveis: 5 },
    { id: 4, nome: "Bilingue - Kids", turno: "Tarde", valor: "600,00", vagasDisponiveis: 20 },
    { id: 5, nome: "Robótica Aplicada", turno: "Tarde", valor: "450,00", vagasDisponiveis: 15 },
    { id: 6, nome: "Pré-Vestibular", turno: "Manhã", valor: "1.500,00", vagasDisponiveis: 40 }
  ];

  const alunosFiltrados = listaAlunos.filter(aluno => 
    aluno.nome.toLowerCase().includes(termoBusca.toLowerCase()) || 
    aluno.cpf.includes(termoBusca)
  );

  const finalizarMatricula = () => {
    setEtapa(4);
  };

  const resetarMatricula = () => {
    setEtapa(1);
    setAlunoSelecionado(null);
    setCursoSelecionado(null);
    setTermoBusca('');
  };

  return (
    <div className="matricula-container">
      <div className="matricula-header">
        <h1>Sistema de Matrícula</h1>
        <p>Processo de matrícula de novos alunos</p>
      </div>

      <div className="matricula-section">
        <div className="stepper-container">
          <div className="stepper-line"></div>
          <div className={`step ${etapa >= 1 ? 'active' : ''}`}>
            <div className="step-circle">1</div>
            <span className="step-label">Selecionar Aluno</span>
          </div>
          <div className={`step ${etapa >= 2 ? 'active' : ''}`}>
            <div className="step-circle">2</div>
            <span className="step-label">Selecionar Curso</span>
          </div>
          <div className={`step ${etapa >= 3 ? 'active' : ''}`}>
            <div className="step-circle">3</div>
            <span className="step-label">Confirmar</span>
          </div>
        </div>

        {etapa === 1 && (
          <div className="etapa-content">
            <h3>Selecione o Aluno</h3>
            <div style={{ position: 'relative' }}>
              <svg style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                className="search-aluno-input" 
                placeholder="Buscar aluno por nome ou CPF..." 
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
              />
            </div>

            {alunosFiltrados.map(aluno => (
              <div 
                key={aluno.id}
                className="aluno-select-card"
                style={{ borderColor: alunoSelecionado === aluno.id ? '#4f46e5' : '#e2e8f0', borderWidth: alunoSelecionado === aluno.id ? '2px' : '1px' }}
                onClick={() => setAlunoSelecionado(aluno.id)}
              >
                <div className="icon-wrapper icon-aluno">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <div className="m-info-main">{aluno.nome}</div>
                  <div className="m-info-sub">{aluno.cpf}</div>
                </div>
              </div>
            ))}

            <button 
              className="btn-proximo" 
              style={{ backgroundColor: alunoSelecionado ? '#4f46e5' : '#e2e8f0', color: alunoSelecionado ? 'white' : '#64748b' }}
              disabled={!alunoSelecionado}
              onClick={() => setEtapa(2)}
            >
              Próximo Passo
            </button>
          </div>
        )}

        {etapa === 2 && (
          <div className="etapa-content">
            <h3>Selecione o Curso Desejado</h3>
            
            {listaCursos.map(curso => {
              const isLotado = curso.vagasDisponiveis === 0;
              
              return (
                <div 
                  key={curso.id}
                  className="aluno-select-card"
                  style={{ 
                    borderColor: cursoSelecionado === curso.id ? '#4f46e5' : '#e2e8f0', 
                    borderWidth: cursoSelecionado === curso.id ? '2px' : '1px',
                    opacity: isLotado ? 0.6 : 1,
                    cursor: isLotado ? 'not-allowed' : 'pointer'
                  }}
                  onClick={() => {
                    if (!isLotado) setCursoSelecionado(curso.id);
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', gap: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div className="icon-wrapper icon-curso">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="m-info-main">{curso.nome}</div>
                        <div className="m-info-sub">Turno: {curso.turno} • Mensalidade: R$ {curso.valor}</div>
                      </div>
                    </div>
                    
                    {isLotado ? (
                      <span className="badge-esgotado">Turma Lotada</span>
                    ) : (
                      <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600', whiteSpace: 'nowrap' }}>
                        {curso.vagasDisponiveis} vagas
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button 
                className="btn-proximo" 
                style={{ backgroundColor: 'white', border: '1px solid #cbd5e1', color: '#475569', marginTop: 0 }}
                onClick={() => setEtapa(1)}
              >
                Voltar
              </button>
              <button 
                className="btn-proximo" 
                style={{ backgroundColor: cursoSelecionado ? '#4f46e5' : '#e2e8f0', color: cursoSelecionado ? 'white' : '#64748b', marginTop: 0 }}
                disabled={!cursoSelecionado}
                onClick={() => setEtapa(3)}
              >
                Próximo Passo
              </button>
            </div>
          </div>
        )}

        {etapa === 3 && (
          <div className="etapa-content">
            <h3>Confirme os Dados da Matrícula</h3>
            
            <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', marginBottom: '20px' }}>
              <p style={{ margin: '0 0 10px 0' }}><strong>Aluno:</strong> {listaAlunos.find(a => a.id === alunoSelecionado)?.nome}</p>
              <p style={{ margin: '0 0 10px 0' }}><strong>CPF:</strong> {listaAlunos.find(a => a.id === alunoSelecionado)?.cpf}</p>
              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '15px 0' }} />
              <p style={{ margin: '0 0 10px 0' }}><strong>Curso:</strong> {listaCursos.find(c => c.id === cursoSelecionado)?.nome}</p>
              <p style={{ margin: '0 0 0 0' }}><strong>Turno:</strong> {listaCursos.find(c => c.id === cursoSelecionado)?.turno}</p>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button 
                className="btn-proximo" 
                style={{ backgroundColor: 'white', border: '1px solid #cbd5e1', color: '#475569', marginTop: 0 }}
                onClick={() => setEtapa(2)}
              >
                Voltar
              </button>
              <button 
                className="btn-proximo" 
                style={{ backgroundColor: '#10b981', color: 'white', marginTop: 0 }}
                onClick={finalizarMatricula}
              >
                Confirmar Matrícula
              </button>
            </div>
          </div>
        )}

        {etapa === 4 && (
          <div className="etapa-content" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ 
              width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#dcfce7', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' 
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            
            <h2 style={{ color: '#1e293b', marginBottom: '10px' }}>Matrícula Concluída!</h2>
            <p style={{ color: '#64748b', marginBottom: '30px' }}>O aluno foi matriculado com sucesso no sistema e já está vinculado ao curso.</p>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button 
                className="btn-proximo" 
                style={{ backgroundColor: 'white', border: '1px solid #cbd5e1', color: '#475569', marginTop: 0, maxWidth: '200px' }}
                onClick={resetarMatricula}
              >
                Nova Matrícula
              </button>
              <button 
                className="btn-proximo" 
                style={{ backgroundColor: '#4f46e5', color: 'white', marginTop: 0, maxWidth: '200px' }}
                onClick={() => navigate('/')}
              >
                Ir para o Painel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="matricula-section">
        <h3>Matrículas Recentes</h3>
        
        <div className="matricula-recent-item">
          <div>
            <div className="m-info-main">Ana Oliveira</div>
            <div className="m-info-sub">
              <span>Ensino Médio</span>
              <span>• 02/05/2026</span>
            </div>
            <span className="status-badge-m badge-aprovada">Aprovada</span>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>

        <div className="matricula-recent-item">
          <div>
            <div className="m-info-main">Carlos Silva</div>
            <div className="m-info-sub">
              <span>Ensino Fundamental II</span>
              <span>• 01/05/2026</span>
            </div>
            <span className="status-badge-m badge-pendente">Pendente</span>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </div>
      </div>

      <div className="stats-box">
        <h3>Estatísticas do Mês</h3>
        <div className="stat-row">
          <span>Novas Matrículas</span>
          <span className="stat-value">23</span>
        </div>
        <div className="stat-row">
          <span>Taxa de Aprovação</span>
          <span className="stat-value">95%</span>
        </div>
        <div className="stat-row">
          <span>Em Análise</span>
          <span className="stat-value">5</span>
        </div>
      </div>
    </div>
  );
}