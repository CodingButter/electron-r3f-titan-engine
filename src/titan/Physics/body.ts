import CANNON from "cannon"
import Entity from "@app/titan/Scene/Entity"
export default class Body extends CANNON.Body {
  entity: Entity
  constructor(
    entity: Entity,
    {
      mass,
      position,
      shape,
    }: {
      mass: number
      position: CANNON.Vec3
      shape: CANNON.Shape
    }
  ) {
    super({ mass, position, shape })
    this.entity = entity
  }
  update() {
    this.entity.transform.position.set(
      this.position.x,
      this.position.y,
      this.position.z)

    this.entity.transform.rotation.set(
      this.entity.transform.rotation.x,
      this.entity.transform.rotation.y,
      this.entity.transform.rotation.z
    )

  }
}
