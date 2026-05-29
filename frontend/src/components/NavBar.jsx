import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Bell, LogOut } from 'lucide-react';
import './NavBar.css';

export default function NavBar({ isPublic }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Basic logout logic here for now
    navigate('/login');
  };

  return (
    <nav className="top-navbar">
      <Link to={isPublic ? "/" : "/dashboard"} className="navbar-brand">
        <div className="brand-icon">
          <GraduationCap size={24} />
        </div>
        <span className="brand-text">Sistema Escolar</span>
      </Link>
      
      <div className="navbar-actions">
        {isPublic ? (
          <div className="public-nav-actions">
            <Link to="/cursos" className="nav-link">Cursos</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/cadastro" className="nav-btn-primary">Criar Conta</Link>
          </div>
        ) : (
          <>
            <button className="notification-btn" title="Notificações">
              <Bell size={20} />
              <span className="notification-badge"></span>
            </button>
            
            <div className="user-profile">
              <div className="user-info">
                <span className="user-name">Admin</span>
                <span className="user-role">Secretaria</span>
              </div>
              <div className="user-avatar">
                AD
              </div>
              <button className="logout-btn" onClick={handleLogout} title="Sair">
                <LogOut size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}