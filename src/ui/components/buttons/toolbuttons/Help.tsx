import ToolButton from "@titan-ui/components/buttons/ToolButton"
import { ButtonProps } from "@titan-ui/components/Button"

export default function Help({ ...rest }: ButtonProps) {
  return (
    <ToolButton
      label="Help"
      description="Move the selected object(s) in the world"
      order={13}
      className={"bg-neutral-500 text-neutral-200"}
      {...rest}>
      <i className="fa-solid fa-question-circle"></i>
    </ToolButton>
  )
}
