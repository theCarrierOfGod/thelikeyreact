import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './Auth';

export const MustLogin = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();

    let loc = location.pathname;
    if (loc === '/sign-in') {
        loc = '/';
    }


    if (!window.localStorage.getItem('username')) {
        return <Navigate to={`/sign-in?ref=${loc}`} />;
    }
    return children
}
