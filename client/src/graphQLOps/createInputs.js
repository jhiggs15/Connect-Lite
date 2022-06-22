export const createArgs = ({input = {}, where = {}} = {}) => {
    return {variables : {
        input,
        where
    }}
}