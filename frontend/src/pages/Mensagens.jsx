import { Search, Phone, Video, MoreVertical, Paperclip, Send, User } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import './Mensagens.css';

export default function Mensagens() {
  return (
    <PageLayout 
      title="Sistema de Mensagens" 
      subtitle="Atendimento e comunicação com alunos e responsáveis"
    >
      <div className="mensagens-container">
        
        {/* Left Sidebar - Conversations List */}
        <div className="mensagens-sidebar">
          <div className="search-box">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={18} />
              <input type="text" placeholder="Buscar conversas..." />
            </div>
          </div>
          
          <div className="conversations-list">
            <div className="conversation-item active">
              <div className="conv-avatar">
                <User size={24} />
                <div className="online-indicator"></div>
              </div>
              <div className="conv-info">
                <div className="conv-header">
                  <span className="conv-name">Maria Santos</span>
                  <span className="conv-time">10:30</span>
                </div>
                <span className="conv-role">Aluno</span>
                <div className="conv-preview">
                  Obrigada pelas informações!
                </div>
              </div>
            </div>
            
            <div className="conversation-item">
              <div className="conv-avatar">
                <User size={24} />
              </div>
              <div className="conv-info">
                <div className="conv-header">
                  <span className="conv-name">João Silva</span>
                  <span className="conv-time">09:45</span>
                </div>
                <span className="conv-role">Responsável</span>
                <div className="conv-preview">
                  <span>Qual o horário da reunião?</span>
                  <span className="unread-badge">2</span>
                </div>
              </div>
            </div>
            
            <div className="conversation-item">
              <div className="conv-avatar">
                <User size={24} />
              </div>
              <div className="conv-info">
                <div className="conv-header">
                  <span className="conv-name">Ana Oliveira</span>
                  <span className="conv-time">Ontem</span>
                </div>
                <span className="conv-role">Aluno</span>
                <div className="conv-preview">
                  <span>Posso remarcar a prova?</span>
                  <span className="unread-badge">1</span>
                </div>
              </div>
            </div>
            
            <div className="conversation-item">
              <div className="conv-avatar">
                <User size={24} />
              </div>
              <div className="conv-info">
                <div className="conv-header">
                  <span className="conv-name">Pedro Costa</span>
                  <span className="conv-time">Ontem</span>
                </div>
                <span className="conv-role">Responsável</span>
                <div className="conv-preview">
                  Recebi o boleto, obrigado!
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Right Area - Active Chat */}
        <div className="chat-area">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-header-avatar">
                <User size={20} />
              </div>
              <div className="chat-header-details">
                <h3>Maria Santos</h3>
                <div className="chat-header-status">Online</div>
              </div>
            </div>
            <div className="chat-header-actions">
              <button><Phone size={20} /></button>
              <button><Video size={20} /></button>
              <button><MoreVertical size={20} /></button>
            </div>
          </div>
          
          <div className="chat-history">
            <div className="chat-bubble received">
              Boa tarde! Gostaria de saber sobre as datas das provas
              <div className="chat-time">10:15</div>
            </div>
            
            <div className="chat-bubble sent">
              Boa tarde, Maria! As provas serão nos dias 15, 17 e 20 de maio.
              <div className="chat-time">10:20</div>
            </div>
            
            <div className="chat-bubble received">
              Perfeito! E o conteúdo da prova de matemática?
              <div className="chat-time">10:25</div>
            </div>
            
            <div className="chat-bubble sent">
              O conteúdo abrange os capítulos 5 a 8 do livro. Enviamos um resumo por email.
              <div className="chat-time">10:28</div>
            </div>
            
            <div className="chat-bubble received">
              Obrigada pelas informações!
              <div className="chat-time">10:30</div>
            </div>
          </div>
          
          <div className="chat-input-area">
            <div className="chat-input-wrapper">
              <button className="attach-btn"><Paperclip size={20} /></button>
              <input type="text" placeholder="Digite sua mensagem..." />
              <button className="send-btn"><Send size={16} /></button>
            </div>
            <div className="input-hint">Pressione Enter para enviar</div>
          </div>
        </div>
        
      </div>
    </PageLayout>
  );
}
