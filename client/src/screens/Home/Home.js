import { Avatar, Button, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import { ApolloWrapper } from '../../components/ApolloWrapper/ApolloWrappers';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { upsertSkillConnection } from '../../graphQLOps/mutation/upsertSkillConnection';
import { SkillList } from '../../components/Skills/SkillList';
import { getSkillsByUser, getSkillByUserArgs } from '../../graphQLOps/queries/getSkillsByUser';
import { useAuth0 } from '@auth0/auth0-react';
import { disconnectSkill } from '../../graphQLOps/mutation/deleteSkillConnection';
import { getAllSkillArgs, getAllSkills } from '../../graphQLOps/queries/getAllSkills';



export const Home = () => {

    let {user} = useAuth0()

    const refetchQueries = {
        refetchQueries : [{query : getAllSkills, variables: getAllSkillArgs(user.email)}, {query : getSkillsByUser, variables: getSkillByUserArgs(user.email)}]
    }
    const [connectUserAndSkill, {loading: connectUserAndSkillLoading, error: connectUserAndSkillError }] = useMutation(upsertSkillConnection, {refetchQueries : refetchQueries});
    const [disconnectUserAndSkill, {loading: disconnectUserAndSkillLoading, error: disconnectUserAndSkillError }] = useMutation(disconnectSkill, {refetchQueries : refetchQueries});
    const { data : userSkillData, loading: getSkillsByUserLoading, error: getSkillsByUserError } = useQuery(getSkillsByUser, getSkillByUserArgs(user.email));


    return (
        <ApolloWrapper nullStates={[userSkillData]} errorStates={[connectUserAndSkillError, getSkillsByUserError]}  >
            <div style={{"display" : "flex", "justifyContent" : "flex-start", "padding" : 10 }}>

            </div>
            <div style={{"display" : "flex","flexDirection" : "row", "justifyContent" : "space-between" }}>
                <h1 className='title' style={{color: "#001529"}}>Welcome {user.name.split(" ")[0]}!</h1>

                <Avatar
                    size={{ xs: 50, sm: 50, md: 50, lg: 50, xl: 50, xxl: 60 }}
                    src={<Image preview={false} src={user.picture}/>}
                />

            </div>


            <h1 className='title' style={{color: "#001529", alignSelf: "flex-start"}}>My Skills</h1>
 
            <SkillList leftAlign skillsData={userSkillData} connectUserAndSkill={connectUserAndSkill} disconnectSkill={disconnectUserAndSkill} />
            {/* <EditSkillModal updateSkill={updateSkill} setIsModalVisible={setIsModalVisible} skillToEdit={skillToEdit} isModalVisible={isModalVisible} /> */}
        </ApolloWrapper>

    )
}