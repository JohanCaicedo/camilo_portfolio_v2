# Guia para reemplazar el modelo 3D en la seccion Hero

## Arquitectura actual del sistema 3D

El hero del portfolio utiliza una cadena de tres componentes que trabajan en conjunto:

```
page.tsx
  -> HeroSection (components/hero-section.tsx)
       -> AsciiScene (components/ascii-scene.tsx)    [carga dinamica, SSR desactivado]
            -> AnimatedCharacter (components/animated-character.tsx)
```

### Componente `AsciiScene`

Monta un `<Canvas>` de `@react-three/fiber` (R3F) con las siguientes caracteristicas:

- **Camara**: perspectiva, posicion `[0, 1, 4.5]`, FOV `40`.
- **Iluminacion**: una `ambientLight` (0.6), dos `directionalLight` y un `pointLight`.
- **Post-proceso**: `AsciiRenderer` de `@react-three/drei` que convierte toda la escena en caracteres ASCII. Los parametros actuales son:
  - `fgColor="#1a1a1a"`, `bgColor="#faf9f6"`
  - `characters=" .,:;|~-=+*#@"`
  - `resolution={0.18}`
- **Carga diferida**: `AsciiScene` se importa con `next/dynamic` y `ssr: false` desde `hero-section.tsx`.

### Componente `AnimatedCharacter`

Es un modelo **procedural** (no es un archivo `.glb`): un gato construido con primitivas de R3F (`RoundedBox`, `Sphere`, `coneGeometry`, `cylinderGeometry`). Las animaciones se ejecutan en el hook `useFrame` manipulando `refs` a cada parte del cuerpo con funciones trigonometricas (`Math.sin`, `Math.abs`). No se utiliza ninguna libreria de animacion ni ningun clip de animacion embebido.

### Stack de dependencias relevante

| Paquete | Version |
|---|---|
| `three` | `^0.171.0` |
| `@react-three/fiber` | `^9.5.0` |
| `@react-three/drei` | `^10.7.7` |
| `@types/three` | `^0.171.0` |
| `three-stdlib` | `^2.35.3` |

---

## Fase 1: Preparacion del modelo en Blender

### 1.1 Formato de exportacion

El formato recomendado es **glTF Binary (`.glb`)**. Razones:

- Es el estandar de facto para modelos 3D en la web.
- `@react-three/drei` proporciona el hook `useGLTF` que lo carga de forma nativa.
- Encapsula geometria, materiales PBR, texturas y animaciones en un unico archivo binario.
- Three.js lo soporta de forma oficial a traves de `GLTFLoader`.

Alternativa aceptable: **glTF separado (`.gltf` + `.bin` + texturas)**, pero incrementa la complejidad de rutas en produccion. Evitar `.fbx` y `.obj` salvo que exista una razon especifica: requieren loaders adicionales, mayor tamano y menor compatibilidad con el pipeline de PBR de Three.js.

### 1.2 Optimizacion del modelo para la web

Dado que el modelo se renderiza dentro de un `AsciiRenderer`, la geometria detallada y las texturas de alta resolucion se desperdician. El pipeline de optimizacion recomendado:

1. **Poligonaje**: mantener el modelo por debajo de **20,000 triangulos**. El `AsciiRenderer` discretiza la escena a una grilla de caracteres, por lo que los detalles de alta frecuencia se pierden. Para formas generales basta con 5,000-15,000 triangulos.

2. **Texturas**: el `AsciiRenderer` lee intensidad de luminancia. Si se desean variaciones tonales en los caracteres ASCII, utilizar un material `MeshStandardMaterial` con un solo color o, como maximo, una textura difusa de **512x512** o **1024x1024**. Las texturas de normal, roughness y metalness no aportan beneficio visible bajo el efecto ASCII.

3. **Materiales**: consolidar en la menor cantidad de materiales posibles (idealmente 1-3). Cada material adicional genera un draw call separado.

4. **Escala y origen**: en Blender, asegurarse de que:
   - El modelo este centrado en el origen `(0, 0, 0)`.
   - La escala este aplicada (`Ctrl+A > Apply All Transforms`).
   - El eje Y sea el eje vertical (configuracion por defecto de la exportacion glTF de Blender).

5. **Comprimir el archivo final** con [gltf-transform](https://gltf-transform.dev/) o [glTF Pipeline](https://github.com/CesiumGS/gltf-pipeline):
   ```bash
   npx gltf-transform optimize modelo.glb modelo-optimizado.glb --compress meshopt
   ```
   La compresion `meshopt` es la mas compatible con Three.js y `@react-three/drei`.

6. **Peso objetivo**: el `.glb` final no deberia exceder **1-2 MB** para asegurar tiempos de carga aceptables.

### 1.3 Animaciones

Dos enfoques posibles:

#### Opcion A: Animaciones embebidas en el `.glb` (recomendado)

Crear las animaciones directamente en Blender (Armature + Actions) y exportarlas embebidas en el `.glb`. Al exportar desde Blender:

- Activar **"Export Animations"** en el panel de exportacion glTF.
- Si hay multiples acciones, activar **"Group by NLA Track"** para que cada accion se exporte como un `AnimationClip` independiente.
- Verificar que el armature tenga nombres descriptivos en los bones y en las acciones (e.g., `Idle`, `Walk`, `Wave`).

#### Opcion B: Animaciones procedurales en `useFrame`

Mantener el patron actual: manipular la posicion/rotacion de grupos de la escena con funciones matematicas dentro de `useFrame`. Este enfoque es viable si la animacion es simple (balanceo, rotacion, flotacion) y no requiere un rig esqueletal complejo.

---

## Fase 2: Integracion del modelo en el proyecto

### 2.1 Ubicacion del archivo

Colocar el archivo `.glb` en:

```
public/models/mi-modelo.glb
```

Next.js sirve todo el contenido de `public/` como archivos estaticos desde la raiz. El modelo sera accesible en runtime como `/models/mi-modelo.glb`.

### 2.2 Generar tipos con gltfjsx (opcional pero recomendado)

La herramienta [`gltfjsx`](https://github.com/pmndrs/gltfjsx) genera un componente React tipado a partir del `.glb`:

```bash
npx gltfjsx public/models/mi-modelo.glb -o components/custom-model.tsx -t -r public
```

Flags relevantes:

| Flag | Funcion |
|---|---|
| `-t` | Genera tipado TypeScript |
| `-r public` | Resuelve las rutas relativas al directorio `public` |
| `-o path` | Ruta de salida del componente generado |

El resultado es un componente que ya contiene las refs a cada mesh y grupo del modelo, listo para animarse.

### 2.3 Reescribir `animated-character.tsx`

El archivo `components/animated-character.tsx` es el que se reemplaza. A continuacion se describe la estructura objetivo segun la opcion de animacion elegida.

#### Opcion A: Modelo con animaciones embebidas

```tsx
"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"
import type * as THREE from "three"

// Pre-cargar el modelo para evitar flash de contenido
useGLTF.preload("/models/mi-modelo.glb")

export function AnimatedCharacter() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF("/models/mi-modelo.glb")
  const { actions } = useAnimations(animations, groupRef)

  useEffect(() => {
    // Reproducir la animacion principal al montar
    const idleAction = actions["Idle"] // nombre de la accion en Blender
    if (idleAction) {
      idleAction.reset().fadeIn(0.5).play()
    }
    return () => {
      idleAction?.fadeOut(0.5)
    }
  }, [actions])

  // Rotacion sutil global (mantiene el comportamiento actual)
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.4
    }
  })

  return (
    <group ref={groupRef} scale={1.6} position={[0, -0.5, 0]}>
      <primitive object={scene} />
    </group>
  )
}
```

**Notas criticas:**

- `useGLTF` devuelve `scene` (el grafo de escena completo) y `animations` (array de `AnimationClip`).
- `useAnimations` vincula los clips al grupo y devuelve `actions`, un mapa `{ [nombre]: AnimationAction }`.
- Los nombres de las acciones (`"Idle"`, `"Walk"`, etc.) deben coincidir **exactamente** con los nombres definidos en Blender.
- `primitive` es el componente de R3F para insertar un `Object3D` existente en el grafo de escena.
- `scale` y `position` deben ajustarse segun el tamano y centro del nuevo modelo.

#### Opcion B: Modelo estatico con animacion procedural

```tsx
"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"

useGLTF.preload("/models/mi-modelo.glb")

export function AnimatedCharacter() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/models/mi-modelo.glb")

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      // Rotacion orbital
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.4
      // Flotacion vertical
      groupRef.current.position.y = -0.5 + Math.sin(t * 0.8) * 0.1
    }
  })

  return (
    <group ref={groupRef} scale={1.6} position={[0, -0.5, 0]}>
      <primitive object={scene} />
    </group>
  )
}
```

Si se necesita manipular partes especificas del modelo (e.g., mover un brazo), se pueden buscar nodos por nombre:

```tsx
const { scene } = useGLTF("/models/mi-modelo.glb")
const brazo = scene.getObjectByName("Brazo_Derecho") as THREE.Mesh | undefined

useFrame((state) => {
  if (brazo) {
    brazo.rotation.z = Math.sin(state.clock.getElapsedTime()) * 0.3
  }
})
```

Los nombres de los objetos corresponden a los nombres de los objetos en la jerarquia de Blender.

### 2.4 Ajustes en `ascii-scene.tsx`

El componente `AsciiScene` probablemente requiera ajustes al integrar un nuevo modelo:

#### Camara

La posicion actual `[0, 1, 4.5]` y FOV `40` estan calibrados para el gato procedural. Para un modelo diferente, ajustar:

```tsx
<Canvas
  camera={{
    position: [0, Y_OFFSET, DISTANCIA],
    fov: FOV
  }}
>
```

- **`Y_OFFSET`**: altura del centro visual del modelo. Si el modelo es humanoide de ~1.8m de alto y el pivot esta en los pies, `Y_OFFSET` deberia ser aproximadamente `0.9` para encuadrar el torso.
- **`DISTANCIA`**: distancia en Z. Modelos mas grandes necesitan mayor distancia o mayor FOV.
- **`FOV`**: un FOV bajo (30-45) genera una perspectiva aplanada (mas elegante); un FOV alto (60-75) genera mas deformacion pero muestra mas del modelo.

#### Resolucion del AsciiRenderer

```tsx
<AsciiRenderer
  resolution={0.18}  // ajustar segun la complejidad visual deseada
  characters=" .,:;|~-=+*#@"
/>
```

- Valores mas bajos de `resolution` generan caracteres mas grandes (menos detalle ASCII).
- Valores mas altos (0.2-0.3) generan caracteres mas pequenos (mas detalle pero mayor costo de renderizado).
- El set de `characters` define la rampa de luminancia: el primer caracter corresponde a las zonas oscuras, el ultimo a las zonas claras (o viceversa segun `invert`).

#### Iluminacion

La iluminacion afecta directamente como el `AsciiRenderer` interpreta la luminosidad de cada pixel. Para un modelo con geometria diferente:

- Ajustar la posicion de las luces direccionales para que las zonas relevantes del modelo reciban contraste adecuado.
- Evitar iluminacion plana (solo `ambientLight`): el efecto ASCII pierde legibilidad si todo tiene la misma luminancia.
- Una `directionalLight` principal fuerte con una suave de relleno opuesto produce el mejor resultado con ASCII.

---

## Fase 3: Adaptacion de la animacion para coherencia visual

### 3.1 Velocidad y amplitud

El modelo actual utiliza las siguientes constantes de animacion:

| Parametro | Valor actual | Proposito |
|---|---|---|
| `walkSpeed` | `3` | Velocidad de ciclo de caminar |
| Rotacion Y global | `Math.sin(t * 0.3) * 0.4` | Rotacion lenta de exhibicion |
| Bob del cuerpo | `Math.abs(Math.sin(t * 6)) * 0.04` | Rebote al caminar |

Para mantener la coherencia visual con el resto del sitio (que utiliza transiciones suaves de 700ms y un estilo general minimal):

- Mantener la rotacion global con `t * 0.3` (una oscilacion completa cada ~20 segundos).
- Las animaciones del modelo deben ser **sutiles**: evitar movimientos amplios que contradigan el tono sereno del diseno.
- Si se usan `AnimationClip` de Blender, ajustar el `timeScale` de la accion:
  ```tsx
  idleAction.setEffectiveTimeScale(0.8) // 80% de la velocidad original
  ```

### 3.2 Clonado del modelo si se reutiliza

`useGLTF` cachea la escena. Si el modelo se monta multiples veces (o se desmonta y remonta por navegacion), es necesario clonar:

```tsx
import { SkeletonUtils } from "three-stdlib"

const { scene, animations } = useGLTF("/models/mi-modelo.glb")
const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene])
```

`three-stdlib` ya esta en las dependencias del proyecto (`^2.35.3`), por lo que `SkeletonUtils` esta disponible sin instalaciones adicionales.

### 3.3 Disposal de recursos

Al desmontar el componente, Three.js no libera automaticamente geometrias ni texturas. Si el modelo es pesado, anadir cleanup:

```tsx
import { useEffect } from "react"

useEffect(() => {
  return () => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.geometry.dispose()
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose())
        } else {
          mesh.material.dispose()
        }
      }
    })
  }
}, [scene])
```

---

## Fase 4: Verificacion y depuracion

### 4.1 Checklist de integracion

- [ ] El archivo `.glb` esta en `public/models/` y es accesible en `http://localhost:3000/models/mi-modelo.glb`.
- [ ] `animated-character.tsx` utiliza `useGLTF` con la ruta correcta.
- [ ] El modelo se renderiza centrado en el viewport del canvas.
- [ ] La escala y posicion del `<group>` estan calibradas para que el modelo llene el espacio sin recortarse.
- [ ] El `AsciiRenderer` produce un resultado legible con el nuevo modelo (ajustar `resolution` si es necesario).
- [ ] Las animaciones se reproducen correctamente (verificar nombres de acciones en la consola del navegador).
- [ ] El peso total del `.glb` es aceptable (< 2 MB).
- [ ] La funcion `useGLTF.preload()` esta presente para iniciar la descarga del modelo lo antes posible.

### 4.2 Herramientas de diagnostico

- **[gltf.report](https://gltf.report/)**: inspector web para analizar el contenido del `.glb` (meshes, materiales, animaciones, tamano).
- **[modelviewer.dev](https://modelviewer.dev/editor/)**: previsualizacion rapida del modelo antes de integrarlo.
- **R3F Devtools**: extension de navegador para inspeccionar el grafo de escena de Three.js en tiempo real.
- **Consola del navegador**: `useGLTF` loguea errores descriptivos si la ruta es incorrecta o el archivo esta corrupto.

### 4.3 Performance

- Monitorear los FPS con `useFrame` + `state.clock.getDelta()` o con las Stats de `@react-three/drei`:
  ```tsx
  import { Stats } from "@react-three/drei"
  // Dentro del Canvas:
  <Stats />
  ```
- Si el rendimiento es bajo, reducir la `resolution` del `AsciiRenderer` (valor mas bajo = menos calculo por frame).
- Considerar `React.memo` o `useMemo` para evitar re-renderizados innecesarios del componente del modelo.

---

## Resumen de archivos a modificar

| Archivo | Accion |
|---|---|
| `public/models/mi-modelo.glb` | Agregar (archivo nuevo) |
| `components/animated-character.tsx` | Reescribir completamente |
| `components/ascii-scene.tsx` | Ajustar camara, iluminacion y resolucion ASCII |
| `components/hero-section.tsx` | Sin cambios (la interfaz del componente se mantiene) |
| `package.json` | Sin cambios (todas las dependencias necesarias ya existen) |
