import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import { useQuery } from '@apollo/client';
import { ApolloWrapper } from '../../components/ApolloWrapper/ApolloWrappers';
import { doesUserExist } from '../../graphQLOps/queries/doesUserExist';
import { createArgs } from '../../graphQLOps/createInputs';
import { Skill } from '../../components/Skills/Skill';
import { SkillList } from '../../components/Skills/SkillList';
import { useAuth0 } from '@auth0/auth0-react';

export const Home = () => {

    return (
        <h1>
            Home Screen

        </h1>
    )

}