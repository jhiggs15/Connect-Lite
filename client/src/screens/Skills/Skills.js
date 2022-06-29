import { Button, Form, Image, Input, Modal, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
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
import { disconnectSkill } from '../../graphQLOps/mutation/deleteSkillConnection';
import { updateItem } from '../../graphQLOps/cacheOperations/update';
import { addItem } from '../../graphQLOps/cacheOperations/add';


const TopBar = ({setSearchLoading, setIsModalVisible, searchTerm, setSearchTerm}) => {
    let {user} = useAuth0()

    if(user) {
        return(
            <div style={{display: "flex", flexDirection : "row"}}>
                <Search value={searchTerm} placeholder="search skill name" onChange={(event) =>{setSearchTerm(event.target.value); setSearchLoading(true)} } />
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

    const [connectUserAndSkill, { error: connectUserAndSkillError }] = useMutation(upsertSkillConnection, {
        update: (cache, mutationResult, {variables, context}) => {
           const skillAdded = variables.connect.skills[0].where.node.name
           const ratingGiven = variables.connect.skills[0].edge.rating
           let getAllSkillsData = []
           cache.updateQuery({query: getAllSkills, variables: getAllSkillArgs(user.email).variables}, (data) => {
                getAllSkillsData = updateItem(data.getAllSkills, "name", skillAdded, {attributes: ["rating"], values:[ratingGiven]})
                return {getAllSkills: getAllSkillsData}
            })

           cache.updateQuery({query: getSkillsByUser, variables: getSkillByUserArgs(user.email).variables}, (data) => {
                try{
                    const mySkillItem = data.getMySkills.find(skillItem => skillItem.name === skillAdded)
                    const allSkillItem = getAllSkillsData.find(skillItem => skillItem.name === skillAdded)
                    if(mySkillItem) 
                        return {getMySkills: updateItem(data.getMySkills, "name", skillAdded, {attributes: ["rating"], values:[ratingGiven]})}
                    else 
                        return {getMySkills: addItem(data.getMySkills, allSkillItem)}
                } catch(error) {
                    // if the home page hasnt been visited, and thus the query hasnt been executed
                    return data
                }
            })


    }
    });
    const [createSkillMutation, {error: createSkillError}] = useMutation(createSkill, {
        update: (cache, mutationResult, {variables, context}) => {
            let skill = variables.input[0]
            skill.rating = null
            cache.updateQuery({query: getAllSkills, variables: getAllSkillArgs(user.email).variables}, (data) => {
                return {getAllSkills: addItem(data.getAllSkills, skill)}
            })


        }
    })
    const [updateSkillMutation, {error: updateSkillError}] = useMutation(updateSkill, {
        update: (cache, mutationResult, {variables, context}) => {
            let newSkill = variables.update
            let oldSkillName = variables.where.name

            cache.updateQuery({query: getAllSkills, variables: getAllSkillArgs(user.email).variables}, (data) => {
                return {getAllSkills: updateItem(data.getAllSkills, "name", oldSkillName, 
                    {attributes: ["name", "description", "imageURL"], values:[newSkill.name, newSkill.description, newSkill.imageURL]})}
            })

           cache.updateQuery({query: getSkillsByUser, variables: getSkillByUserArgs(user.email).variables}, (data) => {
                try{
                    const mySkillItem = data.getMySkills.find(skillItem => skillItem.name === newSkill.name)
                    if(mySkillItem) 
                        return {getAllSkills: updateItem(data.getAllSkills, "name", oldSkillName, 
                            {attributes: ["name", "description", "imageURL"], values:[newSkill.name, newSkill.description, newSkill.imageURL]})}
                    else return data
                } catch(error) {
                    // if the home page hasnt been visited, and thus the query hasnt been executed
                    return data
                }
            })
        }
    })
    const [disconnectUserAndSkill, {loading: disconnectUserAndSkillLoading, error: disconnectUserAndSkillError }] = useMutation(disconnectSkill, {
        update: (cache, mutationResult, {variables, context}) => {
            const skillDisconneceted = variables.disconnect.skills[0].where.node.name
            cache.updateQuery({query: getAllSkills, variables: getAllSkillArgs(user.email).variables}, (data) => {
                return {getAllSkills: updateItem(data.getAllSkills, "name", skillDisconneceted, {attributes:["rating"], values:[null]})}
            })

            cache.updateQuery({query: getSkillsByUser, variables: getSkillByUserArgs(user.email).variables}, (data) => {
                try{
                    return {getMySkills: removeItem(data.getMySkills, "name", skillDisconneceted)}
                } catch(error){
                    return data
                }
            })
    }
    });

    let { data : userSkillData, error: getSkillsByUserError } = useQuery(getAllSkills, getAllSkillArgs(user.email), {fetchPolicy: 'network-only', nextFetchPolicy: 'cache-first'})

    const [isModalVisible, setIsModalVisible] = useState("none");
    const [skillToEdit, setSkillToEdit] = useState({name: "", imageURL: "", description: ""})
    const [searchTerm, setSearchTerm] = useState("")
    const [searchLoading, setSearchLoading] = useState(false)
    const [searchResults, setSearchResults] = useState("none")

    useEffect(() => {
        if(searchTerm === ""){
            setSearchLoading(false)
            setSearchResults("none")
        } 
        else{
            setSearchResults({getAllSkills: userSkillData.getAllSkills.filter(value => value.name.includes(searchTerm))})
            setSearchLoading(false)
        }


    }, [searchTerm])


    return (
        <>
            <TopBar setSearchLoading={setSearchLoading} setIsModalVisible={setIsModalVisible} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <ApolloWrapper nullStates={[userSkillData]} loadingStates={[searchLoading]} errorStates={[disconnectUserAndSkillError, connectUserAndSkillError, getSkillsByUserError, createSkillError, updateSkillError]} >
                <CreateSkillModal setIsModalVisible={setIsModalVisible} createSkillMutation={createSkillMutation} isModalVisible={isModalVisible} />
                <EditSkillModal updateSkill={updateSkillMutation} setIsModalVisible={setIsModalVisible} skillToEdit={skillToEdit} isModalVisible={isModalVisible} />

                <SkillList disconnectSkill={disconnectUserAndSkill} setIsModalVisible={setIsModalVisible} skillsData={ searchResults === "none" ? userSkillData: searchResults} connectUserAndSkill={connectUserAndSkill}  doesNotHaveRating={true} setSkillToEdit={setSkillToEdit}  />

            </ApolloWrapper>
        </>




    )
}