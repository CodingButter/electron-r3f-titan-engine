import ToolButton from "@app/components/buttons/ToolButton"
import { ButtonProps } from "@app/components/buttons/Button"

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
