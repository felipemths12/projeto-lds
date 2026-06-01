import { useContext, useEffect, useState } from 'react';
import './Alunos.css';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Funcionarios() {
  const { usuario } = useContext(AuthContext);
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  // Modal de edição state
  const [showModal, setShowModal] = useState(false);
  const [funcionarioEmEdicao, setFuncionarioEmEdicao] = useState({ id_funcionario: null, nome: '', perfil_cargo: 'ATENDENTE' });
  const [editLoading, setEditLoading] = useState(false);

  // Modal de cadastro state
  const [showModalCadastro, setShowModalCadastro] = useState(false);
  const [novoFuncionario, setNovoFuncionario] = useState({ nome: '', cpf: '', senha: '', perfil_cargo: 'ATENDENTE' });
  const [cadastroLoading, setCadastroLoading] = useState(false);

  useEffect(() => {
    async function carregarFuncionarios() {
      setLoading(true);
      setErro('');
      try {
        const resposta = await api.get('/funcionarios');
        setFuncionarios(resposta.data || []);
      } catch (error) {
        setErro('Não foi possível carregar os funcionários.');
      } finally {
        setLoading(false);
      }
    }

    carregarFuncionarios();
  }, []);

  const podeGerenciar = usuario && usuario.tipo === 'FUNCIONARIO' && usuario.cargo === 'ADMIN';

  async function inativarFuncionario(idFuncionario) {
    if (!window.confirm('Deseja realmente inativar este funcionário?')) {
      return;
    }

    try {
      await api.delete(`/funcionarios/${idFuncionario}`);
      setFuncionarios((listaAtual) => listaAtual.filter((funcionario) => funcionario.id_funcionario !== idFuncionario));
      alert('Funcionário removido com sucesso.');
    } catch (error) {
      alert('Não foi possível remover o funcionário.');
    }
  }

  function abrirModalEdicao(funcionario) {
    setFuncionarioEmEdicao({
      id_funcionario: funcionario.id_funcionario,
      nome: funcionario.nome,
      perfil_cargo: funcionario.perfil_cargo
    });
    setShowModal(true);
  }

  function fecharModalEdicao() {
    setShowModal(false);
    setFuncionarioEmEdicao({ id_funcionario: null, nome: '', perfil_cargo: 'ATENDENTE' });
  }

  async function salvarEdicaoFuncionario(e) {
    e.preventDefault();
    setEditLoading(true);
    try {
      await api.put('/funcionarios', funcionarioEmEdicao);
      setFuncionarios((listaAtual) =>
        listaAtual.map((f) => (f.id_funcionario === funcionarioEmEdicao.id_funcionario ? { ...f, nome: funcionarioEmEdicao.nome, perfil_cargo: funcionarioEmEdicao.perfil_cargo } : f))
      );
      fecharModalEdicao();
      alert('Funcionário atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar funcionário.');
    } finally {
      setEditLoading(false);
    }
  }

  function abrirModalCadastro() {
    setNovoFuncionario({ nome: '', cpf: '', senha: '', perfil_cargo: 'ATENDENTE' });
    setShowModalCadastro(true);
  }

  function fecharModalCadastro() {
    setShowModalCadastro(false);
  }

  async function cadastrarFuncionario(e) {
    e.preventDefault();
    setCadastroLoading(true);
    try {
      await api.post('/funcionarios', novoFuncionario);
      const resposta = await api.get('/funcionarios');
      setFuncionarios(resposta.data || []);
      fecharModalCadastro();
      alert('Funcionário cadastrado com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar funcionário. Verifique os dados.');
    } finally {
      setCadastroLoading(false);
    }
  }

  return (
    <div className="alunos-container">
      <div className="alunos-header">
        <div className="alunos-title">
          <h1>Funcionários</h1>
          <p>Gerencie os funcionários da instituição</p>
        </div>
        {podeGerenciar && (
          <button className="btn-novo-aluno" onClick={abrirModalCadastro}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Novo Funcionário
          </button>
        )}
      </div>

      {loading && <div style={{ padding: '20px' }}>Carregando funcionários...</div>}
      {erro && <div style={{ padding: '20px', color: 'crimson' }}>{erro}</div>}

      <div className="table-wrapper">
        <table className="alunos-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Cargo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((funcionario) => (
              <tr key={funcionario.id_funcionario}>
                <td>
                  <div className="aluno-info-cell">
                    <div className="aluno-avatar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <div className="aluno-name-email">
                      <span className="aluno-name">{funcionario.nome}</span>
                      <span className="aluno-email">{funcionario.perfil_cargo}</span>
                    </div>
                  </div>
                </td>
                <td>{funcionario.cpf}</td>
                <td>{funcionario.perfil_cargo}</td>
                <td>{funcionario.status_ativo}</td>
                <td>
                  <div className="actions-cell">
                    {podeGerenciar && (
                      <>
                        <button className="btn-icon-action btn-edit" onClick={() => abrirModalEdicao(funcionario)} title="Editar">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button className="btn-icon-action btn-delete" onClick={() => inativarFuncionario(funcionario.id_funcionario)} title="Excluir">
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

        {funcionarios.length === 0 && !loading && (
          <div style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>
            Nenhum funcionário encontrado.
          </div>
        )}
      </div>

      {/* Modal de Edição */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Funcionário</h2>
            <form onSubmit={salvarEdicaoFuncionario}>
              <div className="form-group">
                <label>Nome Completo</label>
                <input 
                  type="text" 
                  value={funcionarioEmEdicao.nome} 
                  onChange={(e) => setFuncionarioEmEdicao({ ...funcionarioEmEdicao, nome: e.target.value })} 
                  required 
                  className="modal-input"
                />
              </div>
              <div className="form-group">
                <label>Cargo/Perfil</label>
                <select 
                  value={funcionarioEmEdicao.perfil_cargo} 
                  onChange={(e) => setFuncionarioEmEdicao({ ...funcionarioEmEdicao, perfil_cargo: e.target.value })}
                  className="modal-input"
                >
                  <option value="ADMIN">Administrador</option>
                  <option value="ATENDENTE">Atendente</option>
                  <option value="PROFESSOR">Professor</option>
                </select>
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

      {/* Modal de Cadastro */}
      {showModalCadastro && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Novo Funcionário</h2>
            <form onSubmit={cadastrarFuncionario}>
              <div className="form-group">
                <label>Nome Completo</label>
                <input 
                  type="text" 
                  value={novoFuncionario.nome} 
                  onChange={(e) => setNovoFuncionario({ ...novoFuncionario, nome: e.target.value })} 
                  required 
                  className="modal-input"
                />
              </div>
              <div className="form-group">
                <label>CPF (apenas números)</label>
                <input 
                  type="text" 
                  value={novoFuncionario.cpf} 
                  onChange={(e) => setNovoFuncionario({ ...novoFuncionario, cpf: e.target.value })} 
                  required 
                  maxLength={11}
                  minLength={11}
                  className="modal-input"
                />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input 
                  type="password" 
                  value={novoFuncionario.senha} 
                  onChange={(e) => setNovoFuncionario({ ...novoFuncionario, senha: e.target.value })} 
                  required 
                  minLength={8}
                  className="modal-input"
                />
              </div>
              <div className="form-group">
                <label>Cargo/Perfil</label>
                <select 
                  value={novoFuncionario.perfil_cargo} 
                  onChange={(e) => setNovoFuncionario({ ...novoFuncionario, perfil_cargo: e.target.value })}
                  className="modal-input"
                >
                  <option value="ADMIN">Administrador</option>
                  <option value="ATENDENTE">Atendente</option>
                  <option value="PROFESSOR">Professor</option>
                </select>
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn-modal-cancel" onClick={fecharModalCadastro}>Cancelar</button>
                <button type="submit" className="btn-modal-save" disabled={cadastroLoading}>
                  {cadastroLoading ? 'Salvando...' : 'Cadastrar Funcionário'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
