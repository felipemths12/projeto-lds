import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute.jsx';
import Homepage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx';
import Cadastro from './pages/Cadastro.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Alunos from './pages/Alunos.jsx';
import Cursos from './pages/Cursos.jsx';
import FormularioCurso from './pages/FormularioCurso.jsx';
import Matricula from './pages/Matricula.jsx';
import Agendamento from './pages/Agendamento.jsx';
import Mensagens from './pages/Mensagens.jsx';
import Turmas from './pages/Turmas.jsx';
import Funcionarios from './pages/Funcionarios.jsx';
import Estatisticas from './pages/Estatisticas.jsx';
import { AuthContext } from './contexts/AuthContext.jsx';

export default function App() {
  const contexto = useContext(AuthContext);
  const usuario = contexto ? contexto.usuario : null;

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* A tela inicial precisa ser a Homepage, como pedido. */}
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />

        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cursos" element={<Cursos />} />

        {/* Rotas protegidas */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/alunos" element={<PrivateRoute><Alunos /></PrivateRoute>} />
        <Route path="/formulario-curso" element={<PrivateRoute><FormularioCurso /></PrivateRoute>} />
        <Route path="/matricula" element={<PrivateRoute><Matricula /></PrivateRoute>} />
        <Route path="/turmas" element={<PrivateRoute><Turmas /></PrivateRoute>} />
        <Route path="/funcionarios" element={<PrivateRoute><Funcionarios /></PrivateRoute>} />
        <Route path="/estatisticas" element={<PrivateRoute><Estatisticas /></PrivateRoute>} />
        <Route path="/agendamento" element={<PrivateRoute><Agendamento /></PrivateRoute>} />
        <Route path="/mensagens" element={<PrivateRoute><Mensagens /></PrivateRoute>} />

        {/* Qualquer rota desconhecida volta para a homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Botão de chat flutuante — visível apenas para usuários autenticados */}
      {usuario && (
        <Link to="/mensagens" style={{
          position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#4f46e5',
          color: 'white', border: 'none', borderRadius: '50%', width: '60px', height: '60px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </Link>
      )}
    </BrowserRouter>
  );
}