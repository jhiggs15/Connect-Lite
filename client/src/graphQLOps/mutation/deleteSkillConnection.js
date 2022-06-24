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

export const createUpsertSkillConnectionArgs = (email, skillName)=> {
  const where = {email}
  const connect = {
    "skills": [
        {
          "where": {
            "node": {
              "name": skillName
            }
          }
        }
      ]
  }
  return createArgs(where, connect)
}
export const upsertSkillConnection = gql`
    mutation DeleteUsers($disconnect: UserDisconnectInput, $where: UserWhere) {
    updateUsers(disconnect: $disconnect, where: $where) {
        info {
        relationshipsDeleted
        }
    }
    }
`

