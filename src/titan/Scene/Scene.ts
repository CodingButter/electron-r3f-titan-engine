import Entity from "@titan/Scene/Entity";
import BaseClass from "@titan/BaseClass";
import Component from "@titan/Scene/Component/Component";
import Components from "@titan/Scene/Component/Components";
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
        this.scriptInit()
    }

    scriptInit() {
        const scripts = this.getComponents<ScriptComponent>(ScriptComponent)
        scripts.forEach(script => {
            script.init()
        })
    }

    getComponents<T extends Partial<Component>>(componentClass: ComponentClass): Set<T> {
        return <Set<T>>this.components.get(typeof componentClass == "string" ? componentClass : componentClass.name) || new Set<T>()
    }

    getComponentById<T extends Partial<Component>>(componentClass: ComponentClass, componentId: string): T | undefined {
        const components = this.getComponents<T>(componentClass)
        return [...components].find(component => component.id === componentId)
    }

    getComponent<T extends Partial<Component>>(componentClass: ComponentClass, entityId: string): T | undefined {
        const components = this.getComponents<T>(componentClass)
        return [...components].find(component => (<BaseClass>component)?.entity?.id === entityId)
    }

    removeComponent<T extends Partial<Component>>(component: T, entityId: string) {
        if (typeof component == "string") {
            component = <T>this.getComponent<T>(component, entityId)
        }
        if (component) {
            const componentSet = this.components.get(component.constructor.name)
            if (componentSet) {
                componentSet.delete(<Component>component)
            }
        }

    }

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

    addComponent<T extends Partial<Component>>(component: T) {
        let componentSet: Set<Component> | undefined = this.components.get(component.constructor.name)
        if (!componentSet) {
            componentSet = new Set([component]) as Set<Component>
            this.components.set(component.constructor.name, componentSet)

        } else {
            componentSet.add(component as Component)
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

    loadState(state: any) {
        this.id = state.id
        this.name = state.name
        Object.keys(state.entities).forEach(entityId => {
            const entity = this.createEntity()
            entity.loadState(state.entities[entityId])
        })
        Object.keys(state.components).forEach(componentType => {
            const componentSet = state.components[componentType]
            componentSet.forEach((component: any) => {
                if (!Components[componentType]) return
                const componentClass = Components[componentType]
                const componentInstance = new componentClass()
                componentInstance.loadState(component)
            })
        })
    }
} 