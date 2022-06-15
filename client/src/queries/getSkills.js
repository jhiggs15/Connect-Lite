import { gql } from '@apollo/client';

export const getSkills = gql`
    query Query($where: USERWhere) {
    users(where: $where) {
        skills {
        name
        }
    }
    }
`