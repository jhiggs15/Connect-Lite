import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { EditOutlined, FireOutlined, CheckCircleOutlined, CheckCircleFilled  } from '@ant-design/icons';
import { Rating } from './Rating';
import { Button, Popconfirm, Popover } from 'antd';
import { createUpsertSkillConnectionArgs } from '../../../graphQLOps/mutation/upsertSkillConnection';
import { useAuth0 } from '@auth0/auth0-react';
import { disconnectSkill, disconnectSkillConnectionArgs } from '../../../graphQLOps/mutation/deleteSkillConnection';

const PopOverContent = ({skillName, setVisible, setHasAddedSkill, rating, setRating, connectUserAndSkill}) => {
  let {user} = useAuth0()
  console.log(rating)

    return (
        <div style={{"display": "flex", "flexDirection" : "column",  }}>
            <Rating rating={rating} setRating={setRating}/>
            <Button onClick={() => {
                setVisible(false)
                setHasAddedSkill(true)
                connectUserAndSkill(createUpsertSkillConnectionArgs(user.email, skillName, rating))


            }} style={{margin : "15 0 0 0"}}> 
                Confirm
            </Button>
            

        </div>

    ) 

}
// TODO how do i simplify this
export const Add = ({disconnectSkill, hasAddedSkill, setHasAddedSkill, rating, setRating, connectUserAndSkill, skillName}) => {
  let {user} = useAuth0()

  const [visible, setVisible] = useState(false)
  if(hasAddedSkill){
    return(
        <Popconfirm icon={null} title="Are you sure you want to remove this skill？" okText="Yes" cancelText="No" 
          onConfirm={async () => {
            setHasAddedSkill(false)
            disconnectSkill(disconnectSkillConnectionArgs(user.email, skillName))
          }}>
            <CheckCircleFilled style={{color : "green"}}/>
        </Popconfirm>
    )
  } 
  else{
      return(
          <Popover visible={visible} content={<PopOverContent skillName={skillName} connectUserAndSkill={connectUserAndSkill} setVisible={setVisible} setHasAddedSkill={setHasAddedSkill} rating={rating} setRating={setRating} />}
            title="Rate your Skillz!" trigger="click" onVisibleChange={state => setVisible(state)} >
              <CheckCircleOutlined   />
          </Popover>
      )
  }

}