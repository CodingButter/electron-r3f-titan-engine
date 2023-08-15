import Entity from "@titan/Scene/Entity";
import BaseClass from "@titan/BaseClass";
import Component from "@titan/Scene/Component/Component";
import ScriptComponent from "@titan/Scene/Component/ScriptComponent";

export default class Scene extends BaseClass {
    static scenes: Map<string, Scene> = new Map<string, Scene>()
    entities: Map<string, Entity> = new Map<string, Entity>()
    components: Map<string, Set<Component>> = new Map<string, Set<Component>>()
    static currentScene: Scene;
    constructor() {
        super();
        //this.engine = Core.get()
        Scene.scenes.set(this.id, this)
        //Do Stuff
    }

    destroy() {
        //Do Stuff
    }

    init() {
        const entity1 = new Entity(this)
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
        const myScriptComponent = new ScriptComponent(entity1, myScript)
        myScriptComponent.parseScript();
        entity1.addComponent<ScriptComponent>(myScriptComponent)
        this.scriptInit()


        console.log(JSON.stringify(this, null, 4))
    }

    scriptInit() {
        const scripts = this.getComponents<ScriptComponent>(ScriptComponent)
        scripts.forEach(script => {
            script.init()
        })
    }

    // eslint-disable-next-line 
    getComponents<T extends Component>(componentClass: ComponentClass): Set<T> {
        return <Set<T>>this.components.get(typeof componentClass == "string" ? componentClass : componentClass.name) || new Set<T>()
    }
    getComponentById<T extends Component>(componentClass: ComponentClass, componentId: string): T | undefined {
        const components = this.getComponents<T>(componentClass)
        return [...components].find(component => component.id === componentId)
    }

    // eslint-disable-next-line
    getComponent<T extends Component>(componentClass: ComponentClass, entityId: string): T | undefined {
        const components = this.getComponents<T>(componentClass)
        return [...components].find(component => component.entity.id === entityId)
    }

    removeComponent<T extends Component>(component: T, entityId: string) {
        if (typeof component == "string") {
            component = <T>this.getComponent<T>(component, entityId)
        }
        if (component) {
            const componentSet = this.components.get(component.constructor.name)
            if (componentSet) {
                componentSet.delete(component)
            }
        }

    }

    // eslint-disable-next-line
    update(deltaTime: number) {
        //Do stuff
    }

    render() {
        //Do stuff
    }

    createEntity() {
        return new Entity(this)
    }

    addEntity(entity: Entity) {
        entity.scene = this
        this.entities.set(entity.id, entity)
    }

    addComponent<T extends Component>(component: T) {
        let componentSet = this.components.get(component.constructor.name)
        if (!componentSet) {
            componentSet = new Set([component])
            this.components.set(component.constructor.name, componentSet)

        } else {
            componentSet.add(component)
        }

    }

    getEntityById(id: string): Entity {
        return <Entity>this.entities.get(id)
    }

    getEntityByName(name: string): Entity | undefined {
        return [...this.entities.values()].find(entity => entity.name === name)
    }

    getComponentsByEntityId(entityId: string): Component[] {
        const componentsByType = <Component[][]>([...this.components.values()].map(componentSet => [...componentSet].filter(component => component.entity.id === entityId)) || [])
        return componentsByType.reduce((a, b) => a.concat(b), [])
    }

    static changeScene(sceneId: string) {
        Scene.currentScene = <Scene>Scene.getSceneById(sceneId)
    }

    static getCurrentScene() {
        return Scene.currentScene
    }

    static getSceneById(id: string): Scene | undefined {
        return Scene.scenes.get(id)
    }

}