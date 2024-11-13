import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from "../../components/Tools/Navigation.jsx";
import ApplicationTable from '../../components/AdminComponents/ApplicationComponents/ApplicationTable.jsx';

const Application = () => {
    const [ data, setData ] = useState([]);
    const [ loading, setIsLoading ] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };
  
    useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
        axios.get('/api/getApplications')
        .then(res => {
            setData(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.error(err);
            setIsLoading(false);
        });
    }, []);

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
                {isMobile ? (
                    <div className="text-center">
                        <h1 className="text-lg font-bold">This page is not available on mobile.</h1>
                        <p>Please visit us on a desktop for a better experience.</p>
                    </div>
                ) : (
                      <>
                        <div className="flex flex-grow max-sm:px-8 font-Poppins">
                            <Navigation />
                            <div className="w-full p-4 px-6">
                                <h1 className='text-3xl font-semibold mb-4'>Applications</h1>
                                <ApplicationTable data={data}/>
                            </div>
                        </div>
                      </>
                    )}
                </>
            )}
        </div>
    )
}

export default Application
