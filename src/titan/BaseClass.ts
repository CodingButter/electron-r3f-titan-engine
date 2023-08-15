import { v4 as uuid4 } from "uuid"
import Scene from "@titan/Scene/Scene"
import Entity from "@titan/Scene/Entity"

Map.prototype.toJSON = function () {
    return <object>Array.from(this.entries() || []).reduce((obj: any, [key, val]: [string, any]) => {
        obj[key] = val
        return obj
    }, {})
}

Set.prototype.toJSON = function () {
    return [...this]
}

export default class BaseClass {
    static names: string[] = []
    id = uuid4()
    name: string = this.constructor.name
    sceneId?: string
    entityId?: string
    __scene: Scene | undefined
    __entity: Entity | undefined
    constructor(entity?: Entity, scene?: Scene) {
        this.scene = scene || entity?.scene
        this.entity = entity
        this.name = `${this.name} ${BaseClass.names.filter(name => name.includes(this.name)).length + 1}`
        BaseClass.names.push(this.name)
    }
    get scene(): Scene | undefined {
        return this.__scene
    }

    set scene(scene: Scene | undefined) {
        this.sceneId = scene?.id
        this.__scene = scene
    }

    get entity(): Entity | undefined {
        return this.__entity
    }

    set entity(entity: Entity | undefined) {
        this.entityId = entity?.id
        this.__entity = entity
    }
    toJSON(): object {
        Object.keys(this).forEach((key) => {
            if (key.startsWith("__")) {
                delete this[key]
            }
        })
        const jsonObject = { className: this.constructor.name, ...this }
        return jsonObject
    }
}