import axios from 'axios'
import useToast from '../Helpers/useToast.jsx'

const useSaveConfiguration = () => {
    const { Toast, LoadingToast } = useToast();

    const saveConfiguration = async (password, id, academicYear, isPageOpen, setIsSave, isSave) => {
      LoadingToast.fire({ title: 'Updating Configurations....'})
      try {
        const { data } = await axios.post('/api/updateConfig', {
            password, id, academicYear, isPageOpen
        });

        if(data.error) {
          return Toast.fire({
            icon: "error",
            title: data.error
          });
        }

        else {
          LoadingToast.close();
          setIsSave(!isSave);
          location.reload();
        }

      } catch (error) {
        console.error(`Create Rank Error: ${ error.message }`);
      }
    }
    return { saveConfiguration }
}

export default useSaveConfiguration
