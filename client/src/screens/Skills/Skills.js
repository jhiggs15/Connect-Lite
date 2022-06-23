import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import { ApolloWrapper } from '../../components/ApolloWrapper/ApolloWrappers';



export const Skills = () => {
    let navigate = useNavigate()

    return (
        <ApolloWrapper errorStates={[]} loadingStates={[]}>
            <h1>
                Skills
            </h1>
        </ApolloWrapper>

    )
}