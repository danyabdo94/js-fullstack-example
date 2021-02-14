import React from 'react'

export default function Container({ logo, children, classes }) {
    const classNames = "min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12"
    return (
        <div className={classes || classNames}>
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <div className="flex flex-row justify-center" >
                    {logo && <img alt="logo" src="./assets/logo.png"></img>}
                </div>
                {children}
            </div>
        </div>
    )
}