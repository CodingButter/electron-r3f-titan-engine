import Component from "@titan/Scene/Component/Component"
import BaseClass from "@titan/BaseClass"
import Scene from "@app/titan/Scene/Scene"

export default class Entity extends BaseClass {

    constructor(scene: Scene) {
        super(null, scene)
    }

    addComponent<T extends Component>(component: T): T {
        component.entity = this
        if (this.hasComponent<T>(component)) {
            console.assert(process.env.NODE_ENV === "production", `Component ${component.constructor.name} already exists on entity ${this.name}`)
        } else {
            this.scene?.addComponent<T>(component)
        }
        return component
    }

    getComponent<T extends Component>(componentClass: T): T | undefined {
        return this.scene?.getComponent<T>(typeof componentClass, this.id)
    }

    getComponentById<T extends Component>(componentClass: ComponentClass, componentId: string): T | undefined {
        return this.scene?.getComponentById<T>(componentClass, componentId)
    }

    hasComponent<T extends Component>(componentClass: T): boolean {
        return this.getComponent<T>(componentClass) !== undefined
    }

    removeComponent<T extends Component>(componentClass: T): void {
        this.scene?.removeComponent<T>(componentClass, this.id)
    }

    get components(): Component[] {
        return this.scene?.getComponentsByEntityId(this.id) || []
    }
}
