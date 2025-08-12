import { createContext, useState, type ReactNode } from 'react';

export interface SelectedPlace {
  name: string;
  lat: number;
  lng: number;
  address: string;
}

interface SelectedPlaceContextType {
  selectedPlace: SelectedPlace | null;
  setSelectedPlace: (place: SelectedPlace | null) => void;
}

const SelectedPlaceContext = createContext<SelectedPlaceContextType | undefined>(undefined);

export { SelectedPlaceContext };

interface SelectedPlaceProviderProps {
  children: ReactNode;
}

export function SelectedPlaceProvider({ children }: SelectedPlaceProviderProps) {
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(null);

  return (
    <SelectedPlaceContext.Provider value={{ selectedPlace, setSelectedPlace }}>
      {children}
    </SelectedPlaceContext.Provider>
  );
}
