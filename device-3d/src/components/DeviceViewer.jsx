/**
 * Canvas R3F — iluminación y sombras del prototipo HTML.
 */
import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { CAMERA, ORBIT, SCALE, s } from '../config/deviceMaterials';
import CanvasErrorBoundary from './CanvasErrorBoundary';
import DeviceControls from './DeviceControls';
import MatiaDevice from './MatiaDevice';

function SceneLights() {
  return (
    <>
      <hemisphereLight args={[0xffffff, 0x4a5896, 0.95]} />
      <directionalLight
        position={[5, 9, 9]}
        intensity={1.7}
        castShadow
        shadow-mapSize={[1536, 1536]}
        shadow-camera-near={1}
        shadow-camera-far={46}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-6, 1, 6]} intensity={0.7} color="#FFE2C6" />
      <directionalLight position={[-3, 5, -8]} intensity={0.85} color="#CFE0F0" />
    </>
  );
}

export default function DeviceViewer({ className = '' }) {
  const idleRef = useRef(0);

  return (
    <CanvasErrorBoundary>
      <div
        className={className}
        style={{ width: '100%', height: '100%', minHeight: 320, touchAction: 'none' }}
        aria-label="Modelo 3D interactivo del dispositivo matIA"
      >
        <Canvas
          camera={{
            position: CAMERA.position,
            fov: CAMERA.fov,
            near: CAMERA.near,
            far: CAMERA.far,
          }}
          dpr={[1, 1.5]}
          shadows
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%' }}
          onPointerMissed={() => {
            idleRef.current = 0;
          }}
        >
          <SceneLights />
          <Suspense fallback={null}>
            <MatiaDevice idleRef={idleRef} />
            <ContactShadows
              opacity={0.22}
              blur={2}
              scale={14 * SCALE}
              position={[0, s(-4.6), 0]}
              far={2}
            />
          </Suspense>
          <DeviceControls />
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}
