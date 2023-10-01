import React, { createContext, useContext, useEffect, useState } from "react";
import { useHook } from "./Hook";
import axios from 'axios'
import swal from "sweetalert";

const WalletContext = createContext(null);

export const Wallet = ({ children }) => {
    const hook = useHook();
    const [isLoading, setIsLoading] = useState(false)
    const [myTransactions, setMyTransactions] = useState([]);
    const [withdrawalHis, setWithdrawalHis] = useState([]);
    const [myTransfers, setMyTransfers] = useState([]);

    const fundWallet = async (data) => {
        try {
            const res = await axios.post(`${hook.endpoint}/wallet/fund`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        swal({
                            title: "Fund wallet",
                            text: "Successful! await approval",
                            icon: "success",
                            button: "Proceed!",
                        })
                            .then(() => {
                                return true
                            })
                    } else {
                        swal({
                            title: "Fund wallet",
                            text: res.data.error,
                            icon: "danger",
                            button: "Okay!",
                        })
                            .then(() => {
                                return false
                            })
                    }
                })

        } catch (error) {
            console.log(error.response.data.message)
            swal({
                title: "Fund wallet",
                text: error.response.data.message,
                icon: "error",
                button: "Okay!",
            })
                .then(() => {
                    return false
                })
        }
    }

    const upgradeAccount = async (data) => {
        try {
            const res = await axios.post(`${hook.endpoint}/account/upgrade`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        swal({
                            title: "Account Upgrade",
                            text: "Successful! await approval",
                            icon: "success",
                            button: "Proceed!",
                        })
                            .then(() => {
                                return true
                            })
                    } else {
                        swal({
                            title: "Account Upgrade",
                            text: res.data.error,
                            icon: "danger",
                            button: "Okay!",
                        })
                            .then(() => {
                                return false
                            })
                    }
                })

        } catch (error) {
            console.log(error.response.data.message)
            swal({
                title: "Account Upgrade",
                text: error.response.data.message,
                icon: "error",
                button: "Okay!",
            })
                .then(() => {
                    return false
                })
        }
    }

    const internalTransfer = async (data) => {
        try {
            const res = await axios.post(`${hook.endpoint}/wallet/transfer`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        swal({
                            title: "Internal Transfer",
                            text: "Transaction completed",
                            icon: "success",
                            button: "Proceed!",
                        })
                            .then(() => {
                                return true
                            })
                    } else {
                        swal({
                            title: "Internal Transfer",
                            text: res.data.error,
                            icon: "error",
                            button: "Okay!",
                        })
                            .then(() => {
                                return false
                            })
                    }
                })

        } catch (error) {
            console.log(error.response.data.message)
            swal({
                title: "Internal Transfer",
                text: error.response.data.message,
                icon: "error",
                button: "Okay!",
            })
                .then(() => {
                    return false
                })
        }
    }

    const withdrawFunds = async (data) => {
        try {
            const res = await axios.post(`${hook.endpoint}/wallet/withdraw`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        swal({
                            title: "Withdraw Funds",
                            text: "Transaction completed",
                            icon: "success",
                            button: "Proceed!",
                        })
                            .then(() => {
                                // navigate('/wallet/withdraw')
                                window.location.reload(false);
                                return true;
                            })
                    } else {
                        swal({
                            title: "Withdraw Funds",
                            text: res.data.error,
                            icon: "error",
                            button: "Okay!",
                        })
                            .then(() => {
                                return false
                            })
                    }
                })

        } catch (error) {
            console.log(error.response.data.message)
            swal({
                title: "Withdraw Funds",
                text: error.response.data.message,
                icon: "error",
                button: "Okay!",
            })
                .then(() => {
                    return false
                })
        }
    }

    const fundingHistory = async (username) => {
        setIsLoading(true);
        setMyTransactions([]);
        try {
            const res = await axios.get(`${hook.endpoint}/wallet/fund/history?username=${username}`);
            if (res.data.error) {
                setMyTransactions([]);
            } else {
                setMyTransactions(res.data);
            }
            setIsLoading(false)
        } catch (error) {
            setMyTransactions([]);
            setIsLoading(false);
        }
    }

    const transferHistory = async (username) => {
        setIsLoading(true);
        setMyTransfers([]);
        try {
            const res = await axios.get(`${hook.endpoint}/wallet/transfer/history?username=${username}`);
            if (res.data.error) {
                setMyTransfers([]);
            } else {
                setMyTransfers(res.data);
            }
            setIsLoading(false)
        } catch (error) {
            setMyTransfers([]);
            setIsLoading(false);
        }
    }

    const withdrawalHistory = async (username) => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${hook.endpoint}/wallet/withdraw/history?username=${username}`);
            if (res.data.error) {
                setWithdrawalHis([]);
            } else {
                setWithdrawalHis(res.data);
            }
            setIsLoading(false)
        } catch (error) {
            setWithdrawalHis([]);
            setIsLoading(false);
        }
    }

    const upgradeHistory = async (username) => {
        setIsLoading(true);
        setMyTransactions([]);
        try {
            const res = await axios.get(`${hook.endpoint}/account/upgrade/history?username=${username}`);
            if (res.data.error) {
                setMyTransactions([]);
            } else {
                setMyTransactions(res.data);
            }
            setIsLoading(false)
        } catch (error) {
            setMyTransactions([]);
            setIsLoading(false);
        }
    }

    return (
        <WalletContext.Provider value={{
            myTransactions, isLoading, withdrawalHis, myTransactions, myTransfers,
            fundWallet, fundingHistory, withdrawalHistory, internalTransfer, transferHistory, withdrawFunds, upgradeAccount, upgradeHistory,
        }}>
            {children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => {
    return useContext(WalletContext);
}