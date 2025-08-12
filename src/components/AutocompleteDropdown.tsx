import type { Prediction } from '../hooks/usePlacesAutocomplete'

const AutocompleteDropdown = ({ 
    predictions, selectPlace, setQuery
} : {
    predictions : Prediction[],
    selectPlace: (placeId: string) => void,
    setQuery: (query: string) => void
}) => {
    if (predictions.length === 0) {
        return null;
    }
    
    return (
        <div className="bg-brand-black w-full p-2 flex flex-col absolute rounded-md shadow-sm shadow-gray-500">
            <ul className="rounded shadow divide-y">
                {predictions.map((p) => (
                    <li
                        key={p.place_id}
                        onClick={() => {
                            selectPlace(p.place_id);
                            setQuery(p.description);
                        }}
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
