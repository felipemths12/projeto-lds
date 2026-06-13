import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Matricula.css';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Matricula() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  const ehAluno = usuario?.tipo === 'ALUNO';

  const [etapa, setEtapa] = useState(ehAluno ? 2 : 1);
  const [termoBusca, setTermoBusca] = useState('');
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(ehAluno ? usuario?.dados?.codigo_aluno : null);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  // Subtítulo contextual
  const subtitulo = ehAluno
    ? 'Solicite sua matrícula em uma turma'
    : 'Processo de matrícula de novos alunos';

  useEffect(() => {
    async function carregarDados() {
      setLoading(true);
      setErro('');
      try {
        if (ehAluno) {
          // Aluno só precisa da lista de turmas
          const respostaTurmas = await api.get('/turmas');
          setTurmas(respostaTurmas.data || []);
        } else {
          const [respostaAlunos, respostaTurmas] = await Promise.all([
            api.get('/alunos'),
            api.get('/turmas')
          ]);
          setAlunos(respostaAlunos.data || []);
          setTurmas(respostaTurmas.data || []);
        }
      } catch (error) {
        setErro('Não foi possível carregar os dados de matrícula.');
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [ehAluno]);

  const alunosFiltrados = alunos.filter((aluno) => {
    const termo = termoBusca.toLowerCase();
    return (
      String(aluno.nome || '').toLowerCase().includes(termo) ||
      String(aluno.cpf || '').includes(termo)
    );
  });

  async function confirmarMatricula() {
    try {
      await api.post('/matriculas', {
        codigo_aluno: alunoSelecionado,
        codigo_turma: turmaSelecionada
      });
      setEtapa(4);
    } catch (error) {
      const mensagemErro = error?.response?.data?.message || 'Não foi possível concluir a matrícula.';
      alert(mensagemErro);
    }
  }

  function resetarMatricula() {
    setEtapa(ehAluno ? 2 : 1);
    if (!ehAluno) {
      setAlunoSelecionado(null);
    }
    setTurmaSelecionada(null);
    setTermoBusca('');
  }

  const podeMatricular = ehAluno || (usuario && usuario.tipo === 'FUNCIONARIO' && ['ADMIN', 'ATENDENTE', 'PROFESSOR'].includes(usuario.cargo));

  // Etapa final de sucesso é sempre 4 para ambos os fluxos

  return (
    <div className="matricula-container">
      <div className="matricula-header">
        <h1>{ehAluno ? 'Solicitar Matrícula' : 'Sistema de Matrícula'}</h1>
        <p>{subtitulo}</p>
      </div>

      {loading && <div style={{ padding: '20px' }}>Carregando dados...</div>}
      {erro && <div style={{ padding: '20px', color: 'crimson' }}>{erro}</div>}

      <div className="matricula-section">
        {/* Stepper — ajustado para alunos (2 etapas) vs funcionários (3 etapas) */}
        <div className="stepper-container">
          <div className="stepper-line"></div>
          {!ehAluno && (
            <div className={`step ${etapa >= 1 ? 'active' : ''}`}>
              <div className="step-circle">1</div>
              <span className="step-label">Selecionar Aluno</span>
            </div>
          )}
          <div className={`step ${(ehAluno ? etapa >= 2 : etapa >= 2) ? 'active' : ''}`}>
            <div className="step-circle">{ehAluno ? '1' : '2'}</div>
            <span className="step-label">Selecionar Turma</span>
          </div>
          <div className={`step ${etapa >= 3 ? 'active' : ''}`}>
            <div className="step-circle">{ehAluno ? '2' : '3'}</div>
            <span className="step-label">Confirmar</span>
          </div>
        </div>

        {!podeMatricular && (
          <div style={{ padding: '20px', color: '#64748b' }}>
            Você não possui permissão para realizar matrículas.
          </div>
        )}

        {/* ETAPA 1 — Selecionar aluno (somente para funcionários) */}
        {podeMatricular && !ehAluno && etapa === 1 && (
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

            {alunosFiltrados.map((aluno) => (
              <div
                key={aluno.codigo_aluno}
                className="aluno-select-card"
                style={{ borderColor: alunoSelecionado === aluno.codigo_aluno ? '#4f46e5' : '#e2e8f0', borderWidth: alunoSelecionado === aluno.codigo_aluno ? '2px' : '1px' }}
                onClick={() => setAlunoSelecionado(aluno.codigo_aluno)}
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

        {/* ETAPA 2 — Selecionar turma (funciona para todos) */}
        {podeMatricular && etapa === 2 && (
          <div className="etapa-content">
            <h3>{ehAluno ? 'Selecione a Turma Desejada' : 'Selecione a Turma Desejada'}</h3>

            {turmas.map((turma) => (
              <div
                key={turma.codigo_turma}
                className="aluno-select-card"
                style={{ borderColor: turmaSelecionada === turma.codigo_turma ? '#4f46e5' : '#e2e8f0', borderWidth: turmaSelecionada === turma.codigo_turma ? '2px' : '1px' }}
                onClick={() => setTurmaSelecionada(turma.codigo_turma)}
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
                      <div className="m-info-main">{turma.nome_curso}</div>
                      <div className="m-info-sub">Professor: {turma.nome_funcionario} • {turma.turno}</div>
                    </div>
                  </div>

                  <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600', whiteSpace: 'nowrap' }}>
                    {turma.vagas} vagas
                  </span>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              {!ehAluno && (
                <button className="btn-proximo" style={{ backgroundColor: 'white', border: '1px solid #cbd5e1', color: '#475569', marginTop: 0 }} onClick={() => setEtapa(1)}>
                  Voltar
                </button>
              )}
              <button className="btn-proximo" style={{ backgroundColor: turmaSelecionada ? '#4f46e5' : '#e2e8f0', color: turmaSelecionada ? 'white' : '#64748b', marginTop: 0 }} disabled={!turmaSelecionada} onClick={() => setEtapa(3)}>
                Próximo Passo
              </button>
            </div>
          </div>
        )}

        {/* ETAPA 3 — Confirmação */}
        {podeMatricular && etapa === 3 && (
          <div className="etapa-content">
            <h3>Confirme os Dados da Matrícula</h3>

            <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', marginBottom: '20px' }}>
              {ehAluno ? (
                <>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Aluno:</strong> {usuario?.dados?.nome}</p>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Email:</strong> {usuario?.dados?.email}</p>
                </>
              ) : (
                <>
                  <p style={{ margin: '0 0 10px 0' }}><strong>Aluno:</strong> {alunos.find((a) => a.codigo_aluno === alunoSelecionado)?.nome}</p>
                  <p style={{ margin: '0 0 10px 0' }}><strong>CPF:</strong> {alunos.find((a) => a.codigo_aluno === alunoSelecionado)?.cpf}</p>
                </>
              )}
              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '15px 0' }} />
              <p style={{ margin: '0 0 10px 0' }}><strong>Turma:</strong> {turmas.find((t) => t.codigo_turma === turmaSelecionada)?.nome_curso}</p>
              <p style={{ margin: '0 0 0 0' }}><strong>Professor:</strong> {turmas.find((t) => t.codigo_turma === turmaSelecionada)?.nome_funcionario}</p>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button className="btn-proximo" style={{ backgroundColor: 'white', border: '1px solid #cbd5e1', color: '#475569', marginTop: 0 }} onClick={() => setEtapa(2)}>
                Voltar
              </button>
              <button className="btn-proximo" style={{ backgroundColor: '#10b981', color: 'white', marginTop: 0 }} onClick={confirmarMatricula}>
                {ehAluno ? 'Solicitar Matrícula' : 'Confirmar Matrícula'}
              </button>
            </div>
          </div>
        )}

        {/* ETAPA FINAL — Sucesso (etapa 3 para aluno, etapa 4 para funcionário) */}
        {podeMatricular && etapa === 4 && (
          <div className="etapa-content" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>

            <h2 style={{ color: '#1e293b', marginBottom: '10px' }}>{ehAluno ? 'Matrícula Solicitada!' : 'Matrícula Concluída!'}</h2>
            <p style={{ color: '#64748b', marginBottom: '30px' }}>{ehAluno ? 'Sua solicitação de matrícula foi enviada com sucesso.' : 'O aluno foi matriculado com sucesso no sistema.'}</p>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button className="btn-proximo" style={{ backgroundColor: 'white', border: '1px solid #cbd5e1', color: '#475569', marginTop: 0, maxWidth: '200px' }} onClick={resetarMatricula}>
                {ehAluno ? 'Nova Solicitação' : 'Nova Matrícula'}
              </button>
              <button className="btn-proximo" style={{ backgroundColor: '#4f46e5', color: 'white', marginTop: 0, maxWidth: '200px' }} onClick={() => navigate('/')}>
                Ir para o Painel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

