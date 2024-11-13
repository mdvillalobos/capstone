import { useState, useEffect, createContext} from 'react';
import axios from 'axios';

export const AnalyticsContext = createContext({});

export const AnalyticsContextProvider = ({ children }) => {
    const [ isApprovedData, setIsApprovedData ] = useState();
    const [ statusData, setStatusData ] = useState();
    
    const getDataAnalytics = async () => {
        try {
            const response = await axios.get('/api/getDataAnalytics');
            setIsApprovedData(response.data.perCollege);
            setStatusData(response.data.rankTotal);
        }

        catch (error) {
            setIsApprovedData(null);
            setStatusData(null);
            console.error(`Fetching Ranks Error: ${ error.message }`);
        }
    };

    useEffect(() => {
        getDataAnalytics();
    }, []);

    const getDataOnLogin = async () => {
        getDataAnalytics();
    }
    return (
        <AnalyticsContext.Provider value={{ isApprovedData, statusData, setIsApprovedData, setStatusData, getDataOnLogin }}>
            {children}
        </AnalyticsContext.Provider>
    )
}
