import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
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

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/formulario-curso" element={<FormularioCurso />} />
        <Route path="/matricula" element={<Matricula />} />
        <Route path="/agendamento" element={<Agendamento />} />
        <Route path="/mensagens" element={<Mensagens />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
      
      <Link to="/mensagens" style={{
        position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#4f46e5',
        color: 'white', border: 'none', borderRadius: '50%', width: '60px', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </Link>
    </BrowserRouter>
  );
}