/**
 * updates an item attributes
 * list: list of cache items
 * uidAttribute: the uniqe attribute name we are looking to remove based on
 * uid: the value of the unique attribute we want to remvoe
 * example remove item where name is foo. the uidAttribute would be name and the uid would be foo
 * update: an object that explains the attributes and values that need updating
 * {
 *      attributes: [ATTRIBUTE_NAMES]
 *      values: [VALUES]
 * }
 * Each an attribute and its value should have the same index in both lists
 */
export const updateItem = (list, uidAttribute, uid, update) => {
    let newData = []
    list.forEach(item => {
        if(item[uidAttribute] === uid) {
            let newItem = {...item}
            update.attributes.forEach((attribute, index) => {
                newItem[attribute] = update.values[index]
            })
            newData.push(newItem)
        } else newData.push(item)
    })
    return newData
}