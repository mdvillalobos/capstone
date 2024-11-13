import React, { useContext, useState } from 'react'
import { UserContext } from '../../../../context/userContext';
import { FocusOn } from 'react-focus-on';
import useAddCredential from '../../../hooks/UserHooks/useAddCredential';
import Loader from '../../Tools/Loader.jsx';
import ViewImage from '../../AdminComponents/ApplicationComponents/ViewFormComponents/ViewImage.jsx';
import ViewPdf from '../../AdminComponents/ApplicationComponents/ViewFormComponents/ViewPdf.jsx';
import useToast from '../../../hooks/Helpers/useToast.jsx';

const Credentials = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    const { credentials } = useContext(UserContext);
    const [ selected, setSelected ] = useState('Educational Attainment');

    const [ showImage, setShowImage ] = useState({
        show: false,
        image: null,
        isPdf: null,
    });

    const categoryList = Array.from(new Set(credentials?.files.map(file => file.category)));
    const filterData = credentials?.files.filter(file => selected ? file.category === selected : true
    );
    /* const filterData = credentials?.files.filter(file => selected ? file.category === selected : null); */
    
    const handleViewImage = (filePath) => {
        const fileName = filePath.split('/').pop();
        const fileExtension = fileName.split('.').pop();

        const dataTypes = ['png', 'jpg', 'jpeg']

        if (dataTypes.includes(fileExtension)) {
            setShowImage({
                show: true,
                image: filePath,
                isPdf: false
            });
        } else if (fileExtension === 'pdf') {
            setShowImage({
                show: true,
                image: filePath,
                isPdf: true
            });
        }
    }

    const togglePop = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className='border-2 rounded-md overflow-hidden'>
            {showImage.show && (
                showImage.isPdf ? (
                    <FocusOn>
                        <ViewPdf 
                            handleExit ={() => setShowImage({ show: false })}
                            file={showImage.image}
                        />
                    </FocusOn>
                ) : (
                    <FocusOn>
                        <ViewImage 
                            handleExit ={() => setShowImage({ show: false })}
                            image={showImage.image}
                        />
                    </FocusOn>
                )
            )}
            <div className="flex justify-between px-5 border-b-2 py-2.5">
                <p className='text-lg font-medium my-auto'>My Files</p>
                <div className="space-x-2 max-sm:flex">
                    <button type='button' onClick={togglePop} className='border-2 text-black py-2 border-[#93adc2] text-xs rounded-md px-8 duration-300 hover:bg-NuButtonHover hover:text-white  hover:shadow-lg hover:scale-105 max-sm:w-full'>Add file</button>
                    {isOpen ? (<FocusOn><ChoicesModal toggle={togglePop}/></FocusOn>) : null} 
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-col border-r-2 px-2.5 py-3 space-y-1">
                    <button className={`text-left py-2 rounded-md text-sm w-56 px-3 duration-200 hover:bg-NuButtonHover hover:text-white ${selected === 'Educational Attainment' ? 'bg-NuButton text-white' : null}`} onClick={() => setSelected('Educational Attainment')}>Education</button>
                    <button className={`text-left py-2 rounded-md text-sm w-56 px-3 duration-200 hover:bg-NuButtonHover hover:text-white ${selected === 'Seminars' ? 'bg-NuButton text-white' : null}`} onClick={() => setSelected('Seminars')}>Seminars</button>
                    <button className={`text-left py-2 rounded-md text-sm w-56 px-3 duration-200 hover:bg-NuButtonHover hover:text-white ${selected === 'Trainings' ? 'bg-NuButton text-white' : null}`} onClick={() => setSelected('Trainings')}>Trainings</button>
                    <button className={`text-left py-2 rounded-md text-sm w-56 px-3 duration-200 hover:bg-NuButtonHover hover:text-white ${selected === 'Works' ? 'bg-NuButton text-white' : null}`} onClick={() => setSelected('Works')}>Works</button>
                    <button className={`text-left py-2 rounded-md text-sm w-56 px-3 duration-200 hover:bg-NuButtonHover hover:text-white ${selected === 'Research' ? 'bg-NuButton text-white' : null}`} onClick={() => setSelected('Research')}>Research</button>
                </div>
                <div className="flex flex-col w-full">
                    {credentials ? filterData.map(file => (
                        <button className='text-left border-b-2 py-2 px-4' key={file._id} onClick={() => handleViewImage(file.filePath)}>{file.fileName}</button>
                    )) : null}
                </div>
            </div>
        </div>
    )
}

export default Credentials

const ChoicesModal = (props) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ selected, setSelected ] = useState(null);
    const [ code, setCode ] = useState('')

    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
            <div className='h-[60%] w-[40%] bg-white shadow-lg px-5 py-4 space-y-5 overflow-y-scroll fade-in max-sm:w-[85%] max-md:w-[70%] max-lg:w-[50%] max-xl:w-[40%]'>
                <div className="break-words text-sm">
                    <div className="relative">
                        <button type="button" className="absolute right-[-15px] top-[-5px] px-2 rounded-full hover:bg-[#eae7e7] text-[#3b3c3c] text-3xl duration-200" onClick={props.toggle}>
                            &times;
                        </button> 
                    </div>

                    <p className='text-xl font-medium'>Add Credential</p>

                    <div className='relative mt-4'>
                        <button type='button' onClick={() => setIsOpen(!isOpen)} className={`w-full text-left profileFields ${selected === 'Selected a category' ? 'text-gray-500' : 'text-black'}`}>
                            {selected ? selected : 'Selected a category' }
                        </button>

                        {isOpen && (
                            <div className='inputSelect'>
                                <button type='button' className='inputOptions' onClick={() => { setIsOpen(!isOpen), setSelected(null)}}>
                                    Select a category
                                </button>

                                <button type='button' className='inputOptions' onClick={() => { setIsOpen(!isOpen), setSelected('Educational Attainment'), setCode('A')}}>
                                    Educational Attainment
                                </button>

                                <button type='button' className='inputOptions' onClick={() => { setIsOpen(!isOpen), setSelected('OTE'), setCode('B') }}>
                                    OTE
                                </button> 

                                <button type='button' className='inputOptions' onClick={() => { setIsOpen(!isOpen), setSelected('Seminars'), setCode('C') }}>
                                    Seminars
                                </button>  

                                <button type='button' className='inputOptions' onClick={() => { setIsOpen(!isOpen), setSelected('Trainings'), setCode('D') }}>
                                    Trainings
                                </button>  

                                <button type='button' className='inputOptions' onClick={() => { setIsOpen(!isOpen), setSelected('Works'), setCode('E') }}>
                                    Works
                                </button>      

                                <button type='button' className='inputOptions' onClick={() => { setIsOpen(!isOpen), setSelected('Research'), setCode('F') }}>
                                    Research
                                </button>    

                                <button type='button' className='inputOptions' onClick={() => { setIsOpen(!isOpen), setSelected('Technical Innovation'), setCode('G') }}>
                                    Technical Innovation
                                </button>  

                                <button type='button' className='inputOptions' onClick={() => { setIsOpen(!isOpen), setSelected('Project'), setCode('H') }}>
                                    Project
                                </button>  

                                <button type='button' className='inputOptions' onClick={() => { setIsOpen(!isOpen), setSelected('Experience'), setCode('I') }}>
                                    Experience
                                </button>  

                                <button type='button' className='inputOptions' onClick={() => { setIsOpen(!isOpen), setSelected('Membership'), setCode('J') }}>
                                    Membership
                                </button>   

                                <button type='button' className='inputOptions' onClick={() => { setIsOpen(!isOpen), setSelected('TESDA'), setCode('K') }}>
                                    TESDA
                                </button>  

                                <button type='button' className='inputOptions' onClick={() => { setIsOpen(!isOpen), setSelected('Community Service'), setCode('L') }}>
                                    Community Service
                                </button>           

                                <button type='button' className='inputOptions' onClick={() => { setIsOpen(!isOpen), setSelected('Leadership Position'), setCode('M') }}>
                                    Leadership Position
                                </button>

                                <button type='button' className='inputOptions' onClick={() => { setIsOpen(!isOpen), setSelected('Q1 Publications'), setCode('N') }}>
                                    Q1 Publications
                                </button>
                            </div>
                        )}
                    </div>

                    {selected ? selected === 'Educational Attainment' ? (
                        <AddEducationModal category={selected} categoryCode={code}/>
                    ) : selected === 'Works' ? (
                        <AddWorksModal category={selected} categoryCode={code}/>
                    ) : selected === 'Experience' ? (
                        <AddExperienceModal category={selected} categoryCode={code}/>
                    ) : selected === 'Project' ? (
                        <AddProjectModal category={selected} categoryCode={code}/>
                    ) : (
                        <AddCredentialModal category={selected} categoryCode={code}/>
                    ) : null } 
                </div>

            </div>
        </div>
    )
}

const AddEducationModal = ({ category, categoryCode }) => {
    const { Toast } = useToast();
    const { AddCredential } = useAddCredential();
    const [ isOpen , setIsOpen ] = useState(false);
    const [ alignedOpen, setAlignedOpen ] = useState(false);
    const [ isUnitOpen, setUnitOpen ] = useState(false);
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const [ data, setData ] = useState({
        level: '',
        alignment: '',
        file: null,
        code: ''
    });

    const [ code, setCode ] = useState({
        codeLevel: '',
        codeAligned: '',
        codeUnits: ''
    });

    console.log(code.codeLevel)

    const handleAddCredential = async (e) => {
        e.preventDefault();

        if(!data.level) {
            Toast.fire({
                icon: 'error',
                title: 'Required all fields!'
            })
            return setIsSubmitted(false)
        }

        setCode({ codeUnits: data.level === 'Bachelors of Law' ? '' : code.codeUnits });

        if (data.level === 'Bachelors of Law') {
            data.code = `${categoryCode}${code.codeLevel}`;
        } else {
            data.code = `${categoryCode}${code.codeLevel}${code.codeAligned}${data.level === 'Masters Degree' || data.level === 'Doctorate Degree' ? code.codeUnits : ''}`;
        }
        
        await AddCredential(category, data.file, data.code, setIsSubmitted)
    } 
    return (
        <form onSubmit={handleAddCredential}>
            <div className='relative'>
                <button type='button' onClick={() => setIsOpen(!isOpen)} className={`w-full text-left profileFields ${data.level ? 'text-black' : 'text-gray-500'}`}>
                    {data.level ||  'Education Level'}
                </button>

                {isOpen && (
                    <div className='inputSelect'>
                        <button type='button' onClick={() => { setData({...data, level: 'Bachelors Degree'}), setIsOpen(!isOpen), setCode({...code, codeLevel: '1'}) }} className='inputOptions'>
                            Bachelor Degree
                        </button>

                        <button type='button' onClick={() => { setData({...data, level: 'Bachelors of Law'}), setIsOpen(!isOpen), setCode({...code, codeLevel: '4'}) }} className='inputOptions'>
                            Bachelors of Law
                        </button>  

                        <button type='button' onClick={() => { setData({...data, level: 'Masters Degree'}), setIsOpen(!isOpen), setCode({...code, codeLevel: '2'}) }} className='inputOptions'>
                            Masters Degree
                        </button>      

                        <button type='button' onClick={() => { setData({...data, level: 'Doctorate Degree'}), setIsOpen(!isOpen), setCode({...code, codeLevel: '3'}) }} className='inputOptions'>
                            Doctorate Degree
                        </button>                  
                    </div>
                )}
            </div>

            {data.level !== 'Bachelors of Law' ? (
                <div className='relative'>
                    <button type='button' onClick={() => setAlignedOpen(!alignedOpen)} className={`w-full text-left profileFields ${data.level ? 'text-black' : 'text-gray-500'}`}>
                        {data.alignment || 'Alignment'}
                    </button>

                    {alignedOpen && (
                        <div className='inputSelect'>
                            <button type='button' onClick={() => { setData({...data, alignment: 'Aligned'}), setAlignedOpen(!alignedOpen), setCode({...code, codeAligned: 'A'}) }} className='inputOptions'>
                                Aligned
                            </button>
                    
                            <button type='button' onClick={() => { setData({...data, alignment: 'Allied'}), setAlignedOpen(!alignedOpen), setCode({...code, codeAligned: 'B'}) }} className='inputOptions'>
                                Allied
                            </button>      
                    
                        </div>
                    )}
                </div>
            ) : null } 

            {data.level === 'Masters Degree' || data.level === 'Doctorate Degree' ? (
                <div className='relative'>
                    <button type='button' onClick={() => setUnitOpen(!isUnitOpen)} className={`w-full text-left profileFields ${data.level ? 'text-black' : 'text-gray-500'}`}>
                        {data.units || 'Completed Units'}
                    </button>

                    {isUnitOpen && (
                        <div className='inputSelect'>
                            <button type='button' onClick={() => { setData({...data, units: ' At least 9 units'}), setUnitOpen(!isUnitOpen), setCode({...code, codeUnits: '1'}) }} className='inputOptions'>
                                At least 9 units
                            </button>
                    
                            <button type='button' onClick={() => { setData({...data, units: 'At least 15 units'}), setUnitOpen(!isUnitOpen), setCode({...code, codeUnits: '2'}) }} className='inputOptions'>
                                At least 15 units
                            </button>  

                            <button type='button' onClick={() => { setData({...data, units: 'Graduated'}), setUnitOpen(!isUnitOpen),  setCode({...code, codeUnits: '3'}) }} className='inputOptions'>
                                Graduated
                            </button>     
                        </div>
                    )}
                </div>
            ) : null } 
            <input type="file" onChange={(e) => setData({ ...data, file: e.target.files[0]})} accept=".png, .jpg, .jpeg, .pdf"/>

            <div className="flex mt-4">
                <button type="submit" className='inputSubmit' onClick={() => setIsSubmitted(!isSubmitted)}>
                    <span className='flex justify-center'>
                        {isSubmitted ? <Loader/> : "Save"}
                    </span>
                </button>
            </div>
        </form>
    )
}

const AddWorksModal = ({ category, categoryCode }) => {
    const { Toast } = useToast()
    const { AddCredential } = useAddCredential();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isSubmitted, setIsSubmitted ] = useState(false)
    const [ data, setData ] = useState({
        work: '',
        file: null,
    });
    const [ code, setCode] = useState('')

    const handleAddCredential = async (e) => {
        e.preventDefault();

        if(!data.work || !data.file) {
            Toast.fire({
                icon: 'error',
                title: 'Required all fields!'
            })
            return setIsSubmitted(false)
        }
        const seminarCode = `${categoryCode}${code}`
        await AddCredential(category, data.file, seminarCode, setIsSubmitted)
    } 

    return (
        <form onSubmit={handleAddCredential} className="relative">
            <button type='button' onClick={() => setIsOpen(!isOpen)} className={`w-full text-left profileFields ${data.work ? 'text-black' : 'text-gray-500'}`}>
                {data.work || 'Select'}
            </button>

            {isOpen ? (
                <div className="inputSelect">
                    <button className='inputOptions' onClick={() => { setIsOpen(!isOpen), setData({...data, work: 'Creative Work' }), setCode('1')}}>Creative Work</button>
                    <button className='inputOptions' onClick={() => { setIsOpen(!isOpen), setData({...data, work: 'College Work' }), setCode('2')}}>College Work</button>
                    <button className='inputOptions' onClick={() => { setIsOpen(!isOpen), setData({...data, work: 'Institutional Work' }), setCode('3')}}>Institutional Work</button>
                    <button className='inputOptions' onClick={() => { setIsOpen(!isOpen), setData({...data, work: 'Professional Work' }), setCode('4')}}>Professional Work</button>
                    <button className='inputOptions' onClick={() => { setIsOpen(!isOpen), setData({...data, work: 'Scientific Work' }), setCode('5')}}>Scientific Work</button>
                </div>
            ) : (
                null
            )}
             <input type="file" onChange={(e) => setData({ ...data, file: e.target.files[0]})} accept=".png, .jpg, .jpeg, .pdf"/>
              
            <div className="flex mt-4 w-full">
                <button type="submit" className='inputSubmit' onClick={() => setIsSubmitted(!isSubmitted)}>
                    <span className='my-auto flex justify-center'>
                        {isSubmitted ? <Loader/> : "Save"}
                    </span>
                </button>
            </div>
        </form>
    )
}

const AddExperienceModal = ({ category, categoryCode }) => {
    const { Toast } = useToast()
    const { AddCredential } = useAddCredential();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isSubmitted, setIsSubmitted ] = useState(false)
    const [ data, setData ] = useState({
        align: '',
        file: null,
    })

    const [ code, setCode ] = useState({
        alignCode: '',
        yrsExperienceCode: ''
    })

    const handleAddCredential = async (e) => {
        e.preventDefault();

        if(!data.align || !data.file) {
            Toast.fire({
                icon: 'error',
                title: 'Required all fields!'
            })
            return setIsSubmitted(false)
        }
        const experienceCode = `${categoryCode}${code.alignCode}${code.yrsExperienceCode}`
        await AddCredential(category, data.file, experienceCode, setIsSubmitted)
    }
    
    return (
        <form onSubmit={handleAddCredential}>
            <div className="relative">
                <button type='button' onClick={() => setIsOpen(!isOpen)} className={`w-full text-left profileFields ${data.align ? 'text-black' : 'text-gray-500'}`}>
                    {data.align || 'Select'}
                </button>

                {isOpen ? (
                    <div className="inputSelect">
                        <button className='inputOptions' onClick={() => { setIsOpen(!isOpen), setData({...data, align: 'Relevant Industry' }), setCode({...code, alignCode: '1'})}}>Relevant Industry</button>
                        <button className='inputOptions' onClick={() => { setIsOpen(!isOpen), setData({...data, align: 'Teaching Experience' }), setCode({...code, alignCode: '2'})}}>Teaching Experience</button>
                        <button className='inputOptions' onClick={() => { setIsOpen(!isOpen), setData({...data, align: 'TESDA Courses' }), setCode({...code, alignCode: '3'})}}>TESDA Courses</button>
                    </div>
                ) : (
                    null
                )}
            </div>

            <input type="number" onChange={(e) => setCode({ ...code, yrsExperienceCode: e.target.value})} placeholder='Number of years' className='profileFields'/>
            <input type="file" onChange={(e) => setData({ ...data, file: e.target.files[0]})} accept=".png, .jpg, .jpeg, .pdf"/>
              
            <div className="flex mt-4 w-full">
                <button type="submit" className='inputSubmit' onClick={() => setIsSubmitted(!isSubmitted)}>
                    <span className='my-auto flex justify-center'>
                        {isSubmitted ? <Loader/> : "Save"}
                    </span>
                </button>
            </div>
        </form>
    )
}

const AddProjectModal = ({ category, categoryCode }) => {
    const { Toast } = useToast()
    const { AddCredential } = useAddCredential();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isStatusOpen, setIsStatusOpen ] = useState(false)
    const [ isSubmitted, setIsSubmitted ] = useState(false)
    const [ data, setData ] = useState({
        type: '',
        status: '',
        file: null
    })

    const [ code, setCode ] = useState({
        typeCode: '',
        statusCode: ''
    })

    const handleAddCredential = async (e) => {
        e.preventDefault();

        if(!data.type || !data.file) {
            Toast.fire({
                icon: 'error',
                title: 'Required all fields!'
            })
            return setIsSubmitted(false)
        }
        const projectCode = `${categoryCode}${code.typeCode}${code.statusCode}`
        await AddCredential(category, data.file, projectCode, setIsSubmitted)
    }
    
    return (
        <form onSubmit={handleAddCredential}>
            <div className="relative">
                <button type='button' onClick={() => setIsOpen(!isOpen)} className={`w-full text-left profileFields ${data.type ? 'text-black' : 'text-gray-500'}`}>
                    {data.type || 'Select'}
                </button>

                {isOpen ? (
                    <div className="inputSelect">
                        <button className='inputOptions' onClick={() => { setIsOpen(!isOpen), setData({...data, type: 'Start-up project' }), setCode({...code, typeCode: '1'})}}>Start-up project</button>
                        <button className='inputOptions' onClick={() => { setIsOpen(!isOpen), setData({...data, type: 'Commercialization' }), setCode({...code, typeCode: '2'})}}>Commercialization</button>
                        <button className='inputOptions' onClick={() => { setIsOpen(!isOpen), setData({...data, type: 'Funded project' }), setCode({...code, typeCode: '3'})}}>Funded project</button>
                    </div>
                ) : (
                    null
                )}
            </div>

            {data.type === 'Start-up project' && (
                <div className="relative">
                    <button type='button' onClick={() => setIsStatusOpen(!isStatusOpen)} className={`w-full text-left profileFields ${data.status === '' ? 'text-gray-500' : null}`}>
                        {data.status || 'Select'}
                    </button>

                    {isStatusOpen ? (
                        <div className="inputSelect">
                            <button className='inputOptions' onClick={() => { setIsStatusOpen(!isStatusOpen), setData({...data, status: 'Ongoing' }), setCode({...code, statusCode: 'A'})}}>Ongoing</button>
                            <button className='inputOptions' onClick={() => { setIsStatusOpen(!isStatusOpen), setData({...data, status: 'Approved' }), setCode({...code, statusCode: 'B'})}}>Approved</button>
                            
                        </div>
                    ) : (
                        null
                    )}
                </div>
            )}

            <input type="file" onChange={(e) => setData({ ...data, file: e.target.files[0]})} accept=".png, .jpg, .jpeg, .pdf"/>
              
            <div className="flex mt-4 w-full">
                <button type="submit" className='inputSubmit' onClick={() => setIsSubmitted(!isSubmitted)}>
                    <span className='my-auto flex justify-center'>
                        {isSubmitted ? <Loader/> : "Save"}
                    </span>
                </button>
            </div>
        </form>
    )
}

const AddCredentialModal = ({ category, categoryCode }) => {
    const { AddCredential } = useAddCredential();
    const [ isSubmitted, setIsSubmitted ] = useState(false);

    const [ data, setData ] = useState({
        file: null,
    });

    const handleAddCredential = async (e) => {
        e.preventDefault();

        await AddCredential(category, data.file, categoryCode, setIsSubmitted)
    } 

    return (
        <form onSubmit={handleAddCredential}>
            <input type="file" className='w-full border-2'  onChange={(e) => setData({ ...data, file: e.target.files[0]})} accept=".png, .jpg, .jpeg, .pdf"/>

            <div className="flex mt-4 w-full">
                <button type="submit" className='inputSubmit' onClick={() => setIsSubmitted(!isSubmitted)}>
                    <span className='my-auto flex justify-center'>
                        {isSubmitted ? <Loader/> : "Save"}
                    </span>
                </button>
            </div>
        </form>
    )
}
