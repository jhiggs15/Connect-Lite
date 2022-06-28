import 'antd/dist/antd.css';
import './Landing.css';
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const Landing = () => {

    return (
        <div>
            <h1> Welcome to Connect-Lite </h1>
            <p> This app was created to learn the GRAND stack.</p>
        </div>
        
    )
}