/**
 * Panel lateral — lista de piezas y detalle (como el prototipo HTML).
 */
import { PARTS } from '../config/deviceMaterials';
import { useDeviceParts } from '../context/DevicePartContext';

export default function PartsPanel() {
  const { selectedPart, selectPart } = useDeviceParts();
  const active = selectedPart ? PARTS[selectedPart] : null;

  return (
    <div className="flex flex-col gap-3 h-full">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-[#2A3C86] m-0">
        Partes del dispositivo
      </h2>

      <ul className="list-none m-0 p-0 flex flex-col gap-1.5 flex-1 overflow-y-auto">
        {Object.entries(PARTS).map(([id, part]) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => selectPart(id)}
              className={`w-full text-left px-3 py-2 rounded-[10px] border text-[13px] flex items-center gap-2 transition-colors cursor-pointer ${
                selectedPart === id
                  ? 'bg-[#2A3C86] text-white border-[#2A3C86]'
                  : 'bg-white text-[#1A2A33] border-[#E2E8ED] hover:border-[#FF7A14] hover:bg-[#FFF4EC]'
              }`}
            >
              <span
                className="w-[11px] h-[11px] rounded-full flex-none shadow-[0_0_0_2px_rgba(0,0,0,0.06)]"
                style={{ background: part.color }}
              />
              {part.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="bg-white border border-[#E2E8ED] rounded-xl p-3 min-h-[96px]">
        {active ? (
          <>
            <h3 className="text-base font-semibold m-0 mb-1 text-[#1A2A33]">{active.label}</h3>
            <p className="text-[13.5px] text-[#5C6F7A] m-0 leading-relaxed">{active.desc}</p>
          </>
        ) : (
          <p className="text-[13.5px] text-[#5C6F7A] m-0 leading-relaxed">
            Toca una pieza del modelo o de la lista para ver su función y material.
          </p>
        )}
      </div>
    </div>
  );
}
