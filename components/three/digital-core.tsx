'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface CoreProps {
  particleCount?: number
  reducedMotion?: boolean
}

/**
 * An abstract "digital core": a distorted metallic inner sphere wrapped in a
 * faceted glass shell, surrounded by drifting data particles. Reacts subtly to
 * pointer position. Designed to read as a premium computing object, not a game.
 */
export function DigitalCore({ particleCount = 600, reducedMotion = false }: CoreProps) {
  const group = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Mesh>(null)
  const points = useRef<THREE.Points>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  // Precompute particle positions on a spherical shell.
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const sz = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      const r = 1.9 + Math.random() * 1.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      sz[i] = Math.random()
    }
    return [pos, sz]
  }, [particleCount])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    // Smoothly track pointer (normalized -1..1 from R3F state).
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.04
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.04

    if (group.current) {
      const targetY = reducedMotion ? 0 : pointer.current.x * 0.5
      const targetX = reducedMotion ? 0 : -pointer.current.y * 0.35
      group.current.rotation.y += ((targetY + t * 0.12) - group.current.rotation.y) * 0.05
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05
      const floatY = reducedMotion ? 0 : Math.sin(t * 0.6) * 0.08
      group.current.position.y = floatY
    }

    if (inner.current) {
      inner.current.rotation.y -= delta * 0.15
      inner.current.rotation.z += delta * 0.05
    }

    if (points.current && !reducedMotion) {
      points.current.rotation.y = t * 0.04
      points.current.rotation.x = -t * 0.02
    }
  })

  const scale = Math.min(1, viewport.width / 6)

  return (
    <group ref={group} scale={scale}>
      {/* Inner metallic distorted core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.05, 12]} />
        <MeshDistortMaterial
          color="#0b1220"
          emissive="#0891b2"
          emissiveIntensity={0.25}
          roughness={0.15}
          metalness={0.95}
          distort={reducedMotion ? 0.1 : 0.32}
          speed={reducedMotion ? 0 : 1.4}
        />
      </mesh>

      {/* Faceted glass shell */}
      <Icosahedron args={[1.7, 1]}>
        <meshPhysicalMaterial
          color="#0e1526"
          transmission={0.9}
          thickness={1.2}
          roughness={0.08}
          metalness={0.1}
          ior={1.35}
          transparent
          opacity={0.55}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Icosahedron>

      {/* Wireframe outline for structure */}
      <Icosahedron args={[1.72, 1]}>
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.08} />
      </Icosahedron>

      {/* Drifting data particles */}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#67e8f9"
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
