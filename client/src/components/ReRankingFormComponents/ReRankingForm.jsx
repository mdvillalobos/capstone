import React, { useState, useContext }from 'react';
import { Link } from 'react-router-dom';
import { RankContext } from '../../../context/rankContext.jsx';
import { UserContext } from '../../../context/userContext.jsx';
import PersonalInformation from './PersonalInformation.jsx';
import useGetApplicationData from '../../hooks/ApplicationHooks/useGetApplicationData.jsx';
import ReRankingFields from './ReRankingFields.jsx';
import useToast from '../../hooks/Helpers/useToast.jsx';

const ReRankingForm = ({ ApplyingFor, userTrack, userData }) => {
    const { ranks, config } = useContext(RankContext);
    const { user } = useContext(UserContext);
    const { getApplicationData } = useGetApplicationData();
    const { Toast } = useToast();

    console.log(userData)

    const [ isSubmitted, setIsSubmitted ] = useState(false)
    const [ data, setData ] = useState({
        name: user?.firstName + ' ' + user?.lastName,
        college: user?.college,
        department: user?.department,
        currentRank: user?.rank,
        status: user?.status,
        academicYear: '',
    });
    
    const selectedRank = ranks?.find(rankRequirement => rankRequirement.rankName === ApplyingFor);
    const handleSubmitApplication = async (e) => {
        e.preventDefault();

        setIsSubmitted(true)
        await getApplicationData(data.name, data.college, data.department, data.currentRank, data.status, data.academicYear, ApplyingFor, userTrack, userData, setIsSubmitted
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmitApplication} className='font-Poppins' encType='multipart/form-data' >
                <div className="flex justify-between">
                    <h1 className='formTitle'>Faculty Ranking Form</h1>
                    <h1 className='formTitle'>{ApplyingFor}</h1>
                </div>
                <PersonalInformation
                    name={data.name}
                    college={data.college}
                    department={data.department}
                    currentRank={data.currentRank}
                    status={data.status}
                    academicYear={data.academicYear}
                    data={data}
                    setData={setData}
                />

                <div className='pt-4'>
                    <h1 className='text-base font-semibold text-[#35408E] mb-1'>Qualification</h1>
                    
                    {selectedRank?.requirements.map((requirement, i) => {
                        const userFile = userData.filter(file => file.requirementNumber === requirement.requirementNumber);

                        return (
                            <ReRankingFields
                                key={requirement._id}
                                requirement={requirement.description}
                                userRequirement={userFile}
                            />
                        )
                    })}

                    <div className='flex justify-end mt-4 space-x-3 text-sm font-medium max-sm:space-x-0 max-sm:justify-normal max-sm:flex-col-reverse'>
                        <Link to="/application" className='py-2 px-12 duration-300 bg-[#E8E8E8] rounded hover:bg-[#bcbbbb] text-center max-sm:py-3 max-sm:mt-2'>Cancel</Link>
                        <input type='submit' value={isSubmitted ? 'Loading...' : "Submit"} disabled={isSubmitted} className='py-2 px-12 bg-[#35408e] text-white hover:bg-[#5d69c6] duration-300 rounded cursor-pointer max-sm:py-3'/>
                    </div>
            
                </div>
            </form>
        </div>
    )
}

export default ReRankingForm
