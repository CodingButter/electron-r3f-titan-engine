import { v4 as uuidv4 } from 'uuid';
import Scene from "@app/titan/Scene/Scene";
import Entity from "@titan/Scene/Entity";

export default class Component {
    id = uuidv4()
    entityId!: string
    sceneId!: string
    __delta!: number
    constructor(entityId?: string, sceneId?: string) {
        if (entityId) {
            this.entityId = entityId
        }
        if (sceneId) {
            this.sceneId = sceneId
        }
    }
    init() {
        //OVERRIDE
    }
    update(delta: number) {
        this.__delta = delta
        //OVERRIDE
    }
    render() {
        //OVERRIDE
    }

    get entity(): Entity {
        return <Entity>Scene.getSceneById(this.sceneId).getEntity(this.entityId)
    }
}