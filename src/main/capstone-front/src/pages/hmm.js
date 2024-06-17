import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);

    useEffect(() => {
        const fetchAuthData = async () => {
            try {
                const response = await axios.get('/api/auth/check'); // 세션 유효성 확인용 API

                if (response.status === 200) {
                    setAuthData(response.data);
                }

            } catch (error) {
                console.error('세션 유효성 확인 실패:', error);
            }
        };

        fetchAuthData();
    }, []);

    const login = (data) => {
        setAuthData(data);
    };

    const logout = () => {
        setAuthData(null);
    };

    return (
        <AuthContext.Provider value={{ authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};