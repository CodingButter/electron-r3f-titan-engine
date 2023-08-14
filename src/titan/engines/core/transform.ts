import * as THREE from 'three';

export default class Transform {
    position: THREE.Vector3;
    rotation: THREE.Vector3;
    scale: THREE.Vector3;
    constructor(position: THREE.Vector3, rotation: THREE.Vector3, scale: THREE.Vector3) {
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
}