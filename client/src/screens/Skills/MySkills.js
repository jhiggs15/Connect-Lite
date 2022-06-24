import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import { ApolloWrapper } from '../../components/ApolloWrapper/ApolloWrappers';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { upsertSkillConnection } from '../../graphQLOps/mutation/upsertSkillConnection';
import { SkillList } from '../../components/Skills/SkillList';
import { getSkillsByUser, getSkillByUserArgs } from '../../graphQLOps/queries/getSkillsByUser';
import { useAuth0 } from '@auth0/auth0-react';



export const MySkills = () => {
    let {user} = useAuth0()
    const [connectUserAndSkill, {loading: connectUserAndSkillLoading, error: connectUserAndSkillError }] = useMutation(upsertSkillConnection, {refetchQueries : [{query : getSkillsByUser, variables : getSkillByUserArgs(user.email).variables }]});
    const { data : userSkillData, loading: getSkillsByUserLoading, error: getSkillsByUserError } = useQuery(getSkillsByUser, getSkillByUserArgs(user.email));


    return (
        <ApolloWrapper nullStates={[userSkillData]} errorStates={[connectUserAndSkillError, getSkillsByUserError]}  >
            <h1>
                Skills
            </h1>
            <SkillList skillsData={userSkillData} connectUserAndSkill={connectUserAndSkill} />

        </ApolloWrapper>

    )
}