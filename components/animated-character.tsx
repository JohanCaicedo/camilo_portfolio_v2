"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox, Sphere } from "@react-three/drei"
import type * as THREE from "three"

export function AnimatedCharacter() {
  const groupRef = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.Group>(null)
  const frontLeftLegRef = useRef<THREE.Group>(null)
  const frontRightLegRef = useRef<THREE.Group>(null)
  const backLeftLegRef = useRef<THREE.Group>(null)
  const backRightLegRef = useRef<THREE.Group>(null)
  const tailRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const walkSpeed = 3

    // Subtle body bob while walking
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.abs(Math.sin(t * walkSpeed * 2)) * 0.04
      bodyRef.current.rotation.z = Math.sin(t * walkSpeed) * 0.015
    }

    // Head bob
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(t * walkSpeed * 2) * 0.03 - 0.05
      headRef.current.rotation.y = Math.sin(t * 0.8) * 0.1
    }

    // Front legs walking - opposite phase
    if (frontLeftLegRef.current) {
      frontLeftLegRef.current.rotation.x = Math.sin(t * walkSpeed) * 0.45
    }
    if (frontRightLegRef.current) {
      frontRightLegRef.current.rotation.x = Math.sin(t * walkSpeed + Math.PI) * 0.45
    }

    // Back legs walking - opposite to front legs
    if (backLeftLegRef.current) {
      backLeftLegRef.current.rotation.x = Math.sin(t * walkSpeed + Math.PI) * 0.45
    }
    if (backRightLegRef.current) {
      backRightLegRef.current.rotation.x = Math.sin(t * walkSpeed) * 0.45
    }

    // Tail swaying
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 1.5) * 0.4
      tailRef.current.rotation.x = Math.sin(t * 0.7) * 0.15 - 0.6
    }

    // Gentle overall rotation so viewer can see the cat from different angles
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.4
    }
  })

  const catColor = "#e8e0d4"
  const darkColor = "#2a2a2a"

  return (
    <group ref={groupRef} scale={1.6} position={[0, -0.5, 0]}>
      <group ref={bodyRef}>
        {/* === BODY (torso) === */}
        <RoundedBox args={[0.7, 0.55, 1.2]} radius={0.2} position={[0, 0.55, 0]}>
          <meshStandardMaterial color={catColor} />
        </RoundedBox>

        {/* === HEAD === */}
        <group ref={headRef} position={[0, 0.85, 0.65]}>
          {/* Head sphere */}
          <Sphere args={[0.32, 16, 16]}>
            <meshStandardMaterial color={catColor} />
          </Sphere>

          {/* Left ear */}
          <mesh position={[-0.18, 0.28, 0]} rotation={[0, 0, -0.3]}>
            <coneGeometry args={[0.1, 0.22, 4]} />
            <meshStandardMaterial color={catColor} />
          </mesh>

          {/* Right ear */}
          <mesh position={[0.18, 0.28, 0]} rotation={[0, 0, 0.3]}>
            <coneGeometry args={[0.1, 0.22, 4]} />
            <meshStandardMaterial color={catColor} />
          </mesh>

          {/* Eyes */}
          <Sphere args={[0.045, 8, 8]} position={[-0.1, 0.04, 0.27]}>
            <meshStandardMaterial color={darkColor} />
          </Sphere>
          <Sphere args={[0.045, 8, 8]} position={[0.1, 0.04, 0.27]}>
            <meshStandardMaterial color={darkColor} />
          </Sphere>

          {/* Nose */}
          <Sphere args={[0.025, 8, 8]} position={[0, -0.04, 0.3]}>
            <meshStandardMaterial color="#d4a0a0" />
          </Sphere>

          {/* Muzzle */}
          <Sphere args={[0.12, 10, 10]} position={[0, -0.06, 0.2]}>
            <meshStandardMaterial color={catColor} />
          </Sphere>
        </group>

        {/* === FRONT LEFT LEG === */}
        <group ref={frontLeftLegRef} position={[-0.2, 0.3, 0.38]}>
          <RoundedBox args={[0.14, 0.5, 0.14]} radius={0.05} position={[0, -0.22, 0]}>
            <meshStandardMaterial color={catColor} />
          </RoundedBox>
          {/* Paw */}
          <Sphere args={[0.08, 8, 8]} position={[0, -0.48, 0.02]}>
            <meshStandardMaterial color={catColor} />
          </Sphere>
        </group>

        {/* === FRONT RIGHT LEG === */}
        <group ref={frontRightLegRef} position={[0.2, 0.3, 0.38]}>
          <RoundedBox args={[0.14, 0.5, 0.14]} radius={0.05} position={[0, -0.22, 0]}>
            <meshStandardMaterial color={catColor} />
          </RoundedBox>
          <Sphere args={[0.08, 8, 8]} position={[0, -0.48, 0.02]}>
            <meshStandardMaterial color={catColor} />
          </Sphere>
        </group>

        {/* === BACK LEFT LEG === */}
        <group ref={backLeftLegRef} position={[-0.2, 0.3, -0.38]}>
          <RoundedBox args={[0.15, 0.5, 0.16]} radius={0.05} position={[0, -0.22, 0]}>
            <meshStandardMaterial color={catColor} />
          </RoundedBox>
          <Sphere args={[0.08, 8, 8]} position={[0, -0.48, 0.02]}>
            <meshStandardMaterial color={catColor} />
          </Sphere>
        </group>

        {/* === BACK RIGHT LEG === */}
        <group ref={backRightLegRef} position={[0.2, 0.3, -0.38]}>
          <RoundedBox args={[0.15, 0.5, 0.16]} radius={0.05} position={[0, -0.22, 0]}>
            <meshStandardMaterial color={catColor} />
          </RoundedBox>
          <Sphere args={[0.08, 8, 8]} position={[0, -0.48, 0.02]}>
            <meshStandardMaterial color={catColor} />
          </Sphere>
        </group>

        {/* === TAIL === */}
        <group ref={tailRef} position={[0, 0.75, -0.6]}>
          <mesh>
            <cylinderGeometry args={[0.04, 0.025, 0.65, 8]} />
            <meshStandardMaterial color={catColor} />
          </mesh>
          {/* Tail tip */}
          <Sphere args={[0.04, 8, 8]} position={[0, 0.32, 0]}>
            <meshStandardMaterial color={catColor} />
          </Sphere>
        </group>
      </group>
    </group>
  )
}
