export default function deepClone(obj) {
    if(!obj) return obj;
    let newObj;
    if (obj instanceof Array) {
        newObj = [];
    } else {
        newObj = {};
    }
    for (let key in obj) {
        switch(typeof obj[key]) {
            case 'number':
            case 'string':
            case 'boolean':
            case 'undefined':
            case 'function':
                newObj[key] = obj[key];
                break;
            case 'object':
                if (obj[key] === null) {
                    newObj[key] = obj[key];
                } else if (obj[key] instanceof Array) {
                    newObj[key] = deepClone(obj[key]);
                } else if(obj[key] instanceof Date) {
                    newObj[key] = new Date(obj[key]);
                } else {
                    newObj[key] = deepClone(obj[key]);
                }
                break;
            default:
                break;
        }
    }
    return newObj;
}