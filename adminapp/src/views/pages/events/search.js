import React, { useState, useRef, ref } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete";

// import { useForm, Controller } from "react-hook-form";
function Search() {
    // const { handleSubmit, control } = useForm();
    // const [stuff, setData] = useState([]);

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300
    });
    // const ref = useOnclickOutside(() => {
    //     // When user clicks outside of the component, we can dismiss
    //     // the searched suggestions by calling this method
    //     clearSuggestions();
    // });

    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect = ({ description }) => () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                console.log("📍 Coordinates: ", { lat, lng });
            })
            .catch((error) => {
                console.log("😱 Error: ", error);
            });
    };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text }
            } = suggestion;

            return (
                <li className="city_suggestion" key={place_id} onClick={handleSelect(suggestion)}>
                    <p> <strong>{main_text}</strong>  {secondary_text}</p>                    
                </li>
            );
        });

    return (
        <div ref={ref}>
            <input
                value={value}
                onChange={handleInput}
                disabled={!ready}
                name="session_location"
                placeholder="Location"
                className="form-control input"
            />
            {status === "OK" && <ul className="suggestion">{renderSuggestions()}</ul>}
        </div>
    );
}
export default Search;
