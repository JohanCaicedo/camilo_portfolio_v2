"use client"

import { Canvas } from "@react-three/fiber"
import { AsciiRenderer } from "@react-three/drei"
import { AnimatedCharacter } from "./animated-character"
import { Suspense } from "react"

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <directionalLight position={[-3, 4, -2]} intensity={0.6} />
      <pointLight position={[0, 3, 4]} intensity={0.8} color="#ffffff" />
    </>
  )
}

export function AsciiScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1.2, 5], fov: 45 }}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <Suspense fallback={null}>
          <SceneLighting />
          <AnimatedCharacter />
        </Suspense>
        <AsciiRenderer
          fgColor="#c4f0a0"
          bgColor="transparent"
          characters=" .:-+*=%@#"
          invert={false}
          resolution={0.2}
        />
      </Canvas>
    </div>
  )
}
