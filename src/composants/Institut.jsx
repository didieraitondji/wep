import React from "react";

export default function Institut() {
  return (
    <div>
      <div className="flex w-11/12 m-auto items-center py-1">
        <img
          className=" w-1/12 rounded-lg"
          src="/images/imsp.jpeg"
          alt="LogoIMSP"
        />
        <div className=" w-10/12 text-center max-md:text-sm max-lg:text-2xl max-xl:text-3xl xl:text-4xl font-bold">
          INSTITUT DE MATHEMATIQUE ET DE SCIENCE PHYSIQUE
        </div>
        <img className=" w-1/12 rounded-lg" src="/images/uac.jpeg" alt="" />
      </div>
    </div>
  );
}
