import { useContext, useEffect, useState } from 'react';
import './Alunos.css';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Alunos() {
  const { usuario } = useContext(AuthContext);
  const [alunos, setAlunos] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  // Modal de edição state
  const [showModal, setShowModal] = useState(false);
  const [alunoEmEdicao, setAlunoEmEdicao] = useState({ codigo_aluno: null, nome: '', email: '', senha: '' });
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    async function carregarAlunos() {
      setLoading(true);
      setErro('');
      try {
        const resposta = await api.get('/alunos');
        setAlunos(resposta.data || []);
      } catch (error) {
        setErro('Não foi possível carregar os alunos.');
      } finally {
        setLoading(false);
      }
    }

    carregarAlunos();
  }, []);

  const podeAlterar = usuario && usuario.tipo === 'FUNCIONARIO' && ['ADMIN', 'ATENDENTE', 'PROFESSOR'].includes(usuario.cargo);

  const alunosFiltrados = alunos.filter((aluno) => {
    const termo = termoBusca.toLowerCase();
    return (
      String(aluno.nome || '').toLowerCase().includes(termo) ||
      String(aluno.email || '').toLowerCase().includes(termo) ||
      String(aluno.cpf || '').includes(termo)
    );
  });

  async function deletarAluno(codigoAluno) {
    if (!window.confirm('Deseja realmente excluir este aluno?')) {
      return;
    }

    try {
      await api.delete(`/alunos/${codigoAluno}`);
      setAlunos((listaAtual) => listaAtual.filter((aluno) => aluno.codigo_aluno !== codigoAluno));
      alert('Aluno removido com sucesso.');
    } catch (error) {
      alert('Não foi possível excluir o aluno.');
    }
  }

  function abrirModalEdicao(aluno) {
    setAlunoEmEdicao({
      codigo_aluno: aluno.codigo_aluno,
      nome: aluno.nome,
      email: aluno.email,
      senha: ''
    });
    setShowModal(true);
  }

  function fecharModalEdicao() {
    setShowModal(false);
    setAlunoEmEdicao({ codigo_aluno: null, nome: '', email: '', senha: '' });
  }

  async function salvarEdicaoAluno(e) {
    e.preventDefault();
    setEditLoading(true);
    try {
      await api.put('/alunos', alunoEmEdicao);
      setAlunos((listaAtual) =>
        listaAtual.map((a) => (a.codigo_aluno === alunoEmEdicao.codigo_aluno ? { ...a, nome: alunoEmEdicao.nome, email: alunoEmEdicao.email } : a))
      );
      fecharModalEdicao();
      alert('Aluno atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar aluno.');
    } finally {
      setEditLoading(false);
    }
  }

  return (
    <div className="alunos-container">
      <div className="alunos-header">
        <div className="alunos-title">
          <h1>Cadastro de Alunos</h1>
          <p>Gerencie os alunos da instituição</p>
        </div>
        {podeAlterar && (
          <button className="btn-novo-aluno" onClick={() => window.location.href = '/cadastro'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Novo Aluno
          </button>
        )}
      </div>

      <div className="alunos-filters">
        <div className="search-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nome, CPF ou email..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </div>
      </div>

      {loading && <div style={{ padding: '20px' }}>Carregando alunos...</div>}
      {erro && <div style={{ padding: '20px', color: 'crimson' }}>{erro}</div>}

      <div className="table-wrapper">
        <table className="alunos-table">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunosFiltrados.map((aluno) => (
              <tr key={aluno.codigo_aluno}>
                <td>
                  <div className="aluno-info-cell">
                    <div className="aluno-avatar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <div className="aluno-name-email">
                      <span className="aluno-name">{aluno.nome}</span>
                      <span className="aluno-email">{aluno.email}</span>
                    </div>
                  </div>
                </td>
                <td>{aluno.cpf}</td>
                <td>{aluno.email}</td>
                <td>
                  <div className="actions-cell">
                    {podeAlterar && (
                      <>
                        <button className="btn-icon-action btn-edit" onClick={() => abrirModalEdicao(aluno)} title="Editar">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button className="btn-icon-action btn-delete" onClick={() => deletarAluno(aluno.codigo_aluno)} title="Excluir">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {alunosFiltrados.length === 0 && !loading && (
          <div style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>
            Nenhum aluno encontrado com esses filtros.
          </div>
        )}
      </div>

      {/* Modal de Edição */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Aluno</h2>
            <form onSubmit={salvarEdicaoAluno}>
              <div className="form-group">
                <label>Nome Completo</label>
                <input 
                  type="text" 
                  value={alunoEmEdicao.nome} 
                  onChange={(e) => setAlunoEmEdicao({ ...alunoEmEdicao, nome: e.target.value })} 
                  required 
                  className="modal-input"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={alunoEmEdicao.email} 
                  onChange={(e) => setAlunoEmEdicao({ ...alunoEmEdicao, email: e.target.value })} 
                  required 
                  className="modal-input"
                />
              </div>
              <div className="form-group">
                <label>Nova Senha (Opcional)</label>
                <input 
                  type="password" 
                  value={alunoEmEdicao.senha} 
                  onChange={(e) => setAlunoEmEdicao({ ...alunoEmEdicao, senha: e.target.value })}
                  placeholder="Deixe em branco para manter a atual"
                  className="modal-input"
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn-modal-cancel" onClick={fecharModalEdicao}>Cancelar</button>
                <button type="submit" className="btn-modal-save" disabled={editLoading}>
                  {editLoading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
