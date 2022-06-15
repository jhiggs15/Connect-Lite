import 'antd/dist/antd.css';
import './Landing.css';
import React from 'react';
import { getUser } from '../../queries/getUser';
import { useQuery } from '@apollo/client';

import { useAuth0 } from '@auth0/auth0-react';
import { ApolloWrapper } from '../../components/ApolloWrapper/ApolloWrappers';
import { getSkills } from '../../queries/getSkills';

export const Landing = () => {

    const { user } = useAuth0()

    const { loading, error, data } = useQuery(getUser)
    const { loading: loading2, error: error2, data: data2 } = useQuery(getSkills)


    

    return (
        <div>
            <ApolloWrapper loadingStates={[loading, loading2]} errorStates={[error, error2]}> 
                <div>
                    { JSON.stringify(loading) }
                </div>
                <div>
                    { JSON.stringify(data) }
                </div>
                <div>  
                    { JSON.stringify(user) }
                </div>
            </ApolloWrapper>

        </div>
    )
    // return (
    //     <div>
    //         <h1> Welcome to Connect-Lite </h1>
    //         <p> This app was created to learn the GRAND stack.</p>
    //     </div>
        
    // )
}