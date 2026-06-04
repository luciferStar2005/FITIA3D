import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Push_Up() {

  const group = useRef<THREE.Group>(null!);

  // Carga GLB
  const { scene, animations } = useGLTF("/models/Push_Up.glb");

  // Animaciones
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {

    console.log(names);
    console.log(actions);

    // Reproduce la primera animación
    if (names.length > 0) {
      actions[names[0]]?.play();
    }

  }, [actions, names]);

  return (
    <group
      ref={group}
      scale={95}
      position={[0, 0, 0]}
    >
      <primitive object={scene} />
    </group>
  );
}