export const createArgs = ({input = {}, where = {}, connect={}, update={}, disconnect={}} = {}) => {
    return {variables : {
        input,
        where,
        connect,
        update,
        disconnect
    }}
}