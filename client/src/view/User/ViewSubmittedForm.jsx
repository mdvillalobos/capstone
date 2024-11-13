import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ViewSubmitted from '../../components/UserComponents/ApplicationComponents/ViewSubmitted';
import Return from '../../components/UserComponents/ApplicationComponents/Return.jsx';
import Navigation from "../../components/Tools/Navigation.jsx";
import Footer from '../../components/Tools/Footer.jsx';
import { UserContext } from '../../../context/userContext.jsx';

const ViewSubmittedForm = () => {
    const location = useLocation();
    const { myForm } = location.state || {};
    const { user } = useContext(UserContext)
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
        <div className="flex flex-grow max-sm:px-8 font-Poppins">
            <Navigation />
            <div className="w-full py-4 px-16">
                <ViewSubmitted 
                        rest = { myForm }
                    />
            </div>
        </div>
    )
}

export default ViewSubmittedForm
