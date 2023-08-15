
import BaseClass from "@app/titan/BaseClass";
import Entity from "@titan/Scene/Entity";
export default class Component extends BaseClass {

    constructor(entity: Entity) {
        super(entity)
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

}