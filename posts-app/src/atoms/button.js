import React from 'react'

export default function Button(props) {
    return (
        <button type="button" className={props.classes}>
            <span className="inline-block mr-2">{props.title}</span>
            {props.children}
        </button>
    )
}