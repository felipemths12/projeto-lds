import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Alunos.css';

export default function Alunos() {
  const navigate = useNavigate();
  
  // Criando os estados para guardar o que o usuário digita e seleciona
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos os Status');

  const listaAlunos = [
    { id: 1, nome: "João Silva", email: "joao@email.com", cpf: "123.456.789-00", contato: "(11) 99999-9999", nascimento: "15/05/2008", status: "Ativo" },
    { id: 2, nome: "Maria Santos", email: "maria@email.com", cpf: "987.654.321-00", contato: "(11) 98888-8888", nascimento: "22/08/2007", status: "Ativo" },
    { id: 3, nome: "Pedro Costa", email: "pedro@email.com", cpf: "456.789.123-00", contato: "(11) 97777-7777", nascimento: "10/03/2009", status: "Ativo" },
    { id: 4, nome: "Ana Oliveira", email: "ana@email.com", cpf: "321.654.987-00", contato: "(11) 96666-5555", nascimento: "30/11/2008", status: "Inativo" }
  ];

  // Lógica pesada: Filtrando a lista baseada no termo de busca e no status
  const alunosFiltrados = listaAlunos.filter(aluno => {
    // 1. Verifica se o texto digitado bate com nome, email ou cpf
    const matchBusca = 
      aluno.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      aluno.email.toLowerCase().includes(termoBusca.toLowerCase()) ||
      aluno.cpf.includes(termoBusca);
    
    // 2. Verifica se o status selecionado bate com o status do aluno
    const matchStatus = filtroStatus === 'Todos os Status' || aluno.status === filtroStatus;

    // Só mostra na tela se passar nos dois testes
    return matchBusca && matchStatus;
  });

  return (
    <div className="alunos-container">
      <div className="alunos-header">
        <div className="alunos-title">
          <h1>Cadastro de Alunos</h1>
          <p>Gerencie os alunos da instituição</p>
        </div>
        <button className="btn-novo-aluno" onClick={() => navigate('/cadastro')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Novo Aluno
        </button>
      </div>

      <div className="alunos-filters">
        <div className="search-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Buscar por nome, CPF ou email..." 
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)} // Atualiza a busca ao digitar
          />
        </div>
        <select 
          className="status-select" 
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)} // Atualiza o filtro ao selecionar
        >
          <option value="Todos os Status">Todos os Status</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="alunos-table">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>CPF</th>
              <th>Contato</th>
              <th>Data Nasc.</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* Agora fazemos o map nos alunos FILTRADOS em vez da lista completa */}
            {alunosFiltrados.map(aluno => (
              <tr key={aluno.id}>
                <td>
                  <div className="aluno-info-cell">
                    <div className="aluno-avatar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <div className="aluno-name-email">
                      <span className="aluno-name">{aluno.nome}</span>
                      <span className="aluno-email">{aluno.email}</span>
                    </div>
                  </div>
                </td>
                <td>{aluno.cpf}</td>
                <td>{aluno.contato}</td>
                <td>{aluno.nascimento}</td>
                <td>
                  <span className={`status-badge ${aluno.status === 'Ativo' ? 'status-ativo' : 'status-inativo'}`}>
                    {aluno.status}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="btn-icon-action btn-edit">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path></svg>
                    </button>
                    <button className="btn-icon-action btn-delete">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Mostra uma mensagem amigável caso a busca não encontre ninguém */}
        {alunosFiltrados.length === 0 && (
          <div style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>
            Nenhum aluno encontrado com esses filtros.
          </div>
        )}
      </div>

      <div className="pagination-wrapper">
        <span className="pagination-info">Mostrando {alunosFiltrados.length} de {listaAlunos.length} alunos</span>
        <div className="pagination-buttons">
          <button className="btn-pagination-nav">Anterior</button>
          <button className="page-number">1</button>
          <button className="btn-pagination-nav">Próximo</button>
        </div>
      </div>
    </div>
  );
}