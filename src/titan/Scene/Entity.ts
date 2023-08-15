import Component from "@titan/Scene/Component"
import { v4 as uuidv4 } from "uuid"
import BaseClass from "@titan/BaseClass"
import Scene from "@app/titan/Scene/Scene"

export default class Entity extends BaseClass {
    sceneId!: string
    components: Map<string, Set<Component>> = new Map()
    id = uuidv4()
    name = "Entity"

    constructor(scene: Scene) {
        super()
        this.scene = scene
    }

    addComponent<T extends Component>(component: T) {
        if (!this.components.has(component.constructor.name))
            this.components.set(component.constructor.name, new Set())
        this.components.get(component.constructor.name)?.add(component)
        component.entity = this
    }

    //Getters and Setters
    get scene() {
        return Scene.getSceneById(this.sceneId)
    }
    set scene(scene: Scene) {
        this.sceneId = scene.id
    }

}
