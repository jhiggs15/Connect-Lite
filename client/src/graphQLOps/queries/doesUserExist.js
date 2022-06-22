import { gql } from '@apollo/client';

export const doesUserExist = gql`
    query Query($where: UserWhere) {
    users(where: $where) {
        email
    }
    }
`