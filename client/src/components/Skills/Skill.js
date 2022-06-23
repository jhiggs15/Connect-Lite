import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { EditOutlined, PlusOutlined, FormOutlined  } from '@ant-design/icons';
/*
skill Data : 
      {
        "name": "HTML",
        "description": "Markup language",
        "imageURL": "https://cdn.worldvectorlogo.com/logos/html-1.svg"
      }
*/

export const Skill = ({skillData, isAdmin, hasAdded}) => {

    const [hasAddedSkill, setHasAddedSkill] = useState(hasAdded)

    const getActions = (isAdmin, hasAdded) => {
        const actions = []
        if(isAdmin) actions.push(<EditOutlined />)
        if(hasAddedSkill) actions.push(<FormOutlined onClick={() => setHasAddedSkill(false)} />)
        else actions.push(<PlusOutlined onClick={() => setHasAddedSkill(true)} />)

        return actions
    }

    
    return (
        <>
            <Card cover={<img style={{padding : 10}} alt={skillData.name + " image"} src={skillData.imageURL} />} style={{width: 240}}
                actions = {getActions(isAdmin, hasAddedSkill)}>
                <Meta title={skillData.name} description={skillData.description} />
            </Card>
        </>

    )
}