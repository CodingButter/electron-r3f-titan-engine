import * as Tools from "@titan-ui/components/toolbuttons"
const Toolbar = () => {
    return (
        <div id="Toolbar" className="flex flex-col bg-neutral-200 justify-evenly items-center text-2xl h-[calc(100vh_-_20px)] font-bold grow shrink-0">
            <Tools.Translate/>
            <Tools.Rotate/>
            <Tools.Scale/>
            <Tools.Resize/>
            <Tools.LocalWorld/>
            <Tools.Snap/>
            <Tools.Focus/>
            <Tools.Undo/>
            <Tools.Redo/>
            <Tools.SpriteGenerator/>
            <Tools.CodeEditor/>
            <Tools.Publish/>
            <Tools.Help/>
            <Tools.Controls/>
            <Tools.Feedback/>
            <Tools.Settings/>
        </div>
    )
}
export default Toolbar