import RenderEngine from "@titan/engines/render"
import Entity from "@app/titan/engines/core/entity"
import * as THREE from "three"

export default class Core {
    entities: Entity[] = []
    renderEngine: RenderEngine
    running = false;
    timer = 0;
    lastTime: number = Date.now();
    constructor(canvas: HTMLCanvasElement, width = 800, height = 600) {
        this.renderEngine = new RenderEngine("Titan Engine", canvas, width, height)

    }
    public run() {
        this.running = true;
        this.update();
        this.render();
    }

    public stop() {
        this.running = false;
    }

    public addCube(x: number, y: number, z: number, size: number) {
        const cube = new Entity(new THREE.Vector3(x, y, z), new THREE.Vector3(0, 0, 0), new THREE.Vector3(size, size, size))
        this.renderEngine.scene.add(cube.renderable.mesh);
        this.entities.push(cube)
    }

    private update(lastTime: number) {
        //get microseconts
        const now = window.performance.now();
        const delta = (now - lastTime) / 1000;
        if (!this.running) return;
        this.entities.forEach(entity => {
            entity.update(delta)
        })
        setTimeout(() => {
            this.update(now)
        }, 0);
    }

    private render() {
        if (!this.running) return;
        this.renderEngine.render();
        requestAnimationFrame(this.render.bind(this));
    }
}