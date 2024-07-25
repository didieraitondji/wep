import React from 'react'

export default function Succefful({ value, text }) {
    return (
        <>
            {
                value && (
                    <div id="blockError" className='fixed top-[50px] left-[80px] right-0 bottom-0 bg-[#00000068] w-[100%] h-[100vh] flex flex-col items-center justify-center z-50'>
                        <div className=' bg-c2 p-8 flex flex-col items-center justify-center rounded-xl'>
                            <span className='w-full flex justify-center text-green-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                            </span>
                            <span className='w-full mt-10'>
                                {
                                    text
                                }
                            </span>
                        </div>
                    </div>
                )
            }
        </>
    )
}
