import { createContext, useEffect, useState } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try {
      const salvo = sessionStorage.getItem('user');
      return salvo ? JSON.parse(salvo) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => sessionStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', token);
    } else {
      sessionStorage.removeItem('token');
    }
  }, [token]);

  function decodificarPayload(jwt) {
    try {
      const base64Url = jwt.split('.')[1] || '';
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atob(base64)
          .split('')
          .map((caractere) => '%' + ('00' + caractere.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(json);
    } catch {
      return {};
    }
  }

  function normalizarCpf(valor) {
    return String(valor || '').replace(/\D/g, '');
  }

  async function login(loginDigitado, senha) {
    const resposta = await api.post('/login', { login: loginDigitado, senha });
    const jwt = resposta.data?.token;

    if (!jwt) {
      throw new Error('Token não retornado pelo backend');
    }

    // Guardamos imediatamente para os interceptors já conseguirem ler o token.
    setToken(jwt);
    sessionStorage.setItem('token', jwt);

    const payload = decodificarPayload(jwt);
    const subject = payload.sub || payload.subject || loginDigitado;

    if (String(subject).includes('@')) {
      const respostaAlunos = await api.get('/alunos');
      const listaAlunos = respostaAlunos.data || [];
      const usuarioEncontrado = listaAlunos.find((aluno) => String(aluno.email || '').toLowerCase() === String(subject).toLowerCase());

      if (usuarioEncontrado) {
        const usuarioFormatado = {
          tipo: 'ALUNO',
          cargo: 'ALUNO',
          dados: usuarioEncontrado
        };
        setUsuario(usuarioFormatado);
        sessionStorage.setItem('user', JSON.stringify(usuarioFormatado));
        return usuarioFormatado;
      }
    } else {
      const cpfNormalizado = normalizarCpf(subject);
      const respostaFuncionarios = await api.get('/funcionarios');
      const listaFuncionarios = respostaFuncionarios.data || [];
      const funcionarioEncontrado = listaFuncionarios.find((funcionario) => normalizarCpf(funcionario.cpf) === cpfNormalizado);

      if (funcionarioEncontrado) {
        const usuarioFormatado = {
          tipo: 'FUNCIONARIO',
          cargo: funcionarioEncontrado.perfil_cargo || 'FUNCIONARIO',
          dados: funcionarioEncontrado
        };
        setUsuario(usuarioFormatado);
        sessionStorage.setItem('user', JSON.stringify(usuarioFormatado));
        return usuarioFormatado;
      }
    }

    const usuarioFormatado = { tipo: 'DESCONHECIDO', cargo: null, subject };
    setUsuario(usuarioFormatado);
    sessionStorage.setItem('user', JSON.stringify(usuarioFormatado));
    return usuarioFormatado;
  }

  function logout() {
    setToken(null);
    setUsuario(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.href = '/login';
  }

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}