import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { useUser } from '../../contexts/User'
import { useAuth } from '../../contexts/Auth'
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid';
import '../user.css'
import { useHook } from '../../contexts/Hook'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const ReferNEarn = () => {
    const auth = useAuth();
    const location = useLocation();
    const hook = useHook();
    const userHook = useUser();
    const ref_address = `https://user.thelikey.com/sign_up/${auth.userOnline}`;
    const [alert, setAlert] = useState('');
    const [refs, setRefs] = useState([]);


    const copyText = (id) => {
        // Get the text field
        var copyText = document.getElementById(id);

        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
        setAlert('Copied to clipboard!');
    }

    const getDownline = async () => {
        try {
            const res = await axios.get(`${hook.endpoint}/downlines/${auth.userOnline}`);
            if (res.data) {
                setRefs(res.data);
            }
        } catch (error) {
            setRefs([])
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setAlert('')
        }, 6000);
    }, [alert])

    useEffect(() => {
        getDownline();
    }, [location.key]);

    return (
        <>
            <Helmet>
                <title>
                    Refer N Earn | The LIKEY
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
                                    <span className="page-title-icon bg-gradient-success text-white me-2">
                                        <i className="mdi mdi-account-outline"></i>
                                    </span> REFER AND EARN
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <span></span>Account <i className="mdi mdi-account-circle-outline icon-sm text-light align-middle"></i>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="row justify-content-start">
                                <div className='col-md-8'>
                                    <div className='notification mb-3'>
                                        <span className='title is-6 mb-3' style={{ textTransform: 'uppercase', fontFamily: 'monospace' }}>
                                            "Share your referral link with your friends and family to earn real cash after they sign up and activate their account." <br />Earn &#8358;20 per person you refer.
                                        </span>
                                        <p className={alert !== "" ? "floatingAlert" : "d-none"} >
                                            {alert}
                                        </p>
                                        <input name='ref_address' type={'url'} disabled={true} id={'ref_address'} value={ref_address} className='input is-transparent' style={{ background: 'transparent', border: '0 none', borderColor: 'transparent' }} />
                                        <button className='button is-link is-light mt-2' onClick={() => copyText('ref_address')}>
                                            Copy
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-8 grid-margin stretch-card">
                                    <div className="card">
                                        <div className='card-title p-3'>
                                            Referral List
                                        </div>
                                        <div className="card-body p-2 table-responsive">
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Username</th>
                                                        <th>Status</th>
                                                        <th>Timestamp</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {refs.length !== 0 ? (
                                                        <>
                                                            {refs.map((ref, index) => (
                                                                <tr>
                                                                    <th>{index + 1}</th>
                                                                    <td>{ref.username}</td>
                                                                    <td>{(ref.verified === "1") ? "Verified" : "Unverified"}</td>
                                                                    <td>{ref.created_at}</td>
                                                                </tr>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <tr>
                                                            You have not refered any user
                                                        </tr>
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
                <Footer />
            </div>
        </>
    )
}

export default ReferNEarn
