
import ToolButton from "@titan-ui/components/ToolButton"
import { ButtonProps } from "@titan-ui/components/Button"

export default function Translate({ ...rest }: ButtonProps) {

    return <ToolButton
        label="Translate"
        description="Move the selected object(s) in the world"
        order={1}
        className={"bg-neutral-500 text-neutral-250"} {...rest}>
        <i className="fa-solid fa-up-down-left-right"></i>
    </ToolButton>
}
