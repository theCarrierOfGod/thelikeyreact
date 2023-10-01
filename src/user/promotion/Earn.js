import React, { useEffect } from 'react'
import { useUser } from '../../contexts/User'
import Header from '../Header'
import Sidebar from '../Sidebar'
import { useAuth } from '../../contexts/Auth'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useHook } from '../../contexts/Hook'
import { usePromotion } from '../../contexts/Promotions'
import Footer from '../Footer'
import { Helmet } from 'react-helmet'
import Pick from '../../pages/ads/Pick'

const Earn = () => {
    const userHook = useUser();
    const auth = useAuth();
    const hook = useHook();
    const location = useLocation();
    const promotions = usePromotion();
    const [socialMedia, setSocialMedia] = useState('facebook')
    const [promotionType, setPromotionType] = useState('LIKE');
    const [timer, setTimer] = useState(0);
    const [socialError, setSocialError] = useState(false)

    const getNow = () => {
        promotions.setMyPromotions([]);
        hook.getPlatformPromotions(socialMedia)
        promotions.getPromotionToDo(auth.userOnline, socialMedia, promotionType);
        if (userHook.facebook.length === 0) {
            setSocialError(true);
        }
    }

    const platformHandler = (e) => {
        setSocialMedia(e.target.value)
        if (e.target.value === "") {
            return;
        }
        promotions.setMyPromotions([]);
        hook.getPlatformPromotions(e.target.value);
        if (e.target.value === "facebook") {
            if (userHook.facebook.length === 0) {
                setSocialError(true);
            } else {
                setSocialError(false);
            }
        } else if (e.target.value === "twitter") {
            if (userHook.twitter.length === 0) {
                setSocialError(true);
            } else {
                setSocialError(false);
            }
        } else if (e.target.value === "instagram") {
            if (userHook.instagram.length === 0) {
                setSocialError(true);
            } else {
                setSocialError(false);
            }
        } else if (e.target.value === "tiktok") {
            if (userHook.tiktok.length === 0) {
                setSocialError(true);
            } else {
                setSocialError(false);
            }
        } else {
            setSocialError(false)
        }
    }

    const proMo = (e) => {
        setPromotionType(e.target.value);
        if (e.target.value === "" && socialMedia === "") {
            return;
        }
        promotions.getPromotionToDo(auth.userOnline, socialMedia, e.target.value);
    }

    useEffect(() => {
        getNow();

        return () => {
            return true;
        }
    }, [location.key]);

    const viewPromotion = (link, id, uid) => {
        const myWindow = window.open(link, "", "width=400,height=600")
        myWindow.opener.document.getElementById(id).style.display = 'none';
        myWindow.opener.document.getElementById(uid + "_" + id).style.display = 'block';
        setTimeout(() => {
            document.getElementById(uid + "_" + id).style.display = 'none';
            document.getElementById(uid).style.display = 'block';
        }, 15000);
    }

    const confirmPromotion = (unique_id) => {
        promotions.confirmPromotion(unique_id, auth.userOnline, socialMedia, promotionType);
    }

    return (
        <div className='container-scroller'>
            <Helmet>
                <title>
                    Earn Credits | The LIKEY
                </title>
            </Helmet>
            <Header />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">

                        <div className="page-header">
                            <h3 className="page-title">
                                <span className="page-title-icon bg-info text-white me-2">
                                    <i className="mdi mdi-coin"></i>
                                </span> EARN CREDITS
                            </h3>
                            <nav aria-label="breadcrumb">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item active" aria-current="page">
                                        <span></span>PROMOTIONS <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                                    </li>
                                </ul> 
                            </nav>
                        </div>

                        <div className="row justify-content-start">
                            <Pick />
                            <div className='col-lg-12 mb-3'>
                                <div className='notification is-info is-light'>
                                    Interested in promoting your social media? <Link to={'/promotion/new'}><b> Click here!</b></Link>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="row justify-content-center">
                                    <div className="col-md-12 grid-margin stretch-card">
                                        <div className="card p-3">
                                            <b>
                                                <ol>
                                                    <li>
                                                        Click the {promotionType} button
                                                    </li>
                                                    <li>
                                                        Complete the task
                                                    </li>
                                                    <li>
                                                        Click the confirm button
                                                    </li>
                                                </ol>
                                            </b>
                                            <div className="row justify-content-center res"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={(userHook.facebook.length === 0 || userHook.twitter.length === 0 || userHook.instagram.length === 0 || userHook.tiktok.length === 0) ? "col-md-9" : "col-md-9"}>

                                <div className={"notification is-warning is-light mb-4"}>
                                    Activities are being monitored! <br />
                                    Earning without performing tasks will lead to account's permanent suspension. <strong>Take Note</strong>
                                </div>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className="row justify-content-between">
                                            <div className='col-sm-12'>
                                                <div className="card-title mb-4">
                                                    <h4 >
                                                        GET FREE CREDITS THROUGH SOCIAL MEDIA PROMOTION
                                                    </h4>
                                                    <small style={{ fontWeight: "100" }}>
                                                        Current free credits:
                                                        {userHook.userDetails['earned']}
                                                    </small>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="socialMedia">Social Media Platform</label>
                                                    <select className="form-select" id="socialMedia" name="socialMedia" required defaultValue={socialMedia} onChange={(e) => platformHandler(e)}>
                                                        <option value="">Select platform</option>
                                                        {hook.platforms.length === 0 ? null : (
                                                            <>
                                                                {hook.platforms.map((platform) => (
                                                                    <option key={platform.id} id={platform.nicename} value={platform.nicename}>
                                                                        {platform.name}
                                                                    </option>
                                                                ))}
                                                            </>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="promotionType">Promotion Type</label>
                                                    <select className="form-select" id="promotionType" name="promotionType" required onChange={(e) => proMo(e)} defaultValue={promotionType}>
                                                        <option value="">Select promotion type</option>
                                                        {hook.promotionTypes.length === 0 ? null : (
                                                            <>
                                                                {hook.promotionTypes.map((promotionType1) => (
                                                                    <option key={promotionType1.id} selected={promotionType === promotionType1.V} id={promotionType1.V} value={promotionType1.V}>
                                                                        {promotionType1.V}
                                                                    </option>
                                                                ))}
                                                            </>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-9 mt-2'>
                                <div className={(socialError) ? "notification is-danger is-light mb-4" : "d-none"}>
                                    <button className="delete is-hidden"></button>
                                    Please update your {socialMedia} details in order to perform {socialMedia} interactions.

                                    <br /> <Link to={'/profile'} className='is-secondary'>Update</Link>
                                </div>
                            </div>

                            <div className={(socialError) ? "d-none" : "col-md-9"}>
                                <div className='row justify-content-center'>
                                    {promotions.isLoading ? (
                                        <>
                                            <div className="col-md-12 mt-4">
                                                <div className="alert alert-info text-center">
                                                    <i className='fa fa-spinner fa-spin'></i>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {promotions.myPromotions.length === 0 ? (
                                                <>
                                                    <div className="col-md-12 mt-4">
                                                        <div className="alert alert-danger text-center">
                                                            <i className='fa fa-info-circle'></i> <strong>No promotion.</strong>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    {promotions.myPromotions.map((promotion) => (
                                                        <div className="col-sm-3 col-8 mt-4" key={promotion.id}>
                                                            <div className="card p-2 mb-3" style={{ border: "1px solid rgba(0, 0, 0, 0.125)" }}>
                                                                <div className="card-body p-0 text-center">
                                                                    <h5>
                                                                        {promotion.platform}
                                                                    </h5>
                                                                    <br />
                                                                    <span className='w-100 text-center text-success'>
                                                                        {promotion.cpu - 1} <i className="mdi mdi-coin mdi-24px"></i>
                                                                    </span>
                                                                    <br />
                                                                    <div className='mt-2'>
                                                                        <span onClick={() => viewPromotion(promotion.link, promotion.id, promotion.unique_id)} id={promotion.id} className="btn btn-gradient-success p-2" style={{ textDecoration: 'none' }}>{promotion.type}</span>
                                                                        <span onClick={() => confirmPromotion(promotion.unique_id)} id={promotion.unique_id} className="btn btn-gradient-success p-2" style={{ textDecoration: 'none', display: 'none' }}>Confirm</span>
                                                                        <span id={`${promotion.unique_id}_${promotion.id}`} className="btn btn-gradient-success p-2" style={{ textDecoration: 'none', display: 'none' }}><i className='fa fa-spinner fa-spin'></i></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className='col-md-9 mt-2'>
                                <div className={"notification is-info is-light mb-4"}>
                                    <button className="delete is-hidden"></button>
                                    Want to save time? <Link to={'/wallet/add_fund'} className='is-secondary'>Buy Credits Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Earn