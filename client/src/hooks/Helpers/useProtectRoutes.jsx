import { React, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../../context/userContext'

const useProtectRoutes = () => {
    const { user } = useContext(UserContext);
    const PageRouteProtection = ({ providedRole }) => {
        if (user !== undefined) {
            if (user === null) {
                return <Navigate to='/' />;
            } else if (!user.isVerified) {
                return <Navigate to='/emailverification' />;
            } else if (user.firstName === undefined) {
                console.log('kupal')
                return <Navigate to='/profileregistration' />;
            } else if (user.role === providedRole) {
                return <Outlet />;
            } else {
                return <Navigate to='/restriction' />;
            }
        }
        return null; 
    };
    
    const AuthPageProtection = () => {
        if (user !== undefined) {
            if (user === null) {
                return <Outlet />;
            } else if (!user.isVerified) {
                return <Navigate to='/emailverification' />;
            } else if (user.firstName === null) {
                console.log('tae')
                return <Navigate to='/profileregistration' />;
            } else if (user.role === 'user') {
                return <Navigate to='/home' />;
            } else if (user.role === 'admin') {
                return <Navigate to='/admin/dashboard' />;
            }
        }
        return null; 
    };

    return { PageRouteProtection, AuthPageProtection,  }
}



export default useProtectRoutes
