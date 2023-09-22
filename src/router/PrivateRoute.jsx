import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";

export const PrivateRoute = ({ children }) => {             //children me indica q es un high orden component

    const { logged } = useContext( AuthContext );
    const { pathname, search } = useLocation();

    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath);

  return (logged)
        ? children
        : <Navigate to='/login' />
}
