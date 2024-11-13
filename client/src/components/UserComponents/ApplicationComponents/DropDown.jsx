import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RankContext } from '../../../../context/rankContext';
import { UserContext } from '../../../../context/userContext';
import { RiArrowDropDownLine,  RiArrowDropUpLine } from "react-icons/ri";
import { FaCircleCheck } from "react-icons/fa6";
import ViewImage from './ViewImage';
import useSubmitApplication from '../../../hooks/ApplicationHooks/useSubmitApplication';

const Requirements = () => {
  const navigate = useNavigate();
  const { SubmitForm } = useSubmitApplication();
  const { ranks, config } = useContext(RankContext);
  const { credentials, user } = useContext(UserContext);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ selected, setSelected ] = useState();
  const [ userRequirement, setUserRequirement ] = useState([]);
  const [ isSubmitted, setIsSubmitted] = useState(false)

  const filterRankByTrack = ranks?.filter(rankBasedOnTrack => rankBasedOnTrack.track === user.track);
  const currentRankIndex = filterRankByTrack?.findIndex(rank => rank.rankName === user?.rank);
  const availableRank = filterRankByTrack?.slice(currentRankIndex + 1);
  const selectedRank = ranks?.find(rankRequirement => rankRequirement.rankName === selected);

  useEffect(() => {
    if (ranks) {
      setSelected(availableRank.length > 0 ? availableRank[0].rankName : null);
    }
  }, [ranks, user.track]);
  
  useEffect(() => {
    if (!selectedRank || !credentials?.files) return;

    const getMatchedFiles = (requirementCodes) => {
      return credentials.files.filter(file => requirementCodes.includes(file.code));
    };

    const createRequirementObject = (requirement, matchedFiles) => {
      const files = matchedFiles 
        ? matchedFiles.slice(0, requirement.minRequirement).map(file => ({
            filePath: file.filePath,
            fileName: file.fileName,
          }))
        : Array(requirement.minRequirement).fill({ filePath: null, fileName: null });
  
      return {
        requirementNumber: requirement.requirementNumber,
        files,
      };
    };
    
      const updatedRequirements = selectedRank.requirements.map(requirement => {
        const requirementCodes = requirement.requirementCode.split(/[\s,]+/).map(code => code.trim()).filter(Boolean);
        const matchedFiles = getMatchedFiles(requirementCodes);
        return createRequirementObject(requirement, matchedFiles);
      });
    
      setUserRequirement(updatedRequirements);

  }, [selectedRank, credentials]); 

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = user?.firstName + user?.lastName
    await SubmitForm(name, user?.college, user?.department, user?.rank, user?.status, config[0]?.academicYear, selected, user?.track, userRequirement, setIsSubmitted)
    /* console.log(userRequirement)
    return navigate('/application/form', { state: { selectedForm: selected, data: userRequirement }})  */
  }

  return (
    <div>
      <div className="w-full relative max-sm:text-sm">
        <div className="flex justify-between rounded-lg text-ellipsis overflow-hidden whitespace-nowrap border-2 border-[#93adc2] py-1 px-2 mt-3 max-sm:py-0.5 max-sm:px-0.5">
          <button type='button' onClick={() => setIsOpen(!isOpen)} className='flex justify-between w-full py-2 px-4'>
            <span className='my-auto'>{selected}</span>
            {!isOpen ? (
              <RiArrowDropDownLine size={'1.5rem'} className=''/>
            ) : (
              <RiArrowDropUpLine size={'1.5rem'} className=''/>
            )}
          </button>
          <button className='text-white text-sm py-2.5 px-14 bg-NuButton rounded-md shadow-md duration-300 hover:bg-NuButtonHover hover:scale-105' onClick={onSubmit}>Apply</button>
        </div>
          
        {isOpen && 
          <div className="absolute flex flex-col mt-1 bg-white border rounded-md shadow-lg fade-in w-full border-[#93adc2] h-72 overflow-y-scroll ">
            {availableRank?.map(i => (
              <button 
                key={i._id}
                type='button' 
                className='text-left hover:bg-NuButtonHover hover:text-white duration-200 py-1.5 px-4' 
                onClick={() => {setSelected(i.rankName), setIsOpen(!isOpen)}}>{i.rankName}
              </button>
            ))}
          </div>
        }
      </div>

      <div className=" p-4 mt-4 rounded-md border-2 border-[#93adc2] max-sm:text-sm">
        {selectedRank ? 
          selectedRank.requirements.map((requirement, i) => {
            const items = String(requirement.description).split('\n');
            const userSubmittedFile = userRequirement.find(req => req.requirementNumber === requirement.requirementNumber)
            const submittedCount = userSubmittedFile?.files?.filter(file => file.filePath)?.length || 0;
            const isFulfilled = submittedCount >= requirement.minRequirement;

            return (
              <div key={requirement._id} className="font-Poppins mb-2">
                {items.map((item, index) => (
                  <div key={index}>
                    <div className={`flex justify-between font-medium ${isFulfilled ? 'text-green-600' : submittedCount >= 1 && submittedCount < requirement.minRequirement ? 'text-orange-500' : 'text-black'}`}>
                      {index === 0 ? (
                        <>
                          <p className='flex justify-between w-full'>
                          <span>{`- ${item.trim()} `}</span>
                          <span>
                            {isFulfilled ? (
                              <FaCircleCheck className='my-auto text-green-600' />
                            ) : submittedCount >= 1 && submittedCount < requirement.minRequirement ? (
                              `(${submittedCount}/${requirement.minRequirement})`
                            ) : null}
                          </span>
                        </p>

                        <ViewImage/>
                        </>
                      ) : (
                        <p className='pl-4'>{item.trim()}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          })  

          : null
        }
      </div>
    </div>
  )
}

export default Requirements
