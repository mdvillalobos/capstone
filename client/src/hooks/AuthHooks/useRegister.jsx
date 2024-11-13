import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';

const useRegister = () => {
    const navigate = useNavigate();
    const { Toast, LoadingToast } = useToast();
    
    const Register = async (employeeID, email, password, confirm, setIsSubmitted) => {
        if(!employeeID || !email || !password) {
            return Toast.fire({
                icon: "error",
                title: 'Required all fields.'
            });
        }

        LoadingToast.fire({
            title: 'Registering your data. Please wait.'
        });
        try {
            const { data } = await axios.post('/api/register', {
                employeeID, email, password, confirm
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
                navigate('/emailverification');
            }
        } catch (error) {
            console.error(`Registration Error: ${ error.message }`);
            setIsSubmitted(false)
        }
    }
    return { Register }
}

export default useRegister
