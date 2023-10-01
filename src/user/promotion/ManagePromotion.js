import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Hook, useHook } from '../../contexts/Hook'
import { useUser } from '../../contexts/User'
import Header from '../Header';
import Sidebar from '../Sidebar';
import swal from 'sweetalert';
import { usePromotion } from '../../contexts/Promotions';
import { useAuth } from '../../contexts/Auth';
import { Helmet } from 'react-helmet';
import Footer from '../Footer';

const ManagePromotion = () => { 
    let { unique_id } = useParams();
    const userHook = useUser();
    const hook = useHook();
    const location = useLocation();
    const auth = useAuth();
    const promotion = usePromotion();
    const [socialMedia, setSocialMedia] = useState('')
    const [promotionType, setPromotionType] = useState('')
    const [details, setDetails] = useState('')
    const [targetAudience, setTargetAudience] = useState('Worldwide')
    const [weblink, setWeblink] = useState('')
    const [amount, setAmount] = useState(promotion.promotionDetails.target)
    const [cpu, setCpu] = useState(3)
    const [total, setTotal] = useState('0');
    const [linkErr, setLinkErr] = useState(false);
    const [status, setStatus] = useState('active');


    const platformHandler = (e) => {
        setSocialMedia(e.target.value)
        hook.getPlatformPromotions(e.target.value);
    }

    let cpus = [];
    for (let i = 3; i < 31; i++) {
        cpus.push(i);
    }

    const calcTotal = (cost, count) => {
        setCpu(cost);

        if (count < 0) {
            return false;
        }
        setAmount(count);
        setTotal(cost * count);
    }

    const isValidUrl = (urlString) => {
        if ((urlString.includes('http://')) && (urlString.includes(socialMedia))) {
            setLinkErr(false)
        } else {
            setLinkErr(true)
            return false;
        }
    }

    const newForm = (e) => {
        e.preventDefault();

        if (total === 0) {
            swal("Manage Promotion", "Minimum total cost not reached!", "error");
            return;
        }

        if (amount === 0) {
            swal("Manage Promotion", "Minimum amount not reached!", "error");
            return;
        }

        if (total > userHook.userDetails['earned']) {
            swal("Manage Promotion", "Insufficient earned credits!", "error");
            return;
        }

        const data = {
            details: details,
            targetAudience: targetAudience,
            amount: amount,
            cpu: cpu,
            total: total,
            userOnline: auth.userOnline,
            unique_id: unique_id,
            status: status
        }

        promotion.updatePromotion(data);
    }


    useEffect(() => {
        promotion.getPromotionDetails(unique_id);
    }, [location.key])

    useEffect(() => {
        setAmount(promotion.promotionDetails.target)
        setCpu(promotion.promotionDetails.cpu)
        setTotal(promotion.promotionDetails.total_cost)
        setTargetAudience(promotion.promotionDetails.location);
        setStatus(promotion.promotionDetails.status);
        setDetails(promotion.promotionDetails.description)
        return () => {
            return true;
        }
    }, [promotion.promotionDetails])


    return (
        <>
            <Helmet>
                <title>
                    Manage Promotion | The LIKEY
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
                                    </span> MANAGE PROMOTION
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
                                            <h4 className="card-title">
                                                <strong>
                                                    EDIT PROMOTION
                                                </strong>
                                            </h4>
                                            <form className="forms-sample mt-4" action="" method="POST" onSubmit={(e) => newForm(e)}>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className='form-group'>
                                                            <label htmlFor='unique_id'>
                                                                Unique Identification number
                                                            </label>
                                                            <input className='form-control' name="unique_id" disabled={true} value={unique_id} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="socialMedia">Social Media Platform</label>
                                                            <input className='form-control' name="unique_id" disabled={true} value={promotion.promotionDetails.platform} />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="status">Status</label>
                                                            <select className="form-select" id="status" name="status" required onChange={(e) => setStatus(e.target.value)} defaultValue={status} >
                                                                <option value={'active'}>
                                                                    Active
                                                                </option>
                                                                <option value={'inactive'}>
                                                                    Inactive
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="promotionType">Promotion Type</label>
                                                            <input className='form-control' name="unique_id" disabled={true} value={promotion.promotionDetails.type} />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="weblink">Weblink</label>
                                                            <input type={'url'} className="form-control" disabled={true} name="weblink" id="weblink" value={promotion.promotionDetails.link} onChange={(e) => { isValidUrl(e.target.value); setWeblink(e.target.value) }} required placeholder="https://..." />
                                                            <small className={linkErr ? 'd-block w-100' : 'd-none'}>
                                                                {/* <span className='alert alert-danger w-100 d-block p-1 mt-2'>Invalid link for a {socialMedia} promotion</span> */}
                                                                <span className='alert alert-danger w-100 d-block p-1 mt-2'>
                                                                    Accepted weblink format: http://{socialMedia}.com/...
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
                                                            <input type={'number'} readOnly={true} className="form-control" name="amount" id="amount" value={amount} onChange={(e) => calcTotal(cpu, e.target.value)} required />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label htmlFor="cpu">Cost per user (CREDITS)</label>
                                                            <select className="form-select p-2" disabled={true} id="cpu" name="cpu" required onChange={(e) => calcTotal(e.target.value, amount)}>
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
                                                                {promotion.addingNew ? " updating... " : "Update"}
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

export default ManagePromotion