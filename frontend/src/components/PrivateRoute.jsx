import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

// Protege páginas internas: sem usuário autenticado, o acesso volta para o login.
export default function PrivateRoute({ children }) {
  const contexto = useContext(AuthContext);
  const usuario = contexto ? contexto.usuario : null;

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
