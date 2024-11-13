import React from 'react'
import { RxCross2 } from "react-icons/rx";

const ViewPdf = ({ handleExit, file  }) => {
    return (
        <div className='fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/60 justify-center items-center'>
            <button type="button" onClick={ handleExit } className='absolute text-3xl px-2 right-4 top-4 duration-300 text-white'>
                <RxCross2/>
            </button> 
            <div className="relative h-[80vh] w-[70vw] bg-black shadow-lg rounded-md overflow-hidden">
                <iframe 
                    src={file} 
                    width="100%" 
                    height="100%" 
                    title="PDF Viewer" 
                />
            </div>
        </div>
    )
}

export default ViewPdf
