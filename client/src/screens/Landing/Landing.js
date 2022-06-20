import 'antd/dist/antd.css';
import './Landing.css';
import React from 'react';
import { getUser } from '../../queries/getUser';
import { useQuery } from '@apollo/client';

import { useAuth0 } from '@auth0/auth0-react';
import { ApolloWrapper } from '../../components/ApolloWrapper/ApolloWrappers';
import { getSkills } from '../../queries/getSkills';

export const Landing = () => {


    return (
        <div>
            <h1> Welcome to Connect-Lite </h1>
            <p> This app was created to learn the GRAND stack.</p>
        </div>
        
    )
}