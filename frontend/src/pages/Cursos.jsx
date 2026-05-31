import { useNavigate } from 'react-router-dom';
import './Cursos.css';

export default function Cursos() {
  const navigate = useNavigate();

  const listaCursos = [
    { id: 1, nome: "Ensino Fundamental I", valor: "850,00", turnos: ["Manhã", "Tarde"], vagasOcupadas: 98, vagasTotal: 120, status: "Ativo" },
    { id: 2, nome: "Ensino Fundamental II", valor: "950,00", turnos: ["Manhã"], vagasOcupadas: 100, vagasTotal: 100, status: "Ativo" },
    { id: 3, nome: "Ensino Médio", valor: "1.200,00", turnos: ["Manhã", "Tarde"], vagasOcupadas: 75, vagasTotal: 80, status: "Ativo" },
    { id: 4, nome: "Bilingue - Kids", valor: "600,00", turnos: ["Tarde"], vagasOcupadas: 30, vagasTotal: 50, status: "Ativo" },
    { id: 5, nome: "Robótica Aplicada", valor: "450,00", turnos: ["Tarde", "Noite"], vagasOcupadas: 45, vagasTotal: 60, status: "Ativo" },
    { id: 6, nome: "Pré-Vestibular", valor: "1.500,00", turnos: ["Manhã", "Noite"], vagasOcupadas: 110, vagasTotal: 150, status: "Ativo" }
  ];

  return (
    <div className="cursos-container">
      <div className="cursos-header">
        <div className="cursos-title">
          <h1>Cursos e Turmas</h1>
          <p>Gerencie as modalidades de ensino da instituição</p>
        </div>
        
        {/* BOTÃO CONECTADO: NOVO CURSO */}
        <button className="btn-novo-curso" onClick={() => navigate('/formulario-curso')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Novo Curso
        </button>
      </div>

      <div className="cursos-filters">
        <div className="search-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" className="search-input" placeholder="Buscar por curso ou turno..." />
        </div>
      </div>

      <div className="cursos-grid">
        {listaCursos.map(curso => {
          const porcentagem = (curso.vagasOcupadas / curso.vagasTotal) * 100;
          
          return (
            <div className="curso-card" key={curso.id}>
              <div className="curso-card-header">
                <div>
                  <h3 className="curso-nome">{curso.nome}</h3>
                  <span className="curso-mensalidade">R$ <strong>{curso.valor}</strong> /mês</span>
                </div>
                <span className="curso-status">{curso.status}</span>
              </div>

              <div className="curso-turnos">
                {curso.turnos.map((turno, index) => (
                  <span className="turno-badge" key={index}>{turno}</span>
                ))}
              </div>

              <div className="curso-vagas-info">
                <div className="vagas-text">
                  <span>Ocupação</span>
                  <span>{curso.vagasOcupadas}/{curso.vagasTotal} vagas</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${porcentagem}%` }}></div>
                </div>
              </div>

              <div className="curso-card-actions">
                {/* BOTÃO CONECTADO: EDITAR */}
                <button className="btn-card-action" onClick={() => navigate('/formulario-curso')}>
                  Editar
                </button>
                
                <button className="btn-card-action btn-matricular" onClick={() => navigate('/matricula')}>
                  Matricular
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}