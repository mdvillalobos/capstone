import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [ user, setUser ] = useState();
    const [ credentials, setCredentials ] = useState();
    
    const checkAuth = async () => {
        try {
            const [ getProfile, getCredentials ] = await Promise.all([
                axios.get('/api/getProfile'),
                axios.get('/api/getUserCredentials')
            ]);
            
            setUser(getProfile.data);
            setCredentials(getCredentials.data)

        } catch (error) {
            console.error(`Fetching User Information Error: ${ error.message }`);
            setUser(null);
            setCredentials(null);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const getProfileOnLogin = () => {
        checkAuth();
    }

    return (
        <UserContext.Provider value={{ user, setUser, credentials, setCredentials, getProfileOnLogin }}>
            {children}
        </UserContext.Provider>
    )
}
