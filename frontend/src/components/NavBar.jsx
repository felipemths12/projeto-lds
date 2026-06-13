import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import './NavBar.css';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function NavBar() {
  const location = useLocation();
  const contexto = useContext(AuthContext);
  const usuario = contexto ? contexto.usuario : null;
  const logout = contexto ? contexto.logout : () => {};
  const ehAdmin = usuario?.cargo === 'ADMIN';

  const isActive = (path) => location.pathname === path ? 'nav-item active' : 'nav-item';

  if (!usuario) {
    return (
      <nav className="navbar-container">
        <div className="navbar-logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          </div>
          <span>Gestão Educacional</span>
        </div>

        <div className="navbar-links">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/cursos" className={isActive('/cursos')}>Catálogo de Cursos</Link>
          <Link to="/login" className={isActive('/login')}>Login</Link>
        </div>

        <div className="navbar-right" />
      </nav>
    );
  }

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <div className="logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        </div>
        <span>Gestão Educacional</span>
      </div>

      <div className="navbar-links">
        <Link to="/" className={isActive('/')}>Home</Link>
        {['ADMIN', 'ATENDENTE'].includes(usuario?.cargo) && <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>}
        {usuario?.tipo !== 'ALUNO' && <Link to="/alunos" className={isActive('/alunos')}>Alunos</Link>}
        <Link to="/cursos" className={isActive('/cursos')}>Catálogo de Cursos</Link>
        <Link to="/turmas" className={isActive('/turmas')}>Turmas</Link>
        <Link to="/matricula" className={isActive('/matricula')}>Matrícula</Link>
        {ehAdmin && <Link to="/funcionarios" className={isActive('/funcionarios')}>Funcionários</Link>}
        {['ADMIN', 'ATENDENTE'].includes(usuario?.cargo) && <Link to="/estatisticas" className={isActive('/estatisticas')}>Estatísticas</Link>}
      </div>

      <div className="navbar-right">
        <Link to="/mensagens" className="nav-chat-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </Link>

        <div className="navbar-profile">
          <div className="profile-info">
            <span className="profile-name">{usuario?.dados?.nome || 'Usuário'}</span>
            <span className="profile-role">{usuario?.cargo || usuario?.tipo}</span>
          </div>
          <div className="profile-avatar" onClick={logout} title="Sair">
            {String(usuario?.dados?.nome || 'U').charAt(0)}
          </div>
          <button
            type="button"
            onClick={logout}
            style={{
              marginLeft: '12px',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: 'white',
              color: '#334155',
              cursor: 'pointer'
            }}
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}