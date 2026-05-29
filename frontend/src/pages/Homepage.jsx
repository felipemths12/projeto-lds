import NavBar from '../components/NavBar';
import { BookOpen, BarChart2, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Homepage.css';

export default function Homepage() {
  return (
    <div className="homepage-container">
      <NavBar isPublic={true} />
      
      <main className="homepage-content">
        <section className="hero-section">
          <div className="hero-text">
            <h1 className="hero-title">
              A Nova Era da <span className="highlight">Gestão Escolar</span>
            </h1>
            <p className="hero-subtitle">
              Simplifique processos, conecte alunos e educadores, e tenha o controle total da sua instituição em um único lugar.
            </p>
            <div className="hero-actions">
              <Link to="/cadastro" className="btn-hero-primary">
                Começar Agora <ArrowRight size={20} />
              </Link>
              <Link to="/cursos" className="btn-hero-secondary">
                Explorar Cursos
              </Link>
            </div>
          </div>
          <div className="hero-image-placeholder">
            <div className="glass-card">
              <div className="glass-header"></div>
              <div className="glass-body"></div>
              <div className="glass-footer"></div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2 className="features-title">Tudo o que você precisa</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <BookOpen size={32} className="feature-icon" />
              </div>
              <h3 className="feature-card-title">Gestão de Cursos</h3>
              <p className="feature-card-desc">
                Organize turmas, acompanhe matrículas e gerencie toda a grade curricular de forma simples e eficiente.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <BarChart2 size={32} className="feature-icon" />
              </div>
              <h3 className="feature-card-title">Painel de Controle</h3>
              <p className="feature-card-desc">
                Visão geral completa da instituição com métricas atualizadas em tempo real e relatórios detalhados.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <MessageSquare size={32} className="feature-icon" />
              </div>
              <h3 className="feature-card-title">Sistema de Mensagens</h3>
              <p className="feature-card-desc">
                Comunicação direta e rápida entre secretaria, alunos e responsáveis com histórico centralizado.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}