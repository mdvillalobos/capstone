import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';

const useVerifyOtp = () => {
    const { Toast, LoadingToast } = useToast();
    const navigate = useNavigate();
    const VerifyUserOtp = async (otp, setIsSubmitted) => {
        if(!otp || otp.length < 6) {
            return  Toast.fire({
                icon: "error",
                title: 'Required all fields'
            });
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
                LoadingToast.close();
                return navigate('/resetpassword');
            }
        } catch (error) {
            console.error(`OTP Verification Error: ${ error.message }`);
            setIsSubmitted(false)
        }
    }
    return { VerifyUserOtp }
}

export default useVerifyOtp
