import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import { useQuery } from '@apollo/client';
import { ApolloWrapper } from '../../components/ApolloWrapper/ApolloWrappers';
import { doesUserExist } from '../../graphQLOps/queries/doesUserExist';
import { createArgs } from '../../graphQLOps/createInputs';
import { Skill } from '../../components/Skills/Skill';
import { SkillList } from '../../components/Skills/SkillList';

export const Home = () => {
    const input = {name : "Jhiggs"}
    const { loading, error, data } = useQuery(doesUserExist, createArgs(input))
    const html =       {    
        "name": "HTML",
        "description": "HTML is a markup language commonly used in web development",
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png"
      }

    return (
        <>
            <SkillList skillsData={[html, html,html, html,html, html,html, html,html, html,html, html,]} />

        </>
    )

}