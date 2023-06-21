import { useState } from "react"
import DropDown from "@titan-ui/components/DropDown"

const FileMenu = () => {
  const [currentDropDown, setCurrentDropDown] = useState<string | null>(null)
  return (
    <div className="z-[500] h-[25px] w-screen bg-neutral-700 text-neutral-300 flex justify-start items-center gap-2 relative">
      <DropDown
        opened={true}
        label="File"
        currentDropDown={currentDropDown}
        setCurrentDropDown={setCurrentDropDown}>
        <button className={"block"}>New File</button>
        <button className={"block"}>New File</button>
        <button className={"block"}>New File</button>
      </DropDown>
      <div>Edit</div>
      <div>View</div>
    </div>
  )
}

export default FileMenu
