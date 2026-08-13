'use client'

import { useMemo, useRef } from 'react'
import { Float, RoundedBox, Sparkles, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { systemArchive } from '@/data/system-archive'

const CARD_Y = [-13, -18.5, -24, -29.5, -35]
const CARD_X = [-0.8, 0.9, -0.65, 0.75, -0.5]
const CARD_COLORS = ['#75f4da', '#a58aff', '#b7ff4a', '#ff708f', '#66d7ff']

function DataDust({ count = 2200 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const result = new Float32Array(count * 3)
    for (let index = 0; index < count; index += 1) {
      const radius = 2.5 + Math.random() * 8
      const angle = Math.random() * Math.PI * 2
      result[index * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 2
      result[index * 3 + 1] = 5 - Math.random() * 70
      result[index * 3 + 2] = -4 + Math.sin(angle) * 2 + Math.random() * 5
    }
    return result
  }, [count])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.12
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#a6e8d8"
        size={0.025}
        transparent
        opacity={0.58}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function OriginArtifact() {
  const artifact = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!artifact.current) return
    artifact.current.rotation.y += delta * 0.1
    artifact.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.22) * 0.08
  })

  return (
    <group ref={artifact} position={[0, 0, 0]}>
      <mesh>
        <torusKnotGeometry args={[1.15, 0.22, 240, 18, 2, 5]} />
        <meshPhysicalMaterial
          color="#111a20"
          emissive="#5865f2"
          emissiveIntensity={0.16}
          metalness={0.92}
          roughness={0.12}
          clearcoat={1}
          iridescence={1}
          iridescenceIOR={1.8}
        />
      </mesh>
      {[1.8, 2.2, 2.65].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2 + index * 0.38, index * 0.66, index * 0.31]}>
          <torusGeometry args={[radius, 0.016 - index * 0.003, 8, 180]} />
          <meshBasicMaterial
            color={CARD_COLORS[index]}
            transparent
            opacity={0.48 - index * 0.1}
          />
        </mesh>
      ))}
      <Sparkles count={100} scale={[6, 6, 4]} size={1.1} speed={0.18} color="#b7ff4a" />
    </group>
  )
}

function WorldSpine() {
  return (
    <group position={[0, -27, -2.4]}>
      <mesh scale={[0.72, 25, 0.72]}>
        <cylinderGeometry args={[0.24, 0.6, 2, 14, 18, true]} />
        <meshPhysicalMaterial
          color="#0d1521"
          emissive="#117b7c"
          emissiveIntensity={0.2}
          metalness={0.82}
          roughness={0.18}
          transmission={0.16}
          transparent
          opacity={0.76}
          wireframe
        />
      </mesh>
      {Array.from({ length: 12 }).map((_, index) => (
        <mesh
          key={index}
          position={[
            Math.sin(index * 1.7) * 0.7,
            21 - index * 3.8,
            Math.cos(index * 1.2) * 0.45,
          ]}
          rotation={[index * 0.4, index * 0.65, index * 0.23]}
        >
          <octahedronGeometry args={[0.55 + (index % 3) * 0.16, 1]} />
          <meshPhysicalMaterial
            color={CARD_COLORS[index % CARD_COLORS.length]}
            emissive={CARD_COLORS[index % CARD_COLORS.length]}
            emissiveIntensity={0.14}
            roughness={0.2}
            metalness={0.7}
            transparent
            opacity={0.42}
            wireframe={index % 2 === 0}
          />
        </mesh>
      ))}
    </group>
  )
}

function ProjectWorlds() {
  const baseTexture = useTexture('/portfolio-world-v2.png')
  const textures = useMemo(
    () =>
      CARD_Y.map((_, index) => {
        const texture = baseTexture.clone()
        texture.colorSpace = THREE.SRGBColorSpace
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(0.42, 0.55)
        texture.offset.set((index % 3) * 0.27, index < 3 ? 0.36 : 0.02)
        texture.needsUpdate = true
        return texture
      }),
    [baseTexture],
  )

  return CARD_Y.map((y, index) => (
    <group key={y} position={[CARD_X[index], y, 0]} rotation={[0.03, index % 2 ? -0.16 : 0.16, 0]}>
      <Float speed={0.65 + index * 0.06} rotationIntensity={0.08} floatIntensity={0.18}>
        <RoundedBox args={[5.7, 3.4, 0.12]} radius={0.2} smoothness={5}>
          <meshPhysicalMaterial
            map={textures[index]}
            color="#cbd9df"
            metalness={0.2}
            roughness={0.28}
            clearcoat={0.8}
            clearcoatRoughness={0.18}
            emissive={CARD_COLORS[index]}
            emissiveIntensity={0.05}
          />
        </RoundedBox>
        <RoundedBox args={[6.1, 3.8, 0.05]} radius={0.24} smoothness={5} position={[0, 0, -0.24]}>
          <meshBasicMaterial color={CARD_COLORS[index]} wireframe transparent opacity={0.16} />
        </RoundedBox>
      </Float>
      <mesh position={[index % 2 ? -3.8 : 3.8, 0, -1]} rotation={[1.1, 0.2, index]}>
        <torusGeometry args={[1.6, 0.025, 8, 120]} />
        <meshBasicMaterial color={CARD_COLORS[index]} transparent opacity={0.28} />
      </mesh>
      <Sparkles count={150} scale={[9, 6, 5]} size={1.4} speed={0.16} color={CARD_COLORS[index]} />
      <pointLight position={[index % 2 ? 3 : -3, 1, 2]} color={CARD_COLORS[index]} intensity={7} distance={10} />
    </group>
  ))
}

function ArchiveConstellation() {
  const nodes = useMemo(
    () =>
      Array.from({ length: systemArchive.length }, (_, index) => ({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 6,
        z: (Math.random() - 0.5) * 4,
        scale: 0.08 + (index % 5) * 0.025,
      })),
    [],
  )

  return (
    <group position={[0, -43, 0]}>
      {nodes.map((node, index) => (
        <mesh key={index} position={[node.x, node.y, node.z]} scale={node.scale}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={CARD_COLORS[index % CARD_COLORS.length]}
            emissive={CARD_COLORS[index % CARD_COLORS.length]}
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}
      {[2.5, 4, 5.6].map((radius, index) => (
        <mesh key={radius} rotation={[1.3 - index * 0.15, index * 0.8, index * 0.3]}>
          <torusGeometry args={[radius, 0.012, 6, 180]} />
          <meshBasicMaterial color={CARD_COLORS[index]} transparent opacity={0.28} />
        </mesh>
      ))}
      <Sparkles count={420} scale={[13, 9, 8]} size={1.1} speed={0.1} color="#abdcff" />
    </group>
  )
}

export function PortfolioWorld({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const world = useRef<THREE.Group>(null)
  const { camera, pointer, viewport } = useThree()
  const smooth = useRef(0)
  const isCompact = viewport.width < 5.5

  useFrame((state) => {
    const documentHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const target = Math.min(1, window.scrollY / documentHeight)
    smooth.current += (target - smooth.current) * (reducedMotion ? 1 : 0.055)
    const travel = smooth.current * 58
    const pointerX = reducedMotion ? 0 : pointer.x * (isCompact ? 0.18 : 0.42)
    const pointerY = reducedMotion ? 0 : pointer.y * 0.18

    camera.position.x += (pointerX - camera.position.x) * 0.045
    camera.position.y += (-travel + pointerY - camera.position.y) * 0.075
    camera.position.z += ((isCompact ? 8.7 : 7.2) - camera.position.z) * 0.06
    camera.lookAt(camera.position.x * 0.12, camera.position.y - 0.3, 0)

    if (world.current) {
      world.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.025 + pointer.x * 0.025
    }
  })

  return (
    <group ref={world} scale={isCompact ? 0.82 : 1}>
      <OriginArtifact />
      <WorldSpine />
      <ProjectWorlds />
      <ArchiveConstellation />
      <DataDust count={isCompact ? 1100 : 2400} />
      <ambientLight intensity={0.32} />
      <directionalLight position={[4, 8, 8]} intensity={2.2} color="#c8f8ff" />
      <pointLight position={[-4, 0, 3]} intensity={10} distance={18} color="#6c4cff" />
      <pointLight position={[4, -43, 3]} intensity={12} distance={18} color="#b7ff4a" />
    </group>
  )
}
