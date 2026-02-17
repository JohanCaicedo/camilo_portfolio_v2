# Especificacion tecnica del video de referencia

Descripcion exhaustiva, frame a frame, de todos los elementos visuales, animaciones,
interacciones, colores y temporizaciones presentes en el video de referencia
(`ZcX5xF5kRrnEJ-xd.mp4`) para su reproduccion exacta.

---

## 1. Composicion general de la escena

El video muestra una unica pantalla de tipo "hero" a ancho completo (`100vw x 100vh`).
La composicion se organiza en un layout horizontal de dos columnas sobre un fondo claro,
con una barra de navegacion fija en la parte superior y un indicador de scroll en la parte
inferior central.

```
+--------------------------------------------------------------+
| [logo]           Work  Services  About  Contact    [CTA]     |  <- Navbar fija
+--------------------------------------------------------------+
|                                |                              |
|  [badge]                       |                              |
|  [heading lines]               |    [3D ASCII cat viewport]   |
|  [paragraph]                   |                              |
|  [buttons]                     |                              |
|  [stats row]                   |                              |
|                                |                              |
+--------------------------------------------------------------+
|                    Scroll to explore                          |  <- Indicador
|                          |                                    |
+--------------------------------------------------------------+
```

**Proporciones**: columna izquierda (texto) ocupa `flex-1`, columna derecha (3D) ocupa `flex-1`.
En pantallas `lg+` ambas ocupan el 50% del ancho disponible dentro de un contenedor `max-w-7xl`
con padding horizontal `px-6 lg:px-12`.

---

## 2. Paleta de colores exacta

| Elemento | Color HEX | Uso |
|---|---|---|
| Fondo principal | `#faf9f6` | Background de la seccion hero y del canvas 3D |
| Texto principal | `#1a1a1a` | Headings, logo, stats numeros, icono hamburguesa |
| Texto secundario | `#999999` | Palabra "experiences" en heading, etiquetas de stats |
| Texto parrafo | `#777777` | Descripcion bajo el heading, links de nav |
| Texto badge | `#666666` | Etiqueta "Creative Studio" |
| Texto hint | `#aaaaaa` | "Scroll to explore", decoradores |
| Bordes/lineas | `#e5e5e0` | Linea separadora sobre stats, divisores verticales |
| Boton outline | `#d0d0d0` (borde), `#555555` (texto) | Boton "Watch Reel" |
| Boton primario bg | `#1a1a1a` | Fondo boton "Start a Project" |
| Boton primario text | `#faf9f6` | Texto boton "Start a Project" |
| Caracteres ASCII | `#1a1a1a` | Foreground del AsciiRenderer |
| Fondo ASCII | `#faf9f6` | Background del AsciiRenderer |
| Nariz del gato | `#d4a0a0` | Material procedural del gato |
| Cuerpo del gato | `#e8e0d4` | Material procedural del gato |
| Ojos del gato | `#2a2a2a` | Material procedural del gato |
| Patron de puntos | `#1a1a1a` al `4%` opacidad | Textura de fondo `radial-gradient` |

---

## 3. Tipografia

| Elemento | Familia | Peso | Tamano | Tracking | Line-height |
|---|---|---|---|---|---|
| Logo ("studio.") | `Geist Mono` | `bold` | `text-xl` (20px) | `tracking-tight` | default |
| Nav links | `Geist Mono` | `normal` | `text-sm` (14px) | `tracking-wide` | default |
| Nav CTA | `Geist Mono` | `semibold` | `text-sm` (14px) | default | default |
| Badge label | `Geist Mono` | `normal` | `text-sm` (14px) | `tracking-widest` | default |
| Heading h1 | `Geist` (sans) | `bold` | `text-5xl` -> `text-6xl` -> `text-7xl` -> `text-8xl` | `tracking-tight` | `leading-[0.95]` |
| Parrafo | `Geist` (sans) | `normal` | `text-lg` (18px) | default | `leading-relaxed` |
| Stats numeros | `Geist Mono` | `bold` | `text-3xl` (30px) | default | default |
| Stats labels | `Geist` (sans) | `normal` | `text-sm` (14px) | default | default |
| Scroll hint | `Geist Mono` | `normal` | `text-xs` (12px) | `tracking-widest` | default |

Ambas familias se cargan via `next/font/google` (`Geist` y `Geist_Mono`) y se aplican
mediante las variables CSS `--font-sans` y `--font-mono` en `globals.css`.

---

## 4. Barra de navegacion (Navbar)

### 4.1 Estructura

- **Posicion**: `fixed top-0 left-0 right-0 z-50`.
- **Altura**: `h-20` (80px).
- **Fondo**: `#faf9f6` al 80% opacidad con `backdrop-blur-md`.
- **Contenedor interno**: `max-w-7xl mx-auto`, distribuido con `flex items-center justify-between`.

### 4.2 Elementos

1. **Logo** (izquierda): texto "studio" en `#1a1a1a` bold monospace seguido de un punto "." en `#999999`.
2. **Links** (centro-derecha): cuatro enlaces inline: `Work`, `Services`, `About`, `Contact`.
   - Color default: `#777777`.
   - Color hover: `#1a1a1a` con `transition-colors`.
3. **CTA** (extrema derecha): boton pill "Let's Talk" con fondo `#1a1a1a`, texto `#faf9f6`, `rounded-full`, padding `px-5 py-2.5`.
4. **Menu movil**: solo visible en `< md`. Boton hamburguesa (`Menu`/`X` de lucide-react) que despliega un panel `absolute top-20` con los mismos links en columna sobre fondo `#faf9f6` al 95% opacidad con `backdrop-blur-lg`.

### 4.3 Animacion de la navbar

En el video la navbar **no tiene animacion de entrada propia**. Aparece visible desde el primer frame (no participa en la cascada de staggered reveal del contenido).

---

## 5. Seccion de texto (columna izquierda)

Toda la columna izquierda utiliza un sistema de **staggered reveal** controlado por un hook
`useStaggeredReveal` que activa un estado `visible` despues de un `setTimeout` de 100ms.
Cada elemento tiene la misma transicion base pero con `transitionDelay` incremental.

### 5.1 Parametros globales de animacion del stagger

```
transition-property: all
transition-duration: 700ms
transition-timing-function: ease-out
transform-origin: default (center)
```

Cada elemento transiciona de:
- `opacity: 0` -> `opacity: 1`
- `translateY(Npx)` -> `translateY(0)`

### 5.2 Secuencia completa de aparicion

| Orden | Elemento | Delay | Desplazamiento Y inicial | Detalle |
|---|---|---|---|---|
| 1 | Badge ("Creative Studio") | `200ms` | `20px` | Incluye un dot `animate-pulse` de 8x8px |
| 2 | Heading linea 1+2+3 | `400ms` | `30px` | Todo el `<h1>` aparece como bloque unico |
| 3 | Viewport 3D (derecha) | `500ms` | `scale(0.95)` -> `scale(1)` | **Distinto**: usa scale en vez de translateY, duracion `1000ms` |
| 4 | Parrafo descriptivo | `600ms` | `20px` | Max-width `max-w-md` |
| 5 | Botones (fila) | `800ms` | `20px` | Ambos botones aparecen simultaneamente |
| 6 | Stats row | `1000ms` | `20px` | Los tres stats + divisores aparecen juntos |
| 7 | Scroll indicator | `1200ms` | Solo opacity (sin translateY) | Texto + linea animada |

### 5.3 Badge

```
Layout: inline-flex, items-center, gap-2
  [dot: 8x8px, rounded-full, bg-#1a1a1a, animate-pulse (opacidad 1 -> 0.5 -> 1, 2s infinite)]
  [texto: "Creative Studio", uppercase, sm, mono, #666666, tracking-widest]
```

### 5.4 Heading (H1)

Tres lineas de texto renderizadas con `<br />` explicitos:

```
Linea 1: "We craft"         -> color #1a1a1a
Linea 2: "digital"          -> color #1a1a1a
Linea 3: "experiences"      -> color #999999 (span con clase de color diferente)
```

Responsive sizing:
- `< sm`: `text-5xl` (48px)
- `sm`: `text-6xl` (60px)
- `lg`: `text-7xl` (72px)
- `xl`: `text-8xl` (96px)

Clase `text-balance` aplicada para equilibrio de lineas. `mb-6`.

### 5.5 Parrafo

```
"Immersive web experiences that blend creativity with
cutting-edge technology. From concept to launch."

Color: #777777
Font-size: text-lg (18px)
Max-width: max-w-md (~28rem)
Line-height: leading-relaxed (1.625)
text-pretty aplicado
mb-10
```

### 5.6 Botones

Dos botones inline con `flex-wrap items-center gap-4`:

**Boton primario "Start a Project":**
- Fondo: `#1a1a1a`
- Texto: `#faf9f6`
- Size: `lg`, `h-12`, `px-8`
- Bordes: `rounded-full`
- Tipografia: `text-base font-semibold`
- Icono: `ArrowRight` (lucide-react) a la derecha, `h-4 w-4`, `ml-2`
- Hover: `bg-#333333`, `scale(1.02)`
- Active: `scale(0.98)`

**Boton secundario "Watch Reel":**
- Variante: `outline`
- Borde: `#d0d0d0`
- Texto: `#555555`
- Size: `lg`, `h-12`, `px-8`
- Bordes: `rounded-full`
- Tipografia: `text-base`
- Icono: `Play` (lucide-react) a la izquierda, `h-4 w-4`, `mr-2`
- Hover: `bg-#f0efec`, `text-#1a1a1a`, `border-#aaaaaa`

### 5.7 Stats row

```
Layout: flex items-center gap-10
Margen superior: mt-14
Padding superior: pt-10
Borde superior: border-t border-#e5e5e0

Stat 1:
  Numero: "150+" | text-3xl bold mono #1a1a1a
  Label:  "Projects" | text-sm #999999 mt-1

[Divisor vertical: w-px h-10 bg-#e5e5e0]

Stat 2:
  Numero: "98%" | text-3xl bold mono #1a1a1a
  Label:  "Satisfaction" | text-sm #999999 mt-1

[Divisor vertical: w-px h-10 bg-#e5e5e0]

Stat 3:
  Numero: "12+" | text-3xl bold mono #1a1a1a
  Label:  "Years" | text-sm #999999 mt-1
```

---

## 6. Viewport 3D (columna derecha) - ASCII Cat

### 6.1 Contenedor

```
Clase: flex-1 w-full lg:w-auto
Altura: h-[500px] en movil, lg:h-[700px] en desktop
Posicion: relative

Animacion de entrada:
  opacity: 0 -> 1
  scale(0.95) -> scale(1)
  transition-duration: 1000ms (mas lenta que el texto)
  transition-delay: 500ms
  timing: ease-out
```

### 6.2 Canvas Three.js

```tsx
<Canvas
  camera={{ position: [0, 1, 4.5], fov: 40 }}
  gl={{ alpha: true }}
  style={{ background: "transparent" }}
>
  <color attach="background" args={["#faf9f6"]} />
```

- Camara perspectiva en posicion `[0, 1, 4.5]`, mirando al origen.
- FOV angosto de 40 grados (perspectiva aplanada, elegante).
- Background del framebuffer: `#faf9f6` para fusion perfecta con el fondo de la pagina.

### 6.3 Iluminacion de la escena

```
ambientLight:       intensidad 0.6 (luz base uniforme)
directionalLight 1: posicion [5, 8, 5],   intensidad 1.4 (luz principal desde arriba-derecha-frontal)
directionalLight 2: posicion [-3, 4, -2],  intensidad 0.5 (fill desde izquierda-arriba-atras)
pointLight:         posicion [0, 3, 4],    intensidad 0.6, color #ffffff (luz frontal superior)
```

Esta configuracion produce un contraste medio-alto en la silueta del gato, lo cual genera
una variacion rica en los caracteres ASCII (zonas muy iluminadas usan `@#*`, zonas oscuras
usan `. ,:`).

### 6.4 AsciiRenderer

```tsx
<AsciiRenderer
  fgColor="#1a1a1a"
  bgColor="#faf9f6"
  characters=" .,:;|~-=+*#@"
  invert={false}
  resolution={0.18}
/>
```

- **Rampa de caracteres**: 13 caracteres ordenados de menor a mayor densidad visual:
  ` ` (espacio), `.`, `,`, `:`, `;`, `|`, `~`, `-`, `=`, `+`, `*`, `#`, `@`.
- **Resolution 0.18**: genera una grilla de caracteres de tamano medio. Cada celda
  cubre aproximadamente 5.5px del canvas.
- **invert: false**: las zonas claras del modelo usan caracteres de baja densidad (`.`),
  las zonas oscuras usan caracteres de alta densidad (`@#`).

### 6.5 Modelo 3D procedural (gato)

El gato no es un archivo `.glb`. Esta construido enteramente con primitivas de Three.js
dentro de `animated-character.tsx`. La jerarquia del grafo de escena es:

```
<group> (groupRef) - scale=1.6, position=[0, -0.5, 0]
  |
  +-- <group> (bodyRef) - cuerpo principal con bob vertical
  |     |
  |     +-- RoundedBox [0.7, 0.55, 1.2] radius=0.2 pos=[0, 0.55, 0]  // Torso
  |     |
  |     +-- <group> (headRef) pos=[0, 0.85, 0.65]                     // Cabeza
  |     |     +-- Sphere r=0.32 (16 segmentos)                        // Craneo
  |     |     +-- Cone [0.1, 0.22, 4 lados] pos=[-0.18, 0.28, 0]     // Oreja izq
  |     |     +-- Cone [0.1, 0.22, 4 lados] pos=[0.18, 0.28, 0]      // Oreja der
  |     |     +-- Sphere r=0.045 pos=[-0.1, 0.04, 0.27]               // Ojo izq
  |     |     +-- Sphere r=0.045 pos=[0.1, 0.04, 0.27]                // Ojo der
  |     |     +-- Sphere r=0.025 pos=[0, -0.04, 0.3]                  // Nariz
  |     |     +-- Sphere r=0.12 pos=[0, -0.06, 0.2]                   // Hocico
  |     |
  |     +-- <group> (frontLeftLegRef)  pos=[-0.2, 0.3, 0.38]          // Pata delantera izq
  |     |     +-- RoundedBox [0.14, 0.5, 0.14] r=0.05 pos=[0, -0.22, 0]
  |     |     +-- Sphere r=0.08 pos=[0, -0.48, 0.02]                  // Almohadilla
  |     |
  |     +-- <group> (frontRightLegRef) pos=[0.2, 0.3, 0.38]           // Pata delantera der
  |     |     +-- RoundedBox [0.14, 0.5, 0.14] r=0.05
  |     |     +-- Sphere r=0.08
  |     |
  |     +-- <group> (backLeftLegRef)   pos=[-0.2, 0.3, -0.38]         // Pata trasera izq
  |     |     +-- RoundedBox [0.15, 0.5, 0.16] r=0.05
  |     |     +-- Sphere r=0.08
  |     |
  |     +-- <group> (backRightLegRef)  pos=[0.2, 0.3, -0.38]          // Pata trasera der
  |     |     +-- RoundedBox [0.15, 0.5, 0.16] r=0.05
  |     |     +-- Sphere r=0.08
  |     |
  |     +-- <group> (tailRef) pos=[0, 0.75, -0.6]                     // Cola
  |           +-- Cylinder [0.04 top, 0.025 bottom, 0.65 height, 8 segm]
  |           +-- Sphere r=0.04 pos=[0, 0.32, 0]                      // Punta de la cola
```

**Materiales:**
- Cuerpo, cabeza, orejas, patas, cola, hocico: `MeshStandardMaterial color="#e8e0d4"` (beige calido)
- Ojos: `MeshStandardMaterial color="#2a2a2a"` (negro suave)
- Nariz: `MeshStandardMaterial color="#d4a0a0"` (rosa palido)

### 6.6 Sistema de animacion del gato (frame-by-frame)

Todas las animaciones se ejecutan en `useFrame`, es decir, a 60fps (o la tasa nativa del monitor).
La variable `t` es `state.clock.getElapsedTime()` (segundos desde el montaje).

#### 6.6.1 Rotacion orbital global

```
groupRef.rotation.y = Math.sin(t * 0.3) * 0.4
```

- **Frecuencia**: `0.3 Hz` -> un ciclo completo cada `~20.94 segundos` (2*PI/0.3).
- **Amplitud**: `0.4 radianes` -> aproximadamente `22.9 grados` a cada lado.
- **Efecto visual**: el gato rota suavemente de izquierda a derecha en un movimiento pendular,
  permitiendo ver su perfil lateral desde ambos angulos. Nunca muestra la parte trasera completa.

#### 6.6.2 Bob vertical del cuerpo

```
bodyRef.position.y = Math.abs(Math.sin(t * walkSpeed * 2)) * 0.04
donde walkSpeed = 3, por tanto frecuencia = 6 Hz
```

- Rebote vertical de `0` a `0.04` unidades (siempre positivo por `Math.abs`).
- Genera un movimiento de rebote rapido y sutil que simula el paso al caminar.
- Frecuencia real: `6 / (2*PI) ≈ 0.955 Hz` -> ~1 rebote por segundo.

#### 6.6.3 Balanceo lateral del cuerpo

```
bodyRef.rotation.z = Math.sin(t * walkSpeed) * 0.015
donde walkSpeed = 3
```

- Rotacion lateral de `-0.015` a `+0.015` radianes (~0.86 grados).
- Sincronizado con el ciclo de caminar. Simula el leve balanceo lateral al andar.

#### 6.6.4 Movimiento de la cabeza

```
headRef.rotation.x = Math.sin(t * walkSpeed * 2) * 0.03 - 0.05
headRef.rotation.y = Math.sin(t * 0.8) * 0.1
```

- **Cabeceo (X)**: oscila entre `-0.08` y `-0.02` radianes. El offset `-0.05` inclina
  la cabeza ligeramente hacia abajo (como olfateando). Frecuencia: `6 Hz`.
- **Giro lateral (Y)**: oscila entre `-0.1` y `+0.1` radianes (~5.7 grados a cada lado).
  Frecuencia: `0.8 Hz` -> un ciclo completo cada `~7.85 s`. Simula "mirar alrededor"
  de forma independiente a la caminata.

#### 6.6.5 Patas delanteras

```
frontLeftLeg.rotation.x  = Math.sin(t * walkSpeed) * 0.45
frontRightLeg.rotation.x = Math.sin(t * walkSpeed + PI) * 0.45
```

- Amplitud de `0.45 radianes` (~25.8 grados) hacia adelante y atras.
- Frecuencia: `walkSpeed = 3` -> un paso completo cada `~2.09 s`.
- Las patas estan en **antifase** (desfasadas PI radianes): cuando la izquierda va
  hacia adelante, la derecha va hacia atras.

#### 6.6.6 Patas traseras

```
backLeftLeg.rotation.x  = Math.sin(t * walkSpeed + PI) * 0.45
backRightLeg.rotation.x = Math.sin(t * walkSpeed) * 0.45
```

- Misma amplitud y frecuencia que las delanteras.
- Patron cruzado: la pata trasera izquierda se sincroniza con la delantera derecha
  (y viceversa), simulando la locomocion cuadrupeda diagonal correcta.

#### 6.6.7 Cola

```
tailRef.rotation.z = Math.sin(t * 1.5) * 0.4
tailRef.rotation.x = Math.sin(t * 0.7) * 0.15 - 0.6
```

- **Balanceo lateral (Z)**: amplitud `0.4 rad` (~23 grados). Frecuencia `1.5 Hz`.
  La cola se mece de lado a lado con un ritmo propio, no sincronizado con las patas.
- **Inclinacion vertical (X)**: oscila entre `-0.75` y `-0.45` radianes. El offset `-0.6`
  mantiene la cola apuntando predominantemente hacia arriba-atras. El movimiento sutil
  simula la cola elevada de un gato contento.

### 6.7 Resultado visual del ASCII rendering

El resultado visible en el video es una representacion del gato hecha enteramente de
caracteres tipograficos sobre fondo `#faf9f6`:

- Las zonas mas iluminadas del cuerpo (hombros, parte superior de la cabeza) se representan
  con caracteres de baja densidad: espacios, puntos, comas.
- Las zonas de sombra (bajo el vientre, entre las patas, interior de orejas) usan
  caracteres densos: `#`, `@`, `*`.
- Los bordes/silueta del gato crean transiciones visibles como lineas de caracteres
  medios: `|`, `~`, `=`, `+`.
- La animacion de caminar y rotacion produce un efecto de "caracteres que fluyen"
  en tiempo real, ya que el `AsciiRenderer` recalcula la grilla completa cada frame.

---

## 7. Patron de fondo (dot grid)

```css
position: absolute;
inset: 0;
opacity: 0.04;
background-image: radial-gradient(circle, #1a1a1a 1px, transparent 1px);
background-size: 24px 24px;
```

- Grid de puntos de 1px de radio, espaciados cada 24px en ambas direcciones.
- Opacidad extremadamente baja (4%) para ser apenas perceptible.
- Cubre toda la seccion hero como decoracion sutil.
- Se renderiza **debajo** del contenido (sin `z-index`, el contenido tiene `z-10`).

---

## 8. Scroll indicator (parte inferior)

```
Posicion: absolute bottom-8 left-1/2 -translate-x-1/2
z-index: z-10

Texto: "Scroll to explore"
  - Fuente: Geist Mono, xs (12px), tracking-widest, uppercase
  - Color: #aaaaaa

Linea decorativa:
  - w-px h-8 (1px ancho, 32px alto)
  - background: gradient vertical de #aaaaaa a transparent
  - animate-pulse (opacidad oscilante, 2s, infinite)

Animacion de entrada:
  - Solo opacity: 0 -> 1
  - Sin translateY
  - Delay: 1200ms
  - Duration: 700ms
  - Timing: ease-out
```

---

## 9. Interacciones observadas en el video

### 9.1 Cursor y hover

En el video se observa el cursor moviendose sobre la interfaz. Los estados de hover
observables son:

1. **Links de nav**: el color transiciona de `#777777` a `#1a1a1a` al hacer hover.
   Transicion CSS suave (`transition-colors`).
2. **Boton "Start a Project"**: hover cambia el fondo de `#1a1a1a` a `#333333` y aplica
   `scale(1.02)`. Al hacer click (active): `scale(0.98)`.
3. **Boton "Watch Reel"**: hover cambia fondo a `#f0efec`, texto a `#1a1a1a`,
   borde a `#aaaaaa`.

### 9.2 Viewport 3D

El canvas 3D **no responde a interacciones del mouse** en el video. No hay:
- Rotacion por drag (OrbitControls).
- Parallax en hover.
- Clicks en el modelo.

El modelo se anima de forma autonoma via `useFrame`.

---

## 10. Responsive behavior observado

El video muestra la version **desktop** (ancho estimado ~1400px basado en proporciones).
Segun el codigo, el comportamiento responsive es:

| Breakpoint | Layout | Heading size | 3D viewport height |
|---|---|---|---|
| `< lg` (< 1024px) | Columnas apiladas verticalmente | `text-5xl` a `text-6xl` | `h-[500px]` |
| `>= lg` (1024px+) | Dos columnas lado a lado | `text-7xl` | `lg:h-[700px]` |
| `>= xl` (1280px+) | Mismo layout, heading mas grande | `text-8xl` | `lg:h-[700px]` |

En la version movil:
- La columna de texto aparece primero con `py-24`.
- El viewport 3D aparece debajo a ancho completo.
- La navbar colapsa a hamburguesa (`md:hidden`).

---

## 11. Temporizacion completa de la secuencia de entrada

Desde el momento en que el componente se monta, esta es la linea de tiempo exacta:

```
t=0ms       Componente monta. Hook useStaggeredReveal inicia setTimeout(100ms).
            Navbar ya es visible (sin animacion).
            Patron de puntos ya visible (estatico).

t=100ms     Estado visible=true se activa.
            Todas las transiciones CSS comienzan a interpolarse.

t=300ms     Badge comienza a ser perceptible (delay 200ms + ~100ms de interpolacion).
            (0ms trigger + 100ms delay hook + 200ms delay CSS = 300ms absolutos)

t=500ms     Heading H1 comienza a materializarse (delay 400ms).

t=600ms     Viewport 3D inicia su scale-in (delay 500ms, duracion 1000ms).

t=700ms     Parrafo comienza a aparecer (delay 600ms).

t=800ms     Badge completamente visible (200ms delay + 700ms transicion).
            Heading casi completamente visible.

t=900ms     Botones comienzan a aparecer (delay 800ms).

t=1000ms    Heading completamente visible.
            Parrafo casi completamente visible.

t=1100ms    Stats row comienza a aparecer (delay 1000ms).

t=1300ms    Scroll indicator comienza a aparecer (delay 1200ms).
            Botones completamente visibles.

t=1600ms    Viewport 3D completamente escalado (600ms start + 1000ms duracion).
            Stats completamente visibles.

t=2000ms    Scroll indicator completamente visible.
            TODA la escena esta en su estado final.
```

**Tiempo total de la secuencia completa: ~2 segundos.**

Despues de t=2000ms, los unicos movimientos continuos son:
- Animacion `animate-pulse` del dot del badge (infinita, CSS).
- Animacion `animate-pulse` de la linea del scroll indicator (infinita, CSS).
- Animacion 3D del gato ASCII en `useFrame` (infinita, 60fps).

---

## 12. Resumen de archivos involucrados y su rol

| Archivo | Responsabilidad |
|---|---|
| `app/page.tsx` | Monta `<Navbar />` + `<HeroSection />` dentro de `<main bg-#0a0a0a>` |
| `app/layout.tsx` | Carga fuentes Geist/Geist Mono, metadata SEO, wrapper HTML |
| `app/globals.css` | Tokens de color shadcn, configuracion Tailwind v4, @theme inline |
| `components/navbar.tsx` | Navegacion fija con logo, links, CTA, menu movil |
| `components/hero-section.tsx` | Layout del hero, staggered reveal, texto, botones, stats, carga dinamica de AsciiScene |
| `components/ascii-scene.tsx` | Canvas Three.js, camara, iluminacion, AsciiRenderer |
| `components/animated-character.tsx` | Gato procedural con primitivas 3D y animacion en useFrame |

---

## 13. Detalles criticos para reproduccion exacta

1. **El fondo del `<main>` en page.tsx es `#0a0a0a`** (casi negro), pero la seccion hero
   tiene `bg-[#faf9f6]` que lo cubre completamente. Esto solo seria visible si hay secciones
   adicionales debajo del hero.

2. **El `AsciiRenderer` reemplaza completamente** el renderizado normal de Three.js. No se ven
   los materiales de color directamente; solo se ven caracteres ASCII cuya densidad depende
   de la luminancia calculada por el pipeline de iluminacion.

3. **El dynamic import con `ssr: false`** es esencial: Three.js y el canvas WebGL no pueden
   ejecutarse en el servidor. Sin esto, el build de produccion falla.

4. **El `Suspense fallback={null}`** significa que mientras el componente `AnimatedCharacter`
   carga, no se muestra nada en el viewport 3D (ni spinner ni placeholder). Dado que el
   componente es procedural (sin archivos externos), la carga es practicamente instantanea.

5. **La animacion `animate-pulse`** de Tailwind opera con keyframes CSS nativos
   (`opacity: 1 -> 0.5 -> 1`, duracion `2s`, iteracion infinita). No depende de JavaScript.

6. **No hay scroll-based animations** en el video. El hero es una escena completamente estatica
   una vez terminada la secuencia de entrada. No hay parallax ni transformaciones vinculadas
   al scroll.
