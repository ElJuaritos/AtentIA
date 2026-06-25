/**
 * Página de preview del prototipo 3D matIA.
 * Ruta: /device-preview
 */
import { Link } from 'react-router-dom';
import { DeviceExperience } from '@device3d';

export default function DevicePreviewPage() {
  return (
    <div className="min-h-[100dvh] bg-[#EEF2F5] text-[#1A2A33]">
      <div className="max-w-[1040px] mx-auto px-5 py-6 pb-16">
        <header className="mb-5">
          <Link
            to="/"
            className="text-sm font-medium text-[#5C6F7A] hover:text-[#2A3C86] transition-colors inline-block mb-3"
          >
            ← Volver a la landing
          </Link>
          <h1 className="text-2xl sm:text-[30px] font-bold m-0">
            mat<b className="text-[#FF7A14]">IA</b> · prototipo 3D
          </h1>
          <p className="text-[#5C6F7A] text-sm sm:text-[15px] mt-1.5">
            Consola educativa audio-first con tutor de IA · estilo retro · por AtentIA
          </p>
        </header>

        <div className="bg-gradient-to-b from-[#F2F5F8] to-[#D7DEE6] border border-[#E2E8ED] rounded-3xl p-4 sm:p-5">
          <DeviceExperience />
        </div>
      </div>
    </div>
  );
}
