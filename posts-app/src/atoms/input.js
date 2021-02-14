import React from 'react';
import { Field } from 'formik';

export default function Input({ label, ...props }) {
    return (
        <>
            <label className="font-semibold text-sm text-gray-600 pb-1 mt-3 block">{label}</label>
            <Field className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full" {...props} />
        </>
    )
}
