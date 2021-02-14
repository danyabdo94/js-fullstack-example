import React from 'react'

export default function Button({ type, classes, title, children, onClick }) {
    return (
        <button type={type} onClick={onClick} className={classes}>
            {title && <span className="inline-block mr-2">{title}</span>}
            {children}
        </button>
    )
}