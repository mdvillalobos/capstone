import React, { useContext } from 'react';
import { UserContext } from '../../../context/userContext.jsx';
import Navigation from "../../components/Tools/Navigation.jsx";
import SettingPageHolder from '../../components/SettingComponents/SettingPageHolder.jsx';

const Settings = () => {
    const { user } = useContext(UserContext);

    if(user === undefined) {
        return (
            <div className="flex justify-center items-center min-h-screen"> 
                <div className="cssloader">
                  <div className="triangle1"></div>
                  <div className="triangle2"></div>
                  <p className="text">Please Wait</p>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen  flex flex-col'>
            <div className="flex flex-grow max-sm:px-8 font-Poppins">
                <Navigation />
                <div className="w-full p-4 px-6">
                    <h1 className='text-3xl font-semibold mb-4'>Settings</h1>
                    <SettingPageHolder/>
                </div>
            </div>
        </div>
    )
}

export default Settings
