import { gql } from '@apollo/client';
import { createArgs } from '../createInputs';

export const updateSkillArgs = (name, newName, newDescription, newImageURL) => {
    const where = {name}
    const update = {name: newName, description: newDescription, imageURL: newImageURL}
    return createArgs({where, update})
}

export const updateSkill = gql`
mutation UpdateSkill($where: SkillWhere, $update: SkillUpdateInput) {
  updateSkills(where: $where, update: $update) {
    info {
      nodesCreated
    }
  }
}
`