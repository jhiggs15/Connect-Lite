import { gql } from '@apollo/client';
import { createArgs } from '../createInputs';

/*
{
  "input": [
    {
      "email": null,
      "name": null
    }
  ]
}
*/

export const createUserArgs = (email, name) => {
    const input = [{
        email,
        name
    }]

    return createArgs(input)

}

export const createUser = gql`
mutation Mutation($input: [UserCreateInput!]!) {
  createUsers(input: $input) {
    info {
      nodesCreated
    }
  }
}
`