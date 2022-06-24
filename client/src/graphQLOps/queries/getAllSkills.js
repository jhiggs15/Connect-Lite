import { gql } from '@apollo/client';
import { createArgs } from '../createInputs';

export const getAllSkills = gql`
    query Query {
    skills {
        skillID
        name
        imageURL
        description
    }
    }
`
