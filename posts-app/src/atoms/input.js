import React from 'react';
import { Field } from 'formik';

export default function Input({ name, type, label }) {
    return (
        <>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">{label}</label>
            <Field name={name} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
        </>
    )
}
