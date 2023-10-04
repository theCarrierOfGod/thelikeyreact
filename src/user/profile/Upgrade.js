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
import Pick from '../../pages/ads/Pick'



const Upgrade = () => {
    const hook = useHook();
    const wallet = useWallet();
    const auth = useAuth();
    const navigate = useNavigate();
    const userHook = useUser();
    const [amount, setAmount] = useState(2000);
    const [nairaAmount, setNairaAmount] = useState(2000);
    const [currency, setCurrency] = useState('');
    const [network, setNetwork] = useState('');
    const [credits, setCredits] = useState('');
    const [showQR, setShowQR] = useState(false);
    const [total, setTotal] = useState('');
    const [sendingFunding, setSendingFunding] = useState(false);
    const [stopTime, setStopTime] = useState(2000);
    const [paying, setPaying] = useState(false);
    const [method, setMethod] = useState('');
    const [name, setName] = useState('');
    const [proceed, setProceed] = useState(false)

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

    const add = async (data) => {
        let res = await wallet.upgradeAccount(data);
        if (res) {
            setSendingFunding(false);
            setShowQR(false);
            navigate('/');
            setPaying(false)
        } else {
            setSendingFunding(false);
            setShowQR(false)
            setPaying(false)
        }
        wallet.upgradeHistory(auth.userOnline)
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
        if (amount < 2000) {
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

    useEffect(() => {
        wallet.upgradeHistory(auth.userOnline)
    }, [])

    return (
        <>
            <Helmet>
                <title>
                    Upgrade Account | The LIKEY
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
                                    </span> UPGRADE ACCOUNT
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
                                <div className="col-lg-6 grid-margin">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                <strong>
                                                    <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                                                </strong>
                                                INFORMATION
                                            </h4>
                                            <br />

                                            <p className="card-description">
                                                Cost for account upgrade is <b> &#8358; 2000 </b> <br />
                                            </p>
                                            <div className={userHook.userPackage === 'free' ? 'd-block' : 'd-none'}>
                                                <div class="select">
                                                    <select onChange={(e) => setMethod(e.target.value)}>
                                                        <option value={''}>Select payment method</option>
                                                        <option value={'card'}>INTERNET BANKING</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={userHook.userPackage !== 'free' ? 'd-block' : 'd-none'}>
                                                <p className='mt-2'>
                                                    Account Already Upgraded to Premium
                                                </p>
                                            </div>
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
                                                    <label for="cryptoamount">Amount</label>
                                                    <input type="number" min="2000"
                                                        name="cryptoamount" className="form-control" value={amount} placeholder="Amount" required id="cryptoamount" />
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

                                <div className='col-sm-12'>
                                    <div className="card" style={{ height: 'max-content', marginBottom: "20px" }}>
                                        <div className="card-body">
                                            <h4 className="card-title mb-4">History</h4>
                                            <div className="d-flex justify-content-between table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">TRANSACTION ID</th>
                                                            <th scope="col">AMOUNT</th>
                                                            <th scope="col">CURRENCY</th>
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
                                                                                {activity.amount_crypto}
                                                                            </td>
                                                                            <td>
                                                                                {activity.currency}
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

export default Upgrade
