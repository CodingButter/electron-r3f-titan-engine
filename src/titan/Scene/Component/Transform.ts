import * as THREE from 'three';
import Component from '@titan/Scene/Component';

export default class Transform extends Component {
    position: THREE.Vector3;
    rotation: THREE.Vector3;
    scale: THREE.Vector3;
    constructor(position?: THREE.Vector3, rotation?: THREE.Vector3, scale?: THREE.Vector3) {
        super();
        this.position = position || new THREE.Vector3();
        this.rotation = rotation || new THREE.Vector3();
        this.scale = scale || new THREE.Vector3(1, 1, 1);
    }
}