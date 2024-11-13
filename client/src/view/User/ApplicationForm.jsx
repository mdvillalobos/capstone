import { React, useContext } from 'react'
import { useLocation, Link} from 'react-router-dom';
import { UserContext } from '../../../context/userContext.jsx';
import Navigation from '../../components/Tools/Navigation.jsx';
import ReRankingForm from '../../components/ReRankingFormComponents/ReRankingForm.jsx';
import { MdKeyboardArrowRight } from "react-icons/md";

const ApplicationForm = () => {
    const location = useLocation();
    const { user } = useContext(UserContext);
    const { selectedForm, data } = location.state || {};
    const track = user.track;

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
                <div className=" mb-4">
                    <div className="flex text-sm font-medium">
                        <Link to='/admin/application' className='text-NuButton hover:underline duration-200'>Applications</Link>
                        <MdKeyboardArrowRight className='my-auto'/>
                        <p>{selectedForm}</p>
                    </div>
                    
                </div>
                <ReRankingForm 
                    ApplyingFor={ selectedForm }
                    userTrack={ track } 
                    userData={ data }
                />
            </div>
        </div>
    )
}

export default ApplicationForm
