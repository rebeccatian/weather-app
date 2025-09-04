import { useDispatch } from 'react-redux';
import { setSelectedPlace } from '../store/selectedPlaceSlice';
import type { Prediction } from '../hooks/usePlacesAutocomplete'
import { loader } from '../hooks/usePlacesAutocomplete';

const AutocompleteDropdown = ({ 
    predictions
} : {
    predictions : Prediction[]
}) => {
    const dispatch = useDispatch();
    
    if (predictions.length === 0) {
        return null;
    }

    const handleOnSelect = (placeId: string) => {
        console.log("Selected placeId:", placeId);
        loader.importLibrary('places').then((placesLib) => {
            // since PlacesService usually is for map integration, the API requires a DOM element
            const dummyDiv = document.createElement('div');
            const placesService = new placesLib.PlacesService(dummyDiv);

            placesService.getDetails(
                { placeId, fields: ['name', 'geometry', 'formatted_address'] },
                (place: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) => {
                    
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
                        console.log("Place details fetched:", place);
                        dispatch(setSelectedPlace({
                            name: place.name || '',
                            lat: place.geometry?.location?.lat() || 0,
                            lng: place.geometry?.location?.lng() || 0,
                            address: place.formatted_address || ''
                        }));
                    }
                }
            );
        })
    };
    
    return (
        <div className="bg-brand-black w-full p-2 flex flex-col absolute rounded-md shadow-sm shadow-gray-500">
            <ul className="rounded shadow divide-y">
                {predictions.map((p) => (
                    <li
                        key={p.place_id}
                        onClick={() => handleOnSelect(p.place_id)}
                        className="p-2 hover:bg-gray-700 cursor-pointer"
                    >
                        {p.description}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AutocompleteDropdown;
