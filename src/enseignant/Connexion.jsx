import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';


export default function ConnexionEnseignant() {

    document.getElementsByTagName("title")[0].innerHTML = "Connexion | Enseingnant, utilisateur WeP";

    const navigate = useNavigate();

    const keyExists = (key) => {
        return localStorage.getItem(key) !== null;
    };

    useEffect(() => {
        if (keyExists("userData")) {
            const data = JSON.parse(localStorage.getItem("userData"));
            if (data.type === "etudiant") {
                navigate('/etudiant/');
            } else if (data.type === "enseignant") {
                navigate('/enseignant/');
            } else if (data.type === "admin") {
                navigate('/admin/');
            }
            else {
                localStorage.removeItem("userData");
                navigate('/');
            }
        }
    }, [navigate]);


    const currentYear = new Date().getFullYear();

    const [onProgress, setOnProgress] = useState(false);

    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);
    const [isWhite, setIsWhite] = useState(true);

    const [isText, setIsText] = useState(false);

    const [isMail, setIsMail] = useState(false);
    const [mailvide, setMailVide] = useState(true);

    const [isPasse, setIsPasse] = useState(false);
    const [passeVide, setPasseVide] = useState(true);

    const [formData, setFormData] = useState({
        email: "",
        motDePasse: "",
    });

    const showPasse = () => {
        setIsText(!isText);
    }

    const followMail = (e) => {
        let isValide = true;
        let chanMail = document.getElementById("email");
        if (chanMail.value === "") {
            setMailVide(true);
            isValide = false;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(chanMail.value)) {
            setMailVide(false);
            setIsMail(false);
            isValide = false;
        }
        else {
            setMailVide(false);
            setIsMail(true);
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        }

        return isValide;
    }

    const followPasse = (e) => {
        let isValide = true;
        let chanPasse = document.getElementById("motDePasse");
        if (chanPasse.value === "") {
            setPasseVide(true);
            isValide = false;
        } else if (!/^.{8,}$/.test(chanPasse.value)) {
            setPasseVide(false);
            setIsPasse(false);
            isValide = false;
        }
        else {
            setPasseVide(false);
            setIsPasse(true);
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        }

        return isValide;
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            type: "enseignant",
            email: formData.email,
            motDePasse: formData.motDePasse
        };

        if (isMail && isPasse) {
            setOnProgress(true);
            fetch('http://wep-api.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    // Récupérer la réponse en tant que texte
                    return response.text();
                })
                .then(text => {
                    try {
                        const data = JSON.parse(text);

                        if (data.code == 1) {
                            localStorage.setItem("userData", JSON.stringify(data))
                            //console.log(JSON.parse(localStorage.getItem("userData")));
                            navigate('/enseignant/');
                        }
                        else {
                            setError("Aucun enseignant ne correspond à ces données ! \n Veuillez réessayer.");
                            setIsError(true);
                            setIsWhite(true);
                            setOnProgress(false);
                        }

                    } catch (error) {
                        setError('Response was not valid JSON : (' + error + ').');
                        setIsError(true);
                        setIsWhite(true);
                        setOnProgress(false);
                    }
                })
                .catch(error => {
                    setError("Une erreur s'est produite. Veuillez réessayer : (" + error + ").");
                    setIsError(true);
                    setIsWhite(true);
                    setOnProgress(false);
                });
        }
    };

    const handleError = () => {
        setIsError(false);
        setIsWhite(false);
    }

    return (
        <>
            <div className="flex flex-row min-h-[100vh] font-poppins text-center bg-gray-300">
                <div className="max-md:hidden md:w-[40%] bg-c1 min-h-[100%] flex flex-col p-5 items-center pt-[30px] justify-center overflow-auto">
                    <div className="text-center max-lg:mb-[50px] lg:mb-[100px]">
                        <img src="/images/logo_wep_dark.png" alt="Logo WeP" className="w-[70px] mx-auto h-[55px]" /> <br />
                        <span className="font-bold text-2xl">We Practice</span>
                    </div>
                    <div className="max-lg:mb-[50px] lg:mb-[100px]">
                        <h1 className="text-5xl font-bold mb-[100px]">Portail Enseignant</h1>
                        Veuillez vous connecter <br /> pour explorer toute la puissance du WeP.
                    </div>
                    <div>
                        <div className="text-center font-bold mt-4 text-white py-2">
                            &copy; {currentYear} &middot; <span className="text-c3">CED - Enterprise</span>
                        </div>
                    </div>
                </div>
                <div className="max-md:w-[100%] md:w-[60%] flex flex-col items-center justify-center px-4">

                    <form onSubmit={handleSubmit} className="text-left flex flex-col space-y-2 max-sm:w-[100%] sm:w-[400px] mx-auto p-5 shadow-lg bg-c2 rounded-md px-10 slide-down">
                        <img src="/images/logo_wep_dark.png" alt="Logo WeP" className="w-[50px] mx-auto h-[38px] md:hidden mb-[-10px]" /> <br />
                        <h1 className="text-center font-bold max-sm:text-[1.2rem] sm:text-4xl mb-[25px]">Connexion</h1>
                        <h2 className="font-bold text-sm text-center md:hidden">Portail Enseignant</h2>

                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            onInput={followMail}
                            className="border border-c3 rounded-md outline-none px-3 py-2"
                        />
                        {
                            isMail && (
                                <div className="flex flex-row items-center text-blue-600">
                                    <span className="pr-2 font-bold">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                        </svg>
                                    </span>
                                    <span className="text-[0.7em]">Email valide</span>
                                </div>
                            )}

                        {!isMail && !mailvide && (
                            <div className="flex flex-row items-center text-red-600">
                                <span className="pr-2 font-bold">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                    </svg>
                                </span>
                                <span className="text-[0.7em]">Email invalide</span>
                            </div>
                        )}
                        <br />

                        <label htmlFor="motDePasse">Mot de Passe</label>
                        <div className='grid grid-cols-[auto_50px]'>
                            <input
                                type={isText ? "text" : "password"}
                                name="motDePasse"
                                id="motDePasse"
                                onInput={followPasse}
                                className="border-b border-l border-t border-c3 rounded-l-md outline-none px-3 py-2 w-[100%]"
                            />
                            <span onClick={showPasse} className='h-[100%] bg-gray-300 border-t border-b border-r cursor-pointer border-c3 rounded-r-md flex items-center justify-center text-blue-700'>
                                {
                                    isText && (<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                    </svg>)

                                }
                                {
                                    !isText && (<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                    </svg>)
                                }


                            </span>
                        </div>
                        {isPasse && (
                            <div className="flex flex-row items-center text-blue-600">
                                <span className="pr-2 font-bold">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                </span>
                                <span className="text-[0.7em]">Au moins 8 caractères</span>
                            </div>
                        )}

                        {!isPasse && !passeVide && (
                            <div className="flex flex-row items-center text-red-600">
                                <span className="pr-2 font-bold">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                    </svg>
                                </span>
                                <span className="text-[0.7em]">Au moins 8 caractères</span>
                            </div>
                        )}
                        <br />

                        <div className="flex max-sm:flex-col items-center justify-between flex-wrap">
                            <button
                                disabled={!isMail || !isPasse}
                                type="submit"
                                className={`px-4 py-2 bg-c1 font-semibold rounded-md shadow-sm max-sm:w-full max-sm:mb-5 text-c3 ${(!isMail || !isPasse) ? 'opacity-75' : 'hover:font-bold hover:px-3'
                                    }`}
                            >
                                Se connecter
                            </button>

                            <a
                                href="#"
                                className="text-sm text-c3 hover:underline max-sm:w-full text-center my-3 font-bold"
                            >
                                Mot de passe oublié ?
                            </a>
                        </div>
                    </form>
                </div >
            </div >
            {
                isError && (
                    <div id="blockError" onClick={handleError} className='fixed top-0 left-0 right-0 bottom-0 bg-[#00000068] w-[100%] h-[100vh] flex flex-col items-center justify-center'>
                    </div>
                )
            }
            {
                isError && isWhite && (
                    <div id="contenu" className='bg-c2 px-8 py-5 rounded-md slide-down min-h-[100px] max-w-[350px] mt-[-60vh] float-end mr-[40%] text-center text-c3 font-bold font-poppins'>
                        {error}
                    </div>
                )
            }
            {
                onProgress && (
                    <div id="blockError" onClick={handleError} className='fixed top-0 left-0 right-0 bottom-0 bg-[#00000068] w-[100%] h-[100vh] flex flex-col items-center justify-center'>
                        <ThreeDots color='#FFCB05' />
                    </div>
                )
            }
        </>
    );

}
