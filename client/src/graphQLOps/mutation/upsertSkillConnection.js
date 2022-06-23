import { gql } from '@apollo/client';
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
export const upsertSkillConnection = gql`
    mutation UpdateUsers($connect: UserConnectInput, $where: UserWhere) {
        updateUsers(connect: $connect, where: $where) {
        users {
            skills {
            name
            }
        }
        }
    }
`

