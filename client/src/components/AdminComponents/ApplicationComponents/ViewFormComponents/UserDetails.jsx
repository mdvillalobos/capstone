import React from 'react'

const ApplicationMaster = ({ name, college, department, currentRank, status, academicYear }) => {
    return (
        <div className='border-t-2 border-b-2 border-[#35408E] py-4'>
            <h1 className='text-base font-semibold text-[#35408E] mb-5'>Personal Information</h1>
            <div className='flex justify-between '>
                <div className='flex justify-between flex-col space-y-4'>
                    <div className="inputContainer">
                        <p htmlFor="Name" className='text-sm font-normal'>Name:</p>
                        <input type="text" className='inputFields pointer-events-none' defaultValue={name} readOnly />
                    </div>
                    <div className="inputContainer">
                        <p htmlFor="college" className='text-sm font-normal'>College:</p>
                        <input type="text" className='inputFields pointer-events-none' defaultValue={college} readOnly />
                    </div>
                    <div className="inputContainer">
                        <p htmlFor="department" className='text-sm font-normal'>Department:</p>
                        <input type="text" className='inputFields pointer-events-none' defaultValue={department} readOnly />
                    </div>
                </div>
                <div className='flex justify-between flex-col space-y-4'>
                    <div className="inputContainer">
                        <p htmlFor="rank" className='text-sm font-normal'>Current Rank:</p>
                        <input type="text" className='inputFields pointer-events-none' defaultValue={currentRank} readOnly />
                    </div>
                    <div className="inputContainer">
                        <p htmlFor="status" className='text-sm font-normal'>Status:</p>
                        <input type="text" id="status" className='inputFields pointer-events-none' defaultValue={status} readOnly/>
                    </div>
                    <div className="inputContainer">
                        <p htmlFor="term" className='text-sm font-normal'>AY/Term:</p>
                        <input type="text" className='inputFields pointer-events-none' defaultValue={academicYear} readOnly />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplicationMaster
