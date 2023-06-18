import ToolButton from "@titan-ui/components/ToolButton"
import { ButtonProps } from "@titan-ui/components/Button"



export default function Rotate({ ...rest }: ButtonProps) {
    return <ToolButton
        label="Rotate"
        description="Rotate the selected object(s) in the world"
        order={2}
        className={"bg-neutral-500 text-neutral-200"} {...rest}>
        <i className="fa-solid fa-rotate"></i>
    </ToolButton>
}