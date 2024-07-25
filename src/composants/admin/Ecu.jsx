import React, { useState, useEffect } from 'react'
import { loadGetData, loadPostData, childCliked } from '../Fonctions';
import Warning from '../Warning';
import Succefful from '../Succefful';
import Loader from '../Loader';



export default function EcuAdmin() {

  const [ecus, setEcus] = useState([]);
  const [postData, setPostData] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [ues, setUes] = useState([]);
  const [warning, setWarning] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    loadGetData('ecus', setEcus);
    loadGetData('ues', setUes);
  }, []);

  const handleAddECUE = (e) => {
    setLoad(true);
    let ecuename = document.getElementById("nameecu").value;
    let ue = document.getElementById("uef").value;
    let creditEcu = document.getElementById("creditecu").value;

    if (ecuename != "" && ue != "" && creditEcu != "") {

      const data = {
        name: ecuename,
        id_Ue: ue,
        credit: creditEcu,
      }

      loadPostData('ecu', data, setPostData, () => {
        loadGetData('ecus', setEcus);
        loadGetData('ues', setUes);
        setConfirm(!confirm);
      });

      setWarning(!postData);

      setInterval(() => {
        setWarning(false);
        setLoad(false);
        setPostData(false);
      }, 3000);

    }
  }

  const handleAcceptAddECUE = (e) => {
    e.preventDefault();
    setConfirm(!confirm);
  }

  // retour HTML
  return (
    <>
      <div className='p-3 h-full bg-c5 grid grid-rows-[1fr_auto] shadow-md rounded-lg'>
        <div>
          <div className='p-2'>
            <div className='grid grid-cols-[auto_100px] border border-c1 rounded-t-lg'>
              <h1 className='p-2 bg-c2 rounded-tl-lg'>
                ECUE
              </h1>
              <span className='bg-c1 p-2 text-center rounded-tr-lg font-bold'>
                {
                  ecus.length
                } +
              </span>
            </div>
            <div className='border border-c1 text-c3'>
              <table className='w-[100%] border border-collapse'>
                <thead>
                  <tr className='font-bold bg-c1'>
                    <th className='p-2 text-center'>N°</th>
                    <th className='p-2 text-left'>Libellé</th>
                    <th className='p-2 text-left'>Crédit</th>
                    <th className='p-2 text-left'>UE & Filiere</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    ecus.map((item, index) => (
                      <tr className='border border-c1 bg-c2' key={item.id}>
                        <td className='p-2 text-center border border-c1'>{index + 1}</td>
                        <td className='p-2 border border-c1'>{item.ecuname}</td>
                        <td className='p-2 border border-c1'>{item.credit}</td>
                        <td className='p-2 border border-c1'>{item.uename + ", " + item.fname}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='mt-3 p-2'>
          <div className='bg-c3 text-c2 font-bold p-2'>
            Ajouter un ECUE
          </div>
          <div className='pt-2 border border-c3 rounded-b-lg'>
            <form onSubmit={handleAcceptAddECUE} className='py-8 px-4'>
              <div className='flex flex-row items-center'>
                <label htmlFor="" className='w-1/3 text-center'>Nom ECUE :</label>
                <input type="text" name='name' className='border border-c3 w-2/3 p-2 rounded-lg text-sm' autoComplete='on' id='nameecu' required placeholder="entrer le nom de l'ECUE " />
              </div>
              <div className='flex flex-row items-center mt-5'>
                <label htmlFor="" className='w-1/3 text-center'>Crédit ECUE :</label>
                <input type="number" min={1} max={12} name='name' className='border border-c3 w-2/3 p-2 rounded-lg text-sm' autoComplete='on' id='creditecu' required placeholder="entrer le crédit de l'ECUE " />
              </div>
              <div className='flex flex-row items-center mt-5'>
                <label htmlFor="" className='w-1/3 text-center'> dans UE :</label>
                <select name="uef" id="uef" className='border border-c3 w-2/3 p-2 rounded-lg text-sm' required>
                  <option value="">Choisissez l'UE</option>
                  {
                    ues.map((item) => (
                      <option key={item.id} value={item.id}>{item.name + ", " + item.fname}</option>
                    ))
                  }
                </select>

              </div>
              <div className='flex flex-row pt-5'>
                <span className='w-1/3'></span>
                <button type='submit' className='w-2/3 text-center p-2 bg-c1 rounded-lg hover:font-bold' title='Ajouter une filière'>Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {
        confirm && (
          <div onClick={handleAcceptAddECUE} className='fixed top-0 left-[80px] right-0 bottom-0 bg-[#00000065] flex items-center justify-center'>
            <div onClick={childCliked} className='bg-c2 p-5 shadow-lg rounded-md slide-down min-w-[200px]'>
              <div>
                Ajouter l'ECUE "{document.getElementById("nameecu").value}" ?
              </div>
              <div className='pt-10 flex'>
                <div className='w-1/2 flex items-center justify-center font-bold'>
                  <span onClick={handleAddECUE} className='px-4 py-2 bg-c1 rounded-md cursor-pointer'>Oui</span>
                </div>
                <div className='w-1/2 flex items-center justify-center font-bold'>
                  <span onClick={handleAcceptAddECUE} className='px-4 py-2 cursor-pointer hover:bg-c3 hover:text-c2 rounded-md'>Non</span>
                </div>
              </div>
            </div>
          </div>
        )
      }


      <Loader value={load} />
      <Warning value={warning} text={"L'ECUE Existe déjà !"} />
      <Succefful value={postData} text={"ECUE ajouté avec succès !"} />
    </>
  )
}
