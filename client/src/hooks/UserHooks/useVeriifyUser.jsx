import axios from 'axios';
import useToast from '../Helpers/useToast.jsx'

const userVerifyUser = () => {
    const { Toast, LoadingToast } = useToast();

    const VerifyUser = async ( otp, setOtp, setIsSubmitted, setIsVerifyOpen, setUserIsVerified ) => {
        if(!otp) {
            Toast.fire({
                icon: 'error',
                title: 'Kindle enter yout OTP!'
            });
            return setIsSubmitted(false)
        }

        LoadingToast.fire({ title: 'Verifying you OTP...'});

        try {
            const { data } = await axios.post('/api/verifyEmail', { otp });
    
            if(data.error) {
                Toast.fire({
                    icon: 'error',
                    title: data.error,
                });
                return setIsSubmitted(false)
            }

            else {
                LoadingToast.close();
                setIsSubmitted(false)
                setIsVerifyOpen(false)
                setOtp('')
                return setUserIsVerified(true);
            }
        }

        catch (error) {
            console.error(`User Verification Error: ${ error.message }`)
            setIsSubmitted(false)
        }

        
    }

    return { VerifyUser }

}

export default userVerifyUser
