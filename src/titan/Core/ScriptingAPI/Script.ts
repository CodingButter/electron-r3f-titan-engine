import BaseClass from "@titan/BaseClass"
import Scene from "@app/titan/Scene/Scene"
import Entity from "@titan/Scene/Entity"
import ScriptComponent from "@titan/Scene/Component/ScriptComponent"
import TTN from "@titan/Core/ScriptingAPI/TTN"

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
    scriptId!: string
    __script: Script
    attributes: Map<string, ScriptAttribute> = new Map<string, ScriptAttribute>()
    constructor(script: Script) {
        super(script.entity)
        this.__script = script
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
    get script(): Script {
        return this.__script
    }
    set script(script: Script) {
        this.scriptId = script.id
        this.__script = script
    }
}

export default class Script extends BaseClass {
    attributes: Attributes;
    componentId!: string;
    __component!: ScriptComponent;
    constructor(component: ScriptComponent) {
        super(component.entity)
        this.name = component.code
        this.attributes = new Attributes(this)
        this.component = component
    }

    get component(): ScriptComponent {
        return this.__component
    }

    set component(component: ScriptComponent) {
        this.componentId = component.id
        this.__component = component
    }

    update!: (delta: number) => void
    init!: () => void
}