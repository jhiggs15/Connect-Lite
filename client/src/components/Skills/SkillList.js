import { Skill } from "./Skill"
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Col, Row } from "antd";

export const SkillList = ({skillsData}) => {
    const skillComponentList = skillsData.map(skillData => <Col offset={1} style={{padding : 0, paddingBottom : 10}} ><Skill skillData={skillData} hasAdded={true} isAdmin={false} /></Col>)

    return (
        <Row gutter={[16, 16]} style={{margin: 0}} justify={"center"} align={"middle"}>
            {skillComponentList}
        </Row>
    )

}