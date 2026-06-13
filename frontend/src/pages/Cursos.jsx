import { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cursos.css';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Cursos() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const carregarCursos = useCallback(async () => {
    setLoading(true);
    setErro('');
    try {
      const resposta = await api.get('/cursos');
      setCursos(resposta.data || []);
    } catch (error) {
      setErro('Não foi possível carregar os cursos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarCursos();
  }, [carregarCursos]);

  const podeCriar = usuario && usuario.tipo === 'FUNCIONARIO' && ['ADMIN', 'ATENDENTE'].includes(usuario.cargo);

  function podeEditarCurso(curso) {
    if (!usuario || usuario.tipo !== 'FUNCIONARIO') return false;
    if (['ADMIN', 'ATENDENTE'].includes(usuario.cargo)) return true;
    if (usuario.cargo === 'PROFESSOR') {
      const userCpf = usuario.dados?.cpf || usuario.dados?.CPF;
      const cpfsProfessores = curso.cpfs_professores || [];
      return cpfsProfessores.includes(userCpf);
    }
    return false;
  }

  async function inativarCurso(id) {
    try {
      await api.delete(`/cursos/${id}`);
      alert('Curso inativado com sucesso!');
      carregarCursos();
    } catch (error) {
      alert('Erro ao inativar curso.');
    }
  }

  return (
    <div className="cursos-container">
      <div className="cursos-header">
        <div className="cursos-title">
          <h1>Cursos e Turmas</h1>
          <p>{usuario?.tipo === 'ALUNO' ? 'Explore os cursos disponíveis na instituição' : 'Gerencie as modalidades de ensino da instituição'}</p>
        </div>

        {podeCriar && (
          <button className="btn-novo-curso" onClick={() => navigate('/formulario-curso')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Novo Curso
          </button>
        )}
      </div>

      <div className="cursos-filters">
        <div className="search-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" className="search-input" placeholder="Buscar por curso ou turno..." />
        </div>
      </div>

      {loading && <div style={{ padding: '20px' }}>Carregando cursos...</div>}
      {erro && <div style={{ padding: '20px', color: 'crimson' }}>{erro}</div>}

      <div className="cursos-grid">
        {cursos.map((curso) => (
          <div className="curso-card" key={curso.codigo_curso}>
            <div className="curso-card-header">
              <div>
                <h3 className="curso-nome">{curso.nome}</h3>
                <span className="curso-mensalidade">Carga horária: <strong>{curso.carga_horaria}</strong></span>
              </div>
              <span className="curso-status">{curso.status || 'ATIVO'}</span>
            </div>

            <div className="curso-vagas-info">
              <div className="vagas-text">
                <span>Código</span>
                <span>{curso.codigo_curso}</span>
              </div>
            </div>

            {podeEditarCurso(curso) && (
              <div className="curso-card-actions">
                <button className="btn-card-action" onClick={() => navigate('/formulario-curso', { state: { curso } })}>
                  Editar
                </button>
                <button 
                  className="btn-card-action" 
                  style={{ backgroundColor: '#fee2e2', color: '#ef4444', borderColor: '#fecaca' }}
                  onClick={() => {
                    if (window.confirm('Tem certeza que deseja inativar este curso?')) {
                      inativarCurso(curso.codigo_curso);
                    }
                  }}
                >
                  Excluir
                </button>
                <button className="btn-card-action btn-matricular" onClick={() => navigate('/matricula')}>
                  Matricular
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
