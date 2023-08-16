import Scene from "@titan/Scene/Scene";
import Entity from "./Entity";
export default class EditorScene extends Scene {
    constructor() {
        super();
    }
    init() {
        const entity1 = this.createEntity()
        this.addEntity(entity1)
        const myScript = `
            const testScript = ttn.createScript("testScript");
            const bullet = ttn.createEntity()

            class MyRigidBody extends Component {
                constructor(entity) {
                    super(entity)
                }
                update(dt) {
                    console.log("updating")
                }
            }

            bullet.name = "Big Bullet"
            this.entity.addComponent(new MyRigidBody(this.entity))
            testScript.attributes.add("someAttribute", {
                type: "string",
                default: "Hello World",
                description:"this is a test string"
            })

            testScript.attributes.add("someNumber", {
                type: "number",
                default: 0.0,
                description:"this is a test number"
            })

            testScript.init = ()=> {
                this.entity.removeComponent("MyRigidBody")
            }

            testScript.update = (dt)=> {

            }
        `
        const myScriptComponent = Entity.createComponent("ScriptComponent", myScript)
        entity1.addComponent(myScriptComponent)
        myScriptComponent.parseScript();
        console.log(JSON.stringify(this, null, 2))
    }

    update(deltaTime: number) {
        super.update(deltaTime);
    }
    render() {
        super.render();
    }
}