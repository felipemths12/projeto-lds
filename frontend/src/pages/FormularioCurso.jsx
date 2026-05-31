import { useNavigate } from 'react-router-dom';
import './FormularioCurso.css';

export default function FormularioCurso() {
  const navigate = useNavigate();

  return (
    <div className="form-curso-container">
      <div className="form-curso-header">
        <div>
          {/* O título pode ser mudado dinamicamente depois, mas deixamos o padrão para o visual */}
          <h1>Dados do Curso</h1>
          <p>Preencha as informações para cadastrar ou editar o curso</p>
        </div>
        <button className="btn-voltar" onClick={() => navigate('/cursos')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Voltar
        </button>
      </div>

      <div className="form-curso-card">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Nome do Curso</label>
              <input type="text" className="form-input" placeholder="Ex: Ensino Fundamental I" />
            </div>

            <div className="form-group">
              <label>Valor da Mensalidade (R$)</label>
              <input type="text" className="form-input" placeholder="Ex: 850,00" />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select className="form-select">
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>

            <div className="form-group">
              <label>Total de Vagas</label>
              <input type="number" className="form-input" placeholder="Ex: 120" />
            </div>

            <div className="form-group">
              <label>Turnos Disponíveis</label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked /> Manhã
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" /> Tarde
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" /> Noite
                </label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={() => navigate('/cursos')}>
              Cancelar
            </button>
            <button type="submit" className="btn-salvar">
              Salvar Curso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}