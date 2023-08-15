import Component from "@titan/Scene/Component/Component"
import BaseClass from "@titan/BaseClass"
import Scene from "@app/titan/Scene/Scene"

export default class Entity extends BaseClass {
    sceneId!: string
    constructor(scene: Scene) {
        super()
        this.scene = scene
    }


    addComponent<T extends Component>(component: T): T {
        component.entity = this
        if (this.hasComponent(component.constructor.name)) {
            console.assert(process.env.NODE_ENV === "production", `Component ${component.constructor.name} already exists on entity ${this.name}`)
        } else {
            this.scene.addComponent<T>(component)
        }
        return component
    }

    getComponent<T extends Component>(componentClass: ComponentClass | string): T | undefined {
        return this.scene.getComponent<T>(componentClass, this.id)
    }

    hasComponent<T extends Component>(componentClass: ComponentClass | string): boolean {
        return this.getComponent<T>(componentClass) !== undefined
    }

    removeComponent<T extends Component>(componentClass: ComponentClass | string): void {
        this.scene.removeComponent<T>(componentClass, this.id)
    }

    get scene(): Scene {
        return Scene.getSceneById(this.sceneId)
    }
    set scene(scene: Scene) {
        this.sceneId = scene.id
    }

    get components(): Component[] {
        return this.scene.getComponentsByEntityId(this.id)
    }
}
