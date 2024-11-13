import axios from 'axios';
import useToast from "../Helpers/useToast.jsx";
import useLogout from '../AuthHooks/useLogout.jsx';

const useChangePassword = () => {
    const { Toast, LoadingToast } = useToast();

    const ChangePassword = async (newPassword, confirmNewPassword, setIsSubmitted, setUserIsVerified) => {

        console.log(newPassword, confirmNewPassword)
        if(!newPassword || !confirmNewPassword) {
            Toast.fire({
                icon: "error",
                title: 'Required all the fields'
            });
            return setIsSubmitted(false);
        }

        if(newPassword !== confirmNewPassword) {
            Toast.fire({
                icon: "error",
                title: "Password don't matched!"
            });
            return setIsSubmitted(false);
        }

        LoadingToast.fire({
            title: 'Updating your password...'
        })

        try {
            const { data } = await axios.post('/api/changepassword', {
                newPassword, confirmNewPassword
            })
      
            if(data.error){
                Toast.fire({
                    icon: "error",
                    title: data.error
                });
                return setIsSubmitted(false);
            }

            else {
                Toast.fire({
                    icon: "success",
                    title: 'Password updated succesfully!'
                });
                setUserIsVerified(false);
                return setIsSubmitted(false);
            }

        } catch (error) {
            console.error(`Change Password Error: ${ error.message }`);
            setIsSubmitted(false)
        }
    }
    return { ChangePassword }
}

export default useChangePassword
