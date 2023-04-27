import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading({ setIsOpen, resetInput, text }) {
  return (
    <div className="z-10 bg-black h-screen bg-opacity-20 absolute w-screen grid place-content-center">
      <div className='bg-white p-4 flex flex-col rounded-md justify-around gap-2'>
        <p className='m-auto'>{text}</p>
        <ClipLoader className="m-auto" size={20} />
      </div>
    </div>);
}

