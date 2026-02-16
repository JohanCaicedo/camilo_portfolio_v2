"use client"

import { Canvas } from "@react-three/fiber"
import { AsciiRenderer } from "@react-three/drei"
import { AnimatedCharacter } from "./animated-character"
import { Suspense } from "react"

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} />
      <directionalLight position={[-3, 4, -2]} intensity={0.5} />
      <pointLight position={[0, 3, 4]} intensity={0.6} color="#ffffff" />
    </>
  )
}

export function AsciiScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 4.5], fov: 40 }}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <color attach="background" args={["#faf9f6"]} />
        <Suspense fallback={null}>
          <SceneLighting />
          <AnimatedCharacter />
        </Suspense>
        <AsciiRenderer
          fgColor="#1a1a1a"
          bgColor="#faf9f6"
          characters=" .,:;|~-=+*#@"
          invert={false}
          resolution={0.18}
        />
      </Canvas>
    </div>
  )
}
