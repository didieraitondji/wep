import React, { useContext, useEffect, useRef } from 'react'
import { VisibilityContext } from './VisibilityContext'

export default function Wep() {
    const wepRef = useRef(null);
    const { setIsWepVisible } = useContext(VisibilityContext);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsWepVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (wepRef.current) {
            observer.observe(wepRef.current);
        }

        return () => {
            if (wepRef.current) {
                observer.unobserve(wepRef.current);
            }
        };
    }, [wepRef, setIsWepVisible]);

    return (
        <>
            <div className='h-[150px] bg-white' id='wep'></div>
            <div className='w-[80%] mx-auto z-0'>
                <div ref={wepRef} className='flex flex-col lg:flex-row py-3 font-poppins items-center max-lg:border-b border-b-c3 pb-[100px]'>
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
        </>
    )
}
