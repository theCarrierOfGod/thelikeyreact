import React, { createContext, useContext, useEffect, useState } from "react";
import { useHook } from "./Hook";
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import swal from "sweetalert";
import { useUser } from "./User";

const PromotionContext = createContext(null);

export const Promotion = ({ children }) => {
    const hook = useHook();
    const auth = useAuth();
    const userHook = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false)
    const [addingNew, setAddingNew] = useState(false);
    const [myPromotions, setMyPromotions] = useState([]);
    const [promotionDetails, setPromotionDetails] = useState([]);

    const addNewPromotion = async (data) => {
        setAddingNew(true)
        try {
            const res = await axios.post(`${hook.endpoint}/promotion/new`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        swal({
                            title: "New Promotion",
                            text: "Promotion added!",
                            icon: "success",
                            button: "Proceed!",
                        })
                            .then(() => {
                                userHook.getUserDetails(auth.userOnline)
                                navigate(`/promotion/manage`)
                            })
                    }
                    console.log(res)
                    setAddingNew(false)
                })

        } catch (error) {
            // Handle errors
            console.log(error)
            setAddingNew(false)
        }
    }

    const updatePromotion = async (data) => {
        setAddingNew(true)
        try {
            const res = await axios.post(`${hook.endpoint}/promotion/update`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        swal({
                            title: "Manage Promotion",
                            text: "Updates saved!",
                            icon: "success",
                            button: "Proceed!",
                        })
                            .then(() => {
                                userHook.getUserDetails(auth.userOnline)
                                navigate(`/promotion/manage/${res.data.unique_id}`)
                            })
                    }
                    console.log(res)
                    setAddingNew(false)
                })

        } catch (error) {
            // Handle errors
            console.log(error)
            setAddingNew(false)
        }
    }

    const getMyPromotions = async (username, status) => {
        setIsLoading(true);
        setMyPromotions([]);
        try {
            const res = await axios.get(`${hook.endpoint}/promotions?username=${username}&status=${status}`);
            if (res.data.error) {
                setMyPromotions([]);
            } else {
                setMyPromotions(res.data);
            }
            setIsLoading(false)
        } catch (error) {
            setMyPromotions([]);
            setIsLoading(false)
        }
    }

    const getPromotionToDo = async (username, platform, type) => {
        setIsLoading(true);
        setMyPromotions([]);
        try {
            const res = await axios.get(`${hook.endpoint}/promotions/todo/${platform}/${type}/${username}`);
            if (res.data.error) {
                setMyPromotions([]);
            } else {
                setMyPromotions(res.data);
            }
            setIsLoading(false)
        } catch (error) {
            setMyPromotions([]);
            setIsLoading(false)
        }
    }

    const confirmPromotion = async (unique_id, username, platform, type) => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${hook.endpoint}/promotions/confirm/${unique_id}/${username}`);
            if (res.data.error) {
                swal({
                    title: "Earn free credits",
                    text: res.data.error,
                    icon: "error",
                    button: "Ok",
                })
            } else {
                userHook.getUserDetails(auth.userOnline);
                getPromotionToDo(username, platform, type);
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    const getPromotionDetails = async (unique_id) => {
        setIsLoading(true);
        setPromotionDetails([]);
        try {
            const res = await axios.get(`${hook.endpoint}/promotions/${unique_id}`);
            if (res.data.error) {
                setPromotionDetails([])
            } else {
                setPromotionDetails(res.data)
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    return (
        <PromotionContext.Provider value={{
            addingNew, myPromotions, isLoading, promotionDetails,
            addNewPromotion, getMyPromotions, getPromotionToDo, confirmPromotion, setMyPromotions, getPromotionDetails, updatePromotion,
        }}>
            {children}
        </PromotionContext.Provider>
    )
}

export const usePromotion = () => {
    return useContext(PromotionContext);
}