import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import { ApolloWrapper } from '../../components/ApolloWrapper/ApolloWrappers';
import { useMutation } from '@apollo/client';
import { createUser } from '../../graphQLOps/mutation/createUser';
import { createArgs } from '../../graphQLOps/createInputs';


export const Skills = () => {
    let navigate = useNavigate()

    const [createTheUser, { loading, error }] = useMutation(createUser);


    return (
        <ApolloWrapper errorStates={[error]} loadingStates={[loading]}>
            <h1>
                Skills
            </h1>
            <button onClick={() => {
                try{
                    createTheUser(createArgs({name : "jdawgl"}))
                } catch(e) {
                    console.error(error)
                }


            }}>
                Buttt
            </button>
        </ApolloWrapper>

    )
}