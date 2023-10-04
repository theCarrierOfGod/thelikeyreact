import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useHook } from '../../contexts/Hook'
import { useUser } from '../../contexts/User'
import Header from '../Header';
import Sidebar from '../Sidebar';
import swal from 'sweetalert';
import { useAuth } from '../../contexts/Auth';
import { useTask } from '../../contexts/Tasks';
import Footer from '../Footer';
import { Helmet } from 'react-helmet';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const NewTask = () => {
    const userHook = useUser();
    const hook = useHook();
    const auth = useAuth();
    const location = useLocation();
    const task = useTask();
    const [socialMedia, setSocialMedia] = useState('')
    const [promotionType, setPromotionType] = useState('')
    const [details, setDetails] = useState('')
    const [targetAudience, setTargetAudience] = useState('Worldwide')
    const [weblink, setWeblink] = useState('')
    const [amount, setAmount] = useState(0);
    const [minCPU, setMINCPU] = useState(3);
    const [cpu, setCpu] = useState(20)
    const [total, setTotal] = useState(cpu * amount);
    const [linkErr, setLinkErr] = useState(false);
    const [taskType, setTaskType] = useState('');


    const platformHandler = (e) => {
        setSocialMedia(e.target.value)
        alert(e.target.var)
        console.log(e.target)

        if (e.target.value === "custom") {
            document.getElementById('promotionType').setAttribute('disabled', true);
            document.getElementById('promotionLabel').setAttribute('for', 'promotionType2');
            document.getElementById('promotionType').style.display = "none";
            document.getElementById('promotionType2').removeAttribute('disabled');
            document.getElementById('promotionType2').style.display = "block";
            setMINCPU(20)
        } else {
            hook.getPlatformPromotions(e.target.value);
            document.getElementById('promotionType').removeAttribute('disabled');
            document.getElementById('promotionType').style.display = "block";
            document.getElementById('promotionType2').setAttribute('disabled', true);
            document.getElementById('promotionType2').style.display = "none";
            document.getElementById('promotionLabel').setAttribute('for', 'promotionType');
            if(e.target.name === "promotion") {
                setMINCPU(3)
            } else {
                setMINCPU(20)
            }
        }
    }

    let cpus = [];
    for (let i = minCPU; i < 121; i++) {
        cpus.push(i);
    }

    const calcTotal = (cost, count) => {
        setCpu(cost);
        setAmount(count);

        if (count < 5) {
            return false;
        }
        setTotal(cost * count);
    }

    const isValidUrl = (urlString) => {
        if (urlString.length > 5) {
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
            swal("New Task", "Minimum total cost not reached!", "error");
            return;
        }

        if (amount === 0) {
            swal("New Task", "Minimum amount not reached!", "error");
            return;
        }

        if (cpu < minCPU) {
            swal("New Task", "Minimum cost per user not reached!", "error");
            return;
        }

        if (total > userHook.userDetails['balance']) {
            swal("New Task", "Insufficient balance!", "error");
            return;
        }

        const data = {
            socialMedia: socialMedia,
            promotionType: promotionType,
            details: details,
            targetAudience: targetAudience,
            weblink: weblink,
            amount: amount,
            cpu: cpu,
            total: total,
            theType: taskType,
            userOnline: auth.userOnline
        }

        task.addNewTask(data);
    }


    useEffect(() => {
        // hook.getAllCountries();

    }, [location.key])

    return (
        <>
            <Helmet>
                <title>
                    Create Task | The LIKEY
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
                                    <span className="page-title-icon bg-primary text-white me-2">
                                        <i className="mdi mdi-transfer-line"></i>
                                        <span className="iconify" data-icon="icon-park:add"></span>
                                    </span> NEW TASK
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <span></span>Tasks <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
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
                                                    Current purchased credits: &nbsp;
                                                    <strong>
                                                        &#8358;{userHook.earnedBalance}
                                                    </strong>
                                                </div>
                                                <div>
                                                    <Link to="/task/manage" className="text-info">
                                                        Manage Tasks
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-8 grid-margin'>
                                    <div className={"notification is-primary is-light"}>
                                        <button className="delete is-hidden"></button>
                                        Insufficient Balance ? <Link to={'/wallet/add_fund'} className='is-secondary'>Fund Wallet Now</Link>
                                    </div>
                                </div>

                                <div className="col-md-8 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                <strong>
                                                    CREATE A NEW TASK
                                                </strong>
                                            </h4>
                                            <form className="forms-sample mt-4" action="" method="POST" onSubmit={(e) => newForm(e)}>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="socialMedia">Social Media Platform</label>
                                                            <select className="form-select" id="socialMedia" name="socialMedia" required defaultValue={socialMedia} onChange={(e) => platformHandler(e)}>
                                                                <option value="">Select platform</option>
                                                                {hook.taskPlatforms.length === 0 ? null : (
                                                                    <>
                                                                        {hook.taskPlatforms.map((taskPlatforms) => (
                                                                            <option key={taskPlatforms.id} id={taskPlatforms.nicename} value={taskPlatforms.nicename} var={taskPlatforms.type}>
                                                                                {taskPlatforms.name}
                                                                            </option>
                                                                        ))}
                                                                    </>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="promotionType" id="promotionLabel">Task Type</label>
                                                            <select className="form-select" id="promotionType" name="promotionType" required onChange={(e) => setPromotionType(e.target.value)} defaultValue={promotionType}>
                                                                <option value="">Select task type</option>
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
                                                            <input type={'text'} className="form-control" name="promotionType" style={{ display: 'none' }} disabled={true} id="promotionType2" value={promotionType} onChange={(e) => setPromotionType(e.target.value)} required />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="details">
                                                                Details
                                                            </label>
                                                            <CKEditor
                                                                editor={ClassicEditor}
                                                                className="form-control"
                                                                name="overview"
                                                                id="overview"
                                                                rows="5"
                                                                required={true}
                                                                style={{ outerHeight: '200px', innerHeight: '200px', maxHeight: '200px' }}
                                                                data={details}
                                                                config={{
                                                                    toolbar: ['bold', 'italic']
                                                                }}
                                                                onChange={(event, editor) => {
                                                                    setDetails(editor.getData());
                                                                }}
                                                            />
                                                            {/* <textarea name="details" id="details" placeholder="Enter detailed description" rows="5" onChange={(e) => setDetails(e.target.value)} required className="form-control" value={details}></textarea> */}
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="weblink">Weblink</label>
                                                            <input type={'text'} className="form-control" name="weblink" id="weblink" value={weblink} onChange={(e) => { isValidUrl(e.target.value); setWeblink(e.target.value) }} required placeholder="https://..." />
                                                            <small className={linkErr ? 'd-block w-100' : 'd-none'}>
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
                                                                            <option key={country.name} id={country.name} value={country.name}>
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
                                                            <input type={'number'} className="form-control" name="amount" id="amount" value={amount} min={5} onChange={(e) => calcTotal(cpu, e.target.value)} required placeholder='Minimum amount is 5' />
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
                                                            <button className='btn btn-success' disabled={task.addingNew ? true : false}>
                                                                {task.addingNew ? " adding... " : "Submit"}
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

export default NewTask