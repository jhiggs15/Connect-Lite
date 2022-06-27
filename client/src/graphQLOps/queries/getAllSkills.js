import { gql } from '@apollo/client';

export const getAllSkillArgs = (email) => {
    return {variables : {email}}
}

export const getAllSkills = gql`
query GetAllSkills($email: String) {
  getAllSkills(email: $email) {
    name
    description
    imageURL
    rating
  }
}

`
