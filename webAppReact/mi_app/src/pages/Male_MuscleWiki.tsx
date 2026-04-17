import * as THREE from 'three'
import React, { useState } from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'

// 1. Interfaz flexible
type GLTFResult = GLTF & {
  nodes: any
  materials: any
}

export function Model({ onSelectMuscle, ...props }: any) {
  // Asegúrate de que la ruta sea correcta
  const { nodes } = useGLTF('/models/Male_MuscleWiki.glb') as unknown as GLTFResult
  
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  // Lista de nombres que queremos ignorar (el cuerpo base por ejemplo)
  const ignoredNames = ['Cuerpo', 'Scene'];

  return (
    <group {...props} dispose={null}>
      {Object.keys(nodes).map((key) => {
        const node = nodes[key]
        
        // Solo procesamos si es una malla (Mesh)
        if (node.type === 'Mesh') {
          
          // --- NUEVA LÓGICA DE FUSIÓN DE ANTEBRAZOS ---
          const isForearmNode = node.name === 'Antebrazo' || node.name === 'Antebrazo_1';
          
          // Hover: ¿Estamos sobre algún antebrazo?
          const isHoveredGeneral = hovered === node.name;
          const isForearmHovered = isForearmNode && (hovered === 'Antebrazo' || hovered === 'Antebrazo_1');
          
          // Selección: ¿Está seleccionado algún antebrazo?
          const isSelectedGeneral = selected === node.name;
          const isSelectedForearm = isForearmNode && (selected === 'Antebrazo' || selected === 'Antebrazo_1');

          // El estado "final" que usará el material y la UI
          const finalIsHovered = isForearmNode ? isForearmHovered : isHoveredGeneral;
          const finalIsSelected = isForearmNode ? isSelectedForearm : isSelectedGeneral;
          
          const isIgnored = ignoredNames.includes(node.name);

          // Nombre limpio para la UI de la IA
          const cleanName = isForearmNode ? 'Antebrazo' : node.name.replace(/_/g, ' ');

          return (
            <mesh
              key={key}
              geometry={node.geometry}
              name={node.name}
              
              // --- EVENTOS ---
              onPointerOver={(e) => {
                if (isIgnored) return
                e.stopPropagation() 
                setHovered(node.name) // Guardamos el nombre real
                document.body.style.cursor = 'pointer'; // Cursor de mano pro
              }}
              onPointerOut={() => {
                setHovered(null);
                document.body.style.cursor = 'default';
              }}
              onClick={(e) => {
                if (isIgnored) return
                e.stopPropagation() // El fix del pecho vs espalda sigue activo aquí
                setSelected(node.name) // Guardamos el nombre real
                
                if (onSelectMuscle) {
                  onSelectMuscle(cleanName) // Enviamos el nombre fusionado a la UI
                }
              }}
            >
              <meshStandardMaterial
                // --- COLORES DINÁMICOS FUSIONADOS ---
                // Si cualquiera de los antebrazos es seleccionado/hovered, ambos brillan
                color={isIgnored ? '#333333' : finalIsSelected ? '#ff0000' : finalIsHovered ? '#882222' : '#444444'}
                emissive={finalIsSelected ? '#ff0000' : '#000000'}
                emissiveIntensity={finalIsSelected ? 1.5 : 0}
                roughness={0.4}
                metalness={0.3}
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