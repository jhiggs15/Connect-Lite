import { gql } from '@apollo/client';
import { createArgs } from '../createInputs';


export const createDoesUserExistArgs = (email) => {
    const where = {email}
    console.log()
    return createArgs(where)
}

export const doesUserExist = gql`
    query Query($where: UserWhere) {
    users(where: $where) {
        email
    }
    }
`