import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, ChevronDown, ArrowLeft, GraduationCap, MapPin, CreditCard, Hash } from 'lucide-react';
import { api } from '../services/api';
import './Cadastro.css';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '', cpf: '', rg: '', email: '', senha: '', confirmarSenha: '', telefone: '', cep: '', logradouro: '', tipoUsuario: 'Aluno'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // The backend expects specific fields. We omit confirmarSenha and tipoUsuario for the API payload if not supported.
      const payload = {
        nome: formData.nome,
        cpf: formData.cpf,
        rg: formData.rg,
        email: formData.email,
        senha: formData.senha,
        telefone: formData.telefone,
        logradouro: formData.logradouro,
        cep: formData.cep
      };
      
      await api.post('/alunos', payload);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Falha ao realizar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-card">
        <Link to="/login" className="back-link">
          <ArrowLeft size={16} /> Voltar ao login
        </Link>
        
        <div className="logo-icon">
          <GraduationCap size={28} />
        </div>
        <h2>Criar Conta</h2>
        <p className="subtitle">Preencha os dados para se cadastrar</p>
        
        {error && <div style={{ color: 'red', fontSize: '13px', marginBottom: '16px' }}>{error}</div>}
        {success && <div style={{ color: 'green', fontSize: '13px', marginBottom: '16px' }}>Cadastro realizado com sucesso! Redirecionando...</div>}
        
        <form onSubmit={handleCadastro}>
          <div className="form-grid">
            
            <div className="input-group full-width">
              <label>Nome Completo</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input type="text" name="nome" placeholder="João Silva" value={formData.nome} onChange={handleChange} required />
              </div>
            </div>
            
            <div className="input-group">
              <label>CPF</label>
              <div className="input-wrapper">
                <CreditCard className="input-icon" size={18} />
                <input type="text" name="cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} required />
              </div>
            </div>
            
            <div className="input-group">
              <label>RG</label>
              <div className="input-wrapper">
                <Hash className="input-icon" size={18} />
                <input type="text" name="rg" placeholder="00.000.000-0" value={formData.rg} onChange={handleChange} required />
              </div>
            </div>
            
            <div className="input-group full-width">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input type="email" name="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <label>Telefone</label>
              <div className="input-wrapper">
                <Phone className="input-icon" size={18} />
                <input type="text" name="telefone" placeholder="(11) 99999-9999" value={formData.telefone} onChange={handleChange} required />
              </div>
            </div>
            
            <div className="input-group">
              <label>CEP</label>
              <div className="input-wrapper">
                <MapPin className="input-icon" size={18} />
                <input type="text" name="cep" placeholder="00000-000" value={formData.cep} onChange={handleChange} required />
              </div>
            </div>
            
            <div className="input-group full-width">
              <label>Endereço</label>
              <div className="input-wrapper">
                <MapPin className="input-icon" size={18} />
                <input type="text" name="logradouro" placeholder="Rua das Flores, 123" value={formData.logradouro} onChange={handleChange} required />
              </div>
            </div>
            
            <div className="input-group">
              <label>Senha</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input type="password" name="senha" placeholder="••••••••" value={formData.senha} onChange={handleChange} required />
              </div>
            </div>
            
            <div className="input-group">
              <label>Confirmar Senha</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input type="password" name="confirmarSenha" placeholder="••••••••" value={formData.confirmarSenha} onChange={handleChange} required />
              </div>
            </div>
            

            
          </div>
          
          <div className="terms-group">
            <label className="checkbox-container">
              <input type="checkbox" required />
              <span>
                Aceito os <a href="#" className="terms-link">termos de uso</a> e a <a href="#" className="terms-link">política de privacidade</a>
              </span>
            </label>
          </div>
          
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>
      </div>
    </div>
  );
}