"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { AsciiRenderer } from "@react-three/drei"
import { Model as Zorrito } from "./NewZorrito-Web"
import { Suspense, useEffect } from "react"

const SafeAsciiRenderer = ({
  ...props
}: React.ComponentProps<typeof AsciiRenderer>) => {
  const { size, viewport } = useThree()

  useEffect(() => {
    if (
      !Number.isFinite(size.width) ||
      !Number.isFinite(size.height) ||
      size.width <= 0 ||
      size.height <= 0 ||
      !Number.isFinite(viewport.dpr)
    ) {
      console.warn("SafeAsciiRenderer: Invalid canvas size or dpr", { size, dpr: viewport.dpr })
    }
  }, [size, viewport.dpr])

  if (
    !Number.isFinite(size.width) ||
    !Number.isFinite(size.height) ||
    size.width <= 0 ||
    size.height <= 0 ||
    !Number.isFinite(viewport.dpr)
  ) {
    return null
  }

  return <AsciiRenderer {...props} />
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />
      <directionalLight position={[-3, 4, -2]} intensity={0.5} />
      <pointLight position={[0, 3, 4]} intensity={0.8} color="#ffffff" />
    </>
  )
}

export function AsciiScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 5], fov: 35 }}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <color attach="background" args={["#faf9f6"]} />
        <Suspense fallback={null}>
          <SceneLighting />
          <Zorrito
            scale={1.8}
            position={[0, -0.2, 0]}
            rotation={[0, -Math.PI / 6, 0]}
          />
        </Suspense>
        <SafeAsciiRenderer
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