import { gql } from '@apollo/client';
import { createArgs } from '../createInputs';
/*
{
  "disconnect": {
    "skills": [
      {
        "where": {
          "node": {
            "name": "test"
          }
        }
      }
    ]
  },
  "where": {
    "email": "jhiggins@jahnelgroup.com"
  }
}
*/

export const disconnectSkillConnectionArgs = (email, skillName)=> {
  const where = {email}
  const disconnect = {
    skills: [
      {
        where: {
          node :{
            name : skillName
          }
        }
      }
    ]
  }
  return createArgs({where, disconnect})
}
export const disconnectSkill = gql`
    mutation DisconnectSkill($disconnect: UserDisconnectInput, $where: UserWhere) {
    updateUsers(disconnect: $disconnect, where: $where) {
        info {
        relationshipsDeleted
        }
    }
    }
`

