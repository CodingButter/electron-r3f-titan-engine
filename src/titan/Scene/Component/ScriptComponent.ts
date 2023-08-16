import TTN from '@app/titan/Core/ScriptingAPI/TTN'
import Component from '@titan/Scene/Component/Component'
import Entity from '@titan/Scene/Entity'
import Script from '@titan/Core/ScriptingAPI/Script'




export default class ScriptComponent extends Component {
    ttn: TTN
    scripts: Map<string, Script> = new Map()
    code: string
    constructor(script: string, entity?: Entity) {
        super(entity)
        this.code = script
        this.ttn = new TTN(this)
        this.ttn.createScript = (scriptName: string): Script => {
            TTN.scripts.set(scriptName, script);
            const newScript: Script = new Script(scriptName, this)
            this.scripts.set(scriptName, newScript)
            return newScript
        }
    }
    init() {
        this.scripts.forEach((script) => {
            script.init()
        })
    }
    update(delta: number) {
        console.log("script must have update function")
    }
    parseScript() {
        const ttn = this.ttn

        eval(this.code)
    }

    loadState(state: any) {
        this.code = state.code
        this.name = state.name
        this.id = state.id
        Object.keys(state.scripts).forEach((scriptName: any) => {
            const script = state.scripts[scriptName]
            const newScript = new Script(scriptName, this)
            newScript.loadState(script)
            this.scripts.set(script.name, newScript)
        })
    }

}