import CANNON from "cannon"
export default class PhysicsEngine {
  fixedTimeStep: number = 1.0 / 60.0
  world: CANNON.World = new CANNON.World()
  constructor() {
    this.world.gravity.set(0, -9.82, 0)
  }
  addBody(body: CANNON.Body) {
    this.world.addBody(body)
  }
  update(delta: number) {
    this.world.step(this.fixedTimeStep, delta, 3)
  }
}
