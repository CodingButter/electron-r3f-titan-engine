import { Canvas } from "@react-three/fiber"
import * as THREE from "three"

const Titan = () => {
  return (
    <Canvas className="bg-black" camera={<orthographicCamera />}>
      <pointLight position={[10, 10, 10]} />
      <ambientLight args={[0xffffff, 0.05]} />

      <mesh>
        <sphereGeometry></sphereGeometry>
        <meshStandardMaterial color={"orange"} />
      </mesh>
    </Canvas>
  )
}

export default Titan
