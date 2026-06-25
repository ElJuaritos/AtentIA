/**
 * Experiencia completa — visor 3D + panel de piezas (prototipo HTML).
 */
import { DevicePartProvider } from '../context/DevicePartContext';
import DeviceViewer from './DeviceViewer';
import PartsPanel from './PartsPanel';

export default function DeviceExperience({ className = '' }) {
  return (
    <DevicePartProvider>
      <div className={`flex flex-col lg:flex-row gap-4 lg:gap-5 ${className}`}>
        <div className="flex-1 min-w-[280px] min-h-[320px] lg:min-h-[480px] rounded-[18px] overflow-hidden bg-[radial-gradient(circle_at_50%_34%,#FFFFFF,#B6C2CF)] relative">
          <DeviceViewer className="absolute inset-0 w-full h-full" />
          <p className="absolute bottom-2.5 left-0 right-0 text-center text-[#5b6b78] text-xs pointer-events-none px-3">
            Arrastra para girar · toca una pieza para ver su función
          </p>
        </div>
        <aside className="flex-none lg:w-[260px] min-w-[240px]">
          <PartsPanel />
        </aside>
      </div>
    </DevicePartProvider>
  );
}
