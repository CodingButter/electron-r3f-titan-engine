import classNames from "classnames"
import Button, { ButtonProps } from "@titan-ui/components/Button"
import  useTools from "@titan-shared/hooks/useTools"

export interface ToolButtonProps extends ButtonProps {
    label: string
    description: string
    order: number
}

const ToolButton = ({ className, label, description, order, children, disabled, ...rest }:ToolButtonProps ) => {
    const {activeTool, setActiveTool} = useTools()

    return (
        <Button title={`${label}\n${description}`}
            style={{ order }}
            size="lg"
            className={classNames("hover:bg-neutral-550 w-full h-full flex justify-center items-center text-2xl", className)}
            active={activeTool === label}
            onClick={() => setActiveTool(label)}    
            disabled={disabled}
            {...rest }>
            {children}
        </Button>
    )
}

export default ToolButton