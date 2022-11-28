import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

const AdminRoutes = () => {
    const { auth } = useAuth();
    return(
        auth.roles?.find(el => el === "Admin")  ? <Outlet/> : <h>HTTP_401: Access Denied</h>
    )
}

export default AdminRoutes