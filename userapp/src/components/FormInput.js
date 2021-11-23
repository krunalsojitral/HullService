import React from 'react'; 

export default function FormInput(props) {
    let fail = props.fail; 

    return(
            <input type={props.type}
            className={`form-control input ${fail ? "form-control input--fail" : null} `}
            placeholder={props.placeholder}
            name={props.name}
            disabled={props.disabled}
            id={props.id}
            value={props.value}
            onChange={props.handleChange}
            onKeyDown={props.handleKeyDown}
            />
    )
}