//<reference path="../types/index.d.ts" />
import Scene from "@app/titan/Scene/Scene"
import RenderEngine from "@titan/Renderer/Renderer"
import PhysicsEngine from "@titan/PhysicsEngine/PhysicsEngine"
import EditorScene from "../Scene/EditorScene"

const SceneObject = {
    "className": "EditorScene",
    "id": "6599b283-ffd0-4140-962e-89284bc2fd12",
    "name": "EditorScene 1",
    "entities": {
        "713ccadf-a2c6-422f-a69f-081994405b33": {
            "className": "Entity",
            "id": "713ccadf-a2c6-422f-a69f-081994405b33",
            "name": "Entity 1",
            "sceneId": "6599b283-ffd0-4140-962e-89284bc2fd12"
        }
    },
    "components": {
        "TransformComponent": [
            {
                "className": "TransformComponent",
                "id": "6a0a6a38-adc5-40bb-85c3-5512b15dc892",
                "name": "Transform 1",
                "entityId": "713ccadf-a2c6-422f-a69f-081994405b33",
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
            },
            {
                "className": "TransformComponent",
                "id": "b2d0663f-0af2-4287-b059-48d03d84913f",
                "name": "Transform 2",
                "entityId": "d011576d-7edc-4276-b94f-b6f249dc97c3",
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
                "id": "3d754139-9061-426c-9cc7-710683f9277c",
                "name": "ScriptComponent 1",
                "entityId": "713ccadf-a2c6-422f-a69f-081994405b33",
                "ttn": {
                    "className": "TTN",
                    "id": "8a105153-b90b-41aa-aecb-ef79df1bf6ae",
                    "name": "TTN 1",
                    "scriptComponentId": "3d754139-9061-426c-9cc7-710683f9277c"
                },
                "scripts": {
                    "testScript": {
                        "className": "Script",
                        "id": "18bc91f4-4c05-422f-98c3-4ddcab71df5e",
                        "name": "testScript",
                        "sceneId": "6599b283-ffd0-4140-962e-89284bc2fd12",
                        "entityId": "713ccadf-a2c6-422f-a69f-081994405b33",
                        "attributes": {
                            "className": "Attributes",
                            "id": "3e46479e-1305-4e5e-8829-f8d32df94741",
                            "name": "Attributes 1",
                            "sceneId": "6599b283-ffd0-4140-962e-89284bc2fd12",
                            "entityId": "713ccadf-a2c6-422f-a69f-081994405b33",
                            "attributes": {
                                "someAttribute": {
                                    "className": "ScriptAttribute",
                                    "id": "e0c264ce-93ac-42a1-a377-6fcdabe24916",
                                    "name": "someAttribute",
                                    "type": "string",
                                    "description": "this is a test string"
                                },
                                "someNumber": {
                                    "className": "ScriptAttribute",
                                    "id": "a5624ccf-a1de-4975-962c-58af476e6d2f",
                                    "name": "someNumber",
                                    "type": "number",
                                    "description": "this is a test number"
                                }
                            }
                        },
                        "componentId": "3d754139-9061-426c-9cc7-710683f9277c",
                        "someAttribute": "Hello World",
                        "someNumber": 0
                    }
                },
                "code": "\n            const testScript = ttn.createScript(\"testScript\");\n            const bullet = ttn.createEntity()\n\n            class MyRigidBody extends Component {\n                constructor(entity) {\n                    super(entity)\n                }\n                update(dt) {\n                    console.log(\"updating\")\n                }\n            }\n\n            bullet.name = \"Big Bullet\"\n            this.entity.addComponent(new MyRigidBody(this.entity))\n            testScript.attributes.add(\"someAttribute\", {\n                type: \"string\",\n                default: \"Hello World\",\n                description:\"this is a test string\"\n            })\n\n            testScript.attributes.add(\"someNumber\", {\n                type: \"number\",\n                default: 0.0,\n                description:\"this is a test number\"\n            })\n\n            testScript.init = ()=> {\n                this.entity.removeComponent(\"MyRigidBody\")\n            }\n\n            testScript.update = (dt)=> {\n\n            }\n        "
            }
        ],
        "MyRigidBody": [
            {
                "className": "MyRigidBody",
                "id": "6befb28b-06f1-493e-b38c-d1b5a37a15ed",
                "name": "MyRigidBody 1",
                "sceneId": "6599b283-ffd0-4140-962e-89284bc2fd12",
                "entityId": "713ccadf-a2c6-422f-a69f-081994405b33"
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
        this.scene = new EditorScene()
        this.scene.loadState(SceneObject)
        Scene.changeScene(this.scene.id)
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
