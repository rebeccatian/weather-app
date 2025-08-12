import { useContext } from 'react';
import { SelectedPlaceContext } from '../contexts/SelectedPlaceContext';

export function useSelectedPlaceContext() {
  const context = useContext(SelectedPlaceContext);
  if (context === undefined) {
    throw new Error('useSelectedPlaceContext must be used within a SelectedPlaceProvider');
  }
  return context;
}
