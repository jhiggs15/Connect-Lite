import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { EditOutlined, FireOutlined, CheckCircleOutlined, CheckCircleFilled  } from '@ant-design/icons';
import { Rating } from './Rating';
import { Button, Popconfirm, Popover } from 'antd';

const PopOverContent = ({setVisible, setHasAddedSkill, rating, setRating}) => {
    return (
        <div style={{"display": "flex", "flexDirection" : "column",  }}>
            <Rating rating={rating} setRating={setRating}/>
            <Button onClick={() => {
                setVisible(false)
                setHasAddedSkill(true)

            }} style={{marginTop : 15}}> 
                Confirm
            </Button>
            

        </div>

    ) 

}

export const Add = ({hasAddedSkill, setHasAddedSkill, rating, setRating}) => {

    const [visible, setVisible] = useState(false)
    if(hasAddedSkill){
        return(
            <Popconfirm icon={null} title="Are you sure you want to remove this skill？" okText="Yes" cancelText="No" onConfirm={() => setHasAddedSkill(false)}>
                <CheckCircleFilled style={{color : "green"}}/>
            </Popconfirm>
        )
    } 
    else{
        return(
            <Popover visible={visible} content={<PopOverContent setVisible={setVisible} setHasAddedSkill={setHasAddedSkill} rating={rating} setRating={setRating} />} title="Rate your Skillz!" trigger="click" onVisibleChange={state => setVisible(state)} >
                <CheckCircleOutlined   />
            </Popover>
        )
    }

}