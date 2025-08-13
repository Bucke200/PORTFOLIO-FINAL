"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  MeshTransmissionMaterial,
  Float,
} from "@react-three/drei";
import { type MotionValue, useTransform } from "framer-motion";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

// Shape component with smooth transitions and dynamic lighting
function ShapeTransformer({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const prefersReducedMotion = useReducedMotion();

  // Position values based on scroll
  const xPos = useTransform(scrollProgress, [0, 0.33, 0.66, 1], [0, -2, 2, 0]);
  const yPos = useTransform(scrollProgress, [0, 0.33, 0.66, 1], [0, 1, 0, -1]);
  const zPos = useTransform(
    scrollProgress,
    [0, 0.33, 0.66, 1],
    [0, -2, -4, -2]
  );

  // Rotation values
  const rotX = useTransform(scrollProgress, [0, 1], [0, Math.PI * 2]);
  const rotY = useTransform(scrollProgress, [0, 1], [0, Math.PI]);

  // Scale based on scroll with smooth transition effects
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [1, 1.2, 1]);

  // Dynamic material properties based on scroll
  const materialColor = useTransform(
    scrollProgress,
    [0, 0.25, 0.33, 0.5, 0.66, 1],
    ["#2a3fff", "#1e40af", "#3b82f6", "#7c3aed", "#8b5cf6", "#dc2626"]
  );

  const materialTransmission = useTransform(
    scrollProgress,
    [0.25, 0.33, 0.4],
    [0.95, 0.8, 0.95]
  );

  const materialRoughness = useTransform(
    scrollProgress,
    [0.25, 0.33, 0.4],
    [0.05, 0.15, 0.05]
  );

  // Dynamic lighting intensity for transitions
  const lightIntensity = useTransform(
    scrollProgress,
    [0.25, 0.33, 0.4, 0.58, 0.66, 0.75],
    [1, 2.5, 1, 1, 2.2, 1]
  );

  // Determine which shape to show based on scroll position
  const [currentShape, setCurrentShape] = useState("sphere");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (value: number) => {
      let newShape = "sphere";
      
      if (value < 0.33) {
        newShape = "sphere";
      } else if (value < 0.66) {
        newShape = "cube";
      } else {
        newShape = "pyramid";
      }

      // Detect transition zones for special effects
      const inTransition = (value >= 0.25 && value <= 0.4) || (value >= 0.58 && value <= 0.75);
      setIsTransitioning(inTransition);

      if (newShape !== currentShape) {
        setCurrentShape(newShape);
      }
    });

    return () => unsubscribe();
  }, [scrollProgress, currentShape]);

  // Animation logic with enhanced effects
  useFrame(({ clock }) => {
    if (!meshRef.current || prefersReducedMotion) return;

    const mesh = meshRef.current;
    const time = clock.getElapsedTime();

    // Update position and rotation
    mesh.position.x = xPos.get();
    mesh.position.y = yPos.get();
    mesh.position.z = zPos.get();

    mesh.rotation.x = rotX.get();
    mesh.rotation.y = rotY.get() + time * 0.1;

    // Enhanced scale with transition effects
    let currentScale = scale.get();
    if (isTransitioning) {
      // Add pulsing effect during transitions
      currentScale *= 1 + Math.sin(time * 8) * 0.05;
    }
    mesh.scale.setScalar(currentScale);

    // Update material properties dynamically
    if (mesh.material) {
      mesh.material.color.set(materialColor.get());
      mesh.material.transmission = materialTransmission.get();
      mesh.material.roughness = materialRoughness.get();
      
      // Add extra glow during transitions
      if (isTransitioning) {
        mesh.material.emissive.setHex(0x1a1a3a);
        mesh.material.emissiveIntensity = Math.sin(time * 6) * 0.2 + 0.1;
      } else {
        mesh.material.emissive.setHex(0x000000);
        mesh.material.emissiveIntensity = 0;
      }
    }

    // Update dynamic lighting
    if (lightRef.current) {
      lightRef.current.intensity = lightIntensity.get();
      
      // Move light during transitions for dramatic effect
      if (isTransitioning) {
        lightRef.current.position.x = Math.sin(time * 3) * 5;
        lightRef.current.position.y = Math.cos(time * 2) * 3 + 5;
      }
    }
  });

  const baseMaterialProps = {
    thickness: 0.5,
    attenuationDistance: 0.8,
    temporalDistortion: 0.2,
    distortion: 0.5,
  };

  return (
    <group>
      {/* Dynamic transition lighting */}
      <directionalLight
        ref={lightRef}
        position={[5, 5, 5]}
        intensity={1}
        color="#ffffff"
        castShadow
      />
      
      {/* Additional rim lighting for transitions */}
      {isTransitioning && (
        <pointLight
          position={[0, 0, 3]}
          intensity={0.8}
          color={materialColor.get()}
          distance={10}
        />
      )}

      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.5}
        enabled={!prefersReducedMotion}
      >
        <mesh ref={meshRef}>
          {currentShape === "sphere" && <sphereGeometry args={[1, 32, 32]} />}
          {currentShape === "cube" && <boxGeometry args={[1.5, 1.5, 1.5]} />}
          {currentShape === "pyramid" && <coneGeometry args={[1.2, 2, 4]} />}
          <MeshTransmissionMaterial {...baseMaterialProps} />
        </mesh>
      </Float>
    </group>
  );
}

// Background particles with adaptive count
function Particles() {
  const particlesRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = useReducedMotion();

  // Smart particle count based on device capabilities
  const getParticleCount = () => {
    if (typeof window === "undefined") return 200; // SSR fallback
    if (prefersReducedMotion) return 50; // Accessibility
    if (window.innerWidth < 768) return 150; // Mobile devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)
      return 200; // Lower-end devices
    return 300; // High-end devices
  };

  const [particleCount, setParticleCount] = useState(200);

  useEffect(() => {
    setParticleCount(getParticleCount());

    // Update on window resize
    const handleResize = () => {
      setParticleCount(getParticleCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [prefersReducedMotion]);

  // Dark theme particle color
  const particleColor = new THREE.Color("#334155");

  // Create individual particles based on adaptive count
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const x = (Math.random() - 0.5) * 20;
    const y = (Math.random() - 0.5) * 20;
    const z = (Math.random() - 0.5) * 20;
    return { position: [x, y, z], id: i };
  });

  useFrame(({ clock }) => {
    if (!particlesRef.current || prefersReducedMotion) return;

    // Simple rotation of the entire particle system
    particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle) => (
        <mesh
          key={particle.id}
          position={particle.position as [number, number, number]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color={particleColor} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// Main scene component
function SceneContent({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      <ShapeTransformer scrollProgress={scrollProgress} />
      <Particles />

      <Environment preset="city" />
    </>
  );
}

// Main exported component
export default function Scene({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      className="bg-gradient-to-b from-background to-background/80"
    >
      <SceneContent scrollProgress={scrollProgress} />
    </Canvas>
  );
}
