//<reference path="../types/index.d.ts" />
import Scene from "@app/titan/Scene/Scene"
import RenderEngine from "@titan/Renderer/Renderer"
import PhysicsEngine from "@titan/PhysicsEngine/PhysicsEngine"

const myCode = {
    "className": "Scene",
    "id": "e35eafc3-7f68-4cda-83ce-40c4b753b62d",
    "name": "Scene 1",
    "runtime": false,
    "entities": {
        "d525bf3b-6464-4ae6-9b4e-c095daf7ba63": {
            "className": "Entity",
            "id": "d525bf3b-6464-4ae6-9b4e-c095daf7ba63",
            "name": "Entity 1",
            "sceneId": "e35eafc3-7f68-4cda-83ce-40c4b753b62d",
            "runtime": false
        }
    },
    "components": {
        "TransformComponent": [
            {
                "className": "TransformComponent",
                "id": "358451fa-ae0b-4d15-ae27-2d0e4f5b5b2a",
                "name": "TransformComponent 1",
                "sceneId": "e35eafc3-7f68-4cda-83ce-40c4b753b62d",
                "entityId": "d525bf3b-6464-4ae6-9b4e-c095daf7ba63",
                "runtime": false,
                "position": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "scale": {
                    "x": 1,
                    "y": 1,
                    "z": 1
                }
            }
        ],
        "ScriptComponent": [
            {
                "className": "ScriptComponent",
                "id": "59fe0ee4-c296-43f4-b0ff-4de39705fca5",
                "name": "ScriptComponent 1",
                "sceneId": "e35eafc3-7f68-4cda-83ce-40c4b753b62d",
                "entityId": "d525bf3b-6464-4ae6-9b4e-c095daf7ba63",
                "runtime": false,
                "scripts": {
                    "SomeScript": {
                        "className": "Script",
                        "id": "2c96d793-bd03-4939-84ff-6a69e3b01362",
                        "name": "SomeScript",
                        "sceneId": "e35eafc3-7f68-4cda-83ce-40c4b753b62d",
                        "entityId": "d525bf3b-6464-4ae6-9b4e-c095daf7ba63",
                        "runtime": false,
                        "attributes": {
                            "className": "Attributes",
                            "id": "9e3c030a-e404-4333-b05b-75f8e0eb07ab",
                            "name": "Attributes 1",
                            "sceneId": "e35eafc3-7f68-4cda-83ce-40c4b753b62d",
                            "entityId": "d525bf3b-6464-4ae6-9b4e-c095daf7ba63",
                            "runtime": false,
                            "attributes": {
                                "someAttribute": {
                                    "className": "ScriptAttribute",
                                    "id": "b494d9d6-5249-4997-824c-5773118a4f27",
                                    "name": "someAttribute",
                                    "runtime": false,
                                    "type": "string",
                                    "value": "someValue",
                                    "default": "someValue",
                                    "description": "someDescription"
                                }
                            }
                        },
                        "componentId": "59fe0ee4-c296-43f4-b0ff-4de39705fca5",
                        "code": "\n            const someScript = ttn.createScript(\"SomeScript\")\n\n            someScript.attributes.add(\"someAttribute\",{\n                type: \"string\",\n                value: \"someValue\",\n                description: \"someDescription\",\n                default: \"someDefault\"\n            })\n            const scene = this.app.root\n            someScript.init = function() {\n                this.someEntity = ttn.createEntity(\"SomeEntity\")\n                scene.addEntity(this.someEntity)\n            }\n        ",
                        "someAttribute": "someDefault"
                    }
                },
                "app": {
                    "className": "APP",
                    "id": "985ee968-9d95-4dc8-9f05-eacda6852b9b",
                    "name": "APP 1",
                    "sceneId": "e35eafc3-7f68-4cda-83ce-40c4b753b62d",
                    "entityId": "d525bf3b-6464-4ae6-9b4e-c095daf7ba63",
                    "runtime": false
                }
            }
        ]
    }
}

export default class Core {
    static instance: Core
    scene!: Scene
    renderEngine!: RenderEngine
    physicsEngine!: PhysicsEngine
    running = false
    init(canvas: HTMLCanvasElement, width = 800, height = 600) {
        this.scene = new Scene()
        Scene.changeScene(this.scene.id)
        //this.scene.loadState(myCode)
        this.renderEngine = new RenderEngine("Titan Engine", canvas, width, height)
        this.physicsEngine = new PhysicsEngine()
        this.run();
    }

    destroy() {
        this.scene.destroy();
    }

    public run() {
        if (this.running) return
        this.running = true
        this.scene.init()
        this.update(Date.now())
        this.render()
    }

    public stop() {
        this.running = false
    }

    private update(prevTime: number) {
        if (!this.running) return
        const time = Date.now()
        const delta = prevTime ? (time - prevTime) / 1000 : 0
        this.physicsEngine.update(delta)
        this.scene.update(delta)
        setTimeout(() => {
            this.update(time)
        }, 0)
    }

    private render() {
        if (!this.running) return
        this.scene.render()
        this.renderEngine.render()
        requestAnimationFrame(this.render.bind(this))
    }

    public static get(): Core {
        if (!Core.instance) {
            Core.instance = new Core()
        }
        return Core.instance
    }

}
