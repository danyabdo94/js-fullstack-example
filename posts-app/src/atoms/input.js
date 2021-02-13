import React from 'react';

export default function Input({ name }) {
    return (
        <>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">{name}</label>
            <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
        </>
    )
}
