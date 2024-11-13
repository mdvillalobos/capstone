import React from 'react';
import { FaChalkboardTeacher } from "react-icons/fa";
import { TfiFiles } from "react-icons/tfi";
import { GrUpgrade } from "react-icons/gr";


const Datas = ({ totalFaculty, approvedFaculty, applicationTotal }) => {
    
    return (
        <div className='flex justify-between space-x-4'>
            <div className="my-auto flex space-x-3 border-2 w-4/12 py-3 px-12 rounded-xl relative">
                <span className='flex border rounded-lg p-2 absolute left-3'>
                    <FaChalkboardTeacher className='text-lg'/>
                </span>
                <div>
                    <p className='text-xs'>Total Faculty</p>
                    <p className='text-3xl'>{totalFaculty}</p> 
                </div> 
            </div>

            <div className='my-auto flex space-x-3 border-2 w-4/12 py-3 px-12 rounded-xl relative'>
                <span className='flex border rounded-lg p-2 absolute left-3'>
                    <TfiFiles className='text-lg'/>
                </span>
                <div>
                    <p className='text-xs'>Total Application</p>
                    <p className='text-3xl'>{applicationTotal}</p>     
                </div>                  
            </div>

            <div className='my-auto flex space-x-3 border-2 w-4/12 py-3 px-12 rounded-xl relative'>
                <span className='flex border rounded-lg p-2 absolute left-3'>
                    <GrUpgrade className='text-lg'/>
                </span>
                <div>
                    <p className='text-xs'>Newly Ranked Faculty</p>
                    <p className='text-3xl'>{approvedFaculty.length}</p>                  
                </div> 
            </div>
        </div>
    )
}

export default Datas
