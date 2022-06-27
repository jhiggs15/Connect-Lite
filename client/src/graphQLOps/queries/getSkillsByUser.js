


import { gql } from '@apollo/client';
import { createArgs } from '../createInputs';

export const getSkillByUserArgs = (email) => {
    return {variables : {email}}
}

export const getSkillsByUser = gql`
query GetMySkills($email: String) {
  getMySkills(email: $email) {
    name
    description
    imageURL
    rating
  }
}
`
