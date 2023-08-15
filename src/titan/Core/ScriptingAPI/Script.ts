import BaseClass from "@titan/BaseClass"
import Scene from "@app/titan/Scene/Scene"
import Entity from "@titan/Scene/Entity"
interface ScriptAttributeProps {
    name: string
    type: string
    value?: any
    default?: any
    description?: string
}

class ScriptAttribute extends BaseClass {
    name: string
    type: string
    value?: any
    default?: any
    description?: string
    constructor({ name, type, value, description }: ScriptAttributeProps) {
        super()
        this.name = name
        this.type = type
        this.value = value
        this.default = value
        this.description = description
    }
}

class Attributes extends BaseClass {
    script: Script
    attributes: Map<string, ScriptAttribute> = new Map<string, ScriptAttribute>()
    constructor(script: Script) {
        super()
        this.script = script
    }
    add(name: string, scriptAttributes: ScriptAttributeProps) {
        this.attributes.set(name, new ScriptAttribute({ ...scriptAttributes, name }))
        this.script[name] = scriptAttributes.default
    }
    update(name: string, value: any) {
        this.script[name] = value
        const attribute = this.attributes.get(name)
        if (attribute) {
            attribute.value = value
        }
    }
}

export default class Script extends BaseClass {
    attributes: Attributes;
    sceneId: string
    entityId!: string;
    constructor(script: string, entity: Entity) {
        super()
        this.entity = entity
        this.sceneId = entity.sceneId
        this.attributes = new Attributes(this)
    }

    set entity(entity: Entity) {
        this.entityId = entity.id
    }

    get entity(): Entity {
        return <Entity>Scene.getSceneById(this.sceneId).getEntityById(this.entityId)
    }

    update!: (delta: number) => void
    init!: () => void
}