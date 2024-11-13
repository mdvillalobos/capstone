import React, { useState } from 'react';
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const AccountsTable = ({data}) => {
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ selected, setSelected ] = useState();
    const [ isOpen, setIsOpen ] = useState(false)

    const roles = Array.from(new Set(data?.map(acc => acc.role)))
    const filterByRole = data?.filter(acc => selected ? acc.role === selected : true)

    const rowsPerPage = 10;
    const totalPages = Math.ceil(data?.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filterByRole?.slice(indexOfFirstRow, indexOfLastRow);
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };  
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    return (
        <div>
            <div className="flex justify-end space-x-2">
                <div className="relative">
                  <button className="relative flex justify-center items-center py-1.5 px-2 w-32 text-sm rounded-lg border-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
                    {!selected ? 'All' : selected}

                    {!isOpen ? (
                        <TiArrowSortedDown size={'1rem'} className='absolute right-1 top-[8px]'/>
                    ) : (
                        <TiArrowSortedUp size={'1rem'} className='absolute right-1 top-[8px]'/>
                    )}
                  </button>

                  {isOpen ? (
                    <div className='text-center flex flex-col absolute w-32 text-sm mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 '>
                       <div
                            onClick={() => {setSelected(), setIsOpen(!isOpen)}}
                            className="cursor-pointer py-2 px-4 hover:bg-[#41518d] hover:text-white duration-200"
                        >
                            All
                        </div>
                      {roles.map(role => (
                        <div key={role} onClick={() => {setSelected(role), setIsOpen(!isOpen)}}className='cursor-pointer py-2 px-4 hover:bg-[#41518d] hover:text-white duration-200'>{role}</div>
                      ))}
                    </div>
                  )
                  : null } 
                </div>
                <div className='flex space-x-2 text-sm'>
                     <button onClick={handlePrevPage} disabled={currentPage === 1} className='flex border-2 py-1 px-2 rounded-md cursor-pointer duration-300 hover:bg-gray-300 max-sm:py-1.5 max-lg:w-20 max-sm:w-10'>
                         <RiArrowLeftDoubleFill className='my-auto ml-1' size={'1.3rem'}/>
                         <span className='mr-2 ml-1 my-auto'>Prev</span>
                     </button>

                     <span className='border-2 py-1.5 px-4 rounded-md'>{currentPage} of {totalPages}</span>

                     <button onClick={handleNextPage} disabled={currentPage === totalPages} className='flex border-2 py-1 px-2 rounded-md cursor-pointer duration-300 hover:bg-gray-300 max-sm:py-1.5 max-lg:w-20 max-sm:w-10'>
                         <span className='ml-2 mr-1 my-auto'>Next</span>
                         <RiArrowRightDoubleFill  className='my-auto mr-2' size={'1.3rem'}/>
                     </button>
                 </div>
            </div>
            <div className="w-full font-Poppins my-6 h-full">
                <div className=" flex justify-between font-medium bg-NuButton text-white text-sm">
                    <p className='w-[25%] py-2 px-4'>Name</p>
                    <p className='w-[25%] py-2 px-4'>Email</p>
                    <p className='w-[15%] py-2 px-4'>Employee ID</p>
                    <p className='w-[15%] py-2 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>Role</p>
                    <p className='w-[15%] py-2 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>Status</p>
                    <p className='w-[15%] py-2 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>Action</p>
                </div>

                <div className="w-full">
                    {currentRows?.map(acc => (
                        <div key={acc._id} onClick={() => handleView(i)} className='flex cursor-pointer duration-200 hover:shadow-md text-sm text-gray-600 border-y'>
                            <p className='w-[25%] py-4 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>{acc.accountinfo[0]?.firstName} {acc.accountinfo[0]?.lastName}</p>
                            <p className='w-[25%] py-4 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>{acc.email}</p>
                            <p className='w-[15%] py-4 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>{acc.employeeID}</p> 
                            <p className='w-[15%] py-4 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>{acc.role}</p>
                            <p className='w-[15%] py-4 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>Active</p>
                            <p className='w-[15%] py-4 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>taa</p>
                        </div>
                    ))}
                    {/* {filterByRank?.length !== 0 ? (
                        currentRows?.map(i=> (
                            <div key={i._id} onClick={() => handleView(i)} className='flex cursor-pointer duration-200 hover:shadow-md text-sm text-gray-600 border-y'>
                                <p className='w-[15%] py-4 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>{i.name}</p>
                                <p className='w-[20%] py-4 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>{i.email}</p>
                                <p className='w-[20%] py-4 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>{i.college}</p> 
                                <p className='w-[15%] py-4 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>{i.department}</p>
                                <p className='w-[15%] py-4 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>{i.currentRank}</p>
                                <p className='w-[15%] py-4 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>{i.applyingFor}</p>
                            </div>
                        ))
                    ) : (
                        <div className='flex flex-col justify-center items-center mt-10 space-y-2 select-none pointer-events-none'>
                            <img src={NotFound} alt="No Data Found" className='h-80 opacity-90'/>
                            <h1 className='flex justify-center font-medium text-2xl text-gray-500'>No Available Data</h1>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    )
}

export default AccountsTable
