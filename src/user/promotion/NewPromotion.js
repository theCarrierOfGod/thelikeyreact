import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Hook, useHook } from '../../contexts/Hook'
import { useUser } from '../../contexts/User'
import Header from '../Header';
import Sidebar from '../Sidebar';
import swal from 'sweetalert';
import { usePromotion } from '../../contexts/Promotions';
import { useAuth } from '../../contexts/Auth';
import { Helmet } from 'react-helmet';
import Footer from '../Footer';

const NewPromotion = () => {
    const userHook = useUser();
    const hook = useHook();
    const location = useLocation();
    const auth = useAuth();
    const promotion = usePromotion();
    const [socialMedia, setSocialMedia] = useState('')
    const [promotionType, setPromotionType] = useState('')
    const [targetAudience, setTargetAudience] = useState('Worldwide')
    const [weblink, setWeblink] = useState('')
    const [amount, setAmount] = useState(0)
    const [cpu, setCpu] = useState(2)
    const [total, setTotal] = useState(cpu * amount);
    const [linkErr, setLinkErr] = useState(false);

    const platformHandler = (e) => {
        setSocialMedia(e.target.value)
        hook.getPlatformPromotions(e.target.value);
    }

    let cpus = [];

    for (let i = 2; i < 31; i++) {
        cpus.push(i);
    }

    const calcTotal = (cost, count) => {
        setCpu(cost);
        setAmount(count);

        if (count < 0) {
            return false;
        }
        setTotal(cost * count);
    }

    const isValidUrl = (urlString) => {
        if (urlString.includes(socialMedia)) {
            setLinkErr(false)
        } else {
            setLinkErr(true)
            return false;
        }
    }

    const newForm = (e) => {
        e.preventDefault();
        if (isValidUrl(weblink)) {
            return;
        }

        if (total === 0) {
            swal("New Promotion", "Minimum total cost not reached!", "error");
            return;
        }

        if (amount === 0) {
            swal("New Promotion", "Minimum amount not reached!", "error");
            return;
        }

        if (total > userHook.userDetails['earned']) {
            swal("New Promotion", "Insufficient earned credits!", "error");
            return;
        }

        const data = {
            socialMedia: socialMedia,
            promotionType: promotionType,
            targetAudience: targetAudience,
            weblink: weblink,
            amount: amount,
            cpu: cpu,
            total: total,
            userOnline: auth.userOnline
        }

        promotion.addNewPromotion(data);
    }

    useEffect(() => {
    }, [location.key])

    return ( 
        <>
            <Helmet>
                <title>
                    Create Promotion | The LIKEY
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
                                        <i className="mdi mdi-transfer-line"></i>
                                        <span className="iconify" data-icon="icon-park-twotone:add"></span>
                                    </span> NEW PROMOTION
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <span></span>Promotions <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="row justify-content-start">

                                <div className="col-md-8 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    Current free credits:
                                                    <strong>
                                                        {userHook.userDetails.earned}
                                                    </strong>
                                                </div>
                                                <div>
                                                    <Link to="/promotion/manage" className="text-info">
                                                        Manage Promotions
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-8 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                <strong>
                                                    CREATE A NEW PROMOTION
                                                </strong>
                                            </h4>
                                            <form className="forms-sample mt-4" action="" method="POST" onSubmit={(e) => newForm(e)}>
                                                <div className="row">
                                                    <div className="col-sm-12">
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

                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="promotionType">Promotion Type</label>
                                                            <select className="form-select" id="promotionType" name="promotionType" required onChange={(e) => setPromotionType(e.target.value)} defaultValue={promotionType}>
                                                                <option value="">Select promotion type</option>
                                                                {hook.promotionTypes.length === 0 ? null : (
                                                                    <>
                                                                        {hook.promotionTypes.map((promotionType) => (
                                                                            <option key={promotionType.id} id={promotionType.V} value={promotionType.V}>
                                                                                {promotionType.V}
                                                                            </option>
                                                                        ))}
                                                                    </>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="weblink">Weblink</label>
                                                            <input type={'text'} className="form-control" name="weblink" id="weblink" value={weblink} onChange={(e) => { isValidUrl(e.target.value); setWeblink(e.target.value) }} required placeholder="https://..." />
                                                            <small className={linkErr ? 'd-block w-100' : 'd-none'}>
                                                                {/* <span className='alert alert-danger w-100 d-block p-1 mt-2'>Invalid link for a {socialMedia} promotion</span> */}
                                                                <span className='alert alert-danger w-100 d-block p-1 mt-2'>
                                                                    Accepted weblink format: http://www.{socialMedia}.com/...
                                                                </span>
                                                            </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="targetAudience">Target Audience</label>
                                                            <select className="form-select" id="targetAudience" name="targetAudience" required onChange={(e) => setTargetAudience(e.target.value)} defaultValue={targetAudience}>
                                                                <option value="">Select target country</option>
                                                                {hook.countries.length === 0 ? null : (
                                                                    <>
                                                                        {hook.countries.map((country) => (
                                                                            <option key={country.iso} id={country.nicename} value={country.nicename}>
                                                                                {country.name}
                                                                            </option>
                                                                        ))}
                                                                    </>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label htmlFor="amount">Amount</label>
                                                            <input type={'number'} className="form-control" placeholder='Minimum amount is 5' min={5} name="amount" id="amount" value={amount} onChange={(e) => calcTotal(cpu, e.target.value)} required />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label htmlFor="cpu">Cost per user (CREDITS)</label>
                                                            <select className="form-select p-2" id="cpu" name="cpu" required onChange={(e) => calcTotal(e.target.value, amount)}>
                                                                {cpus.map((cost) => (
                                                                    <option key={cost} id={cost} value={cost}>
                                                                        {cost}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="total">TOTAL (CREDITS)</label>
                                                            <input type={'number'} className="form-control" readOnly={true} name="total" id="total" value={total} required />
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-12'>
                                                        <div className='w-100 d-flex justify-content-end'>
                                                            <button className='btn btn-success' disabled={promotion.addingNew ? true : false}>
                                                                {promotion.addingNew ? " adding... " : "Submit"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
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

export default NewPromotion