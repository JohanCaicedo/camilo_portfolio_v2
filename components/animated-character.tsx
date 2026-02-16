"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox, Sphere } from "@react-three/drei"
import type * as THREE from "three"

export function AnimatedCharacter() {
  const groupRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const leftLegRef = useRef<THREE.Group>(null)
  const rightLegRef = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (groupRef.current) {
      // Gentle floating/bouncing animation
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.3
      // Subtle rotation
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.3
    }

    if (bodyRef.current) {
      // Body slight tilt with movement
      bodyRef.current.rotation.z = Math.sin(t * 1.5) * 0.05
    }

    // Arms swinging
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(t * 1.5) * 0.6
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = Math.sin(t * 1.5 + Math.PI) * 0.6
    }

    // Legs walking motion
    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(t * 1.5 + Math.PI) * 0.5
    }
    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = Math.sin(t * 1.5) * 0.5
    }
  })

  return (
    <group ref={groupRef} scale={1.2}>
      <group ref={bodyRef}>
        {/* Head */}
        <Sphere args={[0.45, 16, 16]} position={[0, 1.85, 0]}>
          <meshStandardMaterial color="#e0e0e0" />
        </Sphere>

        {/* Eyes */}
        <Sphere args={[0.08, 8, 8]} position={[-0.15, 1.92, 0.38]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Sphere>
        <Sphere args={[0.08, 8, 8]} position={[0.15, 1.92, 0.38]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Sphere>

        {/* Torso */}
        <RoundedBox args={[0.8, 1.0, 0.5]} radius={0.1} position={[0, 0.95, 0]}>
          <meshStandardMaterial color="#d0d0d0" />
        </RoundedBox>

        {/* Belt/waist detail */}
        <RoundedBox args={[0.85, 0.12, 0.55]} radius={0.03} position={[0, 0.45, 0]}>
          <meshStandardMaterial color="#a0a0a0" />
        </RoundedBox>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.55, 1.2, 0]}>
          <RoundedBox args={[0.22, 0.7, 0.22]} radius={0.08} position={[0, -0.35, 0]}>
            <meshStandardMaterial color="#c8c8c8" />
          </RoundedBox>
          {/* Hand */}
          <Sphere args={[0.13, 8, 8]} position={[0, -0.75, 0]}>
            <meshStandardMaterial color="#e8e8e8" />
          </Sphere>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.55, 1.2, 0]}>
          <RoundedBox args={[0.22, 0.7, 0.22]} radius={0.08} position={[0, -0.35, 0]}>
            <meshStandardMaterial color="#c8c8c8" />
          </RoundedBox>
          {/* Hand */}
          <Sphere args={[0.13, 8, 8]} position={[0, -0.75, 0]}>
            <meshStandardMaterial color="#e8e8e8" />
          </Sphere>
        </group>

        {/* Left Leg */}
        <group ref={leftLegRef} position={[-0.22, 0.2, 0]}>
          <RoundedBox args={[0.25, 0.75, 0.25]} radius={0.08} position={[0, -0.38, 0]}>
            <meshStandardMaterial color="#b8b8b8" />
          </RoundedBox>
          {/* Foot */}
          <RoundedBox args={[0.28, 0.14, 0.38]} radius={0.05} position={[0, -0.8, 0.06]}>
            <meshStandardMaterial color="#909090" />
          </RoundedBox>
        </group>

        {/* Right Leg */}
        <group ref={rightLegRef} position={[0.22, 0.2, 0]}>
          <RoundedBox args={[0.25, 0.75, 0.25]} radius={0.08} position={[0, -0.38, 0]}>
            <meshStandardMaterial color="#b8b8b8" />
          </RoundedBox>
          {/* Foot */}
          <RoundedBox args={[0.28, 0.14, 0.38]} radius={0.05} position={[0, -0.8, 0.06]}>
            <meshStandardMaterial color="#909090" />
          </RoundedBox>
        </group>
      </group>
    </group>
  )
}
