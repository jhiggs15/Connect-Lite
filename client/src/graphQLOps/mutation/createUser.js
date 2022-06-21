import { gql } from '@apollo/client';

export const createUser = gql`
    mutation Mutation($input: [USERCreateInput!]!) {
    createUsers(input: $input) {
        users {
        name
        }
    }
    }
`