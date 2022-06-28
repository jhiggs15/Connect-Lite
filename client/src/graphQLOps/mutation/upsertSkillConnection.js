import { gql } from '@apollo/client';
import { createArgs } from '../createInputs';
/*
{
  "where": {
    "email": "jhiggins@jahnelgroup.com"
  },
  "connect": {
    "skills": [
      {
        "where": {
          "node": {
            "name": "test"
          }
        },
        "edge": {
          "rating": 3
        }
      }
    ]
  }
}

*/

export const createUpsertSkillConnectionArgs = (email, skillName, rating)=> {
  const where = {email}
  const connect = {
    skills: [{
      where: {
        node :{
            name : skillName
        }
      },
      edge: {
        rating
      }
    }]
  }
  return createArgs({where, connect})
}
export const upsertSkillConnection = gql`
    mutation UpdateUserSkillConnection($connect: UserConnectInput, $where: UserWhere) {
        updateUsers(connect: $connect, where: $where) {
          users {
            skills {
              name
              skillID
              description
              imageURL
            }
        }
        }
    }
`

