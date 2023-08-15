import TTN from '@app/titan/Core/ScriptingAPI/TTN'
import Component from '@titan/Scene/Component/Component'
import Entity from '@titan/Scene/Entity'
import Script from '@titan/Core/ScriptingAPI/Script'




export default class ScriptComponent extends Component {
    ttn: TTN
    scripts: Map<string, Script> = new Map()
    code: string
    constructor(entity: Entity, script: string) {
        super(entity)
        this.code = script
        this.ttn = new TTN(this)
        this.ttn.createScript = (scriptName: string): Script => {
            TTN.scripts.set(scriptName, script);
            const newScript: Script = new Script(scriptName, this)
            this.scripts.set(scriptName, newScript)
            return newScript
        }
        this.parseScript()
    }
    init() {
        this.scripts.forEach((script) => {
            script.init()
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(delta: number) {
        console.log("script must have update function")
    }
    parseScript() {
        // eslint-disable-next-line no-eval
        let ttn = this.ttn

        eval(this.code)
    }


}