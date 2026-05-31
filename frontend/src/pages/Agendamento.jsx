import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Agendamento.css';

export default function Agendamento() {
  const navigate = useNavigate();
  const [sucesso, setSucesso] = useState(false);

  return (
    <div className="agendamento-container">
      <div className="agendamento-header">
        <h1>Agendamento de Atendimento</h1>
        <p>Agende reuniões com professores e coordenadores</p>
      </div>

      {sucesso ? (
        <div className="agendamento-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <h2 style={{ color: '#1e293b', marginBottom: '10px' }}>Agendamento Confirmado!</h2>
          <p style={{ color: '#64748b', marginBottom: '30px' }}>O professor foi notificado e o horário está reservado em sua agenda.</p>
          <button className="btn-agendar" style={{ maxWidth: '250px', margin: '0 auto' }} onClick={() => setSucesso(false)}>
            Fazer Novo Agendamento
          </button>
        </div>
      ) : (
        <div className="agendamento-card">
          <h3>Novo Agendamento</h3>
          
          <div className="form-group">
            <label>Professor / Coordenador</label>
            <div className="input-with-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <select className="form-input">
                <option>Selecione um professor</option>
                <option>Prof. Maria Santos</option>
                <option>Prof. João Silva</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Data do atendimento</label>
            <div className="input-with-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <input type="date" className="form-input" />
            </div>
          </div>

          <div className="form-group">
            <label>Horários</label>
            <div className="horarios-grid">
              {['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'].map(h => (
                <button key={h} className="btn-horario">{h}</button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Motivo do Atendimento</label>
            <div className="input-with-icon align-top">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              <textarea className="form-input" placeholder="Descreva brevemente o motivo do atendimento" rows="4"></textarea>
            </div>
          </div>

          <button className="btn-agendar" onClick={() => setSucesso(true)}>Agendar Atendimento</button>
        </div>
      )}

      <div className="agendamentos-list-container">
        <h3>Próximos Agendamentos</h3>
        
        <div className="agendamento-item">
          <div className="agendamento-item-header">
            <div className="agendamento-info">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span className="agendamento-data">13/05/2026</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span className="agendamento-hora">09:00</span>
            </div>
            <span className="badge-confirmado">Confirmado</span>
          </div>
          <p className="agendamento-prof">Prof. Maria Santos</p>
          <div className="agendamento-actions">
            <button className="btn-reagendar">Reagendar</button>
            <button className="btn-cancelar-ag">Cancelar</button>
          </div>
        </div>

        <div className="agendamento-item">
          <div className="agendamento-item-header">
            <div className="agendamento-info">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span className="agendamento-data">15/05/2026</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span className="agendamento-hora">14:00</span>
            </div>
            <span className="badge-pendente">Pendente</span>
          </div>
          <p className="agendamento-prof">Prof. João Costa</p>
          <div className="agendamento-actions">
            <button className="btn-reagendar">Reagendar</button>
            <button className="btn-cancelar-ag">Cancelar</button>
          </div>
        </div>
      </div>

      <div className="dicas-box">
        <h4>Dicas para o Atendimento</h4>
        <ul>
          <li>Chegue com 5 minutos de antecedência.</li>
          <li>Traga os documentos necessários (boletins, laudos, etc).</li>
          <li>Em caso de imprevistos, cancele com antecedência.</li>
          <li>Anote suas dúvidas para não esquecer nada.</li>
        </ul>
      </div>
    </div>
  );
}