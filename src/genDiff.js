export default (filepath1, filepath2) => {
    const obj1 = JSON.parse(filepath1)
    const obj2 = JSON.parse(filepath2)

    const resultObj = Object.assign(obj1, obj2)

    return resultObj
}