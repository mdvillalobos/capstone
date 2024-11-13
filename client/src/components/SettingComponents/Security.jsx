import React, { useState, useEffect } from 'react';
import useChangePassword from '../../hooks/UserHooks/useChangePassword.jsx'
import useVerifyUser from '../../hooks/UserHooks/useVeriifyUser.jsx';
import useSendOTP from '../../hooks/AuthHooks/useSendOTP.jsx';
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { PiWarningCircleFill } from "react-icons/pi";

const Security = () => {
    const { ChangePassword } = useChangePassword();
    const { VerifyUser } = useVerifyUser();
    const { resendOTP } = useSendOTP();

    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const [ isVerifyOpen, setIsVerifyOpen ] = useState(false);
    const [ isUserVerified, setUserIsVerified ] = useState(false);
    const [ isPasswordValid, setIsPasswordValid ] = useState(false);

    const [ showNewPass, setShowNewPass ] = useState(false);
    const [ showConfirmPass, setShowConfirmPass ] = useState(false);

    const [ resendButton , setResendButton ] = useState(false);
    const [ timer, setTimer ] = useState(0);
  
    const [ otp, setOtp ] = useState('')
    const [ data, setData ] = useState({
      newPassword: '',
      confirmNewPassword: '',
    })

    useEffect(() => {
        if(!resendButton) {
            const time = setInterval(() => {
                setTimer((prevTimer ) => prevTimer - 1);
            }, 1000)
    
            if(timer === 0) {
                setResendButton(true);
                setTimer(20);
            }
            return () => clearInterval(time);
        }
    }, [resendButton, timer]);
    
    const handleResendOtp = async () => {
        setResendButton(false);
        resendOTP();
    }

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setIsSubmitted(true)
        await VerifyUser(otp, setOtp, setIsSubmitted, setIsVerifyOpen ,setUserIsVerified)
    }
    
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setIsSubmitted(true)
        await ChangePassword(data.newPassword, data.confirmNewPassword, setIsSubmitted, setUserIsVerified)
    }
  
    return (
        <div className="">
            <div className="flex py-3 border-b-2">
                <p className='my-4 w-96 font-medium'>Password</p>

                {!isVerifyOpen && !isUserVerified && (
                    <div className={`flex justify-end w-full ${isVerifyOpen ? 'hidden' : 'hidden'}}`}>
                        <button 
                            type='button'
                            className={`text-white bg-NuButton hover:bg-NuButtonHover duration-200 hover:scale-105 rounded-lg my-auto py-1.5 px-8 text-sm`} 
                            onClick={() => setIsVerifyOpen(!isVerifyOpen)}
                        >
                            Change password
                        </button>
                    </div>
                )}

                {isVerifyOpen && (
                    <div >
                        <p className='text-xl mb-2 font-medium'>Verify your identity</p>
                        
                        <div className="flex bg-[#f4f5fa] text-[#737c8d] w-[30vw] p-2 my-4">
                            <span><PiWarningCircleFill className='text-xl mt-0.5 mr-2'/></span>
                            <p className='text-sm'>For your protection, kindly click <b>Send OTP</b> to send a verification code to the email associated with this account. Check your email and enter the code below to continue.</p>
                        </div>
                    
                        <div className="flex w-[30vw]">
                            <div className="setting-input-container flex">
                                <input type="text"
                                    value={otp} 
                                    maxLength='6'
                                    placeholder='Enter your code'
                                    onChange={(e) => setOtp(e.target.value)}
                                    className='border-2 rounded-lg px-3 py-3 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2] text-sm'
                                />
                                <button className='text-center text-blue-500 ml-2 hover:underline duration-300 w-32 text-sm' onClick={handleResendOtp} disabled={!resendButton}>
                                    {!resendButton ?  `Resend in ${timer}` : "Send OTP"}
                                </button>
                            </div> 
                        </div>
                    </div>
                )}

                {isUserVerified && (
                    <div className=" space-y-3">
                        <div className="flex bg-[#f4f5fa] text-[#737c8d] w-[30vw] p-2 my-4">
                            <span><PiWarningCircleFill className='text-xl mt-0.5 mr-2'/></span>
                            <p className='text-[0.8rem] bg-[#f4f5fa] text-gray-500 w-[30vw]'>
                                Your password must contain at least one uppecase and lowercase letter, number and a special character (_-@#$&!).
                            </p>
                        </div>

                        <div className="flex space-x-4 w-[30vw]">
                            <div className="setting-input-container">
                                <input type={showNewPass ? 'text' : 'password'}
                                    required
                                    maxLength='20'
                                    value={data.newPassword} 
                                    onChange={(e) => setData({...data, newPassword: e.target.value})}
                                    className='border-2 rounded-lg px-3 peer pt-6 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2] text-sm'
                                />

                                <span className='setting-input-label'>New password</span>

                                <button type='button'  onClick={() => setShowNewPass  ((prev) => !prev)} className='absolute right-2 top-[0.8rem] text-gray-500 hover:bg-gray-300 rounded-full py-1.5 px-1.5 duration-200'>
                                    {showNewPass ? <FaEyeSlash size="20px" opacity="80%"/> : <IoEyeSharp size="20px" opacity="80%"/>}
                                </button>
                            </div> 
                        </div>
      
                        <div className="flex space-x-4 w-[30vw]">
                            <div className="setting-input-container">
                                <input type={showConfirmPass ? 'text' : 'password'}
                                    required
                                    maxLength='20'
                                    value={data.confirmNewPassword} 
                                    onChange={(e) => setData({...data, confirmNewPassword: e.target.value})}
                                    className='border-2 rounded-lg px-3 peer pt-6 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2] text-sm'
                                />
                                <span className='setting-input-label'>Confirm password</span>

                                <button type='button'  onClick={() => setShowConfirmPass((prev) => !prev)} className='absolute right-2 top-[0.8rem] text-gray-500 hover:bg-gray-300 rounded-full py-1.5 px-1.5 duration-200'>
                                    {showConfirmPass ? <FaEyeSlash size="20px" opacity="80%"/> : <IoEyeSharp size="20px" opacity="80%"/>}
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </div>
  
            {isVerifyOpen && (
                <div className="flex justify-end mt-4 space-x-4">
                    <button type='button' className='bg-gray-300 w-28 py-2 hover:shadow-lg rounded-lg duration-300 text-sm' onClick={() => setIsVerifyOpen(!isVerifyOpen)}>
                        Cancel
                    </button>

                    <button type='button' className='bg-NuButton hover:bg-NuButtonHover w-28 text-white py-2 hover:shadow-lg rounded-lg duration-300 text-sm' onClick={handleVerifyOtp}>
                    { isSubmitted ? 'Verifying...' : 'Verify'}
                    </button>
                </div>
            )}

            {isUserVerified && (
                <div className="flex justify-end mt-4 space-x-4">
                    <button type='button' className='bg-gray-300 w-28 py-2 hover:shadow-lg rounded-lg duration-300 text-sm' onClick={() => setUserIsVerified(!isUserVerified)}>
                        Cancel
                    </button>
                    
                    <button type='button' className='bg-NuButton hover:bg-NuButtonHover w-28 text-white py-2 hover:shadow-lg rounded-lg duration-300 text-sm' onClick={handleChangePassword}>
                    { isSubmitted ? 'Saving...' : 'Save'}
                    </button>
                </div>
            )}
        </div>
    )
} 

export default Security
