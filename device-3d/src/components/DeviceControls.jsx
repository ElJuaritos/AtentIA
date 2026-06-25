/**
 * Controles de órbita — rotación, zoom y auto-rotate con límites.
 */
import { OrbitControls } from '@react-three/drei';
import { ORBIT } from '../config/deviceMaterials';

export default function DeviceControls() {
  return (
    <OrbitControls
      enablePan={false}
      autoRotate
      autoRotateSpeed={ORBIT.autoRotateSpeed}
      minDistance={ORBIT.minDistance}
      maxDistance={ORBIT.maxDistance}
      minPolarAngle={ORBIT.minPolarAngle}
      maxPolarAngle={ORBIT.maxPolarAngle}
    />
  );
}
