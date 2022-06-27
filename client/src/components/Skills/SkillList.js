import { Skill } from "./Skill/Skill"
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Col, Row } from "antd";

export const SkillList = ({skillsData, connectUserAndSkill, disconnectSkill, setSkillToEdit, setIsModalVisible, leftAlign}) => {
    // TODO Should figure something out here so we do not have to do these if statements
    const convertUserSkills = () => {
        let data
        if(skillsData.hasOwnProperty("getAllSkills")) data = skillsData.getAllSkills
        if(skillsData.hasOwnProperty("getMySkills")) data = skillsData.getMySkills
        return data.map(
            (skillData, index) => (
                <Col key={index + 1} offset={1} style={{padding : "0 0 10 0"}} >
                    <Skill disconnectSkill={disconnectSkill} setIsModalVisible={setIsModalVisible} rating={skillData.rating} key={(index + 1) + skillsData.length} skillData={skillData}
                        hasAdded={!(skillData.rating == null)} connectUserAndSkill={connectUserAndSkill} setSkillToEdit={setSkillToEdit}  />
                </Col>))
    }

    return (
        <Row gutter={[16, 16]} style={{margin: 0}} justify={leftAlign ? "start" : "center"} align={"middle"}>
            {convertUserSkills(skillsData)}
        </Row>
    )

}