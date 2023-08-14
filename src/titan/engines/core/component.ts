import Entity from "@app/titan/engines/core/entity";

export default class Component {
    static components: Component[] = []
    entity!: Entity
    name!: string
    constructor(name?: string) {
        Component.components.push(this)
        this.name = name || this.constructor.name + Component.components.length.toString();
    }
    update() {
        //OVERRIDE
    }
}