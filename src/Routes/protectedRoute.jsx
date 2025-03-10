import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = useSelector((state) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" />;
    }

    // ✅ Role-based access (if needed)
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children || <h2>Not Found</h2>; // ✅ Prevent empty page
};

export default ProtectedRoute;
