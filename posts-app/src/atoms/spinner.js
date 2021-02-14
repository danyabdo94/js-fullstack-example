import React from 'react'
import Loader from 'react-loader-spinner'

export default function Spinner() {
    return (
        <label className="flex flex-row justify-center px-1 py-2" >
            <Loader type="Oval" color="#000000" height={20} width={20} />
        </label>
    )
}