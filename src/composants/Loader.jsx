import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

export default function Loader({ value }) {
    return (
        <>
            {
                value && (
                    <div id="blockError" className='fixed top-[50px] left-[80px] right-0 bottom-0 bg-[#00000068] w-[100%] h-[100vh] flex flex-col items-center justify-center'>
                        <ThreeDots color='#FFCB05' />
                    </div>
                )
            }
        </>
    )
}
