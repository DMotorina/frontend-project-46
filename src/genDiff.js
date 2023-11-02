import fs from 'fs';
import path from 'path';

export default (filepath1, filepath2) => {
    const obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)))
    const obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)))

    const resultObj = Object.assign(obj1, obj2)

    return resultObj
}