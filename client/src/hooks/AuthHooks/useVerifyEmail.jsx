import { useContext } from 'react';
import { RankContext } from '../../../context/rankContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';
import { UserContext } from '../../../context/userContext.jsx';

const useVerifyEmail = () => {
    const { Toast, LoadingToast } = useToast();
    const navigate = useNavigate();
    const { fetchApplicationConfigOnLogin } = useContext(RankContext);
    const { getProfileOnLogin } = useContext(UserContext)

    const verifyEmail = async (otp, setIsSubmitted) => {
        if(!otp || otp.length < 6) {
            Toast.fire({
                icon: "error",
                title: 'Required all fields'
            });
            return setIsSubmitted(false)
        }

        LoadingToast.fire({
            title: 'Verifying OTP...'
        });
        try {
            const { data } = await axios.post('/api/verifyEmail' , {
                otp,
            });
      
            if(data.error) {
                Toast.fire({
                    icon: "error",
                    title: data.error
                });
                return setIsSubmitted(false)
            }
            else {
                await Promise.all([
                    fetchApplicationConfigOnLogin(),
                    getProfileOnLogin()
                ]);
                navigate('/profileregistration');
                LoadingToast.close();
            }
        } catch (error) {
            console.error(`Email Verification Error: ${ error.message }`);
            setIsSubmitted(false)
        }
    }
    return { verifyEmail }
}

export default useVerifyEmail
