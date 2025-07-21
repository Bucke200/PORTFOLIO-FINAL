"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, MeshTransmissionMaterial, Float } from "@react-three/drei"
import { type MotionValue, useTransform } from "framer-motion"
import * as THREE from "three"
import { useReducedMotion } from "framer-motion"

// Shape component that changes based on scroll position
function ShapeTransformer({ scrollProgress }) {
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

  // Dark theme material properties
  const materialProps = {
    transmission: 0.95,
    thickness: 0.5,
    roughness: 0.05,
    color: new THREE.Color("#2a3fff"),
    attenuationColor: new THREE.Color("#5c6cff"),
    attenuationDistance: 0.8,
    temporalDistortion: 0.2,
    distortion: 0.5,
  }

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
    const unsubscribe = scrollProgress.on("change", (value) => {
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

// Background particles with adaptive count
function Particles() {
  const particlesRef = useRef<THREE.Group>(null)
  const prefersReducedMotion = useReducedMotion()
  
  // Smart particle count based on device capabilities
  const getParticleCount = () => {
    if (typeof window === 'undefined') return 200 // SSR fallback
    if (prefersReducedMotion) return 50 // Accessibility
    if (window.innerWidth < 768) return 150 // Mobile devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return 200 // Lower-end devices
    return 300 // High-end devices
  }

  const [particleCount, setParticleCount] = useState(200)
  
  useEffect(() => {
    setParticleCount(getParticleCount())
    
    // Update on window resize
    const handleResize = () => {
      setParticleCount(getParticleCount())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [prefersReducedMotion])

  // Dark theme particle color
  const particleColor = new THREE.Color("#334155")

  // Create individual particles based on adaptive count
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const x = (Math.random() - 0.5) * 20
    const y = (Math.random() - 0.5) * 20
    const z = (Math.random() - 0.5) * 20
    return { position: [x, y, z], id: i }
  })

  useFrame(({ clock }) => {
    if (!particlesRef.current || prefersReducedMotion) return

    // Simple rotation of the entire particle system
    particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05
  })

  return (
    <group ref={particlesRef}>
      {particles.map((particle) => (
        <mesh key={particle.id} position={particle.position as [number, number, number]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color={particleColor} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

// Main scene component
function SceneContent({ scrollProgress }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      <ShapeTransformer scrollProgress={scrollProgress} />
      <Particles />

      <Environment preset="city" />
    </>
  )
}

// Main exported component
export default function Scene({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>
}) {
  return (
    <Canvas dpr={[1, 2]} className="bg-gradient-to-b from-background to-background/80">
      <SceneContent scrollProgress={scrollProgress} />
    </Canvas>
  )
}
