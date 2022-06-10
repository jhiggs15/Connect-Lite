import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const Authentication = () => {
    let navigate = useNavigate()
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading} = useAuth0()

    useEffect(() =>{
        if(isAuthenticated) logout()
        else loginWithRedirect()
    } , [isAuthenticated])



}