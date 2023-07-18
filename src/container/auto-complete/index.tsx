import React, { FC, useState } from "react";
import { IcountryData } from "../home";
import "./style.css";

interface IAutoCompleteProps {
    countryData: IcountryData[]; // Array of country data used for suggestions
    onSearch: (searchValue: string) => void; // Callback function triggered when a search is performed
  }
const AutoComplete: FC<IAutoCompleteProps> = ({ countryData, onSearch }/* destructuring props */ ) => {
  // Define state variable for suggestions
  const [suggestions, setSuggestions] = useState<IcountryData[]>([]);

  // Handle input change event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearch(value); // Call the onSearch callback to notify the parent component of the search with the current input value


    // Filter country suggestions based on input value
    const filteredSuggestions = countryData.filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );

    // Limit the number of suggestions to 8
    const limitedSuggestions = filteredSuggestions.slice(0, 8);

    // Update the suggestions state
    setSuggestions(limitedSuggestions);
  };

  return (
    <div className="auto-complete-container">
      <h1>Auto Complete App</h1>
      {/* Render the input field */}
      <input
        type="text"
        onChange={handleChange}
        className="auto-complete-input"
        placeholder="search the country or select the suggestions"
        list="data"
      />
      {/* Render the datalist for suggestions */}
      <datalist id="data">
        {suggestions.length > 0 && (
          <>
            {/* Map and render the suggestion options */}
            {suggestions.map((suggestion, index) => (
              <option key={index} value={suggestion.name} />
            ))}
          </>
        )}
      </datalist>
    </div>
  );
};

export default AutoComplete;
