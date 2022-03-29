import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import languages from "./languages";
import { Controller, useFormContext } from "react-hook-form";

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === "") {return [];}
    const regex = new RegExp("^" + escapedValue, "i");

    const return_value = languages.map(section => {
            return {
                title: section.title,
                languages: section.languages.filter(language =>
                    regex.test(language.name)
                )
            };
        }).filter(section => section.languages.length > 0);
    return return_value;
}

function renderSuggestion(suggestion) {
    return <span>{suggestion.name}</span>;
}

function renderSectionTitle(section) {
    return <strong>{section.title}</strong>;
}

function getSectionSuggestions(section) {
    return section.languages;
}



export default function InputAutosuggest(props) {

    // React.useEffect(() => {

    //     console.log(props);

    // }, [props]);

    const [value, setValue] = useState("");
    const [suggestion, setSuggestion] = useState([]);

    const methods = useFormContext();

    const onChange = (event, { newValue, method }) => {
        setValue(newValue);
        return newValue;
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestion(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestion([]);
    };

    const getSuggestionValue = suggestion => {
        console.log(props.control);
        console.log(props);
        console.log(suggestion);
        //props.control.setValue(props.name, suggestion.name);
        return suggestion.name;
    };

    const inputProps = {
        placeholder: "Type 'c'",
        value: value,
        onChange: onChange
    };

    return (        
        <div>
            <Controller
                control={props.control}
                name={props.name}
                rules={props.rules}
                render={({ field }) => (
                    <Autosuggest
                        suggestions={suggestion}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        renderSectionTitle={renderSectionTitle}
                        getSectionSuggestions={getSectionSuggestions}
                        inputProps={inputProps}
                        multiSection={true}
                    />
                )}
            />
            {props.errors}
            {/* {(props.errors.name?.type === "required" && <small className="error">Password is required</small>)} */}
        </div>
       

    );
}


{/* <Controller
    as={
        <Autosuggest
            suggestions={suggestion}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            renderSectionTitle={renderSectionTitle}
            getSectionSuggestions={getSectionSuggestions}
            inputProps={inputProps}
            multiSection={true}
        />
    }
    control={props.control}
    ame={props.name}
    fullWidth
    required={required}
/> */}