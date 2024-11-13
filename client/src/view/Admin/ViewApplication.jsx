import React, { useContext, useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
import ViewApplicationForm from '../../components/AdminComponents/ApplicationComponents/ViewApplicationForm.jsx';
import Navigation from "../../components/Tools/Navigation.jsx";
import { UserContext } from '../../../context/userContext.jsx';
import { MdKeyboardArrowRight } from "react-icons/md";

const ViewApplication = () => {
    const location = useLocation();
    const { data } = location.state || {};
    const { user } = useContext(UserContext);
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 790);
    };
  
    useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    
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
        <div className='min-h-screen flex flex-col'>
            {isMobile ? (
                <div className="text-center">
                    <h1 className="text-lg font-bold">This page is not available on mobile.</h1>
                    <p>Please visit us on a desktop for a better experience.</p>
                </div>
            ) : (
                <>
                    <div className="flex flex-grow max-sm:px-8 font-Poppins">
                        <Navigation />
                        <div className="w-full py-4 px-16">
                            <div className=" mb-4">
                                <div className="flex text-sm font-medium">
                                    <Link to='/admin/application' className='text-NuButton hover:underline duration-200'>Applications</Link>
                                    <MdKeyboardArrowRight className='my-auto'/>
                                    <p>{data.applyingFor}</p>
                                </div>
                                
                            </div>
                            <ViewApplicationForm rest={ data }/>
                        </div>
                    </div>  
                </>
            )}
        </div>
    )
}

export default ViewApplication
