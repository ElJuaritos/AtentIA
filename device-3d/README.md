# device-3d — Modelo 3D del dispositivo matIA

Modelo 3D interactivo del dispositivo matIA para la landing y el pitch. Construido con **Three.js + React Three Fiber + drei**.

## Visualizar el modelo

```bash
cd AtentIA/client
npm install
npm run dev
```

Abre en el navegador: **http://localhost:5173/device-preview**

- Arrastra para rotar el dispositivo
- Pinch / scroll para zoom
- Auto-rotate activo por defecto
- Pasa el cursor sobre el botón naranja (PTT) para resaltarlo

## Estructura

```
device-3d/
├── assets/
│   ├── models/      # .glb / .gltf (export Blender, futuro)
│   └── textures/    # eink-screen.png, matia-logo.png (futuro)
└── src/
    ├── components/
    │   ├── DeviceViewer.jsx    # Canvas + luces + sombras
    │   ├── MatiaDevice.jsx     # Geometría procedural del dispositivo
    │   └── DeviceControls.jsx  # OrbitControls con límites
    ├── config/
    │   └── deviceMaterials.js  # Colores, dimensiones, cámara
    └── index.js                # Exports públicos
```

## Referencia visual

Estilo **Yoto-like**: forma squircle, pantalla e-ink centrada, perilla lateral, cuerpo mint mate.

| Parte | Hex |
|-------|-----|
| Cuerpo | `#B8C9B8` (mint/salvia) |
| Bezel pantalla | `#1E1E1E` |
| Fondo e-ink | `#0D0D0D` |
| Logo MatIA | `#3D4A3D` |
| Perilla | `#1A1A1A` |
| Botón PTT | `#FF7A14` (diferenciador vs Yoto) |

Elementos visibles al rotar: slot cartucho NFC (superior), botón PTT (inferior frontal).

## Consumo desde client

El alias Vite `@device3d` apunta a `device-3d/src`:

```jsx
import { DeviceViewer } from '@device3d';

<DeviceViewer className="w-full h-96" />
```

## Roadmap

- [ ] Textura PNG real para pantalla e-ink (elefante + texto)
- [ ] Export `.glb` desde Blender para reemplazar geometría procedural
- [ ] Integrar `DeviceViewer` en `Hero.jsx` con fallback PNG en móvil
- [ ] Tooltip Html al hover en PTT y cartucho

## Stack

| Paquete | Versión | Notas |
|---------|---------|-------|
| `three` | latest | Motor 3D |
| `@react-three/fiber` | 8.x | Compatible React 18 |
| `@react-three/drei` | 9.x | RoundedBox, Text, Environment |
