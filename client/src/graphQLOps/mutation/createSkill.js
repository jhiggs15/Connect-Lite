import { gql } from '@apollo/client';
import { createArgs } from '../createInputs';

export const createSkillArgs = (name, description, imageURL) => {
    const input = [{
          name,
          description,
          imageURL
    }]

    return createArgs({input})
}

export const createSkill = gql`
mutation CreateSKill($input: [SkillCreateInput!]!) {
  createSkills(input: $input) {
    info {
      nodesCreated
    }
  }
}
`