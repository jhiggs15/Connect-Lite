/**
 * Removes item from the list
 * list: list of cache items
 * uidAttribute: the uniqe attribute name we are looking to remove based on
 * uid: the value of the unique attribute we want to remvoe
 * example remove item where name is foo. the uidAttribute would be name and the uid would be foo
 * return: list with the item removed
 */
export const removeItem = (list, uidAttribute, uid ) => {
    return list.filter(item => item[uidAttribute] !== uid)
}