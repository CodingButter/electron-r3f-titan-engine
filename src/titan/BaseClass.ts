/* eslint-disable @typescript-eslint/no-explicit-any */
const keys = (x: any) => Object.getOwnPropertyNames(x).concat(Object.getOwnPropertyNames(x?.__proto__))

const isObject = (v: object) => Object.prototype.toString.call(v) === '[object Object]'

const classToObject = (clss: object) => keys(clss ?? {}).reduce((object, key) => {
    const [val, arr, obj] = [clss[key], Array.isArray(clss[key]), isObject(clss[key])]
    object[key] = arr ? val.map(classToObject) : obj ? classToObject(val) : val
    return object
}, { className: "" })

export default class BaseClass {
    toJSON(): object {
        const jsonObject = classToObject(this)
        jsonObject.className = this.constructor.name
        Object.keys(jsonObject).forEach((key) => {
            if (key.startsWith("__")) {
                delete jsonObject[key]
            }
        })
        return jsonObject
    }
}