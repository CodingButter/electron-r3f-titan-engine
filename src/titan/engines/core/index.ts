import RenderEngine from "@titan/engines/render"
import PhysicsEngine from "@titan/engines/physics"
import Entity from "@app/titan/engines/core/entity"
import * as THREE from "three"
import CANNON from "cannon"

export default class Core {
  entities: Entity[] = []
  renderEngine: RenderEngine
  physicsEngine: PhysicsEngine
  running = false
  constructor(canvas: HTMLCanvasElement, width = 800, height = 600) {
    this.renderEngine = new RenderEngine("Titan Engine", canvas, width, height)
    this.physicsEngine = new PhysicsEngine()
    const ground = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      position: new CANNON.Vec3(0, 10, 0),
    })
    ground.rotation.x = -Math.PI / 2
    this.physicsEngine.addBody(ground)
  }
  public run() {
    this.running = true
    this.update()
    this.render()
  }

  public stop() {
    this.running = false
  }

  public addCube(x: number, y: number, z: number, size: number) {
    const cube = new Entity(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(size, size, size)
    )
    this.renderEngine.scene.add(cube.renderable.mesh)
    this.physicsEngine.addBody(cube.body)
    this.entities.push(cube)
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
