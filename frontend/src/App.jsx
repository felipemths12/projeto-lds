import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx';
import Cadastro from './pages/Cadastro.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Mensagens from './pages/Mensagens.jsx';
import Cursos from './pages/Cursos.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mensagens" element={<Mensagens />} />
        <Route path="/cursos" element={<Cursos />} />
      </Routes>
    </BrowserRouter>
  );
}