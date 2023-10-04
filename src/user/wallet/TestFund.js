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

    const copyText = (id) => {
        // Get the text field
        var copyText = document.getElementById(id);

        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
        alert('copied!')
    }

    const calculateCredits = (e) => {
        setAmount(e.target.value);
        let cost = e.target.value;

        setCredits((cost / 2.5) * 1000);
        setTotal(cost);
        setNairaAmount(hook.rate * e.target.value);
    }

    const initFunding = (e) => {
        e.preventDefault();
        if (amount < 1) {
            return;
        }
        setShowQR(true);
        setStopTime(<Countdown date={Date.now() + 600000} autoStart={true} onStop={() => timerStopped()} />);
        hook.convertToCrypto(currency, total)
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
        } else {
            setSendingFunding(false);
            setShowQR(false)
        }
        wallet.fundingHistory(auth.userOnline)
    }

    const timerStopped = () => {
        Swal.fire(
            'Cancelled!',
            'Transaction cancelled',
            'info'
        )
        setShowQR(false)
    }

    const concludeFunding = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "Proceed with transaction?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Proceed'
        }).then((result) => {
            if (result.isConfirmed) {
                setSendingFunding(true);
                let data = {
                    amount: amount,
                    currency: currency,
                    walletTo: network,
                    crypto: hook.crypto,
                    credits: credits,
                    total: total,
                    charge: charge,
                    userOnline: auth.userOnline
                }
                add(data);
            } else {
                return;
            }
        })
    }

    const cancelTransaction = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Transaction will not be recorded!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Cancelled!',
                    'Transaction cancelled',
                    'success'
                )
                setShowQR(false);
                setStopTime('')
            } else {
                return;
            }
        })
    }

    const PayWithTransfer = (e) => {
        e.preventDefault();
        setProceed(true)
        let data = {
            amount: amount,
            currency: 'NGN',
            walletTo: `transfer ${name}`,
            crypto: hook.rate * amount,
            credits: credits,
            total: total,
            charge: charge,
            userOnline: auth.userOnline
        }
        swal({
            title: 'Buy Credit',
            text: 'Have you made the transfer?',
            icon: 'warning',
            buttons: ["Stop", "Yes, Proceed!"],
        })
            .then((res) => {
                if (res) {
                    add(data);
                } else {
                    swal({
                        title: 'Buy Credit',
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
                    Add Funds | The LIKEY
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
                                    </span> PURCHASE CREDITS
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
                                            <strong>Existing balance: {userHook.balance}</strong> <br /> <br />
                                            <p className="card-description">
                                                Minimum deposit amount is <b>&#8358; 400</b> <br />
                                            </p>
                                            <div class="select">
                                                <select onChange={(e) => setMethod(e.target.value)}>
                                                    <option value={''}>Select payment method</option>
                                                    {/* <option value={'crypto'}>CRYPTOCURRENCY</option> */}
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

                                <div className={` ${method === "crypto" ? "" : "d-none"} col-md-5 grid-margin stretch-card`}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                <strong>
                                                    PAY WITH CRYPTOCURRENCY
                                                </strong>
                                            </h4>
                                            <p className="card-description">
                                                <small
                                                    style={{ fontFamily: "monospace" }}
                                                    className="">
                                                    <strong>
                                                        Transaction will be cancelled if transfer isn't made within 10 minutes of initiation.
                                                    </strong>
                                                </small>
                                            </p>
                                            <form id="cryptoform" onSubmit={e => initFunding(e)}>
                                                <div className="form-group">
                                                    <label for="currency">Currency</label>
                                                    <select className="form-select" id="currency" name="currency" onChange={(e) => setCurrency(e.target.value)} required>
                                                        <option value="">Select payment currency</option>
                                                        <option value="usdt">USDT</option>
                                                        <option value="bnb">BNB</option>
                                                        <option value="eth">Etherium</option>
                                                        <option value="btc">Bitcoin</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label for="network">Network</label>
                                                    <select className="form-select" id="network" name="network" defaultValue={network} onChange={(e) => setNetwork(e.target.value)} required>
                                                        <option value="">Select network</option>
                                                        <option
                                                            value={hook.usdt}
                                                            className={(currency === "usdt" || currency === "bnb" || currency === "eth") ? "" : "d-none"}
                                                        >
                                                            BNB smart Chain (BEP20)
                                                        </option>

                                                        <option
                                                            value={hook.usdt}
                                                            className={(currency === "usdt" || currency === "bnb" || currency === "eth") ? "" : "d-none"}
                                                        >
                                                            Ethereum (ERC20)
                                                        </option>

                                                        <option
                                                            value={hook.tron}
                                                            className={(currency === "usdt" || currency === "eth") ? "" : "d-none"}
                                                        >
                                                            Tron (TRC20)
                                                        </option>

                                                        <option
                                                            value={hook.usdt}
                                                            className={(currency === "usdt" || currency === "eth") ? "" : "d-none"}
                                                        >
                                                            Arbitrum One
                                                        </option>

                                                        <option
                                                            value={hook.usdt}
                                                            className={(currency === "btc") ? "" : "d-none"}
                                                        >
                                                            BNB
                                                        </option>

                                                        <option
                                                            value={hook.bnb}
                                                            className={(currency === "usdt" || currency === "eth" || currency === "bnb") ? "" : "d-none"}
                                                        >
                                                            BNB Beacon Chain (BEP2)
                                                        </option>

                                                        <option
                                                            value={hook.usdt}
                                                            className={(currency === "btc") ? "" : "d-none"}
                                                        >
                                                            Ether
                                                        </option>

                                                        <option
                                                            value={hook.btc}
                                                            className={(currency === "btc") ? "" : "d-none"}
                                                        >
                                                            Bitcoin
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label for="cryptoamount">Amount (USD)</label>
                                                    <input type="number" min="1"
                                                        name="cryptoamount" className="form-control" value={amount} onChange={(e) => calculateCredits(e)} placeholder="Amount in USD" required id="cryptoamount" />
                                                    <small className='mt-2' style={{ fontSize: '11px', width: '100%', textAlign: 'right', display: 'block', color: '#002347' }}>
                                                        {(credits === "" || credits === 0) ? "" : (
                                                            <>
                                                                {credits} credits
                                                            </>
                                                        )}
                                                    </small>
                                                </div>

                                                <div className="d-flex justify-content-right" >
                                                    <button type="submit" id="cryptoproceed" className="btn btn-primary">Proceed</button>
                                                </div>

                                                <div className={`modal ${showQR ? "d-block show" : "fade"}`} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <form className="modal-content" onSubmit={(e) => { concludeFunding(e) }}>
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel">ADD FUNDS</h5>
                                                            </div>
                                                            <div className="modal-body">
                                                                {sendingFunding ? (
                                                                    <>
                                                                        <div className='w-100 text-center'>
                                                                            <span className='fa fa-spinner fa-spin fa-4x'></span>
                                                                        </div>
                                                                        <br /> <br />
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span className='sendTop'>
                                                                            Send {hook.crypto} {currency} to {network}
                                                                        </span>
                                                                        <span id="cryImg" className="w-100 text-center d-block">
                                                                            <img src={`/${network}.jpeg`} alt={currency} />
                                                                        </span>
                                                                        <div>
                                                                            <div className="mb-1 mt-4">
                                                                                <label for="walletAddress" onClick={() => copyText('walletAddress')} className="col-form-label d-inline">Wallet Address
                                                                                    <span className="float-end rounded mt-1 p-1"
                                                                                        data-bs-original-title="Copy wallet address">
                                                                                        <i className="mdi mdi-content-copy"></i>
                                                                                    </span>
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className='p-0'
                                                                                    disabled="true"
                                                                                    value={network}
                                                                                    style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '12px', fontFamily: 'monospace', paddingTop: '0' }}
                                                                                    name="walletAddress" id="walletAddress" />

                                                                            </div>
                                                                            <div className="m-0">
                                                                                <p>
                                                                                    <div id="ten-countdown">
                                                                                        {stopTime}
                                                                                    </div>
                                                                                </p>
                                                                                <p className="mb-1">
                                                                                    <input type="readonly"
                                                                                        style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '12px', fontFamily: 'monospace', paddingTop: '0' }}
                                                                                        name="depo" id="depo" value={`DEPOSIT AMOUNT: ${amount} USD`} />
                                                                                </p>
                                                                                <p className="mb-1">
                                                                                    <input type="readonly"
                                                                                        style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '12px', fontFamily: 'monospace', paddingTop: '0' }}
                                                                                        name="toPay" id="toPay" value={`TOTAL: ${total} USD`} />
                                                                                </p>
                                                                                <p className="mb-1">
                                                                                    <input type="readonly"
                                                                                        style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '12px', fontFamily: 'monospace', paddingTop: '0' }}
                                                                                        name="numCredits" id="numCredits" value={`for ${credits} credits`} />
                                                                                </p>
                                                                            </div>
                                                                            <div className="mb-1">
                                                                                <label for="send" onClick={() => copyText('send')} className="col-form-label d-inline">Send
                                                                                    <span className="float-end rounded mt-1 p-1"
                                                                                        data-bs-original-title="Copy amount to send">
                                                                                        <i className="mdi mdi-content-copy"></i>
                                                                                    </span>
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className='p-0'
                                                                                    readonly="true"
                                                                                    value={hook.crypto}
                                                                                    style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '12px', fontFamily: 'monospace', paddingTop: '0' }}
                                                                                    name="send" id="send" />

                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                            <div className={`${sendingFunding ? "d-none" : ""} modal-footer`}>
                                                                <button type="submit" onClick={(e) => concludeFunding(e)} className="btn btn-success w-100 mb-2" id="finalProceed">I have made the payment</button>
                                                                <button type="button" className="btn btn-danger w-100" onClick={() => cancelTransaction()}>Cancel transaction</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className={`${showQR ? "modal-backdrop show" : "d-none"}`}></div>
                                                {/* <style>
                                                    
                                                </style> */}
                                            </form>
                                        </div>
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
                                                    <label for="cryptoamount">Amount (USD)</label>
                                                    <input type="number" min="1"
                                                        name="cryptoamount" className="form-control" value={amount} onChange={(e) => calculateCredits(e)} placeholder="Amount in USD" required id="cryptoamount" />
                                                    <small className='mt-2' style={{ fontSize: '11px', width: '100%', textAlign: 'right', display: 'block', color: '#002347' }}>
                                                        {(credits === "" || credits === 0) ? "" : (
                                                            <>
                                                                {credits} credits <br />
                                                                <strong>{hook.rate * amount} NGN</strong> <br />
                                                            </>
                                                        )}
                                                    </small>
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
                                                    <input type="number" min="400"
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
                                                            <th scope="col">AMOUNT (USD)</th>
                                                            <th scope="col">CREDITS</th>
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
                                                                                {activity.amount_usd}
                                                                            </td>
                                                                            <td>
                                                                                {activity.credits}
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
