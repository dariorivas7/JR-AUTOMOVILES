import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth0();

    // Mientras Auth0 verifica si el usuario está conectado o no, mostramos un mensaje
    if (isLoading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Verificando credenciales...</div>;
    }

    // Si no está autenticado, lo enviamos (Navigate) a la página de login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Si está autenticado, renderizamos el componente "hijo" (la página protegida)
    return children;
}

export default ProtectedRoute;
