import React from 'react'

export default function Barniere() {
    return (
        <>
            <div className='w-[100%] min-h-[630px] font-poppins bg-[url("/images/baniere8.jpg")] bg-cover bg-center bg-no-repeat'>
                <div className='w-[100%] min-h-[630px] bg-[rgba(0,0,0,0.46)]'>
                </div>
                <div className='w-[100%] min-h-[630px] mt-[-630px] flex flex-col items-center justify-center text-center'>
                    <span className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white slide-down1'>
                        <span className='text-c1'>Consulte</span> et
                        <span className='text-c1'> Soumet</span> ton TP aujourd'hui
                    </span>
                    <br /> <br />
                    <span className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white slide-up1'>
                        et fais toi noté par ton
                        <span className='text-c1'> prof</span>.
                    </span>
                    <br /><br /><br />
                    <span>
                        <a href='/etudiant-connexion/' target='_blank' className='bg-white text-c3 px-10 py-2 rounded-full font-bold slide-up1 text-xl hover:bg-c1 hover:text-lg hover:px-6'> Démarre ici </a>
                    </span>
                </div>
            </div>
            <div className='h-[150px] bg-white'></div>
        </>
    )
}
