import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const Auth = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userOnline, setUserOnline] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const checkIfLoggedIn = () => {
        if (window.localStorage.getItem('username')) {
            setIsLoggedIn(true);
            setUserOnline(window.localStorage.getItem('username'))
        } else {
            setIsLoggedIn(false);
            setUserOnline('');
        }
    }

    const storeActiveToken = (username, token, ref) => {
        let timestamp = Date.now() + (1 * 12 * 60 * 60 * 1000);
        window.localStorage.setItem('token', "Token " + token);
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('timestamp', timestamp);
        setUserOnline(username)
        checkIfLoggedIn();
        navigate(ref)
    }

    const sessionExpired = () => {
        if (window.localStorage.getItem('username')) {
            // var OneDay = new Date().getTime() + (1 * 24 * 60 * 60 * 1000);
            var OneDay = window.localStorage.getItem('timestamp');
            let yourDate = Date.now();

            // let hours = moment().diff(moment(yourDateString), 'hours');
            // let days = moment().diff(moment(yourDateString), 'days');

            if (yourDate < OneDay) {
                // session still continues
            } else if (yourDate >= OneDay) {
                // The yourDate time is exactly/more than 12 hours from now
                logOut();
            }
        }
    }

    const logOut = () => {
        window.localStorage.clear();
        setIsLoggedIn(false);
        setUserOnline('')
    }

    setTimeout(() => {
        sessionExpired();
        checkIfLoggedIn();
    }, 300);

    useEffect(() => {
        checkIfLoggedIn();

        return () => {
            return true;
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, logOut, userOnline, setUserOnline, setIsLoggedIn, storeActiveToken, }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}