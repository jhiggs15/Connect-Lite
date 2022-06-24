export const createArgs = ({input = {}, where = {}, connect={}} = {}) => {
    return {variables : {
        input,
        where,
        connect
    }}
}