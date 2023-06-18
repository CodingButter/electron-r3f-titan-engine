import ToolButton from "@titan-ui/components/ToolButton"
import { ButtonProps } from "@titan-ui/components/Button"



export default function Controls({ ...rest }: ButtonProps) {
    return <ToolButton
        label="Controls"
        description="Move the selected object(s) in the world"
        order={14}
        className={"bg-neutral-500 text-neutral-200"} {...rest}>
        <i className="fa-solid fa-keyboard"></i>
    </ToolButton>
}