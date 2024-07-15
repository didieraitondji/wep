import React, { useState, useContext, useEffect, useRef } from 'react'
import { VisibilityContext } from './VisibilityContext'

export default function Faq() {

    const wepRefdeux = useRef(null);
    const { setFaqVisible } = useContext(VisibilityContext);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setFaqVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (wepRefdeux.current) {
            observer.observe(wepRefdeux.current);
        }

        return () => {
            if (wepRefdeux.current) {
                observer.unobserve(wepRefdeux.current);
            }
        };
    }, [wepRefdeux, setFaqVisible]);

    const [isWep, setIsWep] = useState(false);
    const [isUnique, setIsUnique] = useState(false);
    const [inscrire, setInscrire] = useState(false);
    const [matiere, setMatiere] = useState(false);

    const toggleWep = () => {
        setIsWep(!isWep);
        setIsUnique(false);
        setInscrire(false);
        setMatiere(false);
    }

    const toogleUnique = () => {
        setIsUnique(!isUnique);
        setIsWep(false);
        setInscrire(false);
        setMatiere(false);
    }

    const toggleInscrire = () => {
        setInscrire(!inscrire);
        setIsWep(false);
        setIsUnique(false);
        setMatiere(false);
    }

    const toggleMatiere = () => {
        setMatiere(!matiere);
        setIsWep(false);
        setIsUnique(false);
        setInscrire(false);
    }

    return (
        <>
            <div className='h-[110px] bg-c2' id='faq'></div>
            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-bold w-max mx-auto border-b-[20px] border-b-c1'>
                <span className='slide-down1' ref={wepRefdeux}>FAQ</span>
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
                        <div className={`w-[100%] px-8 py-5 bg-c3 border border-c3 text-white text-sm text-justify leading-8 ${!isWep && 'hidden'} slide-down1`}>
                            <span className='text-c1 font-bold'>WeP</span>, <span className='text-c1 font-bold'>We Pratice</span>, c'est une plateforme de soumission de TP pensée pour faciliter principalement la soumission des TPs aux étudiants de la L3-TiC en particulier, et la soumission pour les autre filière en générale.
                        </div>
                    </div>
                    <div className='w-[100%]'>
                        <div onClick={toogleUnique} className='w-[100%] px-8 py-5 font-bold border border-gray-600 cursor-pointer'>
                            WeP, c'est uniquement pour les étudiant en Informatique ?
                            <span className='float-end'>
                                {
                                    !isUnique && (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                    </svg>)
                                }
                                {
                                    isUnique && (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                                    </svg>)
                                }

                            </span>
                        </div>
                        <div className={`w-[100%] px-8 py-5 bg-c3 border border-c3 slide-down1 text-white text-sm text-justify leading-8 ${!isUnique && 'hidden'}`}>
                            <span className='text-c1 font-bold'>We Pratice</span> est une plateforme consue pour tous les étudiants de l'IMSP quelque soit la filière.
                        </div>
                    </div>
                    <div className='w-[100%]'>
                        <div onClick={toggleInscrire} className='w-[100%] px-8 py-5 font-bold border border-gray-600 cursor-pointer'>
                            Comment s'inscrire sur We Pratice ?
                            <span className='float-end'>
                                {
                                    !inscrire && (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                    </svg>)
                                }
                                {
                                    inscrire && (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                                    </svg>)
                                }

                            </span>
                        </div>
                        <div className={`w-[100%] px-8 py-5 bg-c3 border border-c3 slide-down1 text-white text-sm text-justify leading-8 ${!inscrire && 'hidden'}`}>
                            Après votre inscription à l'IMSP, l'IMSP se charge de vous inscrire sur <span className='text-c1 font-bold'>We Pratice</span>. Vous identifiants vous seront envoyé directement sur votre mail institutionnel. <br />
                            Si ce n'est pas le cas, merci de vous rapprocher de l'administration!
                        </div>
                    </div>
                    <div className='w-[100%]'>
                        <div onClick={toggleMatiere} className='w-[100%] px-8 py-5 font-bold border border-gray-600 cursor-pointer'>
                            Quelles sont les matières disponible sur We Pratice ?
                            <span className='float-end'>
                                {
                                    !matiere && (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                    </svg>)
                                }
                                {
                                    matiere && (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                                    </svg>)
                                }
                            </span>
                        </div>
                        <div className={`w-[100%] px-8 py-5 bg-c3 border border-c3 slide-down1 text-white text-sm text-justify leading-8 ${!matiere && 'hidden'}`}>
                            Basée sur un principe de non discrimination, toutes les matières enseignées dans toutes les filières sont disponible sur <span className='text-c1 font-bold'> WeP</span>.
                        </div>
                    </div>


                </div>
            </div>
        </>

    )
}
