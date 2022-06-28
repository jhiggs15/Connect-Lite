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
import { removeItem } from '../../graphQLOps/cacheOperations/remove';
import { updateItem } from '../../graphQLOps/cacheOperations/update';
import { updateSkill } from '../../graphQLOps/mutation/updateSkill';
import { EditSkillModal } from '../../components/Skills/Modals/EditSkillModal';



export const Home = () => {

    let {user} = useAuth0()

    const [disconnectUserAndSkill, {loading: disconnectUserAndSkillLoading, error: disconnectUserAndSkillError }] = useMutation(disconnectSkill, {
        update: (cache, mutationResult, {variables, context}) => {
            const skillDisconneceted = variables.disconnect.skills[0].where.node.name

            cache.updateQuery({query: getSkillsByUser, variables: getSkillByUserArgs(user.email).variables}, (data) => {
                return {getMySkills: removeItem(data.getMySkills, "name", skillDisconneceted)}
            })

            cache.updateQuery({query: getAllSkills, variables: getAllSkillArgs(user.email).variables}, (data) => {
                try {
                    return {getAllSkills: updateItem(data.getAllSkills, "name", skillDisconneceted, {attributes:["rating"], values:[null]})}
                }
                catch(error) {
                    return data
                }
            })
    }
    });

    const [connectUserAndSkill, { error: connectUserAndSkillError }] = useMutation(upsertSkillConnection, {
        update: (cache, mutationResult, {variables, context}) => {
           const skillAdded = variables.connect.skills[0].where.node.name
           const ratingGiven = variables.connect.skills[0].edge.rating
           let getAllSkillsData = []
           cache.updateQuery({query: getAllSkills, variables: getAllSkillArgs(user.email).variables}, (data) => {
                try{
                    return {getAllSkills: updateItem(data.getAllSkills, "name", skillAdded, {attributes: ["rating"], values:[ratingGiven]})}
                } catch(error) {
                    return data
                }


            })

           cache.updateQuery({query: getSkillsByUser, variables: getSkillByUserArgs(user.email).variables}, (data) => {
                return {getMySkills: updateItem(data.getMySkills, "name", skillAdded, {attributes: ["rating"], values:[ratingGiven]})}

            })


    }
    });

    const [updateSkillMutation, {error: updateSkillError}] = useMutation(updateSkill, {
        update: (cache, mutationResult, {variables, context}) => {
            let newSkill = variables.update
            let oldSkillName = variables.where.name

            cache.updateQuery({query: getAllSkills, variables: getAllSkillArgs(user.email).variables}, (data) => {
                try{
                    return {getAllSkills: updateItem(data.getAllSkills, "name", oldSkillName, 
                        {attributes: ["name", "description", "imageURL"], values:[newSkill.name, newSkill.description, newSkill.imageURL]})}
                } catch(error) {
                    return data
                }

            })

           cache.updateQuery({query: getSkillsByUser, variables: getSkillByUserArgs(user.email).variables}, (data) => {
                return {getMySkills: updateItem(data.getMySkills, "name", oldSkillName, 
                    {attributes: ["name", "description", "imageURL"], values:[newSkill.name, newSkill.description, newSkill.imageURL]})}

            })
        }
    })

    const { data : userSkillData, loading: getSkillsByUserLoading, error: getSkillsByUserError,  } = useQuery(getSkillsByUser, getSkillByUserArgs(user.email), {fetchPolicy: 'network-only', nextFetchPolicy: 'cache-first'});


    const [isModalVisible, setIsModalVisible] = useState("none");
    const [skillToEdit, setSkillToEdit] = useState({name: "", imageURL: "", description: ""})

    return (
        <ApolloWrapper nullStates={[userSkillData]} errorStates={[updateSkillError, getSkillsByUserError, connectUserAndSkillError]}  >
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
            <EditSkillModal updateSkill={updateSkillMutation} setIsModalVisible={setIsModalVisible} skillToEdit={skillToEdit} isModalVisible={isModalVisible} />
            <SkillList setIsModalVisible={setIsModalVisible} setSkillToEdit={setSkillToEdit} leftAlign skillsData={userSkillData} connectUserAndSkill={connectUserAndSkill} disconnectSkill={disconnectUserAndSkill} />
        </ApolloWrapper>

    )
}