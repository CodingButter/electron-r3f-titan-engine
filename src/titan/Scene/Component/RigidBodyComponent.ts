import Component from "@titan/Scene/Component/Component";
import Entity from "@titan/Scene/Entity";

export default class RigidBodyComponent extends Component {
    constructor(entity: Entity) {
        super(entity)
    }
    loadState(state: any): void {
        //Do Stuff
        super.loadState(state);
    }
}