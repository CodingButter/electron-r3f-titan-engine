import ToolButton from "@titan-ui/components/ToolButton"
import { ButtonProps } from "@titan-ui/components/Button"



export default function Settings({ ...rest }: ButtonProps) {
    return <ToolButton
        label="Settings"
        description="Move the selected object(s) in the world"
        order={16}
        className={"bg-neutral-500 text-neutral-200"} {...rest}>
        <i className="fa-solid fa-cog"></i>
    </ToolButton>
}