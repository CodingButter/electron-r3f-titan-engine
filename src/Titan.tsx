import { useEffect, useRef } from 'react'
import Window from '@titan-engine/Window'

const Titan = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const engineWindow = Window.get(containerRef.current)
    engineWindow.run()
    return () => {
      window.stop()
    }
  }, [containerRef])

  return (
    <div ref={containerRef}/>
  )
}

export default Titan
