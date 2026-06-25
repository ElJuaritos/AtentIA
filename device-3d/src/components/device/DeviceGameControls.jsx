/**
 * Controles del prototipo — D-pad, A/B, Start/Select, bocina, PTT y cartucho.
 */
import { useMemo } from 'react';
import { BODY, COLORS, s } from '../../config/deviceMaterials';
import { createDeviceMaterial } from '../../utils/geometryHelpers';
import { createLabelTexture } from '../../utils/einkTextures';
import DevicePartGroup from './DevicePartGroup';

const cast = { castShadow: true };

function orangeBtnMat() {
  return createDeviceMaterial({
    color: COLORS.orange,
    roughness: 0.28,
    clearcoat: 0.6,
    emissive: '#6A2E00',
    emissiveIntensity: 0.3,
  });
}

/** Cruceta direccional */
function DPad() {
  const mat = useMemo(
    () => createDeviceMaterial({ color: COLORS.dpad, roughness: 0.5, metalness: 0.1, clearcoat: 0.2 }),
    [],
  );
  const fz = s(BODY.frontZ) + s(0.05);

  return (
    <DevicePartGroup partId="dpad">
      <mesh position={[s(-1.25), s(-1.55), fz]} material={mat} {...cast}>
        <boxGeometry args={[s(0.36), s(1.05), s(0.2)]} />
      </mesh>
      <mesh position={[s(-1.25), s(-1.55), fz]} material={mat} {...cast}>
        <boxGeometry args={[s(1.05), s(0.36), s(0.2)]} />
      </mesh>
    </DevicePartGroup>
  );
}

/** Botones A y B naranjas */
function ActionButtons() {
  const mat = useMemo(orangeBtnMat, []);
  const fz = s(BODY.frontZ) + s(0.05);

  const buttons = [
    { x: 1.45, y: -1.2 },
    { x: 0.8, y: -1.68 },
  ];

  return (
    <DevicePartGroup partId="botones">
      {buttons.map(({ x, y }, i) => (
        <mesh
          key={i}
          position={[s(x), s(y), fz]}
          rotation={[Math.PI / 2, 0, 0]}
          material={mat}
          {...cast}
        >
          <cylinderGeometry args={[s(0.3), s(0.3), s(0.32), 36]} />
        </mesh>
      ))}
    </DevicePartGroup>
  );
}

/** Start / Select — pastillas grises inclinadas */
function StartSelectButtons() {
  const mat = useMemo(
    () => createDeviceMaterial({ color: COLORS.ss, roughness: 0.4, metalness: 0.2 }),
    [],
  );
  const fz = s(BODY.frontZ) + s(0.03);

  return (
    <DevicePartGroup partId="ss">
      {[-0.35, 0.4].map((dx, i) => (
        <mesh
          key={i}
          position={[s(dx), s(-2.12), fz]}
          rotation={[0, 0, -0.5]}
          material={mat}
          {...cast}
        >
          <boxGeometry args={[s(0.52), s(0.16), s(0.14)]} />
        </mesh>
      ))}
    </DevicePartGroup>
  );
}

/** Rejilla diagonal de la bocina */
function SpeakerGrille() {
  const mat = useMemo(
    () => createDeviceMaterial({ color: COLORS.speaker, roughness: 0.5, metalness: 0.2 }),
    [],
  );
  const fz = s(BODY.frontZ) + s(0.06);
  const holes = [];

  for (let r = 0; r < 4; r += 1) {
    for (let c = 0; c < 4; c += 1) {
      holes.push([0.98 + c * 0.16 + r * 0.16, -2.86 + r * 0.16]);
    }
  }

  return (
    <DevicePartGroup partId="bocina">
      {holes.map(([x, y], i) => (
        <mesh
          key={i}
          position={[s(x), s(y), fz]}
          rotation={[Math.PI / 2, 0, 0]}
          material={mat}
          {...cast}
        >
          <cylinderGeometry args={[s(0.058), s(0.058), s(0.12), 12]} />
        </mesh>
      ))}
    </DevicePartGroup>
  );
}

/** Botón Push-to-Talk con icono de micrófono 3D */
function PttButton() {
  const fz = s(BODY.frontZ);
  const ringMat = useMemo(
    () => createDeviceMaterial({ color: COLORS.pttRing, roughness: 0.5, metalness: 0.2 }),
    [],
  );
  const pttMat = useMemo(
    () =>
      createDeviceMaterial({
        color: COLORS.ptt,
        roughness: 0.3,
        clearcoat: 0.6,
        emissive: '#0C3B3A',
        emissiveIntensity: 0.42,
      }),
    [],
  );
  const micMat = useMemo(
    () => createDeviceMaterial({ color: '#FFFFFF', roughness: 0.4, clearcoat: 0.3 }),
    [],
  );

  return (
    <DevicePartGroup partId="ptt">
      <mesh position={[0, s(-1.15), fz]} rotation={[Math.PI / 2, 0, 0]} material={ringMat} {...cast}>
        <cylinderGeometry args={[s(0.47), s(0.49), s(0.12), 40]} />
      </mesh>
      <mesh position={[0, s(-1.15), fz + s(0.13)]} rotation={[Math.PI / 2, 0, 0]} material={pttMat} {...cast}>
        <cylinderGeometry args={[s(0.37), s(0.39), s(0.34), 40]} />
      </mesh>
      {/* Icono micrófono */}
      <mesh position={[0, s(-1.05), fz + s(0.31)]} material={micMat} {...cast}>
        <cylinderGeometry args={[s(0.085), s(0.085), s(0.2), 18]} />
      </mesh>
      <mesh position={[0, s(-0.95), fz + s(0.31)]} material={micMat} {...cast}>
        <sphereGeometry args={[s(0.085), 16, 12]} />
      </mesh>
      <mesh position={[0, s(-1.27), fz + s(0.31)]} material={micMat} {...cast}>
        <boxGeometry args={[s(0.04), s(0.12), s(0.04)]} />
      </mesh>
      <mesh position={[0, s(-1.34), fz + s(0.31)]} material={micMat} {...cast}>
        <boxGeometry args={[s(0.24), s(0.045), s(0.045)]} />
      </mesh>
    </DevicePartGroup>
  );
}

/** Ranura y cartucho PLANETAS */
function Cartridge() {
  const label = useMemo(() => createLabelTexture('PLANETAS', '#FFFFFF'), []);
  const slotMat = useMemo(
    () => createDeviceMaterial({ color: '#10193A', roughness: 0.6, metalness: 0.1 }),
    [],
  );
  const cartMat = useMemo(
    () =>
      createDeviceMaterial({
        color: COLORS.cartridge,
        roughness: 0.4,
        clearcoat: 0.4,
        emissive: '#5A1030',
        emissiveIntensity: 0.25,
      }),
    [],
  );

  return (
    <DevicePartGroup partId="cartucho">
      <mesh position={[s(-0.5), s(3.02), s(-0.18)]} material={slotMat} {...cast}>
        <boxGeometry args={[s(1.5), s(0.22), s(0.55)]} />
      </mesh>
      <mesh position={[s(-0.5), s(3.58), s(-0.18)]} material={cartMat} {...cast}>
        <boxGeometry args={[s(1.4), s(0.95), s(0.44)]} />
      </mesh>
      <mesh position={[s(-0.5), s(3.58), s(0.06)]}>
        <planeGeometry args={[s(1.2), s(0.4)]} />
        <meshBasicMaterial map={label} transparent />
      </mesh>
    </DevicePartGroup>
  );
}

export default function DeviceGameControls() {
  return (
    <>
      <DPad />
      <ActionButtons />
      <StartSelectButtons />
      <SpeakerGrille />
      <PttButton />
      <Cartridge />
    </>
  );
}
