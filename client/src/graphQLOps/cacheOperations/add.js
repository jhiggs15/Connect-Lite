/**
 * Adds the item to the list
 * list : list to add to
 * itemToAdd : the item to add to the list
 * return : new list
 */
export const addItem = (list, itemToAdd) => {
    let newList = [...list]
    newList.push(itemToAdd)
    return newList
}