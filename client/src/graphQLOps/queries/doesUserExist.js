import { gql } from '@apollo/client';
import { createArgs } from '../createInputs';


export const createDoesUserExistArgs = (email) => {
    const where = {email}
    return createArgs(where)
}

export const doesUserExist = gql`
    query DoesUserExist($where: UserWhere) {
    users(where: $where) {
        email
    }
    }
`