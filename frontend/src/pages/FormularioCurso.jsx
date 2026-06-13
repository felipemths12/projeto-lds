import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FormularioCurso.css';
import api from '../services/api';

export default function FormularioCurso() {
  const navigate = useNavigate();
  const location = useLocation();
  const cursoParaEditar = location.state?.curso || null;
  const isEdit = !!cursoParaEditar;

  const [nome, setNome] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [numeroVagas, setNumeroVagas] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (cursoParaEditar) {
      setNome(cursoParaEditar.nome || '');
      setCargaHoraria(cursoParaEditar.carga_horaria || '');
      setNumeroVagas(cursoParaEditar.numero_vagas || '');
    }
  }, [cursoParaEditar]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSalvando(true);
    try {
      if (isEdit) {
        await api.put('/cursos', {
          codigo_curso: cursoParaEditar.codigo_curso,
          nome,
          carga_horaria: Number(cargaHoraria),
          numeroVagas: Number(numeroVagas)
        });
        alert('Curso atualizado com sucesso!');
      } else {
        await api.post('/cursos', {
          nome,
          cargaHoraria: Number(cargaHoraria),
          numeroVagas: Number(numeroVagas)
        });
        alert('Curso cadastrado com sucesso!');
      }
      navigate('/cursos');
    } catch (error) {
      alert(`Erro ao ${isEdit ? 'atualizar' : 'cadastrar'} o curso. Verifique os dados e tente novamente.`);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="form-curso-container">
      <div className="form-curso-header">
        <div>
          <h1>{isEdit ? 'Editar Curso' : 'Dados do Curso'}</h1>
          <p>Preencha as informações para {isEdit ? 'editar o' : 'cadastrar o'} curso</p>
        </div>
        <button className="btn-voltar" onClick={() => navigate('/cursos')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Voltar
        </button>
      </div>

      <div className="form-curso-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Nome do Curso</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: Ensino Fundamental I"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Carga Horária</label>
              <input
                type="number"
                className="form-input"
                placeholder="Ex: 800"
                value={cargaHoraria}
                onChange={(e) => setCargaHoraria(e.target.value)}
                required
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Número de Vagas (padrão)</label>
              <input
                type="number"
                className="form-input"
                placeholder="Ex: 40"
                value={numeroVagas}
                onChange={(e) => setNumeroVagas(e.target.value)}
                min="1"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={() => navigate('/cursos')}>
              Cancelar
            </button>
            <button type="submit" className="btn-salvar" disabled={salvando}>
              {salvando ? 'Salvando...' : (isEdit ? 'Salvar Alterações' : 'Salvar Curso')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
