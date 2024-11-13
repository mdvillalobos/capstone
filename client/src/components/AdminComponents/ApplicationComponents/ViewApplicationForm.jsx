import React, { useState, useContext } from 'react';
import { RankContext } from '../../../../context/rankContext.jsx';
import { FocusOn } from 'react-focus-on';
import ApplicationMaster from './ViewFormComponents/UserDetails.jsx';
import ApplicationInput from './ViewFormComponents/ApplicationInputs.jsx';
import useSubmitReview from '../../../hooks/AdminHooks/useSubmitReview.jsx';
import useToast from '../../../hooks/Helpers/useToast.jsx';
import Remarks from './ViewFormComponents/Remarks.jsx';

const ViewApplicationForm = ({ rest }) => {
    const { ranks } = useContext(RankContext);
    const { Toast } = useToast();
    const { submitReview } = useSubmitReview();

    console.log(rest)

    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const [ isRemarksOpen, setIsRemarkOpen ] = useState(false);
    const [ remarks, setRemarks ] = useState('');
    const [ decision, setDecision ] = useState('Approved');
    const [ checkedReq1, setCheckedReq1 ] = useState(null);
    const [ checkedReq2, setCheckedReq2 ] = useState(null);
    const [ checkedReq3, setCheckedReq3 ] = useState(null);
    const [ checkedReq4, setCheckedReq4 ] = useState(null);
    const [ checkedReq5, setCheckedReq5 ] = useState(null);
    const [ checkedReq6, setCheckedReq6 ] = useState(null);
    const [ checkedReq7, setCheckedReq7 ] = useState(null);
    const [ checkedReq8, setCheckedReq8 ] = useState(null);
    const [ checkedReq9, setCheckedReq9 ] = useState(null);
    const [ checkedReq10, setCheckedReq10 ] = useState(null);

    const stateValues = [
        { value: checkedReq1, setValue: setCheckedReq1 },
        { value: checkedReq2, setValue: setCheckedReq2 },
        { value: checkedReq3, setValue: setCheckedReq3 },
        { value: checkedReq4, setValue: setCheckedReq4 },
        { value: checkedReq5, setValue: setCheckedReq5 },
        { value: checkedReq6, setValue: setCheckedReq6 },
        { value: checkedReq7, setValue: setCheckedReq7 },
        { value: checkedReq8, setValue: setCheckedReq8 },
        { value: checkedReq9, setValue: setCheckedReq9 },
        { value: checkedReq10, setValue: setCheckedReq10 },
    ];

    const selectedRank = ranks?.find(requirement => requirement.rankName === rest?.applyingFor);

    const handleRemarks = async (decision) => {
        for (let i = 0; i < selectedRank.requirements.length;  i++) {
            if (selectedRank.requirements[i] !== null && !stateValues[i].value) {
                return Toast.fire({
                    icon: 'error',
                    title: 'Review all fields!'
                });
            }
        }
        setDecision(decision);

        if(decision === 'Approved') {
            setIsSubmitted(!isSubmitted);
        }

        else {
            setIsRemarkOpen(!isRemarksOpen);
        }

    }

    const handleExitConfirmModal = () => {
        setIsSubmitted(!isSubmitted)
    }

    const handleSubmitReview = async () => {
        await submitReview(rest?._id, decision, checkedReq1, checkedReq2, checkedReq3, checkedReq4, checkedReq5, checkedReq6, checkedReq7, checkedReq8, checkedReq9, checkedReq10, remarks);
    }

    return (
        <div>
            {isSubmitted ? (
                <FocusOn>
                    <ConfirmModal 
                        handleExit={() => setIsSubmitted(!isSubmitted)}
                        decision={decision}
                        handleSubmit={handleSubmitReview}
                    />
                </FocusOn>
            ) : null}
            {isRemarksOpen ? (
                <FocusOn>
                    <Remarks
                        handleSubmit={() => { setIsSubmitted(!isSubmitted), setIsRemarkOpen(!isRemarksOpen) }}
                        handleExit={() => setIsRemarkOpen(!isRemarksOpen)}
                        remarks={remarks}
                        setRemarks={setRemarks}
                    />
                </FocusOn>
            ) : null}
            <div className='font-Poppins z-0'>
                <div className="flex justify-between">
                    <h1 className='formTitle'>Faculty Ranking Form</h1>
                    <h1 className='formTitle'>{rest?.applyingFor}</h1>
                </div>
                <ApplicationMaster 
                    name={rest?.name}
                    college={rest?.college}
                    department={rest?.department}
                    currentRank={rest?.currentRank}
                    status={rest?.userStatus}
                    academicYear={rest?.academicYear}
                />
                <div className='py-4'>
                    <h1 className='text-base font-semibold text-[#35408E] mb-4'>Qualification</h1>
                    <div>
                        {selectedRank?.requirements?.map((data, i) => {
                            const filePath = rest?.requirements[i] ? rest?.requirements[i].files[0]?.filePath : null
                            const fileName = rest?.requirements[i] ? rest?.requirements[i].files[0]?.fileName : null
                            return <div key={data._id}>
                                <ApplicationInput
                                    requirement={data?.description}
                                    filePath={filePath}
                                    fileName={fileName}
                                    checkedValue={stateValues[i].value}
                                    setCheckedValue={stateValues[i].setValue}
                                />
                            </div>
                        })}
                        <div className="flex justify-end space-x-4 mt-4">
                            {(checkedReq1 === 'Declined' || 
                            checkedReq2 === 'Declined' || 
                            checkedReq3 === 'Declined' || 
                            checkedReq4 === 'Declined' || 
                            checkedReq5 === 'Declined' ||
                            checkedReq6 === 'Declined' ||
                            checkedReq7 === 'Declined' || 
                            checkedReq8 === 'Declined' || 
                            checkedReq9 === 'Declined' || 
                            checkedReq10 === 'Declined') ? (
                                <button onClick={() => handleRemarks('Declined')} className='bg-red-500 py-3 px-12 text-white hover:bg-red-400 duration-200 text-sm rounded-lg '>Decline</button>
                            ) : (
                                <button onClick={() => handleRemarks('Approved')} className='bg-NuButton py-3 px-12 text-white hover:bg-NuButtonHover duration-200 text-sm rounded-lg '>Approved</button>
                            )}
                
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewApplicationForm


const ConfirmModal = ({ handleExit, decision, handleSubmit }) => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
            <div className="h-[35%] w-[32%] bg-white shadow-lg rounded-2xl px-6 py-6 space-y-5 overflow-hidden fade-in max-sm:h-[72%] max-sm:w-[85%]">
                <div className="flex flex-col items-center h-full">
                    <button type='button' onClick={handleExit} className='text-4xl absolute right-2 top-1 duration px-2 hover:bg-gray-200 rounded-full translate-y-1'>&times;</button>
                    <div className="text-center space-y-4 mt-4">
                        <h1 className='text-4xl font-semibold'>Are you sure?</h1>
                        <p className=''>
                            Are you sure you want to {decision === 'Approved' ? (<span className='text-green-600 mr-1 font-medium'>{decision}</span>) : (<span className='text-red-600 mr-1 font-medium'>{decision}</span>)} 
                            this application? <br/>This action cannot be undone.
                        </p>
                    </div>

                    <div className="space-x-4 mt-10">
                        <button type='button' className='py-2.5 w-48 rounded-md duration-200 border-2 border-black hover:bg-gray-100' onClick={handleExit}>Cancel</button>
                        <button type='button' onClick={handleSubmit} className='py-2.5 w-48 rounded-md bg-NuButton duration-200 text-white hover:bg-NuButtonHover'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

