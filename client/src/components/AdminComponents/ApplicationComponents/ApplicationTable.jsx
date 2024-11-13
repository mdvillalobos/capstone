import React, { useState, useContext }from 'react'
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import NotFound from '../../../assets/images/NotFound.webp';
import { RankContext } from '../../../../context/rankContext';

const ApplicationTable = ({ data }) => {
    const navigate = useNavigate();
    const { ranks } = useContext(RankContext)
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ selected, setSelected ] = useState()

    const rankArray = Array.from(new Set(ranks?.map(rank => rank.rankName)));
    const filterByRank = data?.filter(rank =>
      selected ? rank.applyingFor === selected : true
  );
    const rowsPerPage = 8;
    const totalPages = Math.ceil(data?.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filterByRank?.slice(indexOfFirstRow, indexOfLastRow);
  
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
    
    const handleView = (userData) => {
        navigate('/admin/application/view', { state: { data: userData } })
    }

    return (
      <div>
        <div className="flex justify-between font-Poppins">
          <div className="flex justify-end w-full space-x-3">
            <div className="relative">
              <button className="relative flex justify-center items-center py-1.5 px-2 w-56 text-sm rounded-lg border-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
                {!selected ? 'All' : selected}
                  {!isOpen ? (
                    <TiArrowSortedDown size={'1rem'} className='absolute right-1 top-[8px]'/>
                ) : (
                  <TiArrowSortedUp size={'1rem'} className='absolute right-1 top-[8px]'/>
                )}
              </button>
              {isOpen ? (
                <div className='text-center flex flex-col absolute w-56 text-sm mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 h-80 overflow-y-auto'>
                   <div
                        onClick={() => {setSelected(), setIsOpen(!isOpen)}}
                        className="cursor-pointer py-2 px-4 hover:bg-[#41518d] hover:text-white duration-200"
                    >
                        All
                    </div>
                  {rankArray.map(rank => (
                    <div key={rank} onClick={() => {setSelected(rank), setIsOpen(!isOpen)}}className='cursor-pointer py-2 px-4 hover:bg-[#41518d] hover:text-white duration-200'>{rank}</div>
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
        </div>

        <div className="w-full font-Poppins my-4 h-full">
          <div className=" flex font-medium bg-NuButton text-white">
            <p className='w-[15%] py-3 px-4'>Name</p>
            <p className='w-[20%] py-3 px-4'>Email</p>
            <p className='w-[20%] py-3 px-4'>College</p>
            <p className='w-[15%] py-3 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>Department</p>
            <p className='w-[15%] py-3 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>Current Rank</p>
            <p className='w-[15%] py-3 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>Applying For</p>
          </div>

          <div className="w-full">
            {filterByRank?.length !== 0 ? (
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
            )}
          </div>
        </div>
      </div>
        
    )
}

export default ApplicationTable
