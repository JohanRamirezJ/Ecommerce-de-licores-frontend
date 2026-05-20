import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute funciona como un Decorador (Higher-Order Component / Wrapper)
 * Asegura de que el componente hijo solo se renderice si se cumplen
 * los requisitos de autenticación y rol. Reposiciona la lógica repetitiva.
 */
const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { isAuthenticated, user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // No hacer nada mientras el AuthContext todavía está cargando
        if (loading) return;

        if (!isAuthenticated) {
            // Guardar la ubicación actual para redirigir después del login
            sessionStorage.setItem('redirectAfterLogin', location.pathname + location.search);
            alert("Debes iniciar sesión para acceder a esta página");
            navigate('/login');
            return;
        }

        if (requiredRole && user?.role?.toLowerCase() !== requiredRole.toLowerCase()) {
            alert("No tienes permisos suficientes para acceder a esta área.");
            navigate('/');
        }
    }, [isAuthenticated, user, requiredRole, navigate, loading, location]);

    // Mientras carga, no renderizar nada (evita el flash de redirección)
    if (loading) return null;

    // Si no está autenticado, no renderiza nada mientras navega
    if (!isAuthenticated) return null;

    // Si requiere rol y no lo tiene, no renderiza
    if (requiredRole && user?.role?.toLowerCase() !== requiredRole.toLowerCase()) return null;

    return children;
};

export default ProtectedRoute;