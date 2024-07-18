import React from 'react'

export default function TopBarAdmin({ text, prenom }) {
    const dateObject = new Date();

    return (
        <>
            <div className='w-[100%] h-[100%] grid grid-cols-[1fr_1fr_1fr] font-bold pr-10 text-sm'>
                <div className='flex flex-col justify-center px-3'>
                    {">>"} &nbsp; {text}
                </div>
                <div className='flex flex-col justify-center items-center'>
                    {dateObject.getDate()} / {dateObject.getMonth() + 1} / {dateObject.getFullYear()}
                </div>
                <div className='flex flex-row justify-end px-3 items-center'>
                    <span className='border-2 border-c3 p-1 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                    </span>
                    <span className='pl-3'>
                        Administrateur {prenom}
                    </span>
                </div>
            </div>
        </>
    )
}
