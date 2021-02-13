import React from 'react'

export default function Button({ type, classes, title, children }) {
    return (
        <button type={type} className={classes}>
            <span className="inline-block mr-2">{title}</span>
            {children}
        </button>
    )
}