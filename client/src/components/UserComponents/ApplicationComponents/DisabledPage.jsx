import React from 'react'
import { useNavigate } from 'react-router-dom'
import Done from '../../../assets/images/done.webp';

const DisabledPage = ({ rest }) => {
    const navigate = useNavigate();

    const viewSubmitted = (rest) => {
        navigate('/myform', { state: { myForm: rest }})
    }

    return (
        <div className='flex flex-col justify-center space-y-6 my-8'>
            <img src={Done} alt="" className='h-48 w-64 mx-auto'/>
            <div className="text-center space-y-4">
                <h1 className='text-4xl font-medium'>Application Submitted Successfully!</h1>
                <div className="text-gray-500 space-y-4">
                    <p>Thank you for applying for the position <b>{rest.applyingFor}</b>.Your application is currently <b>For Approval</b> <br/>Our team will review your submitted application and will contact once it done.</p>
                    <p>We appreciate your submission. Thank you!</p>
                </div>
            </div>
            <div className="flex justify-center">
                <button type='button' className='bg-NuButton hover:bg-NuButtonHover text-white duration-200 rounded-md px-10 py-2' onClick={() => viewSubmitted(rest)}>View my application</button>
            </div>
        </div>
    )
}

export default DisabledPage
