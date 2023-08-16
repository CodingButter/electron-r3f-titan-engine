import * as THREE from 'three';
import Component from '@titan/Scene/Component/Component';

export default class TransformComponent extends Component {
    position: THREE.Vector3;
    rotation: THREE.Vector3;
    scale: THREE.Vector3;
    constructor(position?: THREE.Vector3, rotation?: THREE.Vector3, scale?: THREE.Vector3) {
        super();
        this.position = position || new THREE.Vector3();
        this.rotation = rotation || new THREE.Vector3();
        this.scale = scale || new THREE.Vector3(1, 1, 1);
    }
    loadState(state: any) {
        this.position = new THREE.Vector3(state.position.x, state.position.y, state.position.z);
        this.rotation = new THREE.Vector3(state.rotation.x, state.rotation.y, state.rotation.z);
        this.scale = new THREE.Vector3(state.scale.x, state.scale.y, state.scale.z);
    }
}