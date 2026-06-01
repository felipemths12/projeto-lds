import { useEffect, useState, useContext } from 'react';
import './Cursos.css';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Turmas() {
  const { usuario } = useContext(AuthContext);
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const [showModalTransferencia, setShowModalTransferencia] = useState(false);
  const [matriculas, setMatriculas] = useState([]);
  const [transferenciaLoading, setTransferenciaLoading] = useState(false);
  const [transferenciaDados, setTransferenciaDados] = useState({ numero_matricula: '', codigo_turma: '' });

  const [cursos, setCursos] = useState([]);
  const [professores, setProfessores] = useState([]);

  const [showModalNovaTurma, setShowModalNovaTurma] = useState(false);
  const [novaTurma, setNovaTurma] = useState({ codigo_curso: '', id_funcionario: '', semestre: '1', ano: new Date().getFullYear(), turno: 'MATUTINO', numero_vagas: '' });
  const [novaTurmaLoading, setNovaTurmaLoading] = useState(false);

  const [showModalEditar, setShowModalEditar] = useState(false);
  const [turmaEmEdicao, setTurmaEmEdicao] = useState({ codigo_turma: '', turno: '', numero_vagas: '', id_funcionario: '' });
  const [editLoading, setEditLoading] = useState(false);

  const [showModalAlunos, setShowModalAlunos] = useState(false);
  const [alunosDaTurma, setAlunosDaTurma] = useState([]);
  const [alunosLoading, setAlunosLoading] = useState(false);

  async function carregarTurmas() {
    try {
      const resposta = await api.get('/turmas');
      setTurmas(resposta.data || []);
    } catch (error) {
      setErro('Falha ao carregar turmas');
    }
  }

  useEffect(() => {
    async function carregarTudo() {
      setLoading(true);
      try {
        await carregarTurmas();
        const [respCursos, respFunc] = await Promise.all([
          api.get('/cursos'),
          api.get('/funcionarios')
        ]);
        setCursos(respCursos.data || []);
        setProfessores((respFunc.data || []).filter(f => f.perfil_cargo === 'PROFESSOR'));
      } catch (error) {
        setErro('Falha ao carregar dependências');
      } finally {
        setLoading(false);
      }
    }

    carregarTudo();
  }, []);

  const podeCriar = usuario && usuario.tipo === 'FUNCIONARIO' && ['ADMIN', 'ATENDENTE'].includes(usuario.cargo);

  function podeEditarTurma(turma) {
    if (!usuario || usuario.tipo !== 'FUNCIONARIO') return false;
    if (['ADMIN', 'ATENDENTE'].includes(usuario.cargo)) return true;
    if (usuario.cargo === 'PROFESSOR') {
      const userCpf = usuario.dados?.cpf || usuario.dados?.CPF;
      return turma.cpf_professor === userCpf;
    }
    return false;
  }

  async function abrirModalTransferencia() {
    setTransferenciaLoading(true);
    setErro(null);
    try {
      const respostaMatriculas = await api.get('/matriculas');
      const ativas = (respostaMatriculas.data || []).filter(m => m.status === 'ATIVO');
      setMatriculas(ativas);
      setTransferenciaDados({ numero_matricula: '', codigo_turma: '' });
      setShowModalTransferencia(true);
    } catch (error) {
      setErro('Falha ao carregar matrículas para transferência.');
    } finally {
      setTransferenciaLoading(false);
    }
  }

  function fecharModalTransferencia() {
    setShowModalTransferencia(false);
  }

  async function realizarTransferencia(e) {
    e.preventDefault();
    setTransferenciaLoading(true);
    try {
      await api.put('/matriculas', {
        numero_matricula: transferenciaDados.numero_matricula,
        codigo_turma: transferenciaDados.codigo_turma
      });
      alert('Transferência realizada com sucesso!');
      fecharModalTransferencia();
      carregarTurmas(); // Recarrega para atualizar o número de vagas
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao realizar a transferência.');
    } finally {
      setTransferenciaLoading(false);
    }
  }

  function abrirModalNovaTurma() {
    setNovaTurma({ codigo_curso: '', id_funcionario: '', semestre: '1', ano: new Date().getFullYear(), turno: 'MATUTINO', numero_vagas: '' });
    setShowModalNovaTurma(true);
  }

  async function cadastrarTurma(e) {
    e.preventDefault();
    setNovaTurmaLoading(true);
    try {
      await api.post('/turmas', novaTurma);
      alert('Turma cadastrada com sucesso!');
      setShowModalNovaTurma(false);
      carregarTurmas();
    } catch (error) {
      alert('Erro ao cadastrar turma.');
    } finally {
      setNovaTurmaLoading(false);
    }
  }

  function abrirModalEditar(turma) {
    const prof = professores.find(p => String(p.cpf) === String(turma.cpf_professor));
    setTurmaEmEdicao({
      codigo_turma: turma.codigo_turma,
      turno: turma.turno || 'MATUTINO',
      numero_vagas: turma.vagas || '',
      id_funcionario: prof ? prof.id_funcionario : ''
    });
    setShowModalEditar(true);
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    setEditLoading(true);
    try {
      await api.put('/turmas', turmaEmEdicao);
      alert('Turma atualizada com sucesso!');
      setShowModalEditar(false);
      carregarTurmas();
    } catch (error) {
      alert('Erro ao atualizar turma.');
    } finally {
      setEditLoading(false);
    }
  }

  async function abrirModalAlunos(turma) {
    setAlunosLoading(true);
    try {
      const resp = await api.get('/matriculas');
      const matriculasAtivas = (resp.data || []).filter(m => String(m.codigo_turma) === String(turma.codigo_turma) && m.status === 'ATIVO');
      setAlunosDaTurma(matriculasAtivas);
      setShowModalAlunos(true);
    } catch (e) {
      alert('Erro ao carregar lista de alunos.');
    } finally {
      setAlunosLoading(false);
    }
  }

  return (
    <div className="cursos-container">
      <div className="cursos-header">
        <div className="cursos-title">
          <h1>Turmas</h1>
          <p>Visualização e gestão das turmas cadastradas</p>
        </div>

        {podeCriar && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-novo-curso" style={{ backgroundColor: '#f59e0b' }} onClick={abrirModalTransferencia}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 3v18"></path><path d="M10 8l7-5 7 5"></path><path d="M7 21V3"></path><path d="M14 16l-7 5-7-5"></path></svg>
              Transferir Aluno
            </button>
            <button className="btn-novo-curso" onClick={abrirModalNovaTurma}>Nova Turma</button>
          </div>
        )}
      </div>

      {loading && <div style={{ padding: '20px' }}>Carregando turmas...</div>}
      {erro && <div style={{ padding: '20px', color: 'crimson' }}>{erro}</div>}

      <div className="cursos-grid">
        {turmas.map((turma) => (
          <div className="curso-card" key={turma.codigo_turma || turma.id}>
            <div className="curso-card-header">
              <div>
                <h3 className="curso-nome">{turma.nome || turma.descricao || 'Turma'}</h3>
                <span className="curso-mensalidade">Curso: <strong>{turma.nome_curso || turma.curso || 'N/D'}</strong></span>
              </div>
              <span className="curso-status">{turma.status_turma || turma.status || 'Ativa'}</span>
            </div>

            <div className="curso-vagas-info">
              <div className="vagas-text">
                <span>Professor</span>
                <span>{turma.nome_funcionario || turma.nome_professor || turma.professor || 'N/D'}</span>
              </div>
            </div>

            {(usuario?.tipo !== 'ALUNO' || podeEditarTurma(turma)) && (
              <div className="curso-card-actions">
                {usuario?.tipo !== 'ALUNO' && (
                  <button className="btn-card-action" onClick={() => abrirModalAlunos(turma)}>Ver Alunos</button>
                )}
                {podeEditarTurma(turma) && (
                  <>
                    <button className="btn-card-action" onClick={() => abrirModalEditar(turma)}>Editar</button>
                    <button className="btn-card-action btn-matricular">Excluir</button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showModalTransferencia && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Transferir Aluno</h2>
            <form onSubmit={realizarTransferencia}>
              <div className="form-group">
                <label>Matrícula Atual (Aluno e Turma de origem)</label>
                <select 
                  value={transferenciaDados.numero_matricula} 
                  onChange={(e) => setTransferenciaDados({ ...transferenciaDados, numero_matricula: e.target.value })}
                  required
                  className="modal-input"
                >
                  <option value="">-- Selecione uma matrícula ativa --</option>
                  {matriculas.map(m => {
                    const turmaOrigem = turmas.find(t => t.codigo_turma === m.codigo_turma);
                    return (
                      <option key={m.numero_matricula} value={m.numero_matricula}>
                        {m.nome_aluno} (Matrícula #{m.numero_matricula}) - Turma atual: {turmaOrigem ? `${turmaOrigem.nome_curso} / ${turmaOrigem.turno}` : `ID ${m.codigo_turma}`}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <label>Nova Turma (Destino)</label>
                <select 
                  value={transferenciaDados.codigo_turma} 
                  onChange={(e) => setTransferenciaDados({ ...transferenciaDados, codigo_turma: e.target.value })}
                  required
                  className="modal-input"
                  disabled={!transferenciaDados.numero_matricula}
                >
                  <option value="">-- Selecione a nova turma --</option>
                  {turmas
                    .filter(t => t.codigo_turma !== Number(matriculas.find(m => String(m.numero_matricula) === String(transferenciaDados.numero_matricula))?.codigo_turma))
                    .map(t => (
                    <option key={t.codigo_turma} value={t.codigo_turma} disabled={t.vagas <= 0}>
                      {t.nome_curso} - Prof. {t.nome_funcionario} ({t.turno}) - {t.vagas > 0 ? `${t.vagas} vagas` : 'LOTAÇÃO MÁXIMA'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-modal-cancel" onClick={fecharModalTransferencia}>Cancelar</button>
                <button type="submit" className="btn-modal-save" disabled={transferenciaLoading || !transferenciaDados.numero_matricula || !transferenciaDados.codigo_turma}>
                  {transferenciaLoading ? 'Processando...' : 'Confirmar Transferência'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModalNovaTurma && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Nova Turma</h2>
            <form onSubmit={cadastrarTurma}>
              <div className="form-group">
                <label>Curso</label>
                <select value={novaTurma.codigo_curso} onChange={(e) => setNovaTurma({ ...novaTurma, codigo_curso: e.target.value })} required className="modal-input">
                  <option value="">-- Selecione o curso --</option>
                  {cursos.map(c => <option key={c.codigo_curso} value={c.codigo_curso}>{c.nome}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Professor</label>
                <select value={novaTurma.id_funcionario} onChange={(e) => setNovaTurma({ ...novaTurma, id_funcionario: e.target.value })} required className="modal-input">
                  <option value="">-- Selecione o professor --</option>
                  {professores.map(p => <option key={p.id_funcionario} value={p.id_funcionario}>{p.nome}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Semestre</label>
                  <input type="number" min="1" max="2" value={novaTurma.semestre} onChange={(e) => setNovaTurma({ ...novaTurma, semestre: e.target.value })} required className="modal-input" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Ano</label>
                  <input type="number" min="2020" value={novaTurma.ano} onChange={(e) => setNovaTurma({ ...novaTurma, ano: e.target.value })} required className="modal-input" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Turno</label>
                  <select value={novaTurma.turno} onChange={(e) => setNovaTurma({ ...novaTurma, turno: e.target.value })} required className="modal-input">
                    <option value="MATUTINO">Matutino</option>
                    <option value="VESPERTINO">Vespertino</option>
                    <option value="NOTURNO">Noturno</option>
                  </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Vagas</label>
                  <input type="number" min="1" value={novaTurma.numero_vagas} onChange={(e) => setNovaTurma({ ...novaTurma, numero_vagas: e.target.value })} required className="modal-input" />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowModalNovaTurma(false)}>Cancelar</button>
                <button type="submit" className="btn-modal-save" disabled={novaTurmaLoading}>
                  {novaTurmaLoading ? 'Salvando...' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModalEditar && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Turma</h2>
            <form onSubmit={salvarEdicao}>
              <div className="form-group">
                <label>Professor</label>
                <select value={turmaEmEdicao.id_funcionario} onChange={(e) => setTurmaEmEdicao({ ...turmaEmEdicao, id_funcionario: e.target.value })} required className="modal-input">
                  <option value="">-- Selecione o professor --</option>
                  {professores.map(p => <option key={p.id_funcionario} value={p.id_funcionario}>{p.nome}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Turno</label>
                  <select value={turmaEmEdicao.turno} onChange={(e) => setTurmaEmEdicao({ ...turmaEmEdicao, turno: e.target.value })} required className="modal-input">
                    <option value="MATUTINO">Matutino</option>
                    <option value="VESPERTINO">Vespertino</option>
                    <option value="NOTURNO">Noturno</option>
                  </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Vagas Totais</label>
                  <input type="number" min="1" value={turmaEmEdicao.numero_vagas} onChange={(e) => setTurmaEmEdicao({ ...turmaEmEdicao, numero_vagas: e.target.value })} required className="modal-input" />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowModalEditar(false)}>Cancelar</button>
                <button type="submit" className="btn-modal-save" disabled={editLoading}>
                  {editLoading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModalAlunos && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Alunos da Turma</h2>
            {alunosLoading ? (
              <p>Carregando alunos...</p>
            ) : alunosDaTurma.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto' }}>
                {alunosDaTurma.map(m => (
                  <li key={m.numero_matricula} style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', color: '#1e293b' }}>
                    {m.nome_aluno} <span style={{color: '#64748b', fontSize: '0.85em'}}>(Matrícula #{m.numero_matricula})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#64748b' }}>Nenhum aluno matriculado nesta turma.</p>
            )}
            <div className="modal-actions">
              <button type="button" className="btn-modal-cancel" onClick={() => setShowModalAlunos(false)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
