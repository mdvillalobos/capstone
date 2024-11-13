import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';

const useFindEmail = () => {
    const navigate = useNavigate();
    const { Toast, LoadingToast } = useToast();
    
    const findEmail = async (email, setIsSubmiited) => {
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if(!regex.test(email)) {
            return Toast.fire({
                icon: "error",
                title: 'Please enter a valid email.'
            });
        }
        
        if(!email) {
            return Toast.fire({
                icon: "error",
                title: 'Required all fields'
            });
        }

        LoadingToast.fire({ 
            title: 'Verifying your email. Please wait!'
        })

        try {
            const { data } = await axios.post('/api/forgot', {
                email,
            })

            if(data.error) {
                Toast.fire({
                    icon: "error",
                    title: data.error
                });
                return setIsSubmiited(false)
            }
            else {
                LoadingToast.close();
                navigate('/verifyotp');
                return Toast.fire({
                    icon: "success",
                    title: 'Check your email.'
                });
            }
        }
        catch(error) {
            console.error(`Finding Email Error: ${ error.message }`);
            setIsSubmiited(false);
        }
    }
    return {findEmail}
}

export default useFindEmail
