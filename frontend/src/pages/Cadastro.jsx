import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cadastro.css';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '', cpf: '', rg: '', email: '', senha: '', telefone: '', logradouro: '', cep: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCadastro = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <div className="logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
        </div>
        <h2>Criar Nova Conta</h2>
        <p className="subtitle">Preencha seus dados para acessar o sistema</p>
        <form onSubmit={handleCadastro}>
          <div className="form-grid">
            <div className="input-group full-width">
              <label>Nome Completo</label>
              <div className="input-wrapper">
                <input type="text" name="nome" placeholder="Ex: João da Silva" value={formData.nome} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-group">
              <label>CPF</label>
              <div className="input-wrapper">
                <input type="text" name="cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-group">
              <label>RG</label>
              <div className="input-wrapper">
                <input type="text" name="rg" placeholder="00.000.000-0" value={formData.rg} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-group">
              <label>Email</label>
              <div className="input-wrapper">
                <input type="email" name="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-group">
              <label>Senha</label>
              <div className="input-wrapper">
                <input type="password" name="senha" placeholder="•••••••" value={formData.senha} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-group">
              <label>Telefone</label>
              <div className="input-wrapper">
                <input type="text" name="telefone" placeholder="(00) 00000-0000" value={formData.telefone} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-group">
              <label>CEP</label>
              <div className="input-wrapper">
                <input type="text" name="cep" placeholder="00000-000" value={formData.cep} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-group full-width">
              <label>Endereço</label>
              <div className="input-wrapper">
                <input type="text" name="logradouro" placeholder="Ex: Rua das Flores, 123" value={formData.logradouro} onChange={handleChange} required />
              </div>
            </div>
          </div>
          <button type="submit" className="btn-cadastrar">Finalizar Cadastro</button>
        </form>
        <div className="cadastro-footer">
          Já tem uma conta? <Link to="/login">Faça Login</Link>
        </div>
      </div>
    </div>
  );
}