import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

/*
 Componente de ruta protegida que verifica la autenticación y el rol del usuario
 HOC (Higher-Order Component)
*/

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user, loading, userRole } = useAuthContext();

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && userRole !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}