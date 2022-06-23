import 'antd/dist/antd.css';
import './Landing.css';
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const Landing = () => {

    const {user, getIdTokenClaims} = useAuth0()

    const [claim, setClaim] = useState()
    getIdTokenClaims().then(claimsRe => setClaim(claimsRe))

    return (
        <div>
            <h1> Welcome to Connect-Lite </h1>
            <h1>{JSON.stringify(user)}</h1>
            <h1>{JSON.stringify(claim)}</h1>
            <p> This app was created to learn the GRAND stack.</p>
        </div>
        
    )
}