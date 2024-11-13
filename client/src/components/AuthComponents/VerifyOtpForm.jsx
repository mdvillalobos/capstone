import React, { useState, useEffect, useRef } from 'react';
import useVerifyOtp from '../../hooks/AuthHooks/useVerifyOtp';
import useSendOTP from '../../hooks/AuthHooks/useSendOTP';
import Loader from '../Tools/Loader';

const verifyOtpForm = () => {
  const { resendOTP } = useSendOTP();
  const { VerifyUserOtp } = useVerifyOtp();
  const [ resendButton , setResendButton ] = useState(false);
  const [ isSubmitted, setIsSubmitted ] = useState(false)
  const [ timer, setTimer ] = useState(20);
  const [ data, setData ] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value) || value === '') {
      const OTPdata = [...data];
      OTPdata[index] = value;
      setData(OTPdata);

      if (value && index < data.length - 1) {
        inputRefs.current[index + 1].focus();
      } else if (!value && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

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
  }, [ resendButton, timer ]);

  const handleResendOtp = async () => {
    setResendButton(false);
    resendOTP();
  }

  const hanldeOtpVerification = async (e) => {
    e.preventDefault();
    const otp = data.join('');
    setIsSubmitted(true)
    await VerifyUserOtp(otp, setIsSubmitted);
  }

  return (
    <div>
      <form onSubmit={hanldeOtpVerification} className='auth-container'>    
        <div className="flex gap-3 justify-center mb-4">
          {data.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength="1"
              className='border-2 w-[50px] h-16 text-center font-Poppins font-semibold rounded-md text-xl'
            />
          ))}
        </div>

        <div className="flex flex-col mt-6">
          <button type='submit' className='formBtn' disabled={isSubmitted} >
            <span className='my-auto'>
              {isSubmitted ? <Loader/> : 'Verify'}
            </span>
          </button>
        </div>
      </form>
      <p className='flex justify-center mt-4 text-sm max-[396px]:flex-col max-[396px]:text-center max-[396px]:text-[0.8rem] font-Poppins'>Didn't receive one time pin? 
        <button className='cursor-pointer text-center text-blue-500 ml-2 hover:underline duration-300' onClick={handleResendOtp} disabled={!resendButton}>
          {!resendButton ?  `Resend in ${timer}` : "Resend"}
        </button>
      </p>
    </div>
  )
}

export default verifyOtpForm