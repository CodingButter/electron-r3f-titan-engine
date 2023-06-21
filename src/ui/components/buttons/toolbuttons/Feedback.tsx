import ToolButton from "@titan-ui/components/buttons/ToolButton"
import { ButtonProps } from "@titan-ui/components/Button"

export default function Feedback({ ...rest }: ButtonProps) {
  return (
    <ToolButton
      label="Feedback"
      description="Move the selected object(s) in the world"
      order={15}
      className={"bg-neutral-500 text-neutral-200"}
      {...rest}>
      <i className="fa-solid fa-comment-alt"></i>
    </ToolButton>
  )
}
