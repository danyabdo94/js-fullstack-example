import React from 'react'

export default function Container(props) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <div className="flex flex-row justify-center" >
                    {props.logo && <img alt="logo" src="./assets/logo.png"></img>}
                </div>
                {props.children}
            </div>
        </div>
    )
}