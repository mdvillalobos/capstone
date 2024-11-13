import React, { useState } from 'react';
import { GoPaperclip } from "react-icons/go";
import { FocusOn } from 'react-focus-on';
import ViewPdf from '../../AdminComponents/ApplicationComponents/ViewFormComponents/ViewPdf';
import ViewImage from '../../AdminComponents/ApplicationComponents/ViewFormComponents/ViewImage';

const SubmittedFields = ({ requirement, filePath, fileName }) => {
    const items = String(requirement).split('\n');
    
    const [ showImage, setShowImage ] = useState({
        show: false,
        image: null,
        isPdf: null,
    });

    const handleViewImage = (filePath) => {
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
    }

    return (
        <div>
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
            <div className="w-full flex justify-between border-b-2 border-[#35408E] py-5 max-sm:flex-col max-sm:space-y-2">
                <div className='text-[0.9rem] w-[35vw] space-y-0.5 max-sm:w-full'>
                    {items.map((item, index) => (
                      index === 0 ? (
                        <p key={index} className='font-medium'> {item.trim()}</p> 
                      ) : (
                        <p key={index}>{item.trim()}</p>
                      )
                    ))} 
                </div>
                
                <div className='flex space-x-2 text-sm '>
                    <span className='flex justify-between items-center border px-2 text-sm rounded-md h-16 w-64 overflow-hidden max-sm:w-full max-sm:h-11'>
                        <div className="flex max-sm:px-2">
                            <GoPaperclip className='mr-2 text-4xl translate-y-[1px] text-[#41518d] max-sm:text-2xl max-sm:my-auto max-sm:translate-y-0'/>
                            <button type="button" onClick={() => handleViewImage(filePath)} className='max-sm:flex max-sm:space-x-4'>
                                <p className='text-sm w-44 overflow-hidden whitespace-nowrap text-ellipsis max-sm:whitespace-normal max-sm:w-full max-sm:my-auto'>{fileName}</p>
                            </button>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SubmittedFields
