import React, { createContext, useContext, useEffect, useState } from "react";
import { useHook } from "./Hook";
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import swal from "sweetalert";
import { useUser } from "./User";

const TaskContext = createContext(null);

export const Tasks = ({ children }) => {
    const hook = useHook();
    const auth = useAuth();
    const userHook = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true)
    const [addingNew, setAddingNew] = useState(false);
    const [myTasks, setMyTasks] = useState([]);
    const [tasksToDo, setTasksToDo] = useState([]);
    const [fetchingTask, setFetchingTask] = useState(false);
    const [uniqueTask, setUniqueTask] = useState([]);
    const [proofs, setProofs] = useState([]);
    const [proofI, setProofI] = useState([]);

    const addNewTask = async (data) => {
        setAddingNew(true)
        try {
            const res = await axios.post(`${hook.endpoint}/task/new`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        swal({
                            title: "New Task",
                            text: "Task added!",
                            icon: "success",
                            button: "Proceed!",
                        })
                            .then(() => {
                                userHook.getUserDetails(auth.userOnline)
                                navigate(`/task/manage`)
                            })
                    } else {
                        swal({
                            title: "New Task",
                            text: res.data.error,
                            icon: "error",
                            button: "Okay",
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

    const getMyTasks = async (username, status) => {
        setIsLoading(true)
        try {
            const res = await axios.get(`${hook.endpoint}/tasks?username=${username}&status=${status}`);
            if (res.data.error) {
                setMyTasks([]);
            } else {
                setMyTasks(res.data);
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setMyTasks([]);
        }
    }

    const getTasksToDo = async (username, platform, type, location) => {
        setIsLoading(true);
        setTasksToDo([]);
        if (location.length !== 0 && platform.length !== 0 && type.length !== 0) {
            var completion = `plt/${location}/${type}/${platform}/${username}`;
        } else if (platform.length !== 0 && type.length !== 0) {
            var completion = `pt/${platform}/${type}/${username}`;
        } else if (location.length !== 0 && platform.length !== 0 && type.length === 0) {
            var completion = `pl/${location}/${platform}/${username}`;
        } else if (platform.length !== 0) {
            var completion = `p/${platform}/${username}`;
        } else if (location.length !== 0) {
            var completion = `l/${location}/${username}`;
        } else {
            var completion = `all/${username}`;
        }
        try {
            const res = await axios.get(`${hook.endpoint}/tasks/todo/${completion}`);
            if (res.data.error) {
                setTasksToDo([]);
            } else {
                setTasksToDo(res.data);
            }
            setIsLoading(false)
        } catch (error) {
            setTasksToDo([]);
            setIsLoading(false)
        }
    }

    const fetchTask = async (unique_id) => {
        setFetchingTask(true);
        setUniqueTask([])
        try {
            const res = await axios.get(`${hook.endpoint}/task/${unique_id}`);
            if (res.data.error) {
                setUniqueTask([]);
            } else {
                setUniqueTask(res.data);
            }
            setFetchingTask(false)
        } catch (error) {
            setFetchingTask(false)
            setUniqueTask([])
        }
    }

    const updateTask = async (data) => {
        setAddingNew(true)
        try {
            const res = await axios.post(`${hook.endpoint}/task/update`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        swal({
                            title: "Manage Task",
                            text: "Updates saved!",
                            icon: "success",
                            button: "Proceed!",
                        })
                            .then(() => {
                                userHook.getUserDetails(auth.userOnline)
                                navigate(`/task/manage/${res.data.unique_id}`)
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

    const uploadTask = async (data) => {
        try {
            const res = await axios
                .post(`${hook.endpoint}/tasks/proof/upload`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        'X-CSRF-TOKEN': hook.token
                    },
                })
            if (res.data.success) {
                swal({
                    title: "Upload Task",
                    text: "Attempt proof uploaded!",
                    icon: "success",
                    button: "Proceed!",
                })
                    .then(() => {
                        navigate('/make_money');
                        return true
                    })
            } else {
                swal({
                    title: "Upload Task",
                    text: res.data.error,
                    icon: "error",
                    button: "Okay!",
                })
                    .then(() => {
                        return false
                    })
            }
        } catch (error) {
            swal({
                title: "Upload Task",
                text: error.response.data.message,
                icon: "error",
                button: "Okay!",
            })
                .then(() => {
                    return false
                })
        }
    }

    const getProofs = async (username, unique_id) => {
        setIsLoading(true);
        setProofs([]);
        try {
            const res = await axios.get(`${hook.endpoint}/task/proof/${unique_id}`);
            if (res.data.error) {
                setProofs([]);
            } else {
                setProofs(res.data);
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setProofs([]);
        }
    }

    const myPerformed = async (username) => {
        setIsLoading(true);
        setProofs([]);
        try {
            const res = await axios.get(`${hook.endpoint}/tasks/myperformed/${username}`);
            if (res.data.error) {
                setProofs([]);
            } else {
                setProofs(res.data);
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setProofs([]);
        }
    }

    const myProofs = async (taskID, username) => {
        setIsLoading(true);
        setProofI([]);
        try {
            const res = await axios.get(`${hook.endpoint}/tasks/myproof/${taskID}/${username}`);
            if (res.data.error) {
                setProofI([]);
            } else {
                setProofI(res.data);
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setProofI([]);
        }
    }

    useEffect(() => {
        setProofs([]);
    }, [location.key])

    return (
        <TaskContext.Provider value={{
            addingNew, myTasks, isLoading, tasksToDo, uniqueTask, fetchingTask, proofs, proofI,
            addNewTask, getMyTasks, getTasksToDo, fetchTask, uploadTask, uploadTask, updateTask, getProofs, myProofs, myPerformed, setProofI,
        }}>
            {children}
        </TaskContext.Provider>
    )
    
}

export const useTask = () => {
    return useContext(TaskContext);
}