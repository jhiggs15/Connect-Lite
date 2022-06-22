import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import { getUser } from '../../graphQLOps/queries/getUser';
import { useQuery } from '@apollo/client';
import { ApolloWrapper } from '../../components/ApolloWrapper/ApolloWrappers';
import { doesUserExist } from '../../graphQLOps/queries/doesUserExist';
import { createArgs } from '../../graphQLOps/createInputs';

export const Home = () => {
    const input = {name : "Jhiggs"}
    const { loading, error, data } = useQuery(doesUserExist, createArgs(input))

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