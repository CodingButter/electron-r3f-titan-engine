import * as THREE from 'three';
import Transform from '@app/titan/engines/core/transform';
import Component from '@app/titan/engines/core/component';
import Renderable from '@app/titan/engines/render/renderable';
import Cube from '@app/titan/engines/render/renderables/cube';

export default class Entity {
    static entities: Entity[] = [];
    angle = 0;
    components: Component[] = [];
    id = 0;
    name = "Entity";
    transform: Transform;
    renderable!: Renderable;
    castShadow = true;
    castLight = false;
    receiveShadow = true;
    static = false;
    lightmapped = false;
    customAABB = false;
    batchGroupId = 0;
    layer: Layer = 'World'
    constructor(position: THREE.Vector3, rotation: THREE.Vector3 = new THREE.Vector3(0), scale: THREE.Vector3 = new THREE.Vector3(1)) {
        this.id = Entity.entities.length;
        Entity.entities.push(this);
        this.transform = new Transform(position, rotation, scale);
        this.renderable = new Cube();
        this.name = `Entity ${this.id}`
    }
    addComponent(component: Component) {
        component.entity = this;
        this.components.push(component);
    }
    update(delta: number) {
        this.angle += delta;
        this.transform.position.z = -5 + Math.sin(this.angle);
        this.transform.position.x = Math.cos(this.angle);
        this.transform.rotation.x = this.angle;
        this.renderable.mesh.rotation.set(this.transform.rotation.x, this.transform.rotation.y, this.transform.rotation.z)
        this.renderable.mesh.position.set(this.transform.position.x, this.transform.position.y, this.transform.position.z);
        this.components.forEach(component => {
            component.update();
        });
    }
}
