import { Canvas } from "@react-three/fiber"

const Titan = () => {
  return (
    <Canvas className="bg-black">
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  )
}

export default Titan
