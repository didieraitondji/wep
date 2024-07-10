import React from 'react'

export default function Wep() {
    return (
        <div className='w-[80%] mx-auto z-0'>
            <div className='flex flex-col lg:flex-row py-3 font-poppins items-center max-lg:border-b border-b-c3 pb-[100px]'>
                <div className='w-[100%] lg:w-[50%] max-lg:mb-10'>
                    <img src="/images/baniere4.jpg" alt="Prof enseigne à l'élève" className='w-[98%] mx-auto rounded-lg shadow-md' />
                </div>
                <div className='w-[90%] max-lg:mx-auto lg:w-[50%] pl-4'>
                    <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl max-lg:text-center font-bold w-max max-lg:mx-auto border-b-[20px] border-b-c1'>
                        <span className=''>WeP C'est quoi ?</span>
                    </h1>
                    <br />
                    <div className=' leading-10 text-justify font-semibold'>
                        WeP, We Pratice, c'est une plateforme de soumission de TP (Travail Pratique) créer par Didier, Eliel et Chancelle pour l'IMSP.
                        Elle est pensée pour faciliter principalement la soumission des TPs aux étudiants de la L3-TiC en particulier, et la soumission pour les autre filière en générale. <br />
                        <span className='font-bold text-xl'>WeP, les TPs autrement !</span>
                    </div>
                </div>
            </div>
        </div>

    )
}
