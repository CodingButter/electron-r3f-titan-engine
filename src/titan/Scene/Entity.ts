import Component from "@titan/Scene/Component/Component"
import TransformComponent from "@titan/Scene/Component/TransformComponent"
import BaseClass from "@titan/BaseClass"
import Scene from "@titan/Scene/Scene"
import Components from "@titan/Scene/Component/Components"

export default class Entity extends BaseClass {

    constructor(scene: Scene) {
        super(undefined, scene)
        this.addComponent<TransformComponent>(new TransformComponent())
    }

    static createComponent<T extends Partial<Component>>(componentName: string, ...args: ConstructorParameters<(new (...args: any) => T)>): T {
        const component = new Components[componentName](...args) as T
        return component
    }

    addComponent<T extends Partial<Component>>(component: T): T {
        component.entity = this
        if (this.hasComponent<T>(component)) {
            console.assert(process.env.NODE_ENV === "production", `Component ${component.constructor.name} already exists on entity ${this.name}`)
        } else {
            this.scene?.addComponent<T>(component)
        }
        return component
    }

    getComponent<T extends Partial<Component>>(componentClass: T): T | undefined {
        return this.scene?.getComponent<T>(typeof componentClass, this.id)
    }

    getComponentById<T extends Partial<Component>>(componentClass: ComponentClass, componentId: string): T | undefined {
        return this.scene?.getComponentById<T>(componentClass, componentId)
    }

    hasComponent<T extends Partial<Component>>(componentClass: T): boolean {
        return this.getComponent<T>(componentClass) !== undefined
    }

    removeComponent<T extends Partial<Component>>(componentClass: T): void {
        this.scene?.removeComponent<T>(componentClass, this.id)
    }

    get components(): Component[] {
        return this.scene?.getComponentsByEntityId(this.id) || []
    }

    loadState(state:any){
        this.id = state.id
        this.name = state.name
    }
}
