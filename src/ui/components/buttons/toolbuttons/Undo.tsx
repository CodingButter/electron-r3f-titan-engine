import ToolButton from "@titan-ui/components/buttons/ToolButton"
import { ButtonProps } from "@titan-ui/components/Button"
import useTools from "@titan-shared/hooks/useTools"

export default function Undo({ ...rest }: ButtonProps) {
  const { historyIndex } = useTools()
  return (
    <ToolButton
      label="Undo"
      description="Move the selected object(s) in the world"
      order={8}
      className={"bg-neutral-500 text-neutral-200"}
      disabled={historyIndex === 0}
      {...rest}>
      <i className="fa-solid fa-undo"></i>
    </ToolButton>
  )
}
