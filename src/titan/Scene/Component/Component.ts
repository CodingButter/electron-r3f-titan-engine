
import BaseClass from "@app/titan/BaseClass";
import Entity from "@titan/Scene/Entity";
import Scene from "@app/titan/Scene/Scene";
export default class Component extends BaseClass {
    entityId!: string
    sceneId: string
    constructor(entity: Entity) {
        super()
        this.entity = entity
        this.sceneId = entity.sceneId
    }
    init() {
        //OVERRIDE
    }
    update(delta: number) {
        //OVERRIDE
    }
    render() {
        //OVERRIDE
    }

    get entity(): Entity {
        return Scene.getSceneById(this.sceneId).getEntityById(this.entityId)
    }

    set entity(entity: Entity) {
        this.entityId = entity.id
    }

}