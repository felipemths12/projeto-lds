import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, GraduationCap } from 'lucide-react';
import { api } from '../services/api';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/login', { email, senha });
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        navigate('/dashboard');
      } else {
        setError('Token inválido recebido.');
      }
    } catch (err) {
      setError(err.message || 'Falha ao realizar login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo-icon">
          <GraduationCap size={28} />
        </div>
        <h2>Sistema Escolar</h2>
        <p className="subtitle">Faça login para continuar</p>
        
        {error && <div className="error-message" style={{ color: 'red', fontSize: '13px', marginBottom: '16px' }}>{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                placeholder="seu@email.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>
          
          <div className="input-group">
            <label>Senha</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
                required 
              />
            </div>
          </div>
          
          <div className="options-group">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span>Lembrar-me</span>
            </label>
            <a href="#" className="forgot-password">Esqueceu a senha?</a>
          </div>
          
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        <div className="auth-footer">
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
}