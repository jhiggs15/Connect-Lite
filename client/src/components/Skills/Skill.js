import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Rate } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { EditOutlined, FireOutlined, CheckCircleOutlined, CheckCircleFilled  } from '@ant-design/icons';
import { Edit } from './Edit';
import { Rating } from './Rating';
import { Add } from './Add';
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
    const [rating, setRating] = useState(1)

    const getActions = (isAdmin) => {
        const actions = []
        if(isAdmin) actions.push(<Edit/>)
        if(hasAddedSkill) actions.push(<Rating rating={rating} setRating={setRating} shouldShowPopup={true} />)
        actions.push(<Add hasAddedSkill={hasAddedSkill} setHasAddedSkill={setHasAddedSkill} rating={rating} setRating={setRating} />)

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