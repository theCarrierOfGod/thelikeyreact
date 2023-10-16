import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { useHook } from '../../contexts/Hook'
import { useWallet } from '../../contexts/Wallet'
import { useAuth } from '../../contexts/Auth'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Countdown from 'react-countdown'
import { useUser } from '../../contexts/User'
import { usePaystackPayment } from 'react-paystack'
import { useEffect } from 'react'
import swal from 'sweetalert'



const TestFund = () => {
    const hook = useHook();
    const wallet = useWallet();
    const auth = useAuth();
    const navigate = useNavigate();
    const userHook = useUser();
    const [proceed, setProceed] = useState(false);
    const [amount, setAmount] = useState('');
    const [nairaAmount, setNairaAmount] = useState(0);
    const [currency, setCurrency] = useState('');
    const [network, setNetwork] = useState('');
    const [credits, setCredits] = useState('');
    const [showQR, setShowQR] = useState(false);
    const [charge, setCharge] = useState(0);
    const [total, setTotal] = useState('');
    const [sendingFunding, setSendingFunding] = useState(false);
    const [stopTime, setStopTime] = useState(1000);
    const [method, setMethod] = useState('');
    const [name, setName] = useState('');

    const calculateCredits = (e) => {
        setAmount(e.target.value);
        let cost = e.target.value;

        setCredits(e.target.value);
        setTotal(cost);
        setNairaAmount(e.target.value);
    }

    const config = {
        reference: (new Date()).getTime().toString(),
        email: userHook.userEmail,
        amount: nairaAmount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: hook.live_key,
    }

    const initializePayment = usePaystackPayment(config);

    const PayWithPaystack = (e) => {
        e.preventDefault();
        if (amount < 5) {
            return false;
        }
        initializePayment(onSuccess, onClose);
    }

    const onSuccess = (reference) => {
        console.log(reference);
        let data = {
            amount: amount,
            currency: 'NGN',
            walletTo: 'paystack',
            crypto: hook.crypto,
            credits: credits,
            total: total,
            charge: charge,
            reference: reference.reference,
            userOnline: auth.userOnline
        }
        add(data);
    };

    const onClose = () => {
        console.log('closed');
        swal({
            title: 'Paystack Funding',
            text: 'Transaction cancelled by user',
            icon: 'info',
            timer: '3500'
        })
    }

    const add = async (data) => {
        let res = await wallet.fundWallet(data);
        if (res) {
            setSendingFunding(false);
            setShowQR(false);
            navigate('/');
            setName('');
            setAmount('')
        } else {
            setSendingFunding(false);
            setShowQR(false)
        }
        wallet.fundingHistory(auth.userOnline)
    }

    const PayWithTransfer = (e) => {
        e.preventDefault();
        setProceed(true)
        let data = {
            amount: amount,
            currency: 'NGN',
            walletTo: `transfer ${name}`,
            credits: credits,
            total: total,
            charge: charge,
            userOnline: auth.userOnline
        }
        swal({
            title: 'Fund Wallet',
            text: 'Have you made the transfer?',
            icon: 'warning',
            buttons: ["Stop", "Yes, Proceed!"],
        })
            .then((res) => {
                if (res) {
                    add(data);
                } else {
                    swal({
                        title: 'Fund Wallet',
                        text: 'Cancelled by user',
                        icon: 'error',
                        timer: 2000
                    })
                }
                setProceed(false)
            })
    }

    useEffect(() => {
        wallet.fundingHistory(auth.userOnline)
    }, [])

    return (
        <>
            <Helmet>
                <title>
                    Fund Wallet | The LIKEY
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
                                        <span className="iconify" data-icon="icon-park:add"></span>
                                    </span> FUND WALLET
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
                                <div className="col-lg-12 grid-margin">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                <strong>
                                                    <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                                                </strong>
                                                INFORMATION
                                            </h4>
                                            <br />
                                            <strong>Existing balance: &#8358; {userHook.earnedBalance}</strong> <br /> <br />
                                            <p className="card-description">
                                                Minimum deposit amount is <b>&#8358; 200</b> <br />
                                            </p>
                                            <div class="select">
                                                <select onChange={(e) => setMethod(e.target.value)}>
                                                    <option value={''}>Select payment method</option>
                                                    {/* <option value={'card'}>INTERNET BANKING</option> */}
                                                    <option value={'transfer'}>BANK TRANSFER</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-lg-12 mb-2'>
                                    <div className='notification is-warning is-light'>
                                        Complete Bank transfers before filling the form <br />
                                        False requests will result in account suspension!!!
                                    </div>
                                </div>

                                <div className={` ${method === "card" ? "" : "d-none"} col-md-9 mb-3`}>
                                    <div className='card is-transparent'>
                                        <div className='card-body p-1  is-transparent'>
                                            <div className='notification is-info'>
                                                All payments will be indexed in the local currency of the payment provider. Card accepted are Visa, MasterCard, or Verve card.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={` ${method === "card" ? "" : "d-none"} col-md-5 grid-margin stretch-card`}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                <strong>
                                                    PAY WITH BANK CARD
                                                </strong>
                                            </h4>

                                            <form id="cryptoform" onSubmit={(e) => { PayWithPaystack(e) }}>
                                                <div className="form-group">
                                                    <label for="cryptoamount">Amount</label>
                                                    <input type="number" min="200"
                                                        name="cryptoamount" className="form-control" value={amount} onChange={(e) => calculateCredits(e)} placeholder="Amount" required id="cryptoamount" />
                                                </div>

                                                <div className="d-flex justify-content-right" >
                                                    <button type="submit" id="cryptoproceed" className="btn btn-primary">Proceed</button>
                                                </div>
                                            </form>
                                        </div>
                                        <h6 style={{ fontSize: '12px', textAlign: 'center' }}>
                                            Proudly powered by <Link to="https://paystack.com" target='_blank' >Paystack</Link>
                                        </h6>
                                        <div className='card-footer justify-content-center'>
                                            <img src={'https://firebasestorage.googleapis.com/v0/b/likey-603a7.appspot.com/o/images%2Fmc-70-45.webp?alt=media&token=eab130ee-2ec0-4ed3-a090-bb62ee8642c1'} alt={'master card'} />
                                            <img src={'https://firebasestorage.googleapis.com/v0/b/likey-603a7.appspot.com/o/images%2Fvisa-70-45.webp?alt=media&token=e2f6f984-04e6-40cd-b6b5-0cbb2df9e6b4'} alt={'visa'} />
                                            <img src={'https://firebasestorage.googleapis.com/v0/b/likey-603a7.appspot.com/o/images%2Fmaestro-70-45.webp?alt=media&token=3b2841a2-909c-4212-aba5-1a39cd0d849a'} alt={'maestro'} />
                                            <img src={'https://firebasestorage.googleapis.com/v0/b/likey-603a7.appspot.com/o/images%2Fvisa-secure-45-45.webp?alt=media&token=5949976e-06c6-4ca3-8c5e-9e396b7f388d'} alt={'visa secure'} />
                                        </div>
                                    </div>
                                </div>

                                <div className={` ${method === "transfer" ? "" : "d-none"} col-md-5 grid-margin stretch-card`}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                <strong>
                                                    PAY WITH BANK TRANSFER
                                                </strong>
                                            </h4>

                                            <form id="cryptoform" onSubmit={(e) => { PayWithTransfer(e) }}>
                                                <div className="form-group">
                                                    <label for="cryptoamount">Amount</label>
                                                    <input type="number" min="200"
                                                        name="cryptoamount" className="form-control" value={amount} onChange={(e) => calculateCredits(e)} placeholder="Amount" required id="cryptoamount" />
                                                </div>

                                                <div className="form-group">
                                                    <label for="name">Name</label>
                                                    <input type="text"
                                                        name="name" className="form-control" onChange={e => setName(e.target.value)} value={name} placeholder="Sender Name" required id="cryptoamount" />
                                                </div>

                                                <p>
                                                    Make a transfer of <strong>&#8358;{amount}</strong> to the bank account below:
                                                </p>
                                                <p>
                                                    <strong>BANK NAME:</strong> Palmpay
                                                </p>
                                                <p>
                                                    <strong>ACCOUNT NUMBER:</strong> 9168591326
                                                </p>
                                                <p>
                                                    <strong>ACCOUNT NAME:</strong> TheLikey THELIKEYDOTCOM
                                                </p>

                                                <div className="d-flex justify-content-right" >
                                                    <button type="submit" id="cryptoproceed" className="btn btn-primary">Proceed</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-12'>
                                    <div className="card" style={{ height: 'max-content', marginBottom: "20px" }}>
                                        <div className="card-body">
                                            <h4 className="card-title mb-4">Recent Fundings</h4>
                                            <div className="d-flex justify-content-between table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">TRANSACTION ID</th>
                                                            <th scope="col">AMOUNT</th>
                                                            <th scope="col">STATUS</th>
                                                            <th scope="col">DATE</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className=''>
                                                        {wallet.myTransactions.length === 0 ? null : (
                                                            <>
                                                                {wallet.myTransactions.map((activity, index) => (
                                                                    <>
                                                                        <tr>
                                                                            <th scope="row">
                                                                                {index + 1}
                                                                            </th>
                                                                            <td>
                                                                                {activity.transaction_id}
                                                                            </td>
                                                                            <td>
                                                                                &#8358;{activity.credits}
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

export default TestFund
