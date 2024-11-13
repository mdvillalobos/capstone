import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToast from '../Helpers/useToast.jsx';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext.jsx';
import { RankContext } from '../../../context/rankContext.jsx';

const useRegisterProfile = () => {
    const { fetchApplicationConfigOnLogin } = useContext(RankContext);
    const { getProfileOnLogin } = useContext(UserContext);
    const { Toast, LoadingToast } = useToast();
    const navigate = useNavigate();

    const registerProfile = async (setIsSubmitted, profilePicture, lastName, firstName, middleName, contact, sex, status, track, rank, college, department) => {
        if(!lastName || !firstName || !sex || !track || !rank || !department || !college, !position) {
            Toast.fire({
                icon: "error",
                title: 'Required all fields.'
            });
            return setIsSubmitted(false)
        }

        LoadingToast.fire({
            title: 'Registering your data. Please wait!'
        })
        try {
            const formData = new FormData();
            formData.append('profilePicture', profilePicture);
            formData.append('lastName', lastName);
            formData.append('firstName', firstName);
            formData.append('middleName', middleName);
            formData.append('contact', contact);
            formData.append('sex', sex);
            formData.append('status', status);
            formData.append('track', track);
            formData.append('rank', rank);
            formData.append('college', college)
            formData.append('department', department);

            const { data } = await axios.post('/api/registeProfile', formData);
        
            if(data.error) {
                Toast.fire({
                    icon: "error",
                    title: data.error
                });
                return setIsSubmitted(false)
            }
            else {
                await Promise.all([
                    getProfileOnLogin(),
                    fetchApplicationConfigOnLogin(),
                ]);
                LoadingToast.close();
                navigate('/home');
            }
        } catch (error) {
            console.error(`Profile registration error ${ error.message }`);
            setIsSubmitted(false)
        }
    }

    return {registerProfile}
}

export default useRegisterProfile
