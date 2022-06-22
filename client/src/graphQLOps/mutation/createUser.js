import { gql } from '@apollo/client';

export const createUser = gql`
    mutation Mutation($input: [UserCreateInput!]!) {
    createUsers(input: $input) {
        users {
        email
        }
    }
    }
`