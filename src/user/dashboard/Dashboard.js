import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
import { useHook } from '../../contexts/Hook'
import { useUser } from '../../contexts/User'
import Footer from '../Footer'
import Header from '../Header'
import Sidebar from '../Sidebar'
import { useWallet } from '../../contexts/Wallet'
import axios from 'axios'
import Pick from '../../pages/ads/Pick'

const Dashboard = () => {
    const userHook = useUser();
    const hook = useHook();
    const auth = useAuth();
    const location = useLocation();
    const walletHook = useWallet();
    const [ad, setAd] = useState();
    const [refs, setRefs] = useState([])

    const getDownline = async () => {
        try {
            const res = await axios.get(`${hook.endpoint}/downlines/${window.localStorage.getItem('username')}`);
            if (res.data) {
                setRefs(res.data);
            }
        } catch (error) {
            setRefs([])
        }
    }

    const getNow = () => {
        getDownline();
        userHook.getHomeActivities(window.localStorage.getItem('username'));
        userHook.countPerformed(window.localStorage.getItem('username'));
        userHook.countCompleted(window.localStorage.getItem('username'));
        userHook.countPromotions(window.localStorage.getItem('username'));
        userHook.countTasks(window.localStorage.getItem('username'));
        walletHook.withdrawalHistory(window.localStorage.getItem('username'))
        walletHook.fundingHistory(window.localStorage.getItem('username'))
        setAd(hook.pickAd())
    }

    useEffect(() => {
        getNow();

        return () => {
            return true;
        }
    }, [location.key])


    return (
        <>
            <Helmet>
                <title>
                    Dashboard | The LIKEY
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
                                    <span className="page-title-icon bg-info text-white me-2">
                                        <i className="mdi mdi-home"></i>
                                    </span> DASHBOARD
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <span></span>Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="row justify-content-between">
                                <Pick />
                                <div className="col-md-3 col-sm-6 col-6 stretch-card grid-margin">
                                    <div className="card bg-info card-img-holder text-dark">
                                        <div className="card-body p-2">
                                            <img src="/assets/images/dashboard/circle.svg" className="card-img-absolute" alt="CCC" />
                                            <h4 className="font-weight-normal mb-3 text-right">ACCOUNT TYPE
                                            </h4>
                                            <h2 className="mb-2 text-right" style={{ fontSize: '2rem', textTransform: 'uppercase', fontFamily: 'monospace', textAlign: 'right' }}>
                                                {userHook.userPackage}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 col-6  stretch-card grid-margin">
                                    <div className="card bg-primary card-img-holder text-white">
                                        <div className="card-body p-2">
                                            <img src="/assets/images/dashboard/circle.svg" className="card-img-absolute" alt="CCC" />
                                            <h4 className="font-weight-normal mb-3 text-right">BALANCE
                                            </h4>
                                            <h2 className="mb-2 text-right" style={{ fontSize: '1.5rem' }}>
                                                &#8358;{userHook.earnedBalance}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 col-6 stretch-card grid-margin">
                                    <Link to={'/task/manage'} className="card bg-info card-img-holder text-white" style={{ textDecoration: 'none' }} >
                                        <div className="card-body p-2">
                                            <img src="/assets/images/dashboard/circle.svg" className="card-img-absolute" alt="CCC" />
                                            <h4 className="font-weight-normal mb-3 text-right">
                                                <Link to={'/task/manage'} className="font-weight-normal mb-3 text-right title is-4" style={{ color: 'white', textDecoration: 'none' }}>Tasks</Link>
                                            </h4>
                                            <h2 className="mb-2 text-right" style={{ fontSize: '1.5rem' }}>
                                                {userHook.taskCount}
                                            </h2>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-md-3 col-sm-6 col-6 stretch-card grid-margin">
                                    <Link to={'/refer-n-earn'} className="card bg-success card-img-holder text-white" style={{ textDecoration: 'none' }} >
                                        <div className="card-body p-2">
                                            <img src="/assets/images/dashboard/circle.svg" className="card-img-absolute" alt="CCC" />
                                            <h4 className="font-weight-normal mb-3 text-right">
                                                <Link to={'/wallet/withdraw'} className="font-weight-normal mb-3 text-right title is-4" style={{ color: 'white', textDecoration: 'none' }}>Withdrawn</Link>
                                            </h4>
                                            <h2 className="mb-2 text-right" style={{ fontSize: '1.5rem' }}>
                                                &#8358;{userHook.withdrawn}
                                            </h2>
                                        </div>
                                    </Link>
                                </div>
                                <div className='col-md-12 d-none strech-card grid-margin'>
                                    <div className='notification is-info is-light p-1' style={{ fontFamily: 'monospace', fontSize: '8px' }}>
                                        <p>Free credits are used for <strong><Link to="/promotion/new" style={{ textDecoration: 'none' }}>promotions</Link>.</strong></p>
                                        <p>Withdrawable credits are used for <strong><Link to="/task/new" style={{ textDecoration: 'none' }}>tasks</Link></strong> </p>
                                        <p>Withdrawable credits can be <strong><Link to="/wallet/transfer" style={{ textDecoration: 'none' }}>transferred</Link></strong>  to free credits.</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 col-6 stretch-card grid-margin">
                                    <Link to={'/refer-n-earn'} className="card bg-primary card-img-holder text-white" style={{ textDecoration: 'none' }} >
                                        <div className="card-body p-2">
                                            <img src="/assets/images/dashboard/circle.svg" className="card-img-absolute" alt="CCC" />
                                            <h4 className="font-weight-normal mb-3 text-right">
                                                <Link to={'/refer-n-earn'} className="font-weight-normal mb-3 text-right title is-4" style={{ color: 'white', textDecoration: 'none' }}>Referrals</Link>
                                            </h4> <br />
                                            <h2 className="mb-2 text-right" style={{ fontSize: '1.5rem' }}>
                                                {refs.length}
                                            </h2>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-md-3 col-sm-6 col-6 stretch-card grid-margin">
                                    <div className="card bg-info card-img-holder text-white">
                                        <div className="card-body p-2">
                                            <img src="/assets/images/dashboard/circle.svg" className="card-img-absolute" alt="CCC" />
                                            <h4 className="font-weight-normal mb-3 text-right">Task Completed</h4>
                                            <h2 className="mb-2 text-right" style={{ fontSize: '1.5rem' }}>
                                                {userHook.completed}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 grid-margin stretch-card">
                                    <div className="card" style={{ height: 'max-content', marginBottom: "20px" }}>
                                        <div className="card-body">
                                            <h4 className="card-title mb-4">Recent Activities</h4>

                                            <ol className="activity-feed mb-0 ps-2" data-simplebar style={{ maxHeight: "max-content", overflowY: "auto" }}>
                                                {userHook.homeActs.length === 0 ? null : (
                                                    <>
                                                        {userHook.homeActs.map((act) => (
                                                            <li className='feed-item' key={act.id}>
                                                                <div className="feed-item-list">
                                                                    <p className="text-muted mb-1 font-size-13">
                                                                        {hook.getDate(act.date)}
                                                                    </p>
                                                                    <p className="mb-0">
                                                                        {act.detail}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </>
                                                )}
                                            </ol>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 grid-margin stretch-card justify-content-center">
                                    <div className='row w-100'>
                                        <div className='col-sm-12 m-0 p-0'>
                                            <div className="card" style={{ height: 'max-content', marginBottom: "20px" }}>
                                                <div className="card-body">
                                                    <h4 className="card-title mb-4">Recent Withdrawals</h4>

                                                    <ol className="activity-feed mb-0 ps-2" data-simplebar style={{ maxHeight: "max-content", overflowY: "auto" }}>
                                                        {walletHook.withdrawalHis.length === 0 ? null : (
                                                            <>
                                                                {walletHook.withdrawalHis.map((act) => (
                                                                    <li className='feed-item' key={act.id}>
                                                                        <div className="feed-item-list">
                                                                            <p className="text-muted mb-1 font-size-13">
                                                                                {hook.getDate(act.created_at)}
                                                                            </p>
                                                                            <p className="mb-0">
                                                                                &#8358;{act.credits} (status :: <i style={{ fontWeight: '11px' }} >{act.status}</i>)
                                                                            </p>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </>
                                                        )}
                                                    </ol>

                                                </div>
                                            </div>
                                            <div className="card w-100" style={{ height: 'max-content', marginBottom: "20px" }}>
                                                <div className="card-body">
                                                    <h4 className="card-title mb-4">Recent Fundings</h4>

                                                    <ol className="activity-feed mb-0 ps-2" data-simplebar style={{ maxHeight: "max-content", overflowY: "auto" }}>
                                                        {walletHook.myTransactions.length === 0 ? null : (
                                                            <>
                                                                {walletHook.myTransactions.map((act) => (
                                                                    <li className='feed-item' key={act.id}>
                                                                        <div className="feed-item-list">
                                                                            <p className="text-muted mb-1 font-size-13">
                                                                                {hook.getDate(act.created_at)}
                                                                            </p>
                                                                            <p className="mb-0">
                                                                                &#8358;{act.credits} (status :: <i style={{ fontWeight: '11px' }} >{act.status}</i>)
                                                                            </p>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </>
                                                        )}
                                                    </ol>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
            <Footer />
        </>
    )
}

export default Dashboard