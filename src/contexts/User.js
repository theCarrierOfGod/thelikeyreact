import React, { createContext, useContext, useEffect, useState } from "react";
import { useHook } from "./Hook";
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import swal from "sweetalert";


const UserContext = createContext(null);

export const User = ({ children }) => {
    const hook = useHook();
    const auth = useAuth();
    const location = useLocation();
    const [fetchingDetails, setFetchingDetails] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const [userImage, setUserImage] = useState('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18a08619504%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18a08619504%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.18333435058594%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E');
    const [userName, setUserName] = useState(auth.userOnline);
    const [userEmail, setUserEmail] = useState('user@thelikey.com');
    const [userPackage, setUserPackage] = useState('free');
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [homeActs, setHomeActs] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('')
    const [taskCount, setTaskCount] = useState(0)
    const [activities, setActivities] = useState([]);
    const [promotionCount, setPromotionCount] = useState(0);
    const [performedCount, setPerformedCount] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [processedBalance, setProcessedBalance] = useState(0);
    const [earnedBalance, setEarnedBalance] = useState(0);
    const [depositedBalance, setDepositedBalance] = useState(0);
    const [facebook, setFacebook] = useState('')
    const [twitter, setTwitter] = useState('')
    const [instagram, setInstagram] = useState('');
    const [tiktok, setTiktok] = useState('')

    const getUserDetails = async (username) => {
        setFetchingDetails(true)
        try {
            const res = await axios.get(`${hook.endpoint}/user/${username}`);
            setUserDetails(res.data[0]);
            setUserName(res.data[0].username);
            setDepositedBalance(res.data[0].deposited);
            setEarnedBalance(res.data[0].earned);
            setProcessedBalance(res.data[0].processed);
            setUserEmail(res.data[0].email);
            if (res.data[0].facebook_id === null) {
                setFacebook('')
            } else {
                setFacebook(res.data[0].facebook_id);
            }
            if (res.data[0].twitter_handle === null) {
                setTwitter('')
            } else {
                setTwitter(res.data[0].twitter_handle);
            }
            if (res.data[0].tiktok_handle === null) {
                setTiktok('')
            } else {
                setTiktok(res.data[0].tiktok_handle);
            }

            if (res.data[0].instagram_handle === null) {
                setInstagram('')
            } else {
                setInstagram(res.data[0].instagram_handle);
            }
            setPhoneNumber(res.data[0].phonenumber);
            if (res.data[0].display_picture === "") {
                setUserImage("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18a08619504%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18a08619504%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.18333435058594%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E")
            } else {
                setUserImage(res.data[0].display_picture);
            }
            setFetchingDetails(false);
            setFirstname(res.data[0].firstname)
            setLastname(res.data[0].lastname)
            setPhoneNumber(res.data[0].phonenumber);
            if (res.data[0].display_picture === "") {
                setUserImage("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18a08619504%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18a08619504%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.18333435058594%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E")
            } else {
                setUserImage(res.data[0].display_picture);
            }
            setFetchingDetails(false);
            setFirstname(res.data[0].firstname);
            setLastname(res.data[0].lastname);
            setUserPackage(res.data[0].package);
        } catch (error) {
            // Handle errors
            setLastname('')
            setFirstname('')
            setUserDetails([]);
            setDepositedBalance(0);
            setEarnedBalance(0);
            setProcessedBalance(0);
            setUserEmail('user@thelikey.com');
            setFetchingDetails(false)
            setPhoneNumber('');
            setUserPackage('free');
        }
    }

    const getHomeActivities = async (username) => {
        try {
            const res = await axios.get(`${hook.endpoint}/home-activities/${username}`);
            setHomeActs(res.data)
        } catch (error) {
            setHomeActs([])
        }
    }

    const getActivities = async (username) => {
        setActivities([])
        try {
            const res = await axios.get(`${hook.endpoint}/activities/${username}`);
            setActivities(res.data);
        } catch (error) {
            setActivities([]);
        }
    }

    const countTasks = async (username) => {
        try {
            const res = await axios.get(`${hook.endpoint}/count/tasks/${username}`);
            setTaskCount(res.data.count)
        } catch (error) {
            setTaskCount(0)
        }
    }

    const countCompleted = async (username) => {
        try {
            const res = await axios.get(`${hook.endpoint}/count/completed/${username}`);
            setCompleted(res.data.count)
        } catch (error) {
            setCompleted(0)
        }
    }

    const countPromotions = async (username) => {
        try {
            const res = await axios.get(`${hook.endpoint}/count/promotions/${username}`);
            setPromotionCount(res.data.count)
        } catch (error) {
            setPromotionCount(0)
        }
    }

    const countPerformed = async (username) => {
        try {
            const res = await axios.get(`${hook.endpoint}/count/performed/${username}`);
            setPerformedCount(res.data.count)
        } catch (error) {
            setPerformedCount(0)
        }
    }

    const probUserDetails = () => {
        if (userDetails.length === 0) {
            if (window.localStorage.getItem('username') !== "") {
                if (!fetchingDetails || (userName !== window.localStorage.getItem('username'))) {
                    getUserDetails(window.localStorage.getItem('username'));
                }
            }
        }
    }

    const updatePicture = async (data) => {
        try {
            const res = await axios.post(`${hook.endpoint}/profile/picture/update`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        getUserDetails(auth.userOnline)
                        swal({
                            title: "Profile Picture",
                            text: "Updated!",
                            icon: "success",
                            button: "Proceed!",
                        })
                    }
                })

        } catch (error) {
            // Handle errors
            console.log(error)
        }
    }

    const updateSocial = async (data) => {
        try {
            const res = await axios.post(`${hook.endpoint}/profile/social/update`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        getUserDetails(auth.userOnline)
                        swal({
                            title: "Social Handles",
                            text: "Updated!",
                            icon: "success",
                            button: "Proceed!"
                        })
                    } else {
                        swal({
                            title: "Social Handles",
                            text: "An error occured!",
                            icon: "error",
                        })
                    }
                    var button = document.getElementById('socialButton');
                    button.removeAttribute('disabled');
                    button.innerHTML = "Update"
                })

        } catch (error) {
            // Handle errors
            var button = document.getElementById('socialButton');
            button.removeAttribute('disabled');
            button.innerHTML = "Update"
            swal({
                title: "Social Handles",
                text: "An error occured!",
                icon: "error",
            })
        }
    }

    const updatePersonal = async (data) => {
        try {
            const res = await axios.post(`${hook.endpoint}/profile/personal/update`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        getUserDetails(auth.userOnline)
                        swal({
                            title: "Personal details",
                            text: "Updated!",
                            icon: "success",
                            button: "Proceed!"
                        })
                    } else {
                        swal({
                            title: "Personal details",
                            text: "An error occured!",
                            icon: "error",
                        })
                    }
                    var button = document.getElementById('perosnalBtn');
                    button.removeAttribute('disabled');
                    button.innerHTML = "Update"
                })

        } catch (error) {
            // Handle errors
            console.log(error)
            var button = document.getElementById('perosnalBtn');
            button.removeAttribute('disabled');
            button.innerHTML = "Update"
            swal({
                title: "Personal details",
                text: "An error occured!",
                icon: "error",
            })
        }
    }

    const updatePassword = async (data) => {
        try {
            const res = await axios.post(`${hook.endpoint}/profile/password/update`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        getUserDetails(auth.userOnline)
                        swal({
                            title: "Password",
                            text: "Updated!",
                            icon: "success",
                            button: "Proceed!"
                        })
                    } else {
                        swal({
                            title: "Password",
                            text: "An error occured!",
                            icon: "error",
                        })
                    }
                    var button = document.getElementById('pwdBtn');
                    button.removeAttribute('disabled');
                    button.innerHTML = "Change"
                })

        } catch (error) {
            // Handle errors
            console.log(error)
            var button = document.getElementById('pwdBtn');
            button.removeAttribute('disabled');
            button.innerHTML = "Update"
            swal({
                title: "Personal details",
                text: "An error occured!",
                icon: "error",
            })
        }
    }


    useEffect(() => {
        probUserDetails();

        return () => {
            probUserDetails();
        }
    }, [location])

    useEffect(() => {
        getUserDetails(auth.userOnline)
        return () => {
            return true;
        }
    }, [window.localStorage.getItem('username')])

    return (
        <UserContext.Provider value={{
            userImage, userName, userEmail, userPackage, firstname, lastname, userDetails, facebook, twitter, instagram, phoneNumber, homeActs, taskCount, promotionCount, processedBalance, earnedBalance, depositedBalance, activities, performedCount, tiktok, completed,
            getUserDetails, getActivities, getHomeActivities, countPromotions, countTasks, updatePicture, updateSocial, countPerformed, updatePersonal, setUserDetails, countCompleted,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = setTiktok => {
    return useContext(UserContext);
}