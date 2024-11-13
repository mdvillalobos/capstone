import React, { useState } from 'react'
import { PiImagesLight } from "react-icons/pi";
import { FocusOn } from 'react-focus-on'
import ViewImage from './ViewImage.jsx';
import ViewPdf from './ViewPdf.jsx';

const ViewPageMaster = ({ requirement, filePath, fileName, checkedValue, setCheckedValue }) => {
    const [ showImage, setShowImage ] = useState({
        show: false,
        image: null,
        isPdf: null,
    });

    const handleViewImage = (filePath) => {
        console.log(filePath)
        const fileName = filePath.split('/').pop();
        const fileExtension = fileName.split('.').pop();
        console.log(fileExtension);

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

        console.log(showImage)
    }

    return (
        <div className="">
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
            <div className="w-full flex justify-between border-b-2 border-[#35408E] py-4">
                <div className='text-[0.9rem]'>
                    <p className='whitespace-pre-wrap w-[33vw]'>{ requirement }</p>
                </div>
                <div className='flex space-x-10'>
                    <div>
                        <button type='button' onClick={() => handleViewImage(filePath)} className='imageButton'>
                            <PiImagesLight size='1.8rem' className='translate-y-1'/>
                            <div className="imageNameContainer">
                                <p className='uploadName'>Uploaded File</p>
                                <p className='imagePathName'>{ fileName }</p>
                            </div>
                        </button>
                    </div>
                    <div className="flex flex-col space-y-2 mt-2">
                        <div className="flex space-x-2">
                            <input type="checkbox" value='Approved' name='Declined' checked={ checkedValue === 'Approved' } onChange ={(e) => setCheckedValue(e.target.checked ? 'Approved' : null)} className='checkbox'/>
                            {checkedValue === 'Approved' ? 
                            (
                                <p className='text-xs font-medium text-green-500 translate-y-0.5'>Approve</p>
                            ) : (
                                <p className='text-xs font-medium translate-y-0.5'>Approve</p>
                            )}
                        </div>
                        <div className="flex space-x-2">
                            <input type="checkbox" value='Declined' name='Declined' checked={ checkedValue === 'Declined' } onChange ={(e) => setCheckedValue(e.target.checked ? 'Declined' : null)} className='wrongBox'/>
                            {checkedValue === 'Declined' ? 
                            (
                                <p className='text-xs font-medium text-red-500 translate-y-0.5'>Decline</p>
                            ) : (
                                <p className='text-xs font-medium translate-y-0.5'>Decline</p>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPageMaster
