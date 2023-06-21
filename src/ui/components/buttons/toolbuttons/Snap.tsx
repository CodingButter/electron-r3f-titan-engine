import ToolButton from "@titan-ui/components/buttons/ToolButton"
import { ButtonProps } from "@titan-ui/components/Button"

export default function Snap({ ...rest }: ButtonProps) {
  return (
    <ToolButton
      label="Snap"
      description="Move the selected object(s) in the world"
      order={6}
      className={"bg-neutral-500 text-neutral-200"}
      {...rest}>
      <i className="fa-solid fa-magnet"></i>
    </ToolButton>
  )
}
