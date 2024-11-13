import React, { useContext } from 'react';
import { UserContext } from '../../../../context/userContext';
import { PiGenderIntersex } from "react-icons/pi";
import { LiaIdCardSolid } from "react-icons/lia";
import { FaRegBuilding } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi"
import maleProfile from '../../../assets/images/male.webp';
import femaleProfile from '../../../assets/images/female.webp';

const ProfileCard = () => {
  const { user } = useContext(UserContext);
  
  return (
    <div className='border-2 rounded-md px-6 py-5 space-y-8'> 
      <div className="flex space-x-2">
        <div className="h-6 w-1 bg-NuButton rounded-xl my-auto"></div>
        <p className='text-xl font-medium my-auto'>Personal Details</p>
      </div>

      <div className="flex space-x-4">
        {!!user && user.profilePicture ? (
          <div className="flex items-center justify-center w-[80px] h-[80px] overflow-hidden rounded-full max-sm:translate-y-0">
            <img src={user.profilePicture} alt="Profile Picture" className='w-full h-full object-cover'/>
          </div>
        ) : user?.sex === 'Male' ? (
          <div className="w-[80px] h-[80px] overflow-hidden rounded-full flex items-center justify-center max-sm:translate-y-0">
            <img src={maleProfile} alt="Profile Picture" className='w-full h-auto object-cover'/>
          </div>
        ) : user?.sex === 'Female' ? (
          <div className="w-[80px] h-[80px] overflow-hidden rounded-full flex items-center justify-center max-sm:translate-y-0">
            <img src={femaleProfile} alt="Profile Picture" className='w-full h-auto object-cover'/>
          </div>
        ) : (
          <div className="w-[80px] h-[80px] overflow-hidden rounded-full flex items-center justify-center">
            <img src={maleProfile} alt="Default Profile Picture" className='w-full h-auto object-cover'/>
          </div>
        )}
        
        <div className="flex flex-col justify-between">
          <p className='font-medium text-lg'>{user?.firstName} {user?.lastName}</p>

          <div className="flex space-x-12">
            <div className="space-y-1">
              <p className='text-gray-600 text-[0.8rem]'>Rank</p>
              <p className='text-sm font-medium'>{user?.rank}</p>
            </div>

            <div className="space-y-1">
              <p className='text-gray-600 text-[0.8rem]'>Contact No.</p>
              <p className='text-sm font-medium'>{user?.contact}</p>
            </div>

            <div className="space-y-1">
              <p className='text-gray-600 text-[0.8rem]'>Email</p>
              <p className='text-sm font-medium'>{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="rounded-md py-4 px-4 w-full flex space-x-2 border-2">
          <div className="rounded-full p-2 my-auto border-2">
            <PiGenderIntersex className='text-xl'/>
          </div>
          <div className="my-auto space-y-1">
            <p className='text-xs font-medium text-gray-500'>Sex</p>
            <p className='text-sm'>{user?.sex}</p>
          </div>
        </div>

        <div className="rounded-md py-4 px-4 w-full flex space-x-2 border-2">
          <div className="rounded-full p-2 my-auto border-2">
            <LiaIdCardSolid className='text-xl'/>
          </div>
          <div className="my-auto space-y-1">
            <p className='text-xs font-medium text-gray-500'>Employee ID</p>
            <p className='text-sm'>{user?.employeeID}</p>
          </div>
        </div>

        <div className="rounded-md py-4 px-4 w-full flex space-x-2 border-2">
          <div className="rounded-full p-2 my-auto border-2">
            <BiCategoryAlt className='text-xl'/>
          </div>
          <div className="my-auto space-y-1">
            <p className='text-xs font-medium text-gray-500'>Track</p>
            <p className='text-sm'>{user?.track}</p>
          </div>
        </div>

        <div className="rounded-md py-4 px-4 w-full flex space-x-2 border-2">
          <div className="rounded-full p-2 my-auto border-2">
            <FaGraduationCap className='text-xl'/>
          </div>
          <div className="my-auto space-y-1">
            <p className='text-xs font-medium text-gray-500'>College</p>
            <p className='text-sm  text-ellipsis overflow-hidden whitespace-nowrap w-[130px]'>{user?.college}</p>
          </div>
        </div>

        <div className="rounded-md py-4 px-4 w-full flex space-x-2 border-2">
          <div className="rounded-full p-2 my-auto border-2">
            <FaRegBuilding className='text-xl'/>
          </div>
          <div className="my-auto space-y-1">
            <p className='text-xs font-medium text-gray-500'>Department</p>
            <p className='text-sm text-ellipsis overflow-hidden whitespace-nowrap w-[130px]'>{user?.department}</p>
          </div>
        </div>
      </div>

      {/* <div className="space-y-2.5"> 
        <div className="border-2 rounded-lg px-4 py-2 space-y-0.5">
          <p className='text-xs font-medium text-gra
          y-500'>Sex2/p>
4         <p className='text-xs'>{user?.sex}</p>2        </div>      

        <div className="border-2 rounded-lg px-4 py-2 space-y-0.5">
          <p className='text-xs font-medium t2xt-g4ay-500'>Contact No.</p>
          <p className='text-sm' className='text2xs'>{user?.contact}</p>
        </div>      

        <div className="border-2 rounded-lg px-4 py-2 space-y-0.5">
          <p className='text-xs font-medium t2xt-g4ay-500'>Email</p>
          <p className='text-sm' className='text2xs text-ellipsis overflow-hidden whitespace-nowrap w-[210px]'>{user?.email}</p>
        </div>      

        <div className="border-2 rounded-lg px-4 py-2 space-y-0.5">
          <p className='text-xs font-medium t2xt-g4ay-500'>Employee ID</p>
          <p className='text-sm' className='text2xs'>{user?.employeeID}</p>
        </div>      

        <div className="border-2 rounded-lg px-4 py-2 space-y-0.5">
          <p className='text-xs font-medium t2xt-g4ay-500'>Track</p>
          <p className='text-sm' className='text2xs'>{user?.track}</p>
        </div>      

        <div className="border-2 rounded-lg px-4 py-2 space-y-0.5">
          <p className='text-xs font-medium t2xt-g4ay-500'>College</p>
          <p className='text-sm' className='text2xs text-ellipsis overflow-hidden whitespace-nowrap w-[210px]'>{user?.college}</p>
        </div>      

        <div className="border-2 rounded-lg px-4 py-2 space-y-0.5">
          <p className='text-xs font-medium text-gray-500'>Department</p>
          <p className='text-sm' className='text-xs'>{user?.department}</p>
        </div>
      </div> */}
    </div>
  )
}

export default ProfileCard
