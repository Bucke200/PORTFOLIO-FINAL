"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, MeshTransmissionMaterial, Float } from "@react-three/drei"
import { type MotionValue, useTransform } from "framer-motion"
import * as THREE from "three"
import { useReducedMotion } from "framer-motion"

interface ShapeTransformerProps {
  scrollProgress: MotionValue<number>
  currentTheme: string | undefined
}

// Shape component that changes based on scroll position
function ShapeTransformer({ scrollProgress, currentTheme }: ShapeTransformerProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const prefersReducedMotion = useReducedMotion()

  // Position values based on scroll
  const xPos = useTransform(scrollProgress, [0, 0.33, 0.66, 1], [0, -2, 2, 0])
  const yPos = useTransform(scrollProgress, [0, 0.33, 0.66, 1], [0, 1, 0, -1])
  const zPos = useTransform(scrollProgress, [0, 0.33, 0.66, 1], [0, -2, -4, -2])

  // Rotation values
  const rotX = useTransform(scrollProgress, [0, 1], [0, Math.PI * 2])
  const rotY = useTransform(scrollProgress, [0, 1], [0, Math.PI])

  // Scale based on scroll
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [1, 1.2, 1])

  // Material properties based on theme
  const [materialProps, setMaterialProps] = useState({
    transmission: 0.95,
    thickness: 0.5,
    roughness: 0.05,
    color: new THREE.Color("#ffffff"),
    attenuationColor: new THREE.Color("#ffffff"),
    attenuationDistance: 0.5,
    temporalDistortion: 0.2,
    distortion: 0.5,
  })

  useEffect(() => {
    if (currentTheme === "dark") {
      setMaterialProps({
        ...materialProps,
        color: new THREE.Color("#2a3fff"),
        attenuationColor: new THREE.Color("#5c6cff"),
        attenuationDistance: 0.8,
      })
    } else {
      setMaterialProps({
        ...materialProps,
        color: new THREE.Color("#ffffff"),
        attenuationColor: new THREE.Color("#a1c4fd"),
        attenuationDistance: 0.5,
      })
    }
  }, [currentTheme])

  // Animation logic
  useFrame(({ clock }) => {
    if (!meshRef.current || prefersReducedMotion) return

    const mesh = meshRef.current

    // Update position and rotation
    mesh.position.x = xPos.get()
    mesh.position.y = yPos.get()
    mesh.position.z = zPos.get()

    mesh.rotation.x = rotX.get()
    mesh.rotation.y = rotY.get() + clock.getElapsedTime() * 0.1

    mesh.scale.setScalar(scale.get())
  })

  // Determine which shape to show based on scroll position
  const [currentShape, setCurrentShape] = useState("sphere")

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (value: number) => {
      if (value < 0.33) {
        setCurrentShape("sphere")
      } else if (value < 0.66) {
        setCurrentShape("cube")
      } else {
        setCurrentShape("pyramid")
      }
    })

    return () => unsubscribe()
  }, [scrollProgress])

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} enabled={!prefersReducedMotion}>
      <mesh ref={meshRef}>
        {currentShape === "sphere" && <sphereGeometry args={[1, 32, 32]} />}
        {currentShape === "cube" && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        {currentShape === "pyramid" && <coneGeometry args={[1.2, 2, 4]} />}
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </Float>
  )
}

interface ParticlesProps {
  count?: number
  currentTheme: string | undefined
}

// Particle system component
function Particles({ count = 200, currentTheme }: ParticlesProps) {
  const particles = useRef<THREE.Points>(null)
  const prefersReducedMotion = useReducedMotion()

  // Create particle geometry
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10
    positions[i + 1] = (Math.random() - 0.5) * 10
    positions[i + 2] = (Math.random() - 0.5) * 10
  }

  useFrame(({ clock }) => {
    if (!particles.current || prefersReducedMotion) return

    const points = particles.current
    points.rotation.x = clock.getElapsedTime() * 0.1
    points.rotation.y = clock.getElapsedTime() * 0.1
  })

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={currentTheme === "dark" ? "#5c6cff" : "#a1c4fd"}
        transparent
        opacity={0.6}
      />
    </points>
  )
}

interface SceneContentProps {
  scrollProgress: MotionValue<number>
  currentTheme: string | undefined
}

// Main scene content
function SceneContent({ scrollProgress, currentTheme }: SceneContentProps) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableZoom={false} />
      <Environment preset="city" />
      <ShapeTransformer scrollProgress={scrollProgress} currentTheme={currentTheme} />
      <Particles count={200} currentTheme={currentTheme} />
    </>
  )
}

// Main scene component
export default function V0Scene({
  scrollProgress,
  currentTheme,
}: {
  scrollProgress: MotionValue<number>
  currentTheme: string | undefined
}) {
  return (
    <div className="w-full h-[100vh] fixed top-0 left-0 z-0">
      <Canvas>
        <SceneContent scrollProgress={scrollProgress} currentTheme={currentTheme} />
      </Canvas>
    </div>
  )
} 