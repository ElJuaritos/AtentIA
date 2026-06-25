/**
 * Contexto de selección de piezas — resalta y rota el modelo al elegir una parte.
 */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const DevicePartContext = createContext(null);

export function DevicePartProvider({ children }) {
  const [selectedPart, setSelectedPart] = useState(null);

  const selectPart = useCallback((id) => {
    setSelectedPart(id);
  }, []);

  const value = useMemo(
    () => ({ selectedPart, selectPart, clearSelection: () => setSelectedPart(null) }),
    [selectedPart, selectPart],
  );

  return <DevicePartContext.Provider value={value}>{children}</DevicePartContext.Provider>;
}

export function useDeviceParts() {
  const ctx = useContext(DevicePartContext);
  if (!ctx) throw new Error('useDeviceParts debe usarse dentro de DevicePartProvider');
  return ctx;
}
