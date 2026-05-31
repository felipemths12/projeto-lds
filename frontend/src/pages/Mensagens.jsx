import { useState } from 'react';
import './Mensagens.css';

export default function Mensagens() {
  const contatos = [
    { id: 1, nome: "Maria Santos", role: "Aluno", msg: "Obrigada pelas informações!", tempo: "10:32", unread: 0, online: true },
    { id: 2, nome: "João Silva", role: "Responsável", msg: "Qual o horário da reunião?", tempo: "09:45", unread: 1, online: false },
    { id: 3, nome: "Ana Oliveira", role: "Aluno", msg: "Pode me reenviar o arquivo?", tempo: "Ontem", unread: 2, online: true },
    { id: 4, nome: "Pedro Costa", role: "Responsável", msg: "Recibo recebido, obrigado.", tempo: "Ontem", unread: 0, online: false }
  ];

  const [contatoAtivo, setContatoAtivo] = useState(contatos[0]);
  const [isMobileList, setIsMobileList] = useState(true);

  const abrirChat = (contato) => {
    setContatoAtivo(contato);
    setIsMobileList(false);
  };

  return (
    <div className="mensagens-container">
      <div className="mensagens-header-text">
        <h1>Sistema de Mensagens</h1>
        <p>Atendimento e comunicação com alunos e responsáveis</p>
      </div>
      
      <div className="chat-layout">
        <div className={`chat-sidebar ${!isMobileList ? 'hide-on-mobile' : ''}`}>
          <div className="search-chat-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Buscar conversas..." className="search-chat-input" />
          </div>

          <div className="contatos-list">
            {contatos.map(contato => (
              <div 
                key={contato.id} 
                className={`contato-item ${contatoAtivo.id === contato.id ? 'active' : ''}`}
                onClick={() => abrirChat(contato)}
              >
                <div className="contato-avatar-wrapper">
                  <div className="contato-avatar bg-blue">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                  {contato.online && <div className="status-dot online"></div>}
                </div>
                <div className="contato-info">
                  <div className="contato-nome-tempo">
                    <span className="c-nome">{contato.nome}</span>
                    <span className="c-tempo">{contato.tempo}</span>
                  </div>
                  <div className="c-role">{contato.role}</div>
                  <div className={`c-msg ${contato.unread > 0 ? 'unread-text' : ''}`}>{contato.msg}</div>
                </div>
                {contato.unread > 0 && <div className="unread-badge">{contato.unread}</div>}
              </div>
            ))}
          </div>
        </div>
        
        <div className={`chat-main ${isMobileList ? 'hide-on-mobile' : ''}`}>
          <div className="chat-header">
            <div className="chat-header-user">
              <button className="btn-voltar-mobile" onClick={() => setIsMobileList(true)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </button>
              <div className="contato-avatar bg-blue">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <div>
                <div className="c-nome-header">{contatoAtivo.nome}</div>
                <div className="c-status">{contatoAtivo.online ? 'Online' : 'Offline'}</div>
              </div>
            </div>
            <div className="chat-header-actions">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </div>
          </div>

          <div className="chat-messages">
            <div className="msg-row received">
              <div className="msg-bubble grey">
                Olá, gostaria de saber sobre as notas das provas.
                <span className="msg-time">10:15</span>
              </div>
            </div>
            <div className="msg-row sent">
              <div className="msg-bubble purple">
                Boa tarde, {contatoAtivo.nome.split(' ')[0]}! As provas serão nos dias 13, 14 e 15 de maio.
                <span className="msg-time">10:20</span>
              </div>
            </div>
            <div className="msg-row received">
              <div className="msg-bubble grey">
                Perfeito! E o conteúdo da prova de matemática?
                <span className="msg-time">10:22</span>
              </div>
            </div>
            <div className="msg-row sent">
              <div className="msg-bubble purple">
                O conteúdo abrange os capítulos 4 e 5 do livro. Enviei um e-mail com os detalhes.
                <span className="msg-time">10:25</span>
              </div>
            </div>
            <div className="msg-row received">
              <div className="msg-bubble grey">
                {contatoAtivo.msg}
                <span className="msg-time">{contatoAtivo.tempo}</span>
              </div>
            </div>
          </div>

          <div className="chat-footer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{cursor: 'pointer'}}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
            <input type="text" placeholder="Digite sua mensagem..." className="msg-input" />
            <button className="btn-send-msg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}