import React, { useContext, useState } from 'react';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
import { UserContext } from "../../../context/userContext.jsx";
import useLogout from '../../hooks/AuthHooks/useLogout.jsx';
import NuLogo from '../../assets/images/NU_shield.webp';
import maleProfile from '../../assets/images/male.webp';
import femaleProfile from '../../assets/images/female.webp';
import { LuUser2 } from "react-icons/lu";
import { AiOutlineFileSync } from "react-icons/ai";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { LuFileBadge } from "react-icons/lu";
import { IoNavigateCircleOutline } from "react-icons/io5";
import { SiBuildkite } from "react-icons/si";
import { GiSettingsKnobs } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { HiOutlineCog } from "react-icons/hi";
import ProfileCard from '../UserComponents/HomeComponents/ProfileCard.jsx';
import Footer from './Footer.jsx';


const header = () => {
  const { user } = useContext(UserContext);
  const { Logout } = useLogout();
  const [ selected, setSelected ] = useState('Navigation');

  const handleLogout = async () => {
    await Logout(); 
  }
  const home = (user.role === 'user') ? '/home' : (user.role === 'admin') && '/admin/dashboard';

  return (
    <div className='flex flex-col justify-between w-[22vw] border-r-2 pt-4 px-3 font-Poppins max-sm:px-8 max-md:px-8'>
      <div className="flex flex-col w-full">
        <Link to={home} className="flex">
          <img src={NuLogo} alt="Nu Logo" className='mr-1.5 my-auto translate-y-0.5 h-8 w-7 max-sm:w-7 max-sm:translate-y-0'/>
          <div className="text-[#41518d] font-semibold max-sm:hidden my-auto">
            <h1 className='text-[0.8rem] mt-[1.5px]'>NATIONAL UNIVERSITY</h1>
            <p className='leading-3 text-[0.8rem]'>Faculty Service Office</p>
          </div>
        </Link>

       {/*  <div className="flex bg-[#e5e5e5] p-0.5 rounded-lg mt-6">
          <button 
            onClick={() => setSelected('Navigation')}
            className={`${selected === 'Navigation' ? 'bg-white text-gray-900' : 'text-gray-400'} flex justify-center py-2.5 w-full text-[0.8rem] font-semibold rounded-lg`}
          >
            <IoNavigateCircleOutline className='my-auto translate-y-[-0.2px] text-lg mr-1'/>
            Menu
          </button>

          <button 
            onClick={() => setSelected('Profile')}
            className={`${selected === 'Profile' ? 'bg-white text-gray-900' : 'text-gray-400'} flex justify-center py-2.5 w-full text-[0.8rem] font-semibold rounded-lg`}
          >
            <LuUser2 className='my-auto translate-y-[-1px] text-lg mr-1'/>
            Profile
          </button>
        </div> */}

        <div className="flex mt-6 space-x-2 border-2 rounded-lg p-2.5">
          {!!user && user.profilePicture ? (
            <div className="flex items-center justify-center w-[35px] h-[35px] overflow-hidden rounded-full max-sm:translate-y-0">
              <img src={user.profilePicture} alt="Profile Picture" className='w-full h-full object-cover'/>
            </div>
          ) : user?.sex === 'Male' ? (
            <div className="w-[35px] h-[35px] overflow-hidden rounded-full flex items-center justify-center max-sm:translate-y-0">
              <img src={maleProfile} alt="Profile Picture" className='w-full h-auto object-cover'/>
            </div>
          ) : user?.sex === 'Female' ? (
            <div className="w-[35px] h-[35px] overflow-hidden rounded-full flex items-center justify-center max-sm:translate-y-0">
              <img src={femaleProfile} alt="Profile Picture" className='w-full h-auto object-cover'/>
            </div>
          ) : (
            <div className="w-[35px] h-[35px] overflow-hidden rounded-full flex items-center justify-center">
              <img src={maleProfile} alt="Default Profile Picture" className='w-full h-auto object-cover'/>
            </div>
          )}

          <div className="text-xs my-auto">
            <p>{user?.firstName} {user?.lastName}</p>
            <p className='text-gray-500'>{user?.rank}</p>
          </div>
        </div>

        {selected === 'Navigation' ? 
          user.role === 'user' ? (
            <div className="mt-6">
              <p className='text-gray-400 text-sm font-semibold mb-2 px-1.5'>Main Menu</p>
              <ul className='flex flex-col space-y-1'>
                <ActiveLink to='/home' className='flex hover:bg-NuButtonHover hover:text-white duration-200 font-medium py-2.5 px-1.5 text-sm rounded-lg'>
                  <SiBuildkite className='text-lg mr-2 my-auto'/>
                  Profile Building
                </ActiveLink>

                <ActiveLink to='/application' className='flex hover:bg-NuButtonHover hover:text-white duration-200 font-medium py-2.5 px-1.5 text-sm rounded-lg'>
                  <AiOutlineFileSync className='text-lg mr-2 my-auto'/>
                  Application
                </ActiveLink>
              </ul>

              <p className='text-gray-400 text-sm font-semibold mt-4 mb-2 px-1.5'>Settings</p>
              <ul className="flex flex-col space-y-1">
                <ActiveLink to='/settings' className='flex hover:bg-NuButtonHover hover:text-white duration-200 font-medium py-2.5 px-1.5 text-sm rounded-lg'>
                  <HiOutlineCog  className='text-lg mr-2 translate-y-[0.6px]'/>
                  Settings
                </ActiveLink>

                <button onClick={handleLogout} className='flex hover:bg-NuButtonHover hover:text-white duration-200 font-medium py-2.5 px-1.5 text-sm rounded-lg'>
                  <MdLogout className='text-lg mr-2 my-auto'/>
                  Logout
                </button>
              </ul>
            </div>
          ) : (
            <div className="mt-6">
              <p className='text-gray-400 text-sm font-semibold mb-2'>Menu</p>
              <ul className='flex flex-col space-y-1'>
                <ActiveLink to='/admin/dashboard' className='flex hover:bg-NuButtonHover hover:text-white duration-200 font-medium py-2.5 px-1.5 text-sm rounded-lg'>
                  <TbLayoutDashboardFilled className='text-lg mr-2 my-auto'/>
                  Dashboard
                </ActiveLink>
            
                <ActiveLink to='/admin/application' className='flex hover:bg-NuButtonHover hover:text-white duration-200 font-medium py-2.5 px-1.5 text-sm rounded-lg'>
                  <LuFileBadge className='text-lg mr-2 my-auto'/>
                  Applications
                </ActiveLink>

                <ActiveLink to='/admin/accountmanagement' className='flex hover:bg-NuButtonHover hover:text-white duration-200 font-medium py-2.5 px-1.5 text-sm rounded-lg'>
                  <RiUserSettingsLine className='text-lg mr-2 my-auto'/>
                  Account Management
                </ActiveLink>
            
                <ActiveLink to='/admin/settings' className='flex hover:bg-NuButtonHover hover:text-white duration-200 font-medium py-2.5 px-1.5 text-sm rounded-lg'>
                  <HiOutlineCog  className='text-lg mr-2 my-auto -rotate-90'/>
                  Settings
                </ActiveLink>
            
                <button onClick={handleLogout} className='flex hover:bg-NuButtonHover hover:text-white duration-200 font-medium py-2.5 px-1.5 text-sm rounded-lg'>
                  <MdLogout className='text-lg mr-2 my-auto'/>
                  Logout
                </button>
              </ul>
            </div>
        ) : (
         /*  <ProfileCard/> */ null
        )}
      </div>
      <Footer/>
    </div>
  )
}

export default header

const ActiveLink = ({to, children, ...props}) => {
  const path = useResolvedPath(to);
  const isActive = useMatch({path: path.pathname, end: true});

  return (
    <li className={isActive ? "activeNav" : ""}>
      <Link to = {to} {...props}>
        {children}
      </Link>
    </li>
  )
}