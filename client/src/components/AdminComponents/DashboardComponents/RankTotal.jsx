import React, { useContext, useState } from 'react'
import { RankContext } from '../../../../context/rankContext'

const RankTotal = ({ totalPerRank }) => {
    const { ranks } = useContext(RankContext); 

    const academicTrack = ranks?.filter(rank => rank.track === 'Academic Track'); 
    const industryPractitioner = ranks?.filter(rank => rank.track === 'Industry Practitioner Track'); 
    
    return (
        <div className='space-y-4'>
            <div className="border-2 rounded-xl px-6 py-4">
                <p className='font-medium text-lg mb-2'>Academic Track</p>
                {academicTrack.map(rank => {
                    const count = totalPerRank[rank.rankName] || 0;

                    return (
                        <div key={rank._id} className='flex justify-between mt-1.5 text-[0.74rem] '>
                            <p>{rank.rankName}</p>
                            <p>{count}</p>
                        </div>
                    )
                })}
            </div>

            <div className="border-2 rounded-xl px-6 py-4">
                <p className='font-medium text-lg mb-2'>Industry Practioner Track</p>
                {industryPractitioner.map(rank => {
                    const count = totalPerRank[rank.rankName] || 0;

                    return (
                        <div key={rank._id} className='flex justify-between mt-1.5 text-[0.75rem] '>
                            <p>{rank.rankName}</p>
                            <p>{count}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RankTotal
