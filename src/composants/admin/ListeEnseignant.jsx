import React from 'react'

export default function ListeEnseignant({ list, total }) {

    return (
        <>
            <h1 className='text-center bg-c3 text-c2 p-2 font-bold'>Les Enseignants inscrits sur la plateforme ({total.total})</h1>
            <div className='p-3'>

                <table className='w-[100%] border border-c1'>
                    <thead>
                        <tr className='bg-c1 text-md'>
                            <th className="py-2 px-1 text-left">N°</th>
                            <th className="py-2 px-1 text-left">Nom</th>
                            <th className="py-2 px-1 text-left">Prénoms</th>
                            <th className="py-2 px-1 text-left">Email</th>
                            <th className="py-2 px-1 text-left">Téléphone</th>
                            <th className="py-2 px-1 text-left">Département</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((item, index) => (
                                <tr key={item.id} className='border-b border-b-c1 text-sm'>
                                    <td className='py-2 px-1'>{index + 1}</td>
                                    <td className='py-2 px-1'>{item.surName}</td>
                                    <td className='py-2 px-1'>{item.firstName}</td>
                                    <td className='py-2 px-1'>{item.email}</td>
                                    <td className='py-2 px-1'>{item.telephone}</td>
                                    <td className='py-2 px-1'>{item.dname}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>

        </>
    )
}
