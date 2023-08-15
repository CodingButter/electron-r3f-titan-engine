import { Scene as SceneType } from "@titan/types"
import Scene from "@titan/Scene/Scene"
import RenderEngine from "@titan/Renderer/Renderer"
import PhysicsEngine from "@titan/PhysicsEngine/PhysicsEngine"
import Entity from "@app/titan/Scene/Entity"

export default class Core {
    scene!: Scene
    entities: Entity[] = []
    renderEngine: RenderEngine
    physicsEngine: PhysicsEngine
    running = false
    constructor(canvas: HTMLCanvasElement, width = 800, height = 600) {
        this.renderEngine = new RenderEngine("Titan Engine", canvas, width, height)
        this.physicsEngine = new PhysicsEngine()
    }

    public loadScene(jsonString: string) {
        const json = <SceneType>JSON.parse(jsonString)
        this.scene = Scene.fromJSON(json)
        this.scene.engine = this;
    }

    public run() {
        this.running = true
        this.update(Date.now())
        this.render()
    }

    public stop() {
        this.running = false
    }

    private update(prevTime: number) {
        if (!this.running) return
        const time = Date.now()
        const delta = prevTime ? (time - prevTime) / 1000 : 0
        this.physicsEngine.update(delta)
        this.entities.forEach((entity) => {
            entity.update(delta)
        })

        setTimeout(() => {
            this.update(time)
        }, 0)
    }

    private render() {
        if (!this.running) return
        this.entities.forEach((entity: Entity) => {
            entity.render()
        })
        this.renderEngine.render()
        requestAnimationFrame(this.render.bind(this))
    }

}
