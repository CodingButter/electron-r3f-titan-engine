import * as THREE from 'three';

export default class Renderable {
    mesh!: THREE.Mesh;
    geometry!: THREE.BufferGeometry;
    material!: THREE.Material;
    constructor(mesh: THREE.Mesh, geometry: THREE.BoxGeometry, material: THREE.Material) {
        this.mesh = mesh;
        this.geometry = geometry;
        this.material = material;
    }

    get type() {
        return this.constructor.name;
    }
}