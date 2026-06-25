/**
 * Agrupa meshes de una pieza — resalta al seleccionar y registra raycast.
 */
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useDeviceParts } from '../../context/DevicePartContext';

const targetScale = new THREE.Vector3();

export default function DevicePartGroup({ partId, children, onClick }) {
  const ref = useRef();
  const { selectedPart, selectPart } = useDeviceParts();

  useFrame(() => {
    if (!ref.current) return;
    const t = selectedPart === partId ? 1.08 : 1;
    targetScale.set(t, t, t);
    ref.current.scale.lerp(targetScale, 0.12);
  });

  return (
    <group
      ref={ref}
      userData={{ partId }}
      onClick={(e) => {
        e.stopPropagation();
        selectPart(partId);
        onClick?.(partId);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      {children}
    </group>
  );
}
