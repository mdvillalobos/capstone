import axios from 'axios'
import useToast from '../Helpers/useToast.jsx'

const useCreateRank = () => {
    const { Toast } = useToast();
    const createRank = async (rankName, track, requirements, props) => {
      try {
        /* const reviewRequirements = [
          requirement_1,
          requirement_2,
          requirement_3,
          requirement_4,
          requirement_5,
          requirement_6,
          requirement_7,
          requirement_8,
          requirement_9,
          requirement_10
        ];

        reviewRequirements.forEach((req, index) => {
          if (req !== '') {
              requestBody[`requirement_${index + 1}`] = req;
          }
        }); */

        const { data } = await axios.post('/api/createRank', { rankName, track, requirements });

        if(data.error) {
          Toast.fire({
            icon: "error",
            title: data.error
          });
        }

        else {
          props.toggle();
        }

      } catch (error) {
        console.error(`Create Rank Error: ${ error.message }`);
      }
    }
    return { createRank }
}

export default useCreateRank
