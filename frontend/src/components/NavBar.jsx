import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'nav-item active' : 'nav-item';

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <div className="logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        </div>
        <span>Gestão Educacional</span>
      </div>

      <div className="navbar-links">
        <Link to="/" className={isActive('/')}>Painel</Link>
        <Link to="/alunos" className={isActive('/alunos')}>Alunos</Link>
        <Link to="/cursos" className={isActive('/cursos')}>Cursos</Link>
        <Link to="/matricula" className={isActive('/matricula')}>Matrícula</Link>
      </div>

      <div className="navbar-right">
        <Link to="/mensagens" className="nav-chat-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span className="chat-badge">3</span>
        </Link>

        <div className="navbar-profile">
          <div className="profile-info">
            <span className="profile-name">Admin</span>
            <span className="profile-role">Secretaria</span>
          </div>
          <div className="profile-avatar">
            A
          </div>
        </div>
      </div>
    </nav>
  );
}