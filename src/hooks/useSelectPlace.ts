import { useRef, useCallback } from 'react';
import { loader } from './usePlacesAutocomplete';
import { useSelectedPlaceContext } from './useSelectedPlaceContext';
import { type SelectedPlace } from '../contexts/SelectedPlaceContext';

// Custom hook for selecting a place using the SelectedPlace context
export function useSelectPlace(): { 
    selectPlace: (placeId: string) => void; 
    selectedPlace: SelectedPlace | null 
} {
    const { selectedPlace, setSelectedPlace } = useSelectedPlaceContext();
    const placesService = useRef<google.maps.places.PlacesService | null>(null);

    const selectPlace = useCallback((placeId: string) => {
        loader.importLibrary('places').then((placesLib) => {
            if (!placesService.current) {
                const dummyDiv = document.createElement('div');
                placesService.current = new placesLib.PlacesService(dummyDiv);
            }

            placesService.current.getDetails(
                { placeId, fields: ['name', 'geometry', 'formatted_address'] },
                (place: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
                        setSelectedPlace({
                            name: place.name || '',
                            lat: place.geometry?.location?.lat() || 0,
                            lng: place.geometry?.location?.lng() || 0,
                            address: place.formatted_address || ''
                        });
                    }
                }
            );
        });
    }, [setSelectedPlace]);

    return { selectPlace, selectedPlace };
}
