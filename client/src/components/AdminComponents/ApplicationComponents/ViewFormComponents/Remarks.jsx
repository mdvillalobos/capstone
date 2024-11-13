import React from 'react'
import { IoChevronBackOutline } from "react-icons/io5";

const Remarks = ({ handleSubmit, handleExit, remarks, setRemarks}) => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
            <div className="h-[55%] w-[35%] bg-white shadow-lg rounded-2xl px-6 py-6 space-y-5 overflow-hidden fade-in max-sm:h-[72%] max-sm:w-[85%]">
              <div className="break-words text-sm">
                <div className='flex flex-col'>
                  <button type='button' className="hover:bg-[#eae7e7] w-10 text-[#3b3c3c] border-2 px-2 py-2 rounded-lg duration-200" onClick={handleExit}>
                    <IoChevronBackOutline size={'1.3rem'} />
                  </button>

                  <h1 className='text-2xl my-4 font-medium'>Are you sure you want to submit this?</h1>
                  <textarea 
                    rows="7"
                    placeholder='Remarks' 
                    value={remarks} 
                    onChange={(e) => setRemarks(e.target.value)} 
                    className='resize-none h-[25vh] p-4 outline-none rounded-lg border-2 focus:border-[#c1c6f2] mb-2 focus:bg-[#f3f4fd]'
                  />
    
                  <div className="flex mt-4">
                    <button onClick={handleSubmit} className=' py-3 px-10 text-sm bg-NuBlue text-white hover:bg-NuButtonHover duration-300 rounded-lg cursor-pointer shadow-md w-full' >Submit</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
}

export default Remarks
