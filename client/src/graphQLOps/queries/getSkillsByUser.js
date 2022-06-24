


import { gql } from '@apollo/client';
import { createArgs } from '../createInputs';

export const getSkillByUserArgs = (email) => {
    const where ={email}
    return createArgs({where})
}

export const getSkillsByUser = gql`
    query Query($where: UserWhere) {
    users(where: $where) {
        skills {
        skillID
        name
        description
        imageURL
        }
        skillsConnection {
        edges {
            rating
        }
        }
    }
    }
`
