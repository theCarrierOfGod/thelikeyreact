import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './Auth';

export const MustBeOut = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();

    if (window.localStorage.getItem('username')) {
        return <Navigate to={`/`} />;
    }
    return children
}
