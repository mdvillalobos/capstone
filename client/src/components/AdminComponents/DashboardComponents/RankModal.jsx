import { React, useState } from 'react';
import { FocusOn } from 'react-focus-on'
import useCreateRank from '../../../hooks/AdminHooks/useCreateRank.jsx';
import { BsPencilSquare } from "react-icons/bs";

const RankModal = () => {
  const [ seen, setSeen ] = useState(false)

  const togglePop = () => {
    setSeen(!seen)
  }

  return (
    <div>
      <button className='flex justify-center py-[7px] w-36 text-xs bg-NuButton text-white rounded-md shadow-md duration-300 hover:bg-NuButtonHover hover:scale-105' onClick={togglePop}>
        <BsPencilSquare className='my-auto text-xl mr-2'/> 
        <span className="my-auto">Add rank</span>
      </button>
      {seen ? (<FocusOn> <CreateRankModal toggle={togglePop}/></FocusOn>): null}
    </div>
  )
}

export default RankModal

const CreateRankModal = (props) => {
  const { createRank } = useCreateRank();

  const [ data, setData ] = useState({
    rankName: '',
    track: ''
  });

  const [ requirements, setRequirements ] = useState([{ requirementNumber: 1, description: '', requirementCode: '', minCredentials: 1,}]);

  const handleRequirementChange = (index, event) => {
    const newRequirements = [...requirements];
    newRequirements[index][event.target.name] = event.target.value;
    setRequirements(newRequirements);
  };

  const addRequirement = () => {
    if (requirements.length < 10) {
      const newRequirementNumber = requirements.length + 1;
      setRequirements([...requirements, { requirementNumber: newRequirementNumber, description: '', requirementCode: '', minCredentials: 1 }]);
    } else {
        alert("Maximum of 10 requirements reached.");
    }
  };

  const deleteRequirement = (index) => {
    const newRequirements = requirements.filter((_, i) => i !== index).map((req, i) => ({
      ...req,
      requirementNumber: i + 1 // Update requirement numbers after deletion
    }));
    setRequirements(newRequirements);
  };

  const handleCreateRank = async (e) => {
    e.preventDefault();
    await createRank(data.rankName, data.track, requirements, props);
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
      <div className="relative h-[90%] w-[40%] bg-white shadow-lg rounded-2xl px-7 py-7 space-y-5 overflow-auto font-Poppins">
        <div className="flex justify-between">
          <h2 className='text-3xl font-bold font-Poppins text-center w-full'>RANK FORM</h2> 
          <button onClick={props.toggle} className='absolute top-3 right-3 text-3xl px-2 duration-300 rounded-full hover:bg-[#eae7e7] text-[#3b3c3c]'>&times;</button>
        </div>
        <div className="break-words text-sm">
          <form onSubmit={handleCreateRank}>
            <div>
              <input 
                type="text" 
                placeholder='Rank name'
                className='profileFields w-full'
                value={data.rankName} 
                onChange={(e) => setData({ ...data, rankName: e.target.value})} 
              />
              <select className='profileFields w-full' onChange={(e) => setData({...data, track: e.target.value})}>
                <option value="">None</option>
                <option value="Academic Track">Academic Track</option>
                <option value="Insdustry Practitioner Track">Insdustry Practitioner Track</option>
              </select>
            </div>

            {requirements.map((req, index) => (
              <div key={index} className='flex flex-col mb-4'>
                <div className="flex justify-between mb-2">
                  <h1 className='text-lg my-auto'>Requirement {index + 1}</h1>
                  <button type="button" className='rounded-md py-1.5 text-sm bg-red-400 text-white px-2' onClick={() => deleteRequirement(index)}>Delete Requirement</button>
                </div>
                <textarea 
                  type="text" 
                  name="description" 
                  className='profileFields'
                  placeholder='Requirement description'
                  value={req.description} 
                  onChange={(e) => handleRequirementChange(index, e)}  
                />

                <input 
                  type="text" 
                  name="requirementCode" 
                  className='profileFields'
                  placeholder='Requirement code'
                  value={req.requirementCode} 
                  onChange={(e) => handleRequirementChange(index, e)} 
                  required 
                />

                <input 
                  type="number" 
                  name="minCredentials" 
                  className='profileFields'
                  placeholder='Minimum requirement'
                  value={req.minCredentials} 
                  onChange={(e) => handleRequirementChange(index, e)} 
                  min="1" 
                  required 
                />
              </div>
            ))}
            <button type="button" className='w-full rounded-md bg-NuButtonHover text-white py-1.5' onClick={addRequirement}>Add Requirement</button>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

