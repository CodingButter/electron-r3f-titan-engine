import * as THREE from "three";
import Renderable from "@titan/render/renderable";

export default class Cube extends Renderable {
    constructor() {
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const mesh = new THREE.Mesh(geometry, material);
        super(mesh, geometry, material)

    }
}