import ToolButton from "@titan-ui/components/buttons/ToolButton"
import { ButtonProps } from "@titan-ui/components/Button"
import useGameManager from "@titan/src/engine/hooks/useGameManager"
import { GameManager } from "@titan/src/engine/providers/GameManagerProvider"

export default function Settings({ ...rest }: ButtonProps) {
  const { createProject } = useGameManager() as GameManager

  const click = () => {
    createProject("New Project")
  }

  return (
    <ToolButton
      label="Settings"
      description="Move the selected object(s) in the world"
      order={16}
      onClick={click}
      className={"bg-neutral-500 text-neutral-200"}
      {...rest}>
      <i className="fa-solid fa-cog"></i>
    </ToolButton>
  )
}
