import { useContext, useEffect, useState } from 'react';
import './Mensagens.css';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Mensagens() {
  const { usuario } = useContext(AuthContext);
  const [atendimentos, setAtendimentos] = useState([]);
  const [atendimentoAtivo, setAtendimentoAtivo] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [isMobileList, setIsMobileList] = useState(true);

  // Modal Novo Atendimento
  const [showModalNovoAtendimento, setShowModalNovoAtendimento] = useState(false);
  const [novoAtendimentoDados, setNovoAtendimentoDados] = useState({ assunto: '', targetId: '' });
  const [opcoesTarget, setOpcoesTarget] = useState([]);
  const [criandoAtendimento, setCriandoAtendimento] = useState(false);

  async function carregarAtendimentos() {
      setLoading(true);
      setErro('');
      try {
        const resposta = await api.get('/atendimentos');
        setAtendimentos(resposta.data || []);
        if ((resposta.data || []).length > 0) {
          setAtendimentoAtivo(resposta.data[0]);
        }
      } catch (error) {
        setErro('Não foi possível carregar os atendimentos.');
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    carregarAtendimentos();
  }, []);

  async function abrirModalNovo() {
    setNovoAtendimentoDados({ assunto: '', targetId: '' });
    setShowModalNovoAtendimento(true);
    try {
      if (usuario?.tipo === 'ALUNO') {
        const resp = await api.get('/funcionarios');
        const atendentes = (resp.data || []).filter(f => f.perfil_cargo === 'ATENDENTE' || f.perfil_cargo === 'ADMIN');
        setOpcoesTarget(atendentes);
      } else {
        const resp = await api.get('/alunos');
        setOpcoesTarget(resp.data || []);
      }
    } catch (e) {
      alert('Erro ao carregar lista para novo atendimento');
    }
  }

  async function criarAtendimento(e) {
    e.preventDefault();
    setCriandoAtendimento(true);
    try {
      const payload = {
        assunto: novoAtendimentoDados.assunto,
        codigo_aluno: usuario?.tipo === 'ALUNO' ? usuario.dados.codigo_aluno : novoAtendimentoDados.targetId,
        id_funcionario: usuario?.tipo === 'ALUNO' ? novoAtendimentoDados.targetId : usuario.dados.id_funcionario
      };
      await api.post('/atendimentos', payload);
      alert('Atendimento criado com sucesso!');
      setShowModalNovoAtendimento(false);
      carregarAtendimentos();
    } catch (error) {
      alert('Erro ao criar atendimento.');
    } finally {
      setCriandoAtendimento(false);
    }
  }

  useEffect(() => {
    async function carregarMensagens() {
      if (!atendimentoAtivo?.numero_protocolo) {
        setMensagens([]);
        return;
      }

      try {
        const resposta = await api.get(`/mensagens/protocolo/${atendimentoAtivo.numero_protocolo}`);
        setMensagens(resposta.data || []);
      } catch (error) {
        setMensagens([]);
      }
    }

    carregarMensagens();
  }, [atendimentoAtivo]);

  async function enviarMensagem() {
    if (!texto.trim() || !atendimentoAtivo) return;

    try {
      const payload = {
        conteudo: texto,
        numero_protocolo: atendimentoAtivo.numero_protocolo,
        id_remetente: usuario?.tipo === 'ALUNO' ? usuario?.dados?.codigo_aluno : usuario?.dados?.id_funcionario,
        tipo_remetente: usuario?.tipo === 'ALUNO' ? 'ALUNO' : 'FUNCIONARIO'
      };

      const resposta = await api.post('/mensagens', payload);
      setMensagens((listaAtual) => [...listaAtual, resposta.data]);
      setTexto('');
      alert('Mensagem enviada com sucesso.');
    } catch (error) {
      alert('Não foi possível enviar a mensagem.');
    }
  }

  return (
    <div className="mensagens-container">
      <div className="mensagens-header-text" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Sistema de Mensagens</h1>
          <p>Atendimento e comunicação com alunos</p>
        </div>
        <button className="btn-novo-curso" style={{ backgroundColor: '#4f46e5', alignSelf: 'center', marginTop: 0 }} onClick={abrirModalNovo}>
          Novo Atendimento
        </button>
      </div>

      {loading && <div style={{ padding: '20px' }}>Carregando atendimentos...</div>}
      {erro && <div style={{ padding: '20px', color: 'crimson' }}>{erro}</div>}

      <div className="chat-layout">
        <div className={`chat-sidebar ${!isMobileList ? 'hide-on-mobile' : ''}`}>
          <div className="search-chat-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Buscar conversas..." className="search-chat-input" />
          </div>

          <div className="contatos-list">
            {atendimentos.map((atendimento) => (
              <div
                key={atendimento.numero_protocolo}
                className={`contato-item ${atendimentoAtivo?.numero_protocolo === atendimento.numero_protocolo ? 'active' : ''}`}
                onClick={() => {
                  setAtendimentoAtivo(atendimento);
                  setIsMobileList(false);
                }}
              >
                <div className="contato-avatar-wrapper">
                  <div className="contato-avatar bg-blue">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                </div>
                <div className="contato-info">
                  <div className="contato-nome-tempo">
                    <span className="c-nome">{atendimento.nome_aluno || atendimento.nome_funcionario}</span>
                    <span className="c-tempo">{atendimento.status_atendimento}</span>
                  </div>
                  <div className="c-role">{atendimento.assunto}</div>
                </div>
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
                <div className="c-nome-header">{atendimentoAtivo ? (atendimentoAtivo.nome_aluno || atendimentoAtivo.nome_funcionario) : 'Selecione um atendimento'}</div>
                <div className="c-status">{atendimentoAtivo ? atendimentoAtivo.assunto : ''}</div>
              </div>
            </div>
            <div className="chat-header-actions"></div>
          </div>

          <div className="chat-messages">
            {mensagens.map((mensagem) => {
              const isSentByMe = (usuario?.tipo === 'ALUNO' && String(mensagem.codigo_aluno) === String(usuario?.dados?.codigo_aluno)) ||
                                 (usuario?.tipo === 'FUNCIONARIO' && String(mensagem.id_funcionario) === String(usuario?.dados?.id_funcionario));
              
              return (
                <div key={mensagem.codigo_mensagem} className={`msg-row ${isSentByMe ? 'sent' : 'received'}`}>
                  <div className={`msg-bubble ${isSentByMe ? 'purple' : 'grey'}`}>
                    {mensagem.conteudo}
                    <span className="msg-time">{mensagem.data_envio ? new Date(mensagem.data_envio).toLocaleString() : ''}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              className="msg-input"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <button className="btn-send-msg" onClick={enviarMensagem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      </div>

      {showModalNovoAtendimento && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Novo Atendimento</h2>
            <form onSubmit={criarAtendimento}>
              <div className="form-group">
                <label>Assunto</label>
                <input 
                  type="text" 
                  className="modal-input" 
                  value={novoAtendimentoDados.assunto}
                  onChange={e => setNovoAtendimentoDados({...novoAtendimentoDados, assunto: e.target.value})}
                  required
                  placeholder="Ex: Dúvida sobre matrícula"
                />
              </div>
              <div className="form-group">
                <label>{usuario?.tipo === 'ALUNO' ? 'Atendente' : 'Aluno'}</label>
                <select 
                  className="modal-input"
                  value={novoAtendimentoDados.targetId}
                  onChange={e => setNovoAtendimentoDados({...novoAtendimentoDados, targetId: e.target.value})}
                  required
                >
                  <option value="">-- Selecione --</option>
                  {opcoesTarget.map(opt => (
                    <option key={opt.codigo_aluno || opt.id_funcionario} value={opt.codigo_aluno || opt.id_funcionario}>
                      {opt.nome} {opt.perfil_cargo ? `(${opt.perfil_cargo})` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowModalNovoAtendimento(false)}>Cancelar</button>
                <button type="submit" className="btn-modal-save" disabled={criandoAtendimento}>
                  {criandoAtendimento ? 'Criando...' : 'Iniciar Conversa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
