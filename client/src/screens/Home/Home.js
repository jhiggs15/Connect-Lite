import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import { getUser } from '../../queries/getUser';
import { useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { ApolloWrapper } from '../../components/ApolloWrapper/ApolloWrappers';
import { getSkills } from '../../queries/getSkills';

export const Home = () => {
    let navigate = useNavigate()

    const { loading, error, data } = useQuery(getUser)


    return (
        <div>
            <ApolloWrapper loadingStates={[loading]} errorStates={[error]}> 
                <div>
                    {JSON.stringify(data)}
                </div>
            </ApolloWrapper>

        </div>
    )

    // return (
    //     <h1>
    //         Home
    //     </h1>
    // )
}