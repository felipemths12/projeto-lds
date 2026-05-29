import { useState, useEffect } from 'react';
import { Search, BookOpen, Clock, Users, DollarSign, Sun, Edit, Trash2 } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { api } from '../services/api';
import './Cursos.css';

export default function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCursos = async () => {
    try {
      const data = await api.get('/cursos');
      setCursos(data || []);
    } catch (err) {
      console.error("Erro ao carregar cursos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      try {
        await api.delete(`/cursos/${id}`);
        fetchCursos(); // Refresh list
      } catch (err) {
        alert('Erro ao excluir curso: ' + err.message);
      }
    }
  };

  return (
    <PageLayout 
      title="Cursos Disponíveis" 
      subtitle="Conheça os cursos oferecidos pela nossa instituição"
    >
      <div className="cursos-filters">
        <div className="filter-search">
          <Search className="filter-search-icon" size={18} />
          <input type="text" placeholder="Buscar cursos..." />
        </div>
        <select className="filter-select">
          <option value="todos">Todos os Turnos</option>
          <option value="manha">Manhã</option>
          <option value="tarde">Tarde</option>
          <option value="noite">Noite</option>
        </select>
      </div>

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>Carregando cursos...</div>
      ) : (
        <div className="cursos-grid">
          {cursos.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              Nenhum curso cadastrado.
            </div>
          )}
          
          {cursos.map((curso) => (
            <div className="curso-card" key={curso.codigo_curso}>
              <div className="curso-card-header">
                <div className="curso-icon">
                  <BookOpen size={24} />
                </div>
                <div className="curso-title-wrapper">
                  <h3>{curso.nome}</h3>
                  <p>Status: {curso.status || 'Ativo'}</p>
                </div>
              </div>
              <div className="curso-card-body">
                <div className="curso-details-grid">
                  <div className="detail-item">
                    <Clock className="detail-icon" size={16} />
                    <span>{curso.carga_horaria || 0} horas</span>
                  </div>
                  {/* Mocking missing backend data for visual completeness */}
                  <div className="detail-item">
                    <Sun className="detail-icon" size={16} />
                    <span>Manhã</span>
                  </div>
                  <div className="detail-item">
                    <Users className="detail-icon" size={16} />
                    <span>100 vagas</span>
                  </div>
                  <div className="detail-item">
                    <DollarSign className="detail-icon" size={16} />
                    <span>R$ 0,00</span>
                  </div>
                </div>
                <div className="curso-occupancy">
                  <div className="occupancy-header">
                    <span>Ocupação</span>
                    <span>0%</span>
                  </div>
                  <div className="occupancy-bar-bg">
                    <div className="occupancy-bar-fill" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageLayout>
  );
}
