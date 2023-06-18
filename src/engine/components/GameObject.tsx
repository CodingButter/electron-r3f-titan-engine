import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useEffect, useRef } from "react";

export interface GameObjectProps extends React.HTMLAttributes<HTMLDivElement> {
    data: any
}

const GameObject = ({ data  }: GameObjectProps) => {
    const meshRef = useRef<Mesh>();
    const totalTime = useRef(0);
    useFrame((_,delta) => {
        if (meshRef.current && totalTime.current!==undefined) {
            totalTime.current += delta;
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
            meshRef.current.position.z = Math.sign(totalTime.current) * 3;
        }
    });
    useEffect(() => {
        totalTime.current = 0;
    }
    ,[])
    return data && (
        <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
        </mesh>
    );
}

export default GameObject;