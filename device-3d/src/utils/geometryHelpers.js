/**
 * Geometría y materiales del prototipo 3D matIA.
 */
import * as THREE from 'three';
import { SCALE } from '../config/deviceMaterials';

/** Rectángulo redondeado como Shape (igual que rr() del HTML) */
export function roundedRectShape(w, h, r) {
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2 + r, -h / 2);
  shape.lineTo(w / 2 - r, -h / 2);
  shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  shape.lineTo(w / 2, h / 2 - r);
  shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  shape.lineTo(-w / 2 + r, h / 2);
  shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  shape.lineTo(-w / 2, -h / 2 + r);
  shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  return shape;
}

/** Crea geometría extruida del cuerpo principal */
export function createBodyGeometry(body) {
  const shape = roundedRectShape(body.width, body.height, body.cornerRadius);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: body.extrudeDepth,
    bevelEnabled: true,
    bevelThickness: body.bevelThickness,
    bevelSize: body.bevelSize,
    bevelSegments: 6,
    curveSegments: 24,
  });
  geo.center();
  geo.scale(SCALE, SCALE, SCALE);
  return geo;
}

/** Material físico con clearcoat — réplica de mat() del HTML */
export function createDeviceMaterial({
  color,
  roughness = 0.5,
  metalness = 0,
  clearcoat = 0,
  emissive,
  emissiveIntensity = 0.25,
}) {
  const props = {
    color: new THREE.Color(color),
    roughness,
    metalness,
  };
  if (emissive) {
    props.emissive = new THREE.Color(emissive);
    props.emissiveIntensity = emissiveIntensity;
  }
  if (THREE.MeshPhysicalMaterial) {
    return new THREE.MeshPhysicalMaterial({
      ...props,
      clearcoat,
      clearcoatRoughness: 0.25,
    });
  }
  return new THREE.MeshStandardMaterial(props);
}
