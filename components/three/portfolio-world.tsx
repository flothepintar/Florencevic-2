'use client'

import { useMemo, useRef } from 'react'
import { Float, RoundedBox, Sparkles, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { systemArchive } from '@/data/system-archive'

const CARD_Y = [-13, -18.5, -24, -29.5, -35]
const CARD_X = [-0.8, 0.9, -0.65, 0.75, -0.5]
const CARD_COLORS = ['#75f4da', '#a58aff', '#b7ff4a', '#ff708f', '#66d7ff']

type Point3 = readonly [number, number, number]

const SIGIL_STROKES: ReadonlyArray<ReadonlyArray<Point3>> = [
  [
    [-0.72, -0.88, 0],
    [-0.72, -0.2, 0],
    [-0.72, 0.88, 0],
  ],
  [
    [-0.72, 0.88, 0],
    [-0.2, 0.88, 0],
    [0.05, 0.88, 0],
  ],
  [
    [-0.72, 0.1, 0],
    [-0.3, 0.1, 0],
    [-0.02, 0.1, 0],
  ],
  [
    [0.2, -0.88, 0],
    [0.2, 0.08, 0],
    [0.2, 0.88, 0],
  ],
  [
    [0.2, 0.88, 0],
    [0.78, 0.88, 0],
    [0.94, 0.62, 0],
    [0.78, 0.28, 0],
    [0.2, 0.28, 0],
  ],
]

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

function SigilStroke({ points, compact }: { points: ReadonlyArray<Point3>; compact: boolean }) {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
        false,
        'catmullrom',
        0.2,
      ),
    [points],
  )

  return (
    <mesh>
      <tubeGeometry args={[curve, compact ? 20 : 42, 0.045, compact ? 5 : 8, false]} />
      <meshPhysicalMaterial
        color="#dffff7"
        emissive="#75f4da"
        emissiveIntensity={1.6}
        metalness={0.34}
        roughness={0.16}
        clearcoat={1}
      />
    </mesh>
  )
}

function DataLink({ end, color, compact }: { end: Point3; color: string; compact: boolean }) {
  const curve = useMemo(
    () =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, -0.05),
        new THREE.Vector3(end[0] * 0.46, end[1] * 0.46, 0.26),
        new THREE.Vector3(...end),
      ),
    [end],
  )

  return (
    <mesh>
      <tubeGeometry args={[curve, compact ? 14 : 28, 0.009, 4, false]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.46}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

function OperationalModule({
  color,
  position,
  index,
  compact,
}: {
  color: string
  position: Point3
  index: number
  compact: boolean
}) {
  return (
    <group position={[...position]} rotation={[index * 0.32, index * 0.58, index * 0.2]}>
      <mesh>
        <octahedronGeometry args={[compact ? 0.17 : 0.21, 1]} />
        <meshPhysicalMaterial
          color="#071014"
          emissive={color}
          emissiveIntensity={0.72}
          metalness={0.76}
          roughness={0.16}
          clearcoat={1}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[compact ? 0.27 : 0.32, 0.012, 5, compact ? 20 : 36]} />
        <meshBasicMaterial color={color} transparent opacity={0.78} />
      </mesh>
      <mesh scale={1.48}>
        <octahedronGeometry args={[compact ? 0.17 : 0.21, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.28} />
      </mesh>
    </group>
  )
}

function OperationalCore({
  compact,
  reducedMotion,
  progress,
}: {
  compact: boolean
  reducedMotion: boolean
  progress: { current: number }
}) {
  const artifact = useRef<THREE.Group>(null)
  const orbitalSystem = useRef<THREE.Group>(null)
  const shellOne = useRef<THREE.Mesh>(null)
  const shellTwo = useRef<THREE.Mesh>(null)
  const pulse = useRef<THREE.Mesh>(null)
  const { pointer } = useThree()

  const modules = useMemo(
    () =>
      CARD_COLORS.map((color, index) => {
        const angle = index * ((Math.PI * 2) / CARD_COLORS.length)
        return {
          color,
          position: [Math.cos(angle) * 2.12, Math.sin(angle) * 1.48, Math.sin(angle * 2) * 0.18] as Point3,
        }
      }),
    [],
  )

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    const unfold = THREE.MathUtils.smoothstep(progress.current, 0.015, 0.12)

    if (artifact.current) {
      const targetX = reducedMotion ? -0.04 : pointer.y * -0.08 + Math.sin(time * 0.2) * 0.025
      const targetY = reducedMotion ? 0.04 : pointer.x * 0.16 + Math.sin(time * 0.13) * 0.09
      artifact.current.rotation.x = THREE.MathUtils.damp(artifact.current.rotation.x, targetX, 3.2, delta)
      artifact.current.rotation.y = THREE.MathUtils.damp(artifact.current.rotation.y, targetY, 3.2, delta)
    }

    if (orbitalSystem.current) {
      orbitalSystem.current.rotation.z = reducedMotion ? 0.06 : Math.sin(time * 0.18) * 0.12
      const orbitalScale = 1 + unfold * 0.22
      orbitalSystem.current.scale.setScalar(orbitalScale)
    }

    if (shellOne.current) {
      shellOne.current.rotation.z = reducedMotion ? 0.36 : time * 0.08 + unfold * 0.6
      shellOne.current.rotation.x = 1.18 + Math.sin(time * 0.16) * 0.08
    }

    if (shellTwo.current) {
      shellTwo.current.rotation.z = reducedMotion ? -0.28 : -time * 0.055 - unfold * 0.42
      shellTwo.current.rotation.y = 0.74 + Math.sin(time * 0.12) * 0.08
    }

    if (pulse.current) {
      const pulseScale = reducedMotion ? 1 : 1 + Math.sin(time * 1.5) * 0.045
      pulse.current.scale.setScalar(pulseScale)
    }
  })

  return (
    <group
      ref={artifact}
      position={[0, compact ? 0.18 : -0.3, 0]}
      scale={compact ? 0.68 : 0.78}
    >
      <mesh ref={pulse}>
        <icosahedronGeometry args={[0.5, compact ? 1 : 2]} />
        <meshPhysicalMaterial
          color="#071113"
          emissive="#b7ff4a"
          emissiveIntensity={0.5}
          metalness={0.78}
          roughness={0.12}
          clearcoat={1}
          iridescence={1}
          iridescenceIOR={1.45}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[1.2, compact ? 1 : 2]} />
        <meshPhysicalMaterial
          color="#07161a"
          emissive="#0d5e64"
          emissiveIntensity={0.28}
          metalness={0.52}
          roughness={0.12}
          transmission={0.4}
          thickness={1.35}
          transparent
          opacity={0.78}
          clearcoat={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh scale={1.055}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#75f4da" wireframe transparent opacity={0.25} />
      </mesh>

      <group position={[0, 0, 1.28]} scale={0.76}>
        {SIGIL_STROKES.map((points, index) => (
          <SigilStroke points={points} compact={compact} key={index} />
        ))}
      </group>

      <mesh ref={shellOne} rotation={[1.18, 0.18, 0.32]}>
        <torusGeometry args={[1.55, 0.025, compact ? 5 : 8, compact ? 64 : 120]} />
        <meshBasicMaterial color="#75f4da" transparent opacity={0.54} />
      </mesh>
      <mesh ref={shellTwo} rotation={[0.58, 0.74, -0.3]}>
        <torusGeometry args={[1.83, 0.018, compact ? 5 : 8, compact ? 72 : 140]} />
        <meshBasicMaterial color="#a58aff" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1, 0.72, 1]}>
        <torusGeometry args={[2.26, 0.011, 5, compact ? 80 : 160]} />
        <meshBasicMaterial color="#b7ff4a" transparent opacity={0.28} />
      </mesh>

      <group ref={orbitalSystem}>
        {modules.map((module, index) => (
          <group key={module.color}>
            <DataLink end={module.position} color={module.color} compact={compact} />
            <OperationalModule
              color={module.color}
              position={module.position}
              index={index}
              compact={compact}
            />
          </group>
        ))}
      </group>

      <Sparkles
        count={compact ? 35 : 80}
        scale={[5.2, 4.3, 3]}
        size={compact ? 0.72 : 1}
        speed={reducedMotion ? 0 : 0.12}
        color="#dffff7"
      />
      <pointLight position={[0, 0, 2.2]} color="#75f4da" intensity={compact ? 3 : 5} distance={7} />
      <pointLight position={[1.8, -1.4, 1.2]} color="#b7ff4a" intensity={2.6} distance={5} />
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

  useFrame((state, delta) => {
    const documentHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const target = Math.min(1, window.scrollY / documentHeight)
    smooth.current = reducedMotion
      ? target
      : THREE.MathUtils.damp(smooth.current, target, 6.5, delta)
    const travel = smooth.current * 58
    const pointerX = reducedMotion ? 0 : pointer.x * (isCompact ? 0.18 : 0.42)
    const pointerY = reducedMotion ? 0 : pointer.y * 0.18

    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointerX, 4.2, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, -travel + pointerY, 8, delta)
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      isCompact ? 8.7 : 7.2,
      5.2,
      delta,
    )
    camera.lookAt(camera.position.x * 0.12, camera.position.y - 0.3, 0)

    if (world.current) {
      world.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.025 + pointer.x * 0.025
    }
  })

  return (
    <group ref={world} scale={isCompact ? 0.82 : 1}>
      <OperationalCore compact={isCompact} reducedMotion={reducedMotion} progress={smooth} />
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
