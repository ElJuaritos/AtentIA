/**
 * Cuerpo, esquineros, panel trasero, perilla y puertos — prototipo HTML.
 */
import { useMemo } from 'react';
import { BODY, COLORS, s } from '../../config/deviceMaterials';
import { createBodyGeometry, createDeviceMaterial } from '../../utils/geometryHelpers';
import { createLabelTexture } from '../../utils/einkTextures';
import DevicePartGroup from './DevicePartGroup';

const cast = { castShadow: true };

function orangeMat() {
  return createDeviceMaterial({
    color: COLORS.orange,
    roughness: 0.45,
    clearcoat: 0.4,
    emissive: '#6A2E00',
    emissiveIntensity: 0.28,
  });
}

/** Panel trasero con tornillos y logo (parte de carcasa) */
function BackPanelMeshes() {
  const backLogo = useMemo(() => createLabelTexture('matIA', COLORS.backLogo), []);
  const bz = s(BODY.backZ);

  return (
    <>
      <mesh position={[0, s(0.1), bz - s(0.03)]} {...cast}>
        <boxGeometry args={[s(2.7), s(3.3), s(0.05)]} />
        <meshStandardMaterial color={COLORS.back} roughness={0.55} metalness={0.1} />
      </mesh>
      {[
        [-1.5, 1.9],
        [1.5, 1.9],
        [-1.5, -1.7],
        [1.5, -1.7],
      ].map(([x, y], i) => (
        <mesh
          key={i}
          position={[s(x), s(y), bz - s(0.06)]}
          rotation={[Math.PI / 2, 0, 0]}
          {...cast}
        >
          <cylinderGeometry args={[s(0.1), s(0.1), s(0.08), 16]} />
          <meshStandardMaterial color={COLORS.screw} roughness={0.4} metalness={0.6} />
        </mesh>
      ))}
      <mesh position={[0, s(-1.95), bz - s(0.07)]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[s(1.6), s(0.4)]} />
        <meshBasicMaterial map={backLogo} transparent />
      </mesh>
    </>
  );
}

/** Cuerpo principal extruido — carcasa navy + panel trasero */
export function DeviceBody() {
  const geometry = useMemo(() => createBodyGeometry(BODY), []);
  const material = useMemo(
    () =>
      createDeviceMaterial({
        color: COLORS.navy,
        roughness: 0.45,
        clearcoat: 0.5,
        emissive: '#101A48',
        emissiveIntensity: 0.22,
      }),
    [],
  );

  return (
    <DevicePartGroup partId="carcasa">
      <mesh geometry={geometry} material={material} {...cast} />
      <BackPanelMeshes />
    </DevicePartGroup>
  );
}

/** Esquineros L en las 4 esquinas */
export function CornerProtectors() {
  const mat = useMemo(orangeMat, []);
  const corners = [
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, -1],
  ];

  return (
    <DevicePartGroup partId="protecciones">
      {corners.map(([sx, sy], i) => {
        const ax = s(2.52 * sx);
        const ay = s(3.18 * sy);
        return (
          <group key={i}>
            <mesh
              position={[ax - sx * s(0.45), ay - sy * s(0.02), 0]}
              material={mat}
              {...cast}
            >
              <boxGeometry args={[s(1.05), s(0.5), s(1.9)]} />
            </mesh>
            <mesh
              position={[ax - sx * s(0.02), ay - sy * s(0.45), 0]}
              material={mat}
              {...cast}
            >
              <boxGeometry args={[s(0.5), s(1.05), s(1.9)]} />
            </mesh>
          </group>
        );
      })}
    </DevicePartGroup>
  );
}

/** Perilla de volumen en esquina superior derecha */
export function VolumeKnob() {
  const kx = s(1.2);
  const ky = s(3.18);
  const knobMat = useMemo(
    () => createDeviceMaterial({ color: COLORS.knob, roughness: 0.45, metalness: 0.2, clearcoat: 0.3 }),
    [],
  );
  const grooveMat = useMemo(
    () => createDeviceMaterial({ color: COLORS.knobGroove, roughness: 0.5, metalness: 0.15 }),
    [],
  );
  const topMat = useMemo(
    () => createDeviceMaterial({ color: COLORS.knobTop, roughness: 0.4, metalness: 0.3, clearcoat: 0.4 }),
    [],
  );

  return (
    <DevicePartGroup partId="perilla">
      <mesh position={[kx, ky, 0]} material={knobMat} {...cast}>
        <cylinderGeometry args={[s(0.35), s(0.38), s(0.54), 40]} />
      </mesh>
      {Array.from({ length: 18 }, (_, i) => {
        const ang = (i / 18) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[kx + Math.cos(ang) * s(0.37), ky, Math.sin(ang) * s(0.37)]}
            rotation={[0, -ang, 0]}
            material={grooveMat}
            {...cast}
          >
            <boxGeometry args={[s(0.05), s(0.46), s(0.07)]} />
          </mesh>
        );
      })}
      <mesh position={[kx, ky + s(0.29), 0]} material={topMat} {...cast}>
        <cylinderGeometry args={[s(0.39), s(0.39), s(0.07), 40]} />
      </mesh>
    </DevicePartGroup>
  );
}

/** Puertos jack 3.5 mm y USB-C en borde inferior */
export function BottomPorts() {
  const dark = useMemo(
    () => createDeviceMaterial({ color: COLORS.port, roughness: 0.45, metalness: 0.4 }),
    [],
  );

  return (
    <DevicePartGroup partId="puertos">
      <mesh position={[s(-0.6), s(-3.1), s(0.1)]} material={dark} {...cast}>
        <cylinderGeometry args={[s(0.16), s(0.16), s(0.42), 26]} />
      </mesh>
      <mesh position={[s(-0.6), s(-2.9), s(0.1)]} {...cast}>
        <cylinderGeometry args={[s(0.19), s(0.19), s(0.08), 26]} />
        <meshStandardMaterial color={COLORS.portRing} roughness={0.3} metalness={0.92} />
      </mesh>
      <mesh position={[s(0.5), s(-3.08), s(0.1)]} material={dark} {...cast}>
        <boxGeometry args={[s(0.62), s(0.46), s(0.26)]} />
      </mesh>
      <mesh position={[s(0.5), s(-3.08), s(0.21)]} {...cast}>
        <boxGeometry args={[s(0.44), s(0.16), s(0.18)]} />
        <meshStandardMaterial color={COLORS.usbInner} roughness={0.3} metalness={0.9} />
      </mesh>
    </DevicePartGroup>
  );
}
