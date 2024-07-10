import React, { useState } from 'react'

export default function Faq() {
    const [isWep, setIsWep] = useState(false);

    const toggleWep = () => {
        setIsWep(!isWep);
    }

    return (
        <>
            <div className='h-[110px] bg-c2'></div>
            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-bold w-max mx-auto border-b-[20px] border-b-c1'>
                <span className='slide-down1'>FAQ</span>
            </h1>
            <div className='h-[80px] bg-white'></div>
            <div className='w-[100%] font-poppins'>
                <div className='w-[80%] max-md:w-[90%] mx-auto'>

                    <div className='w-[100%]'>
                        <div onClick={toggleWep} className='w-[100%] px-8 py-5 font-bold border border-gray-600 cursor-pointer'>
                            WeP C'est quoi ?
                            <span className='float-end'>
                                {
                                    !isWep && (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                    </svg>)
                                }
                                {
                                    isWep && (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                                    </svg>)
                                }

                            </span>
                        </div>
                        <div className={`w-[100%] px-8 py-5 bg-c3 border border-c3 text-white text-sm text-justify leading-8 ${!isWep && 'hidden'} accordion-content`}>
                            WeP, We Pratice, c'est une plateforme de soumission de TP pensée pour faciliter principalement la soumission des TPs aux étudiants de la L3-TiC en particulier, et la soumission pour les autre filière en générale.
                        </div>
                    </div>
                    <div className='w-[100%]'>
                        <div className='w-[100%] px-8 py-5 font-bold border border-gray-600 cursor-pointer'>
                            WeP, c'est uniquement pour les étudiant en Informatique ?
                            <span className='float-end'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                </svg>
                            </span>
                        </div>
                        <div className='w-[100%] px-8 py-5 bg-c3 border border-c3 slide-down1 text-white text-sm text-justify leading-8'>

                        </div>
                    </div>
                    <div className='w-[100%]'>
                        <div className='w-[100%] px-8 py-5 font-bold border border-gray-600 cursor-pointer'>
                            Comment s'inscrire sur We Pratice ?
                            <span className='float-end'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                </svg>
                            </span>
                        </div>
                        <div className='w-[100%] px-8 py-5 bg-c3 border border-c3 slide-down1 text-white text-sm text-justify leading-8'>

                        </div>
                    </div>
                    <div className='w-[100%]'>
                        <div className='w-[100%] px-8 py-5 font-bold border border-gray-600 cursor-pointer'>
                            Quelles sont les matières disponible sur We Pratice ?
                            <span className='float-end'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                </svg>
                            </span>
                        </div>
                        <div className='w-[100%] px-8 py-5 bg-c3 border border-c3 slide-down1 text-white text-sm text-justify leading-8'>

                        </div>
                    </div>


                </div>
            </div>
        </>

    )
}
