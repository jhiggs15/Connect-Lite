import { Skill } from "./Skill"
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Col, Row } from "antd";

export const SkillList = ({skillsData, connectUserAndSkill, doesNotHaveRating}) => {
    // TODO this is bad and I shouldnt do this
    const convertUserSkills = (userSkillData, hasRating) => {
        if(!doesNotHaveRating) {
            const skills = userSkillData.users[0].skills
            const ratings = userSkillData.users[0].skillsConnection.edges
            return skills.map(
                (skillData, index) => (
                    <Col key={index + 1} offset={1} style={{padding : "0 0 10 0"}} >
                        <Skill rating={ratings[index].rating} key={(index + 1) + skillsData.length} skillData={skillData} hasAdded={true} connectUserAndSkill={connectUserAndSkill}  />
                    </Col>))
        }
        else {
            // todo fix it so proper rating is returned and I can use ^
            return skillsData.skills.map(
                (skillData, index) => (
                    <Col key={index + 1} offset={1} style={{padding : "0 0 10 0"}} >
                        <Skill rating={1} key={(index + 1) + skillsData.length} skillData={skillData} hasAdded={false} connectUserAndSkill={connectUserAndSkill}  />
                    </Col>))
        }



    }

    return (
        <Row gutter={[16, 16]} style={{margin: 0}} justify={"center"} align={"middle"}>
            {convertUserSkills(skillsData)}
        </Row>
    )

}