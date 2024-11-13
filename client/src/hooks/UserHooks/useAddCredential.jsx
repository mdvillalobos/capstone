import axios from "axios";
import useToast from '../Helpers/useToast.jsx';
import { useContext } from "react";
import { UserContext } from "../../../context/userContext.jsx";

const useAddCredential = () => {
    const { Toast, LoadingToast } = useToast();
    const { getProfileOnLogin } = useContext(UserContext)

    const AddCredential = async (category, file, code, setIsSubmitted) => {
        if(!category || !file ) {
            Toast.fire({
                icon: 'error',
                title: 'Required all fields!'
            })
            return setIsSubmitted(false)
        }

        LoadingToast.fire({
            title: 'Adding...'
        });

        try {
            const formData = new FormData();
            formData.append('category', category);
            formData.append('file', file);
            formData.append('code', code);
            

            for (let [key, value] of formData.entries()) {
             console.log(key, ':', value);
            }
            const { data } = await axios.post('/api/addCredential', formData);

            if(data.error) {
                Toast.fire({
                    icon: 'error',
                    title: data.error
                })
                return setIsSubmitted(false)
            }
            else {
                Toast.fire({
                    icon: 'success',
                    title: 'Created Successfully.'
                });
                getProfileOnLogin();
            }
        }
        catch (error) {
            console.error(`Error Adding Education ${ error.message }`)
        }
    }

    return { AddCredential }
}

export default useAddCredential
