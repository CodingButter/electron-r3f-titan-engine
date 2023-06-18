import ToolButton from "@titan-ui/components/ToolButton"
import { ButtonProps } from "@titan-ui/components/Button"



export default function Scale({ ...rest }: ButtonProps) {
    return <ToolButton
        label="Scale"
        description="Move the selected object(s) in the world"
        order={3}
        className={"bg-neutral-500 text-neutral-200"} {...rest}>
        <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
    </ToolButton>
}