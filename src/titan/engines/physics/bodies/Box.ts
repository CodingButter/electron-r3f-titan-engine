import CANNON from "cannon"
import * as THREE from "three"
import Body from "@titan/engines/physics/body"
import Entity from "@titan/engines/core/entity"

export default class Box extends Body {
  constructor(
    entity: Entity,
    mass: number,
    position: CANNON.Vec3 | THREE.Vector3,
    scale: CANNON.Vec3 | THREE.Vector3
  ) {
    position = new CANNON.Vec3(position.x, position.y, position.z)
    const shape = new CANNON.Box(new CANNON.Vec3(scale.x, scale.y, scale.z))
    super(entity, { mass, position, shape })
  }
  update(delta: number) {
    super.update(delta)
  }
}
