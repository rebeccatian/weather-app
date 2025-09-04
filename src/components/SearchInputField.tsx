import type { ChangeEvent } from "react";
import { usePlacesAutocomplete } from "../hooks/usePlacesAutocomplete";
import AutocompleteDropdown from "./AutocompleteDropdown";

const SearchInputField = ({ query, setQuery} : { query: string, setQuery: React.Dispatch<React.SetStateAction<string>>}) => {
    const { predictions } = usePlacesAutocomplete(query);
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }

    return (
        <div className="sm:flex gap-10 mt-8 lg:mt-1 relative">
            <span className="font-light text-4xl hidden md:block">/</span>
            <p className="text-sm sm:text-base sm:w-[30%] text-wrap">Search and select a city to start</p>
              <input
                type="text"
                onChange={handleOnChange}
                value={query}
                className="border border-gray-300 px-4 py-2 rounded-md h-fit w-full md:w-fit"
                placeholder="City Name"
              />
              <AutocompleteDropdown
                predictions={predictions}
              />
        </div>
    )
}

export default SearchInputField;