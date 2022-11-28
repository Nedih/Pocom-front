import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

const AuthRoutes = () => {
    const { auth } = useAuth();
    return(
        auth.loggedIn ? <Outlet/> : <Navigate to="/sign_in" replace/>
    )
}

export default AuthRoutes