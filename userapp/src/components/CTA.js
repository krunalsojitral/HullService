import React from 'react';

export default function CTA (props) {
        return(
            <button className="btn-submit" type={props.type} onSubmit={props.handleSubmit}>
                <h4>{props.name}</h4>
            </button>
        )
}