import ToolButton from "@titan-ui/components/ToolButton"
import { ButtonProps } from "@titan-ui/components/Button"



export default function Publish({ ...rest }: ButtonProps) {
    return <ToolButton
        label="Publish"
        description="Move the selected object(s) in the world"
        order={12}
        className={"bg-neutral-500 text-neutral-200"} {...rest}>
        <i className="fa-solid fa-upload"></i>
    </ToolButton>
}