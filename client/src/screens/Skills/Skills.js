import { Button, Form, Image, Input, Modal, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import { ApolloWrapper } from '../../components/ApolloWrapper/ApolloWrappers';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { upsertSkillConnection } from '../../graphQLOps/mutation/upsertSkillConnection';
import { SkillList } from '../../components/Skills/SkillList';
import { useAuth0 } from '@auth0/auth0-react';
import { PlusOutlined } from '@ant-design/icons';
import Search from 'antd/lib/transfer/search';
import { createSkill, createSkillArgs } from '../../graphQLOps/mutation/createSkill';
import { getAllSkillArgs, getAllSkills } from '../../graphQLOps/queries/getAllSkills';
import { CreateSkillModal } from '../../components/Skills/Modals/CreateSkillModal';
import { EditSkillModal } from '../../components/Skills/Modals/EditSkillModal';
import { updateSkill } from '../../graphQLOps/mutation/updateSkill';
import { getSkillByUserArgs, getSkillsByUser } from '../../graphQLOps/queries/getSkillsByUser';


const TopBar = ({setIsModalVisible}) => {
    let {user} = useAuth0()

    if(user) {
        return(
            <div style={{display: "flex", flexDirection : "row"}}>
                <Search placeholder="search skill name" />
                {user.hasOwnProperty("https://Connect-Lite-Roles.com/Role") ? 
                    <div style={{alignSelf : "flex-end", marginLeft: 20, marginRight: 10}}>
                        <Tooltip  title="Add Skill">
                                <Button type="primary" shape="circle" icon={<PlusOutlined />} size={'large'} style={{background:"#001529", borderColor:"#001529"  }} 
                                    onClick={()=> {
                                        setIsModalVisible("create")
                                    }}
                                />
                        </Tooltip>
                    </div>
                    :
                    null
                }
    
            </div>
        )
    }

}

export const Skills = () => {

    const {user} = useAuth0()
    const refetchQueries = {
        refetchQueries : [{query : getAllSkills, variables: getAllSkillArgs(user.email)}, {query : getSkillsByUser, variables: getSkillByUserArgs(user.email)}]
    }

    const [connectUserAndSkill, { error: connectUserAndSkillError }] = useMutation(upsertSkillConnection, {refetchQueries : refetchQueries});
    const { data : userSkillData, error: getSkillsByUserError } = useQuery(getAllSkills, getAllSkillArgs(user.email));
    const [createSkillMutation, {error: createSkillError}] = useMutation(createSkill, {refetchQueries : refetchQueries})
    const [updateSkillMutation, {error: updateSkillError}] = useMutation(updateSkill, {refetchQueries : refetchQueries})

    const [isModalVisible, setIsModalVisible] = useState("none");
    const [skillToEdit, setSkillToEdit] = useState({name: "", imageURL: "", description: ""})


    return (
        <ApolloWrapper nullStates={[userSkillData]} errorStates={[connectUserAndSkillError, getSkillsByUserError, createSkillError, updateSkillError]} >

            <TopBar setIsModalVisible={setIsModalVisible} />
            <CreateSkillModal setIsModalVisible={setIsModalVisible} createSkillMutation={createSkillMutation} isModalVisible={isModalVisible} />
            <EditSkillModal updateSkill={updateSkill} setIsModalVisible={setIsModalVisible} skillToEdit={skillToEdit} isModalVisible={isModalVisible} />

            <SkillList setIsModalVisible={setIsModalVisible} skillsData={userSkillData} connectUserAndSkill={connectUserAndSkill}  doesNotHaveRating={true} setSkillToEdit={setSkillToEdit}  />

        </ApolloWrapper>

    )
}