/**
 * Modelo 3D matIA — réplica del prototipo HTML oficial.
 */
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ORBIT } from '../config/deviceMaterials';
import { useDeviceParts } from '../context/DevicePartContext';
import {
  BottomPorts,
  CornerProtectors,
  DeviceBody,
  VolumeKnob,
} from './device/DeviceBodyParts';
import DeviceGameControls from './device/DeviceGameControls';
import { DeviceScreen } from './device/DeviceScreenAssembly';

export default function MatiaDevice({ idleRef }) {
  const innerRef = useRef();
  const localIdle = useRef(0);
  const { selectedPart } = useDeviceParts();

  /** Rota el modelo al seleccionar carcasa (ver trasera) u otra pieza */
  useEffect(() => {
    if (!innerRef.current || !selectedPart) return;
    const rotY = selectedPart === 'carcasa' ? Math.PI - 0.2 : -0.3;
    innerRef.current.rotation.set(0.08, rotY, 0);
    localIdle.current = 0;
  }, [selectedPart]);

  useFrame((_, delta) => {
    if (!innerRef.current) return;
    localIdle.current += delta * 60;
    if (localIdle.current > 150) {
      innerRef.current.rotation.y += 0.0035;
    }
  });

  return (
    <group
      onPointerDown={() => {
        localIdle.current = 0;
        if (idleRef) idleRef.current = 0;
      }}
    >
      <group ref={innerRef} rotation={ORBIT.initialRotation}>
        <DeviceBody />
        <CornerProtectors />
        <VolumeKnob />
        <BottomPorts />
        <DeviceScreen />
        <DeviceGameControls />
      </group>
    </group>
  );
}
