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
import { getAllSkills } from '../../graphQLOps/queries/getAllSkills';


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
                                        setIsModalVisible(true)
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
    let navigate = useNavigate()
    const {user} = useAuth0()

    const [connectUserAndSkill, { loading: connectUserAndSkillLoading, error: connectUserAndSkillError }] = useMutation(upsertSkillConnection, {refetchQueries : [{query : getAllSkills}]});
    const { data : userSkillData, loading: getSkillsByUserLoading, error: getSkillsByUserError } = useQuery(getAllSkills);
    const html = {    
        "name": "HTML",
        "description": "HTML is a markup language commonly used in web development",
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png"
      }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [createSkillMutation, { data, loading, error }] = useMutation(createSkill, {refetchQueries : [{query : getAllSkills}]})

    const [skillName, setSkillName] = useState("");
    const [description, setDescription] = useState();
    const [imageLink, setImageLink] = useState();


    return (
        <ApolloWrapper nullStates={[userSkillData]} errorStates={[connectUserAndSkillError, getSkillsByUserError]} loadingStates={[connectUserAndSkillLoading, loading]}>

            <TopBar setIsModalVisible={setIsModalVisible} />

            <Modal title="Basic Modal" okText={"Create Skill"} visible={isModalVisible} onCancel={() => setIsModalVisible(false)}
                onOk={async () => {
                    setIsModalVisible(false) 
                    await createSkillMutation(createSkillArgs(skillName, description, imageLink))
                }}
            >
                <Form>
                    <Form.Item label={"Skill Name"}>
                        <Input onChange={changeData => setSkillName(changeData.target.value)} placeholder="HTML" />
                    </Form.Item>
                    <Form.Item label={"Description"}>
                        <Input onChange={changeData => setDescription(changeData.target.value)} placeholder="HTML is a awesome langauge" />
                    </Form.Item>
                    <Form.Item label={"Icon"}>
                        <Input onChange={changeData => setImageLink(changeData.target.value)} placeholder="https://link.com/html.png" />
                    </Form.Item>
                    <Form.Item>
                        <Image width={200} height={200} src={imageLink} preview={false} fallback="data:image/png;base64,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"/>
                    </Form.Item>
                </Form>
            </Modal>


            <SkillList skillsData={userSkillData} connectUserAndSkill={connectUserAndSkill} doesNotHaveRating={true} />

            {/* <SkillList skillsData={[html]} connectUserAndSkill={connectUserAndSkill} /> */}

        </ApolloWrapper>

    )
}