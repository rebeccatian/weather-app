import { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  version: 'weekly',
  libraries: ['places'],
});

export interface Prediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export function usePlacesAutocomplete(input: string): { predictions: Prediction[] } {
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
    const googleMapsRef = useRef<typeof google.maps | null>(null);

    useEffect(() => {
        if (!input) {
            setPredictions([]);
            return;
        }

        loader.importLibrary('places').then((placesLib) => {
            googleMapsRef.current = window.google.maps;

            if (!autocompleteService.current) {
                autocompleteService.current = new placesLib.AutocompleteService();
            }

            autocompleteService.current.getPlacePredictions(
                { input, types: ['(cities)'] }, 
                (results: google.maps.places.AutocompletePrediction[] | null) => {
                    if (results) setPredictions(results);
                }
            );
        });
    }, [input]);

    return {
        predictions,
    };
}
