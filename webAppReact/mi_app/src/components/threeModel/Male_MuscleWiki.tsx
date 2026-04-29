import * as THREE from 'three'
import React, { useState } from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'

// 1. Interfaz flexible
type GLTFResult = GLTF & {
  nodes: any
  materials: any
}

export function Model({ onSelectMuscles, ...props }: any) {
  const { nodes } = useGLTF('/models/Male_MuscleWiki.glb') as unknown as GLTFResult
  
  const [hovered, setHovered] = useState<string | null>(null)
  // CAMBIO: Ahora es una lista de músculos seleccionados
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([])

  const ignoredNames = ['Cuerpo', 'Scene'];

  const handlePointerClick = (e: any, name: string) => {
    e.stopPropagation();
    if (ignoredNames.includes(name)) return;

    // Lógica de "Toggle" (Quitar si existe, agregar si no)
    // Manejamos el antebrazo como una sola entidad
    const targetName = (name === 'Antebrazo' || name === 'Antebrazo_1') ? 'Antebrazo' : name;

    setSelectedMuscles((prev) => {
      const isAlreadySelected = prev.includes(targetName);
      const newSelection = isAlreadySelected
        ? prev.filter((m) => m !== targetName) // Lo quitamos
        : [...prev, targetName];              // Lo agregamos

      // Notificamos a la página principal con la lista completa
      if (onSelectMuscles) onSelectMuscles(newSelection);
      
      return newSelection;
    });
  };

  return (
    <group {...props} dispose={null}>
      {Object.keys(nodes).map((key) => {
        const node = nodes[key]
        if (node.type === 'Mesh') {
          const isIgnored = ignoredNames.includes(node.name);
          const isForearmNode = node.name === 'Antebrazo' || node.name === 'Antebrazo_1';
          const targetName = isForearmNode ? 'Antebrazo' : node.name;

          // Verificamos si este nodo específico (o su versión fusionada) está en la lista
          const isSelected = selectedMuscles.includes(targetName);
          const isHovered = hovered === node.name || (isForearmNode && hovered?.includes('Antebrazo'));

          return (
           <mesh
              key={key}
               geometry={node.geometry}
                // Solo permitimos clics y hovers si NO es una parte ignorada
                onClick={(e) => !isIgnored && handlePointerClick(e, node.name)}
                onPointerOver={(e) => {
              if (isIgnored) return; // Si es la cabeza/pies, no hace nada
                  e.stopPropagation();
                  setHovered(node.name);
                  document.body.style.cursor = 'pointer';
              }}
                onPointerOut={() => {
                    setHovered(null);
                    document.body.style.cursor = 'default';
                }}
              > 
                  <meshStandardMaterial
                    // LÓGICA DE COLOR CORREGIDA:
                    // Si es parte ignorada, mantenemos el color base siempre (#333 o similar)
                    // Si no, aplicamos la lógica de selección/hover
                    color={
                      isIgnored 
                        ? '#444444' // El color que tenían los músculos antes, ahora para cabeza/pies
                        : isSelected 
                          ? '#ff0000' 
                          : isHovered 
                            ? '#882222' 
                            : '#444444' // Músculos en reposo vuelven a su color original
                    }
                      // Mantenemos el brillo solo para los músculos seleccionados
                        emissive={(!isIgnored && isSelected) ? '#ff0000' : '#000000'}
                        emissiveIntensity={(!isIgnored && isSelected) ? 0.8 : 0}

                        // Ajustamos el acabado para que sea metálico pero oscuro
                        metalness={0.7}     // Un poco menos que antes para que no parezca espejo
                        roughness={0.3}     // Un poco más de rugosidad para ese efecto "acero cepillado"
                  />
              </mesh>
          )
        }
        return null
      })}
    </group>
  )
}

useGLTF.preload('/models/Male_MuscleWiki.glb')