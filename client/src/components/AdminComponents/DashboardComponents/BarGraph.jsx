import React, { useContext, useState } from 'react';
import { RankContext } from '../../../../context/rankContext.jsx';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

const DashboardGraph = ({ rankPerCollege, rankTotal }) => {
  const { ranks } = useContext(RankContext);
  const [ selected, setSelected ] = useState('Instructor 1');
  const [ isOpen, setIsOpen ] = useState(false);

  const collegeList = {
    CAH: 'College of Allied Health',
    COA: 'College of Architecture',
    CBA: 'College of Business and Accountancy',
    CCIT: 'College of Computing and Information Technologies',
    CEAS: 'College of Education Arts and Sciences',
    COE: 'College of Engineering',
    CTHM: 'College of Tourism and Hospitality Management'
  }
  
  const toDisplayData = rankPerCollege?.find(rank => rank.rankName === selected);
  
  const chartData =  Object.entries(collegeList).map(([ acronym, collegeName ]) => {
    const count = toDisplayData?.rankCounts[collegeName] || 0; 
    return {
        TotalNumber: count,
        label: acronym 
    };
  });

  console.log(chartData)

  const maxDataValue = Math.max(...chartData.map(item => item.TotalNumber), 0);
  const yAxisDomain = [0, maxDataValue + 4];

  return (
    <div className='border-2 rounded-xl px-6 py-4 space-y-8'>
      <div className="flex justify-between mx-2">
        <div className="">
          <p className='font-medium text-lg'>Rank Summary</p>
          <p className='text-[0.8rem] text-gray-500'>Total per department</p>
        </div>
        <div className="flex space-x-2">
          <div className="my-auto">
            <button className="relative flex justify-center items-center py-1.5 px-6 w-44 rounded-md text-sm border-2" onClick={() => setIsOpen(!isOpen)}>
              <span className="overflow-hidden whitespace-nowrap text-ellipsis">{selected}</span>
              {!isOpen ? (
                <MdOutlineKeyboardArrowDown size={'1.1rem'} className='absolute right-2 text-gray-500'/>
              ) : (
                <MdOutlineKeyboardArrowUp size={'1.1rem'} className='absolute right-2 text-gray-500'/>
              )}
            </button>

            {isOpen && (
              <div className="absolute w-42 text-xs mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 h-60 overflow-y-scroll">
                {ranks?.map((rank) => (
                  <div
                    key={rank._id}
                    onClick={() => {setSelected(rank.rankName), setIsOpen(!isOpen)}}
                    className="cursor-pointer py-2 px-4 hover:bg-[#41518d] hover:text-white duration-200"
                  >
                    {rank.rankName}
                  </div>
                ))}
              </div>
            )}
         </div>
        </div>
      </div>

      <div className="text-[0.7rem] font-semibold text-NuButtonHover">
        <ResponsiveContainer width="100%" height={200} >
          <BarChart
            data={chartData.length > 0 ? chartData : [{ label: "", TotalNumber: 0 }]} 
            margin={{ top: 0, right: 0, left: 0, bottom: 10 }}
            barSize={60}
          >
            <CartesianGrid vertical={false} stroke="#ddddea" strokeDasharray="5 5" /> 
            <XAxis 
              dataKey="label"
              tick={{ fill: '#666' }}
              axisLine={{ stroke: "#41518d", strokeWidth: 0 }}
              interval={0}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#666' }}
              tickLine={false} 
              axisLine={{ stroke: "#41518d", strokeWidth: 0 }}
              tickMargin={0} 
              domain={yAxisDomain} // Set the domain to extend max value
              tickFormatter={(value) => Math.floor(value)} 
              padding={{ top: 0, bottom: 0 }}
              width={20}
            />
            <Tooltip />
            <Bar dataKey="TotalNumber" fill="#5e76a2" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DashboardGraph

