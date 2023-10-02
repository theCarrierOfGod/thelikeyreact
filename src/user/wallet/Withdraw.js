import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { useUser } from '../../contexts/User'
import { useWallet } from '../../contexts/Wallet'
import { useHook } from '../../contexts/Hook'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
import Swal from 'sweetalert2'
import swal from 'sweetalert'
import Pick from '../../pages/ads/Pick'

const Withdraw = () => {
    const userHook = useUser();
    const walletHook = useWallet();
    const auth = useAuth();
    const hook = useHook();
    const location = useLocation();
    const [credit, setCredit] = useState('');
    const [proceed, setProceed] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [currency, setCurrency] = useState('usdt');
    const [network, setNetwork] = useState('');
    const [amount, setAmount] = useState(0);
    const [means, setMeans] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    const validateCredit = (amount) => {
        setCredit(amount)

        if (Number(amount) > Number(userHook.depositedBalance) || Number(amount) < 1000 || (Number(amount) % 500 !== 0)) {
            setProceed(false);
        } else {
            setProceed(true);
        }

        let USD = (Number(amount) * 0.0015);
        setAmount(USD);
    }

    const withdrawNow = (e) => {
        e.preventDefault();
        if (walletAddress.length < 10) {
            swal({
                title: 'Withdraw',
                text: 'Invalid Wallet Address',
                icon: 'warning'
            });
            return;
        }

        let data = {
            amount: amount,
            credits: credit,
            walletAddress: walletAddress,
            currency: currency,
            network: network,
            username: auth.userOnline,
        }

        swal({
            title: 'Withdraw',
            text: 'Do you want to proceed?',
            icon: 'warning',
            buttons: ["Stop", "Yes, Withdraw!"],
        })
            .then((res) => {
                if (res) {
                    walletHook.withdrawFunds(data)
                    setProceed(false);
                } else {
                    swal({
                        title: 'Withdraw',
                        text: 'Cancelled by user',
                        icon: 'error',
                        timer: 2000
                    })
                }
            })
    }

    const processBankForm = (e) => {
        e.preventDefault();

        if (bankName.length < 1 || accountNumber.length < 9 || accountName.length < 5) {
            swal({
                title: 'Withdraw',
                text: 'Bank details not complete',
                icon: 'warning'
            });
            return;
        }

        let data = {
            amount: amount,
            credits: credit,
            walletAddress: `Bank Name: ${bankName}, Account Number: ${accountNumber}, Account Name: ${accountName}`,
            currency: 'USD',
            network: accountNumber,
            username: auth.userOnline,
        }

        swal({
            title: 'Withdraw',
            text: 'Do you want to proceed?',
            icon: 'warning',
            buttons: ["Stop", "Yes, Withdraw!"],
        })
            .then((res) => {
                if (res) {
                    walletHook.withdrawFunds(data)
                    setProceed(false);
                } else {
                    swal({
                        title: 'Withdraw',
                        text: 'Cancelled by user',
                        icon: 'error',
                        timer: 2000
                    })
                }
            })
    }

    const goNow = () => {
        walletHook.withdrawalHistory(auth.userOnline);
    }

    useEffect(() => {
        goNow();

        return () => {
            return true;
        }
    }, [location.key])

    return (
        <>
            <Helmet>
                <title>
                    Withdraw | The LIKEY
                </title>
            </Helmet>
            <div className='container-scroller'>
                <Header />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">
                                    <span className="page-title-icon bg-success text-white me-2">
                                        <i className="mdi mdi-transfer-line"></i>
                                        <span className="iconify" data-icon="streamline:money-atm-card-2-deposit-money-payment-finance-atm-withdraw"></span>
                                    </span> WITHDRAW CRYPTO
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <span></span>Wallet <i className="mdi mdi-wallet icon-sm text-primary align-middle"></i>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="row justify-content-start">
                                <Pick />
                                
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                <strong>
                                                    <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                                                </strong>
                                                WITHDRAW YOUR EARNINGS
                                            </h4>
                                            <p className="card-description">
                                                You can only withdraw from your withdrawable credits.
                                                <br />
                                                <strong className='is-danger text-danger' style={{ fontFamily: 'monospace' }}>
                                                    Minimum withdrawal is 1000 credits = $1.5
                                                </strong>
                                                <br />
                                                <strong className='is-danger text-danger' style={{ fontFamily: 'monospace' }}>
                                                    Amount to be withdrawn must be a multiple of 500 i.e. 1000, 1500, 2000 e.t.c.
                                                </strong>
                                                <br />
                                                <small
                                                    className='text-info'
                                                    style={{ fontFamily: "monospace" }}>
                                                    <strong>
                                                        No transaction fee required. 
                                                    </strong> 
                                                </small>
                                            </p>
                                            <h4 className="card-title">
                                                WITHDRAWABLE CREDITS: {userHook.depositedBalance} <span style={{ fontSize: '1rem' }}>(${userHook.depositedBalance * 0.0015})</span>
                                            </h4>
                                            <div class="select">
                                                <select onChange={(e) => setMeans(e.target.value)}>
                                                    <option value={''}>Select withdrawal method</option>
                                                    <option value={'usdt'}>USDT</option>
                                                    <option value={'skrill'}>SKRILL</option>
                                                    <option value={'account'}>BANK ACCOUNT</option>
                                                    <option value={'paypal'}>PayPal</option>
                                                    <option value={'neteller'}>Neteller</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-lg-12 mb-2'>
                                    <div className='notification is-info is-light'>
                                        Payouts are issued on the 21st to 23rd of each month! <br />
                                        Withdrawal requests must be made before then.
                                    </div>
                                </div>

                                <div className={Number(userHook.depositedBalance) < 1000 ? "d-block" : "d-none"} >
                                    <div className='col-lg-12'>
                                        <div className='notification is-warning is-light'>
                                            You are not eligible to perform cash withdrawal! <br />
                                            Perform more tasks and try again.
                                        </div>
                                    </div>
                                </div>

                                <div className={Number(userHook.depositedBalance) > 1000 ? "d-block" : "d-none"} >
                                    <div className={` ${means === "account" ? "" : "d-none"} col-md-5 grid-margin stretch-card`}>
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="card-title">
                                                    <strong>
                                                        WITHDRAW TO BANK ACCOUNT
                                                    </strong>
                                                </h4>
                                                <form id="bankForm" onSubmit={(e) => { processBankForm(e) }} >
                                                    <div className="form-group">
                                                        <label for="cryptoamount">Bank Name</label>
                                                        <input type="text"
                                                            name="bankName" onChange={e => setBankName(e.target.value)} className="form-control" value={bankName} placeholder="Bank Name" required id="bankName" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="cryptoamount">Account Number</label>
                                                        <input type="text"
                                                            name="accountNumber" onChange={e => setAccountNumber(e.target.value)} className="form-control" value={accountNumber} placeholder="Account Number" required id="accountNumber" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="cryptoamount">Account Name</label>
                                                        <input type="text"
                                                            name="accountName" onChange={e => setAccountName(e.target.value)} className="form-control" value={accountName} placeholder="Account Name" required id="accountName" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="credits">Amount (CREDITS)</label>
                                                        <input
                                                            type="number"
                                                            min={1}
                                                            name="credits"
                                                            className="form-control"
                                                            value={credit}
                                                            onChange={(e) => validateCredit(e.target.value)}
                                                            placeholder="Credits"
                                                            required
                                                            id="credits"
                                                        />
                                                        <small style={{ color: 'red', fontFamily: 'monospace', fontSize: '12px', fontWeight: 'bolder', textTransform: 'uppercase' }}>
                                                            Amount to be withdrawn must be a multiple of 500
                                                        </small>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="amount">Amount (USD)</label>
                                                        <input
                                                            type="number"
                                                            min={1}
                                                            name="amount"
                                                            className="form-control"
                                                            value={amount}
                                                            placeholder="Amount in USD"
                                                            required
                                                            id="amount"
                                                            readOnly={true}
                                                            disabled={true}
                                                        />
                                                    </div>
                                                    <div className="d-flex justify-content-right" >
                                                        <button type="submit" id="cryptoproceed" className="btn btn-primary">Proceed</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`${means === 'usdt' ? 'col-md-9' : 'd-none'}`}>
                                        <form onSubmit={(e) => withdrawNow(e)}>
                                            <div className="card">
                                                <div className="card-body">
                                                    <h4 className="card-title">
                                                        WITHDRAW TO USDT ACCOUNT
                                                    </h4>
                                                    <div className="form-group">
                                                        <label for="currency">Currency</label>
                                                        <select className="form-select" id="currency" name="currency" onChange={(e) => setCurrency(e.target.value)} required>
                                                            <option value="usdt">USDT</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="network">Network</label>
                                                        <select className="form-select" id="network" name="network" defaultValue={network} onChange={(e) => setNetwork(e.target.value)} required>
                                                            <option value="">Select network</option>
                                                            <option
                                                                value="BNB smart Chain (BEP20)"
                                                                className={(currency === "usdt") ? "" : "d-none"}
                                                            >
                                                                BNB smart Chain (BEP20)
                                                            </option>

                                                            <option
                                                                value="Ethereum (ERC20)"
                                                                className={(currency === "usdt") ? "" : "d-none"}
                                                            >
                                                                Ethereum (ERC20)
                                                            </option>

                                                            <option
                                                                value="TJ8mZ1UtN5YDJtPYQ64jeVyMrvxQP3Hu7g"
                                                                className={(currency === "usdt") ? "" : "d-none"}
                                                            >
                                                                Tron (TRC20)
                                                            </option>

                                                            <option
                                                                value="Tron (TRC20)"
                                                                className={(currency === "usdt") ? "" : "d-none"}
                                                            >
                                                                Arbitrum One
                                                            </option>

                                                            <option
                                                                value="BNB Beacon Chain (BEP2)"
                                                                className={(currency === "usdt") ? "" : "d-none"}
                                                            >
                                                                BNB Beacon Chain (BEP2)
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="credits">Amount (CREDITS)</label>
                                                        <input
                                                            type="number"
                                                            min={1}
                                                            name="credits"
                                                            className="form-control"
                                                            value={credit}
                                                            onChange={(e) => validateCredit(e.target.value)}
                                                            placeholder="Credits"
                                                            required
                                                            id="credits"
                                                        />
                                                        <small style={{ color: 'red', fontFamily: 'monospace', fontSize: '12px', fontWeight: 'bolder', textTransform: 'uppercase' }}>
                                                            Amount to be withdrawn must be a multiple of 500
                                                        </small>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="credits">Wallet Address</label>
                                                        <input
                                                            type="text"
                                                            minLength={10}
                                                            name="walletAddress"
                                                            className="form-control"
                                                            value={walletAddress}
                                                            onChange={(e) => setWalletAddress(e.target.value)}
                                                            placeholder="Wallet address"
                                                            required
                                                            id="walletAddress"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="amount">Amount (USD)</label>
                                                        <input
                                                            type="number"
                                                            min={1}
                                                            name="amount"
                                                            className="form-control"
                                                            value={amount}
                                                            placeholder="Amount in USD"
                                                            required
                                                            id="amount"
                                                            readOnly={true}
                                                            disabled={true}
                                                        />
                                                    </div>
                                                    <div className="d-flex justify-content-right" >
                                                        <button
                                                            type="submit"
                                                            id="cryptoproceed"
                                                            disabled={!proceed}
                                                            className="btn btn-primary"
                                                        >
                                                            Proceed
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className='col-sm-12 mt-4'>
                                    <div className="card" style={{ height: 'max-content', marginBottom: "20px" }}>
                                        <div className="card-body">
                                            <h4 className="card-title mb-4">Recent Transfers</h4>
                                            <div className="d-flex justify-content-between table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">TRANSACTION ID</th>
                                                            <th scope="col">AMOUNT</th>
                                                            <th scope="col">WALLET TO</th>
                                                            <th scope="col">STATUS</th>
                                                            <th scope="col">DATE</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className=''>
                                                        {walletHook.withdrawalHis.length === 0 ? null : (
                                                            <>
                                                                {walletHook.withdrawalHis.map((activity, index) => (
                                                                    <>
                                                                        <tr>
                                                                            <th scope="row">
                                                                                {index + 1}
                                                                            </th>
                                                                            <td>
                                                                                {activity.transaction_id}
                                                                            </td>
                                                                            <td>
                                                                                {activity.amount}{activity.currency.toUpperCase()}
                                                                            </td>
                                                                            <td>
                                                                                {activity.wallet_to}
                                                                            </td>
                                                                            <td>
                                                                                {activity.status}
                                                                            </td>
                                                                            <td>
                                                                                {hook.getDate(activity.created_at)}
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                ))}
                                                            </>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Withdraw