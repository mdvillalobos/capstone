import axios from "axios";
import useToast from "../Helpers/useToast";

const useRegisterAdmin = () => {
    const { Toast, LoadingToast } = useToast();

    const RegisterAdmin = async (employeeID, email, firstName, lastName, middleName, sex, contact, password, role, adminPassword, setIsSubmitted, props) => {

        if(!adminPassword) {
            Toast.fire({ 
                icon: 'error',
                title: 'Require all fields'
            })

            return setIsSubmitted(false)
        }

        LoadingToast.fire({ title: 'Registering admin..'})

        try {
            const { data } = await axios.post('/api/registerAdmin', {
                employeeID, email, firstName, lastName, middleName, sex, contact, password, role, adminPassword
            })

            if(data.error) {
                Toast.fire({
                    icon: 'error',
                    title: data.error
                })

                return setIsSubmitted(false)
            }

            else {
                Toast.fire({
                    icon: 'Success',
                    title: 'Account created Succesfully'
                })
                setIsSubmitted(false)
                return props.toggle();
            }
        } catch (error) {
            console.log(error)
            setIsSubmitted(false)
        }

    }

    return { RegisterAdmin }

}

export default useRegisterAdmin
