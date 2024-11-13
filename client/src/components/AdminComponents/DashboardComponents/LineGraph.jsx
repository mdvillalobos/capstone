import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const LineGraph = ({ applicationCountPerYear }) => {
    const lineData = Object.entries(applicationCountPerYear)?.map(([year, count]) => ({
        TotalNumber: count,
        label: year
    }))

    const reversedLineData = lineData.reverse();
    const maxDataValue = Math.max(...reversedLineData.map(item => item.TotalNumber), 0);
    const yAxisDomain = [0, maxDataValue + 3];

    return (
        <div className="text-[0.7rem] border-2 rounded-xl pl-3 pr-5 py-4 space-y-8">
            <div className="flex justify-between mx-4">
                <div className="">
                    <p className='font-medium text-lg'>Total Application</p>
                    <p className='text-[0.8rem] text-gray-500'>Total for the last five years</p>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={reversedLineData}>
                    <defs>
                        <linearGradient id="colorTotal" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#5e76a2', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#abb3d3', stopOpacity: 0 }} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#ccc" horizontal={false} vertical={false} strokeDasharray="3 3" /> 
                    <XAxis 
                        dataKey="label" 
                        interval={0} 
                        tickLine={false}
                        axisLine={false}
                        padding={{ left: 20, right: 30 }}
                    />
                   <YAxis 
                        tickLine={false} 
                        tickMargin={0} 
                        tick={false}
                        axisLine={false}
                        padding={{ top: 0, bottom: 0 }}
                        width={25}
                        domain={yAxisDomain}
                        tickFormatter={(value) => Math.floor(value)}
                    />
                    <Tooltip />
                    <Area type="monotone" dataKey="TotalNumber" stroke="#9dabe2" fill="url(#colorTotal)"  />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LineGraph
