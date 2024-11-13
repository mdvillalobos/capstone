import axios from "axios"
import useToast from "../Helpers/useToast.jsx";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext.jsx";

const useUpdateName = () => {
  const { Toast, LoadingToast } = useToast();
  const { getProfileOnLogin } = useContext(UserContext);

  const UpdateProfile = async (profile, lastName, firstName, middleName, contact, college, department, status, setIsSubmitted) => {
    LoadingToast.fire({
      title: 'Updating...'
    });

    try {

      const formData = new FormData();
      formData.append('lastName', lastName)
      formData.append('firstName', firstName)
      formData.append('middleName', middleName)
      formData.append('contact', contact)
      formData.append('college', college)
      formData.append('department', department)
      formData.append('status', status)

      if(profile) {
        formData.append('profilePicture', profile)
      }

      const { data } = await axios.post('/api/updateProfile' , formData);
    
      if(data.error) {
        Toast.fire({
          icon: "error",
          title: data.error
        });
        return setIsSubmitted(false)
      }

      else {
        getProfileOnLogin();
        Toast.fire({
          icon: "Success",
          title: 'Profile successfully updated!'
        });
        return setIsSubmitted(false)
      }

    } catch (error) {
      console.error(`Edit Profile Error: ${ error.message }`);
      setIsSubmitted(false)
    }
  }
  return { UpdateProfile }
}

export default useUpdateName
