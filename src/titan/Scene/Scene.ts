import Core from "@app/titan/Core/Core";
import Entity from "@titan/Scene/Entity";
import BaseClass from "@titan/BaseClass";
import Component from "@titan/Scene/Component";
import { v4 as uuid4 } from "uuid"

export default class Scene extends BaseClass {
    static scenes: Map<string, Scene> = new Map()
    engine!: Core
    entities: Map<string, Entity> = new Map()
    components: Map<string, Component[]> = new Map()
    static currentScene: Scene;
    id = uuid4()
    constructor(Core?: Core) {
        super();

        if (Core) {
            this.engine = Core
        }
        //Do Stuff
    }
    update(delta: number) {
        //Do stuff
    }
    render() {
        //Do stuff
    }

    addEntity(entity: Entity) {
        this.entities.set(entity.id, entity)
        entity.scene = this
    }

    getEntity(id: string) {
        return this.entities.get(id)
    }

    static changeScene(sceneId: string) {
        Scene.currentScene = Scene.getSceneById(sceneId)
    }

    static getCurrentScene() {
        return Scene.currentScene
    }

    static getSceneById(id: string): Scene {
        return <Scene>Scene.scenes.get(id)
    }

}