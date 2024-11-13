import React from 'react'
import Navigation from "../../components/Tools/Navigation.jsx";
import SettingPageHolder from '../../components/SettingComponents/SettingPageHolder.jsx';

const Settings = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <div className="flex flex-grow max-sm:px-8 font-Poppins">
                <Navigation />
                <div className="w-full p-4 px-6">
                    <SettingPageHolder/>
                </div>
            </div>
        </div>
    )
}

export default Settings
