import * as THREE from 'three'
import Component from "@titan/Scene/Component/Component"

export default class MeshComponent extends Component {
    mesh: THREE.Mesh
    material: THREE.Material
    geometry: THREE.BufferGeometry
    constructor(geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1), material: THREE.Material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })) {
        super()
        this.geometry = geometry
        this.material = material
        this.mesh = new THREE.Mesh(geometry, material)
    }
    loadState(state) {
        super.loadState(state)
        this.geometry = new THREE.BufferGeometry()
    }
    render() {
        if (!this.entity) return
        this.mesh.position.set(this.entity.position.x, this.entity.position.y, this.entity.position.z)
        this.mesh.rotation.set(this.entity.rotation.x, this.entity.rotation.y, this.entity.rotation.z)
        this.mesh.scale.set(this.entity.scale.x, this.entity.scale.y, this.entity.scale.z)
    }
}