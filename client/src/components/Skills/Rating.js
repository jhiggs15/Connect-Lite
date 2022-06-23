import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { FireOutlined, } from '@ant-design/icons';
import { Card, Popconfirm, Rate } from 'antd';


export const Rating = ({shouldShowPopup, rating, setRating}) => {
    const [popupVisible, setPopupVisible] = useState(false)
    const [oldRating, setOldRating] = useState()
    if(shouldShowPopup) {
        
        return(
            <Popconfirm visible={popupVisible} icon={null} title="Update this skill?" okText="Confirm" cancelText="Cancel" 
                onCancel={()=> {
                    setRating(oldRating)
                    setPopupVisible(false)}
                } 
                onConfirm={() =>{
                    setPopupVisible(false)
                } }>
                <Rate value={rating} defaultValue={1} allowClear={false} 
                    character={<FireOutlined />} count={3} tooltips={["Beginner", "Proficient", "Master"]} 
                    onChange={(number) => {
                        setOldRating(rating)
                        setRating(number)
                        setPopupVisible(true)
                    }} />
            </Popconfirm>
        )
    }
    else {
        return(
            <Rate value={rating} onChange={(number) => setRating(number)} defaultValue={1} 
                allowClear={false} character={<FireOutlined />} count={3} tooltips={["Beginner", "Proficient", "Master"]} />
        )
    }

}