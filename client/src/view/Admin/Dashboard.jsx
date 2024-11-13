import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../../components/Tools/Navigation.jsx';
import BarGraph from '../../components/AdminComponents/DashboardComponents/BarGraph.jsx';
import LineGraph from '../../components/AdminComponents/DashboardComponents/LineGraph.jsx';
import Datas from '../../components/AdminComponents/DashboardComponents/Datas.jsx';
import RankTotal from '../../components/AdminComponents/DashboardComponents/RankTotal.jsx';
import ToPdf from '../../components/AdminComponents/DashboardComponents/ToPdf.jsx';
import { RankContext } from '../../../context/rankContext.jsx';
import RankModal from '../../components/AdminComponents/DashboardComponents/RankModal.jsx'

const Dashboard = () => {
  const [ applicationCount, setApplicationCount ] = useState();
  const [ rankPerCollege, setRankPerCollege ] = useState();  
  const [ rankTotal, setRankTotal ] = useState();
  const [ approvedFaculty, setApprovedFaculty] = useState();
  const [ facultyCount, setFacultyCount ] = useState();
  const [ appCount, setAppCount ] = useState();
  const { config } = useContext(RankContext)
  const [ loading, setIsLoading ] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768); 
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (config && config.length > 0) {
        setIsLoading(true);
        try {
          const [ analyticsResponse, approvedApplication, collegeResponse, counts ] = await Promise.all([
            axios.get(`/api/getApplicationAnalytics?academicYear=${config[0]?.academicYear}`),
            axios.get('/api/getApproved'),
            axios.get('/api/getCountPerCollege'),
            axios.get('/api/getCountData')
          ]);
  
          setApplicationCount(analyticsResponse.data);
          setRankPerCollege(collegeResponse.data.perCollege);
          setApprovedFaculty(approvedApplication.data);
          setRankTotal(collegeResponse.data.rankTotal);
          setFacultyCount(counts.data.facultyCount);
          setAppCount(counts.data.applicationCount);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
  
    fetchData();
  }, [config]);

  return (
    <div className="min-h-screen font-Poppins flex flex-col">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen"> 
          <div className="cssloader">
            <div className="triangle1"></div>
            <div className="triangle2"></div>
            <p className="text">Please Wait</p>
          </div>
        </div>
      ) : (
        <>
        {isMobile ? (
          <div className="text-center">
            <h1 className="text-lg font-bold">This page is not available on mobile.</h1>
            <p>Please visit us on a desktop for a better experience.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-grow max-sm:px-8 font-Poppins">
              <Navigation />
              <div className="w-full pb-4 px-6">
                <h1 className='text-3xl font-semibold mb-4 border-b py-4'>Dashboard</h1>
                <div className="flex justify-between">
                  {/* <RankModal/>
                  <ToPdf totalRank={rankTotal} approvedFaculty={approvedFaculty}/> */}
                </div>
                <div className="flex space-x-4 w-full">
                  <div className="w-[70%] space-y-4">
                    <RankModal/>
                    <Datas totalFaculty={facultyCount} approvedFaculty={approvedFaculty} applicationTotal={appCount}/>
                    <LineGraph applicationCountPerYear={applicationCount} />
                    <BarGraph rankPerCollege={rankPerCollege} rankTotal={rankTotal} />
                  </div>
                  <div className="w-[30%]">
                    <RankTotal totalPerRank={rankTotal}/>
                  </div>
                </div>
              </div>
            </div> 
          </>
        )}
          
        </>
      )}
    </div>
  )
}
  
export default Dashboard
