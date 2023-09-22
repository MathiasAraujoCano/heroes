import { Navigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";

export const PublicRoute = ({ children }) => {             //children me indica q es un high orden component

    const { logged } = useContext( AuthContext );

  return ( !logged )
        ? children
        : <Navigate to='/marvel' />
}
