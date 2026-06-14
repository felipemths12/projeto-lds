import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro.css';
import api from '../services/api';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '', cpf: '', rg: '', email: '', senha: '', telefone: '', logradouro: '', cep: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, '')
      };
      await api.post('/alunos', payload);
      alert('Cadastro realizado com sucesso! Você já pode fazer login.');
      navigate('/login');
    } catch (error) {
      // 1. Exibe o erro no console (F12) para ajudar a debugar se algo der errado
      console.log("Erro da API:", error.response?.data);

      const dadosDoErro = error.response?.data;

      // 2. Verifica se a resposta é um Array (Lista de erros do DTO validado pelo Spring)
      if (Array.isArray(dadosDoErro)) {
        let mensagemAmigavel = "Verifique os seguintes campos:\n\n";
        
        // 3. Percorre a lista de erros e monta a mensagem final
        dadosDoErro.forEach(erro => {
          mensagemAmigavel += `Erro no campo ${erro.campo}: ${erro.mensagem}\n`;
        });
        
        alert(mensagemAmigavel);

      // 4. Se não for Array, verifica se é uma String (Regra de negócio como "CPF Duplicado")
      } else if (typeof dadosDoErro === 'string') {
        alert(dadosDoErro);

      // 5. Se não for nenhum dos anteriores, exibe a mensagem genérica de fallback
      } else {
        alert("Ocorreu um erro ao realizar o cadastro. Verifique os dados e tente novamente.");
      }
    } finally {
      setLoading(false);
    }
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
                <input type="password" name="senha" placeholder="•••••••" value={formData.senha} onChange={handleChange} minLength={8} required />
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