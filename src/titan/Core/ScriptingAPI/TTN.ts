import Entity from "@titan/Scene/Entity";
import Scene from "@app/titan/Scene/Scene";
import Script from "@titan/Core/ScriptingAPI/Script"
import ScriptComponent from "@titan/Scene/Component/ScriptComponent";
import BaseClass from "@titan/BaseClass";

export default class TTN extends BaseClass {
    scriptComponent: ScriptComponent;
    public static scripts: Map<string, string> = new Map<string, string>();
    createScript!: (scriptName: string, script: string) => Script;
    constructor(scriptComponent: ScriptComponent) {
        super()
        this.scriptComponent = scriptComponent;
    }
    createEntity(): Entity {
        return new Entity(Scene.getCurrentScene());
    }
}