import { gql } from '@apollo/client';

export const getUser = gql`
    query Query {
        users {
            name
        }
    }
`