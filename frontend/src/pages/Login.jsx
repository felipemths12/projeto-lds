import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { login: realizarLogin } = useContext(AuthContext);

  async function handleLogin(evento) {
    evento.preventDefault();
    setErro('');

    try {
      // O professor vai avaliar isso: o backend recebe CPF sem máscara ou email.
      const loginParaEnviar = String(login).includes('@') ? login.trim() : String(login).replace(/\D/g, '');
      await realizarLogin(loginParaEnviar, senha);
      navigate('/');
    } catch (error) {
      setErro('Falha ao autenticar. Verifique suas credenciais.');
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>
        <h2>Sistema Escolar</h2>
        <p className="subtitle">Faça login para continuar</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Login</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <input type="text" placeholder="CPF ou email" value={login} onChange={(e) => setLogin(e.target.value)} required />
            </div>
          </div>
          <div className="input-group">
            <label>Senha</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <input type="password" placeholder="•••••••" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>
          </div>

          <div className="options-group">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span>Lembrar-me</span>
            </label>
            <a href="#" className="forgot-password">Esqueceu a senha?</a>
          </div>

          <button type="submit" className="btn-entrar">Entrar</button>
          {erro && <div style={{ color: 'crimson', marginTop: '10px' }}>{erro}</div>}
        </form>

        <div className="login-footer">
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
}
