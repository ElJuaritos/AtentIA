/**
 * Panel de pantalla, e-ink y watermark matIA — prototipo HTML.
 */
import { useMemo } from 'react';
import { BODY, s } from '../../config/deviceMaterials';
import { createDeviceMaterial } from '../../utils/geometryHelpers';
import { createEinkScreenTexture, createLabelTexture } from '../../utils/einkTextures';
import DevicePartGroup from './DevicePartGroup';

export function DeviceScreen() {
  const fz = s(BODY.frontZ);
  const screenTex = useMemo(() => createEinkScreenTexture(), []);
  const wmTex = useMemo(() => createLabelTexture('matIA', '#E7EEF3'), []);
  const panelMat = useMemo(
    () => createDeviceMaterial({ color: '#161F40', roughness: 0.5, metalness: 0.1 }),
    [],
  );

  return (
    <DevicePartGroup partId="pantalla">
      <mesh position={[0, s(1.55), fz]} material={panelMat} castShadow>
        <boxGeometry args={[s(3.4), s(2.5), s(0.14)]} />
      </mesh>
      <mesh position={[0, s(1.55), fz + s(0.09)]} castShadow>
        <planeGeometry args={[s(2.66), s(2.0)]} />
        <meshStandardMaterial map={screenTex} roughness={0.97} metalness={0} />
      </mesh>
      <mesh position={[0, s(0.05), fz + s(0.04)]}>
        <planeGeometry args={[s(1.4), s(0.4)]} />
        <meshBasicMaterial map={wmTex} transparent />
      </mesh>
    </DevicePartGroup>
  );
}
