import React, { useEffect, useState } from 'react'
import Navigation from "../../components/Tools/Navigation.jsx";
import Footer from '../../components/Tools/Footer.jsx';
import Instruction from '../../components/UserComponents/ApplicationComponents/Instruction.jsx';
import DropDown from '../../components/UserComponents/ApplicationComponents/DropDown.jsx';
import DisabledPage from '../../components/UserComponents/ApplicationComponents/DisabledPage.jsx';
import axios from 'axios';
import ProfileCard from '../../components/UserComponents/HomeComponents/ProfileCard.jsx';

const ApplicationForReRanking = () => {
    const [ data, setData ] = useState();
    const [ loading, setIsLoading ] = useState(true)
     
    useEffect(() => {
        axios.get('/api/getEntry')
            .then(res => {
                setData(res.data);
                setIsLoading(false); 
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    console.log(data)

    return (
        <div className="min-h-screen flex flex-col">
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="cssloader">
                        <div className="triangle1"></div>
                        <div className="triangle2"></div>
                        <p className="text">Please Wait</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-grow max-sm:px-8 font-Poppins">
                        <Navigation />
                        <div className="w-full p-4 px-6">
                            {data ? (
                                <div className='flex justify-center my-auto h-full'>
                                    <DisabledPage rest={data}/>
                                </div>
                            ) : (
                                <>
                                    <h1 className='text-3xl font-semibold'>Application</h1>
                                    <Instruction/>
                                    <DropDown/>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ApplicationForReRanking
