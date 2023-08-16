//<reference path="../../../types/Matrix.d.ts"/>
import CANNON, { Vec3 } from "cannon"
import Body from "@titan/PhysicsEngine/Body/Body"
import Entity from "@app/titan/Scene/Entity"

export default class Box extends Body {
  constructor(
    entity: Entity,
    mass: number,
    position,
    scale: Vec3
  ) {
    position = new Vec3(position.x, position.y, position.z)
    const shape = new CANNON.Box(new Vec3(scale.x, scale.y, scale.z))
    super(entity, { mass, position, shape })
  }
  update() {
    super.update()
  }
}
