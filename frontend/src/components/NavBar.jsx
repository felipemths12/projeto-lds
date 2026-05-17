import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: '#1a1a1a', fontSize: '20px', fontWeight: 'bold' }}>
          Gestão Educacional
        </Link>
      </div>
      <div className="menu">
        <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Início</Link>
        <Link to="/login" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Entrar</Link>
        <Link to="/cadastro">
          <button style={{ padding: '8px 16px', backgroundColor: '#5b4ee4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Cadastre-se
          </button>
        </Link>
      </div>
    </nav>
  );
}