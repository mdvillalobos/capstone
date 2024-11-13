import React from 'react'
import { Link } from 'react-router-dom'
import { MdKeyboardArrowLeft  } from "react-icons/md";

const Return = ({ from }) => {
  const returnTo = from === 'Repository' ? '/repository' : '/application'

  return (
    <div>
      <Link to={returnTo} className='flex my-4 w-24 duration-300 hover:text-NuButtonHover'>
        <MdKeyboardArrowLeft size='1.3rem' className='translate-y-[1.5px]'/>
        <p className='text-sm font-Poppins font-semibold relative ml-0.5 top-0.5'>Back</p>
      </Link>
    </div>
  )
}

export default Return
