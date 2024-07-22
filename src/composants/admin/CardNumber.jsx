import React, { useState, useEffect } from 'react'

export default function CardNumber({ url, forme }) {
    const [total, setTotal] = useState("");
    const [type, setType] = useState("");
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    setTotal(data.total)
                    setType(data.type);

                } catch (error) {
                    setError('Response was not valid JSON : (' + error + ').');
                }
            })
            .catch(error => {
                setError("Une erreur s'est produite.Veuillez réessayer : (" + error + ").");
            });
    }, [setTotal, url])
    return (
        <>
            <div className={`
                ${forme == 1 && "bg-c1"} 
                ${forme == 2 && "bg-c2"} 
                ${forme == 3 && "bg-c3"}
                ${forme == 4 && "bg-c4"}
                ${forme == 5 && "bg-c5"}
                ${forme == 3 && "text-c1"} 
                ${forme == 1 && "text-c3"}
                shadow-md rounded-lg px-4 py-3 pb-1 mb-5 max-w-[300px] mx-auto`}
            >
                <div className='min-h-[100px] flex items-center justify-center'>
                    <span className='text-3xl font-bold'>+ {total}</span>
                </div>
                <div className={`border-t border-t-c2 text-center font-bold py-3`}>
                    {type}
                </div>
            </div>
        </>
    )
}
