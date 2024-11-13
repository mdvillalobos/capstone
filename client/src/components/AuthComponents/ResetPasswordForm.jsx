import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { LuEye, LuEyeOff  } from "react-icons/lu";
import { PiWarningCircleFill } from "react-icons/pi";
import useResetPassword from '../../hooks/AuthHooks/useResetPassword';
import Loader from '../Tools/Loader';

import useToast from '../../hooks/Helpers/useToast';

const ResetPasswordForm = () => {
  const { ResetPassword } = useResetPassword();
  const { Toast } = useToast();
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showConfirm, setShowConfirm ] = useState(false);
  const [ data, setData ] = useState({ password: '', confirmPassword: '' })
  const [ isPasswordValid, setIsPasswordValid ] = useState(false);
  const [ isSubmitted, setIsSubmitted ] = useState(false)
  const [ isHovered, setIsHovered ] = useState({
    passwordHover: false,
    confirmHover: false
  });

  const [ shake, setShake ] = useState({
    password: false,
    confirm: false,
});

  const checkPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@\-_&$]).{8,}$/;
    return regex.test(password);
  } 


  useEffect(() => {
    setIsPasswordValid(checkPassword(data.password));
  })

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if(!data.password || !data.confirmPassword) {
      setShake({ password: true, confirm: true}),
      setTimeout(() => {
          setShake({ password: false, confirm: false });
      }, 500);

      return Toast.fire({
          icon: "error",
          title: 'Required all fields'
      });
    }

    if(!isPasswordValid ) {
      setShake({ password: !isPasswordValid}),
      setTimeout(() => {
          setShake({ password: false, confirm: false });
      }, 500);
      return;
    }
    setIsSubmitted(true)
    await ResetPassword(data.password, data.confirmPassword, setIsSubmitted)
  }

  return (
    <div>
      <form onSubmit={handleResetPassword} className='auth-container'>
        <div className={`auth-input-container relative ${data.password ? (isPasswordValid) ? 'focus-within:border-[#93adc2]' : 'border-red-400' : 'focus-within:border-[#93adc2]'} ${shake.password ? 'shake' : ''}`}>
          <input 
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            maxLength='20'
            value={data.password}
            onChange={(e) => setData({...data, password: e.target.value})}
            className='auth-input-field'
          />

          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowPassword((show) => !show)}
            edge="end"
          >
             {showPassword ? <LuEyeOff size="18px" className='mr-1.5'/> : <LuEye size="18px" className='mr-1.5'/>}
          </IconButton>

          {data.password ? (isPasswordValid) ? null : ( 
            <div className="absolute right-[-25px] top-4 z-10" onMouseEnter={() => setIsHovered({ passwordHover: true })} onMouseLeave={() => setIsHovered({ passwordHover: false})}>
                <PiWarningCircleFill size={'1.2rem'} className='text-red-400 cursor-pointer'/>
                <div className={`${isHovered.passwordHover ? 'visible arrow' : 'hidden'}`}></div>
                <p className={`${isHovered.passwordHover ? 'visible absolute right-[-65px] top-[33px] bg-red-400 p-2 text-xs rounded-md w-60 text-white' : 'hidden'}`}>Please enter at least 8 characters with a number, symbol, uppercase and lowercase letter.</p>
            </div> 
          ) : null}
        </div>

        {data.password ? (isPasswordValid) ? null : ( 
            <p className='text-[0.7rem] text-red-400 font-medium mx-1 absolute'>Invalid password format.</p>
        ) : null}

        <div  className={`auth-input-container focus-within:border-[#93adc2] ${shake.confirm ? 'shake' : ''}`}>
          <input 
            type={showConfirm ? 'text' : 'password'}
            maxLength='20'
            placeholder='Confirm password'
            value={data.confirmPassword}
            onChange={(e) => setData({...data, confirmPassword: e.target.value})}
            className='auth-input-field'
          />
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowConfirm((show) => !show)}
            edge="end"
          >
             {showConfirm ? <LuEyeOff size="18px" className='mr-1.5'/> : <LuEye size="18px" className='mr-1.5'/>}
          </IconButton>
        </div>
        <div className="flex flex-col mt-6">
          <button type='submit' className='formBtn' disabled={isSubmitted} >
            <span className='my-auto'>
              {isSubmitted ? <Loader/> : 'Confirm'}
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default ResetPasswordForm