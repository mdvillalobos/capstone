import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PersonalInformation from '../../ReRankingFormComponents/PersonalInformation.jsx';
import SubmittedFields from './SubmittedFields.jsx';
import { RankContext } from '../../../../context/rankContext.jsx';

const ViewSubmitted = ({ rest }) => {
    const { ranks } = useContext(RankContext);

    const selectedRank = ranks?.find(rankRequirement => rankRequirement.rankName === rest?.applyingFor);
    return (
        <div>
             <form className='font-Poppins' encType='multipart/form-data' >
                <div className="flex justify-between">
                    <h1 className='formTitle'>Faculty Ranking Form</h1>
                    <h1 className='formTitle'>{rest?.applyingFor}</h1>
                </div>
                <PersonalInformation
                    name={rest.name}
                    college={rest.college}
                    department={rest.department}
                    currentRank={rest.currentRank}
                    status={rest.userStatus}
                    academicYear={rest.academicYear}
                />

                <div className='pt-4'>
                    <h1 className='text-base font-semibold text-[#35408E] mb-1'>Qualification</h1>
                    
                    {selectedRank?.requirements.map((requirement, i) => (
                        <SubmittedFields
                            key={requirement._id}
                            requirement={requirement.description}
                            filePath={rest?.requirements[i].files[0]?.filePath}
                            fileName={rest?.requirements[i].files[0]?.fileName}
                        />
                    ))}

                    <div className='flex justify-end mt-4'>
                        <Link to="/application" className='text-sm py-2 px-12 duration-300 mr-3 bg-[#E8E8E8] rounded hover:bg-[#bcbbbb]'>Return</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ViewSubmitted
