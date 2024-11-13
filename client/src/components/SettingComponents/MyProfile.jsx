import React, { useState, useContext, useEffect} from 'react';
import { UserContext } from '../../../context/userContext.jsx';
import useUpdateProfile from '../../hooks/UserHooks/useUpdateProfile.jsx';
import maleProfile from '../../assets/images/male.webp';
import femaleProfile from '../../assets/images/female.webp';

const MyProfile = () => {
    const { UpdateProfile } = useUpdateProfile();
    const { user } = useContext(UserContext)
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const [ isButtonEnabled, setIsButtonEnabled ] = useState(false);
  
    const [ data, setData ] = useState({
        profile: null,
        lastName: user?.lastName,
        firstName: user?.firstName,
        middleName: user?.middleName, 
        contact: user?.contact,
        college: user?.college,
        department: user?.department,
        status: user?.status,
    });

    const departments = [
        { department: 'Nursing', college: 'College of Allied Health'},
        { department: 'Pharmacy', college: 'College of Allied Health'},
        { department: 'Medical Technology', college: 'College of Allied Health'},
        { department: 'Architecture', college: 'College of Architecture'},
        { department: 'Environmental Planning', college: 'College of Architecture'},
        { department: 'Accountancy', college: 'College of Business and Accountancy'},
        { department: 'Acccounting Information System', college: 'College of Business and Accountancy'},
        { department: 'Management Accounting', college: 'College of Business and Accountancy'},
        { department: 'Real State Management', college: 'College of Business and Accountancy'},
        { department: 'Financial Management', college: 'College of Business and Accountancy'},
        { department: 'Marketing Management', college: 'College of Business and Accountancy'},
        { department: 'Computer Science', college: 'College of Computing and Information Technologies'},
        { department: 'Information Technology', college: 'College of Computing and Information Technologies'},
        { department: 'Civil Engineering', college: 'College of Engineering'},
        { department: 'Computer Engineering', college: 'College of Engineering'},
        { department: 'Electrical Engineering', college: 'College of Engineering'},
        { department: 'Electronics Engineering', college: 'College of Engineering'},
        { department: 'Mechanical Engineering', college: 'College of Engineering'},
        { department: 'Environmental and Sanitary Engineering', college: 'College of Engineering'},
        { department: 'Hospitality Management', college: 'College of Hospitality & Tourism  Management'},
        { department: 'Tourism Management', college: 'College of Hospitality & Tourism  Management'},
    ];

    const collegeChoices = Array.from(new Set(departments?.map(colleges => colleges.college)));
    const filterDepartment = departments.filter(deparment => data.college ? deparment.college === data.college : false)
    
    useEffect(() => {
        const hasChanges = JSON.stringify(data) !== JSON.stringify(user);
        console.log(hasChanges)
        setIsButtonEnabled(hasChanges);
    }, [data, user]);


  
  
    const updateProfile = async (e) => {
        e.preventDefault();
        setIsSubmitted(true)
        await UpdateProfile(data.profile, data.lastName, data.firstName, data.middleName, data.contact, data.college, data.department, data.status, setIsSubmitted);
    }
  
    return (
        <div className="px-2 ">
            <div className="flex py-3 border-b-2">
                <p className='my-4 text-sm w-72 font-medium'>Profile Picture</p>
            
                <div className="flex">
                    <div className="flex justify-center items-center mx-auto overflow-hidden rounded-full h-20 w-20 border-2">
                        {!data.profile ? (
                            user ? (
                            user.profilePicture ? (
                                <img src={user.profilePicture} alt="User Profile Picture" className='w-full h-full object-cover' />
                            ) : (
                                <img 
                                src={user.sex === 'Male' ? maleProfile : femaleProfile} 
                                alt="User Default Profile" 
                                className='w-full h-full object-cover' 
                                />
                            )
                            ) : null
                        ) : (
                            <img src={URL.createObjectURL(data.profile)} alt="User Uploaded Profile" className='w-full h-full object-cover' />
                        )}
                    </div>
                </div>
                <label className='ml-4 my-auto flex justify-center items-center w-48 border-2 border-NuButton py-2 text-sm rounded-lg duration-300 hover:bg-NuButtonHover hover:border-NuButtonHover hover:text-white cursor-pointer'>
                    <input type='file' className='hidden' accept="image/*" onChange={(e) => setData({ ...data, profile: e.target.files[0]})}/>
                    <p className='text-sm'>Upload a new photo</p>
                </label>
            </div>
    
            <div className="flex py-3 border-b-2 ">
                <p className='my-4 text-sm w-72 font-medium'>Name</p>
                
                <div className="flex space-x-4 w-[40vw]">
                    <div className="setting-input-container">
                        <input type="text"
                            required
                            maxLength='50'
                            value={data.firstName} 
                            onChange={(e) => setData({...data, firstName: e.target.value})}
                            className='border-2 rounded-lg px-3 peer pt-6 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2] text-sm'
                        />
                        <span className='setting-input-label'>First Name</span>
                    </div> 
                
                    <div className="setting-input-container">
                        <input type="text"
                            maxLength='50'
                            value={data.middleName} 
                            onChange={(e) => setData({...data, middleName: e.target.value})}
                            className='border-2 rounded-lg px-3 peer pt-6 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2] text-sm'
                        />
                        <span className='setting-input-label'>Middle Name</span>
                    </div>   
                
                    <div className="setting-input-container">
                        <input type="text"
                            required
                            maxLength='50'
                            value={data.lastName} 
                            onChange={(e) => setData({...data, lastName: e.target.value})}
                            className='border-2 rounded-lg px-3 peer pt-6 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2] text-sm'
                        />
                        <span className='setting-input-label'>Last Name</span>
                    </div>
                </div>
            </div>
    
            <div className="flex py-3 border-b-2">
                <p className='my-4 text-sm w-72 font-medium'>Contact No.</p>
                        
                <div className="flex w-[40vw]">
                    <div className="setting-input-container">
                        <input type="text"
                            value={data.contact} 
                            maxLength='11'
                            onChange={(e) => setData({...data, contact: e.target.value})}
                            className='border-2 rounded-lg px-3 py-3 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2] text-sm'
                        />
                    </div> 
                </div>
            </div>
    
            <div className="flex py-3 border-b-2">
                <p className='my-4 text-sm w-72 font-medium'>College</p>
            
                <div className="flex w-[40vw]">
                    <div className="setting-input-container">
                        <select value={data.college} onChange={(e) => setData({...data, college: e.target.value})} className='border-2 rounded-lg px-3 py-3 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2] text-sm'>
                            {collegeChoices.map(college => (
                                <option key={college} value={college}>{college}</option>
                            ))}
                        </select>
                    </div> 
                </div>
            </div>
    
            <div className="flex py-3 border-b-2">   
                <p className='my-4 text-sm w-72 font-medium'>College</p>
                        
                <div className="flex w-[40vw]">
                    <div className="setting-input-container">
                        <select value={data.department} onChange={(e) => setData({...data, department: e.target.value})} className='border-2 rounded-lg px-3 py-3 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2] text-sm'>
                            {filterDepartment.map(department => (
                                <option key={department.department} value={department.department}>{department.department}</option>
                            ))}
                        </select>
                    </div> 
                </div>
            </div>
    
            <div className="flex py-3 border-b-2">
                <p className='my-4 text-sm w-72 font-medium'>Status</p>
                        
                <div className="flex w-[40vw]">
                    <div className="setting-input-container">
                        <select value={data.status} onChange={(e) => setData({...data, status: e.target.value})} className='border-2 rounded-lg px-3 py-3 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2] text-sm'>
                            <option value="Fulltime">Fulltime</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Probation">Probation</option>
                        </select>
                    </div> 
                </div>
            </div>
    
            <div className="flex justify-end mt-4">
                <button 
                    className={`w-32 py-1.5 hover:shadow-lg rounded-lg shadow-md duration-300 hover:scale-105 ${isButtonEnabled ? 'bg-NuButton hover:bg-NuButtonHover text-white' : 'bg-gray-500 text-black cursor-not-allowed'}`} 
                    onClick={updateProfile}
                    disabled={isSubmitted}
                >
                    {isSubmitted ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    )
}

export default MyProfile