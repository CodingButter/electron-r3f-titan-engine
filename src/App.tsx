import { useEffect } from "react";
import useLocalStorage from "@titan-shared/hooks/useLocalStorage"
import Splitter from "@titan-ui/components/Splitter";
import classNames from "classnames";
import { useResizable } from "react-resizable-layout";
import Titan from "@titan-engine/Titan";
import useModal from "@titan-ui/hooks/useModal"

import Toolbar from "@titan-ui/components/Toolbar";

function App() {
  const { Modal } = useModal()
  const [hierarchyExpanded, setHierarchyExpanded] = useLocalStorage("hierarchyExpanded", true)
  const [hierarchyPosition, setHierarchyPosition] = useLocalStorage("hierarchyPosition", 250)
  const [inspectorPosition, setInspectorPosition] = useLocalStorage("inspectorPosition", 250)
  const [assetManagerPosition, setAssetManagerPosition] = useLocalStorage("assetManagerPosition", 250)
  const { isDragging: isHierarchyDragging, endPosition: hierarchyEndPosition, position: hierarchyDragPosition, separatorProps: hierarchyDragBarProps } = useResizable({
    axis: 'x',
    min: 245,
    max: 600,
    initial: hierarchyPosition
  })
  
  const { isDragging: isInspectorDragging, endPosition:inpectorEndPosition, position: inspectorDragPosition, separatorProps: inspectorDragBarProps } = useResizable({
    axis: 'x',
    max: 600,
    reverse: true,
    initial: inspectorPosition
  })
  
  const { isDragging: isAssetManagerDragging, endPosition:assetManagerEndPosition, position: assetManagerDragPosition, separatorProps: assetManagerDragBarProps } = useResizable({
    axis: 'y',
    min: 150,
    max: 600,
    initial: assetManagerPosition,
    reverse: true
  })

  useEffect(() => {
    setHierarchyPosition(hierarchyExpanded?hierarchyDragPosition|0:74)
  }, [hierarchyEndPosition, setHierarchyPosition, hierarchyExpanded, hierarchyDragPosition])

  useEffect(() => {
    setInspectorPosition(inpectorEndPosition|0)
  }, [inpectorEndPosition, setInspectorPosition])

  useEffect(() => {
    setAssetManagerPosition(assetManagerEndPosition|0)
  }, [assetManagerEndPosition, setAssetManagerPosition])

  return (
      <div className={"w-screen h-screen justify-center items-center overflow-clip flex flex-col relative"}>
      <div className="w-full h-full absolute left-1/2 -top-1/2 m-auto">
        <div className="absolute w-full h-full -left-1/2 top-1/2">
            <Titan/>
          </div>        
        </div>
      <div className={"flex h-full w-full flex-col text-neutral-100 relative z-20"}>
        <div className={"flex grow"}>
          
          <div className={classNames(hierarchyExpanded?"bg-neutral-600":"bg-neutral-700"," shrink-0 flex items-start justify-start h-full overflow-hidden z-20", isHierarchyDragging ? "dragging" : "")} style={{ width: hierarchyExpanded?hierarchyDragPosition|0:74 }}>
           <div className='flex justify-start items-start w-16'>
              <Toolbar/>
            </div>
            <div className="flex justify-start items-start w-full">
              Hierarchy
            </div>
          </div>
          <Splitter id="HierarchySplitter" dir="vertical" isDragging={isHierarchyDragging} {...hierarchyDragBarProps} />
          <div className={"flex flex-col grow shrink-0 justify-center items-center"}> 
            <div className={"grow flex justify-center items-center w-full"}>
             
            </div>
            <Splitter id="AssetManagerSplitter" dir="horizontal" isDragging={isAssetManagerDragging} {...assetManagerDragBarProps} />
            <div className={classNames("bg-neutral-400 shrink-0 grid place-items-center w-full", isAssetManagerDragging ? "dragging" : "")} style={{ height: assetManagerDragPosition|0 }}>
              Asset Manager
            </div>
          </div>
          <Splitter id="InpsectorSplitter" dir="vertical" isDragging={isInspectorDragging} {...inspectorDragBarProps} />
          <div className={classNames("bg-neutral-400 shrink-0 grid place-items-center z-20 relative", isInspectorDragging ? "dragging" : "")} style={{ width: inspectorDragPosition|0 }}>
            Inspector
          </div>
        </div>
        <div className="z-20 bg-neutral-650 flex justify-start items-start p-2 py-0 text-[12px] font-thin text-neutral-300">
          Actions Panel
        </div>
        { Modal && Modal }
      </div>
    </div>
  );
}

export default App
