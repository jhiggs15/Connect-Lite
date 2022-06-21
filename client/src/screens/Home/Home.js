import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import { getUser } from '../../graphQLOps/queries/getUser';
import { useQuery } from '@apollo/client';
import { ApolloWrapper } from '../../components/ApolloWrapper/ApolloWrappers';

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

}