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
import { useTask } from '../../contexts/Tasks';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';

const ManageTask = () => {
    let { unique_id } = useParams();
    const userHook = useUser();
    const hook = useHook();
    const location = useLocation();
    const auth = useAuth();
    const task = useTask();
    const [socialMedia, setSocialMedia] = useState('')
    const [details, setDetails] = useState('')
    const [targetAudience, setTargetAudience] = useState('WORLDWIDE')
    const [amount, setAmount] = useState(task.uniqueTask.target)
    const [cpu, setCpu] = useState(30)
    const [total, setTotal] = useState('0');
    const [linkErr, setLinkErr] = useState(false);
    const [status, setStatus] = useState('active');


    const platformHandler = (e) => {
        setSocialMedia(e.target.value)
        hook.getPlatformPromotions(e.target.value);
    }

    let cpus = [];
    for (let i = 30; i < 121; i++) {
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
        if ((urlString.includes('https://')) && (urlString.includes(socialMedia))) {
            setLinkErr(false)
        } else {
            setLinkErr(true)
            return false;
        }
    }

    const newForm = (e) => {
        e.preventDefault();

        if (total === 0) {
            swal("Manage Task", "Minimum total cost not reached!", "error");
            return;
        }
 
        if (amount === 0) {
            swal("Manage Task", "Minimum amount not reached!", "error");
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

        task.updateTask(data);
    }


    useEffect(() => {
        task.fetchTask(unique_id);

    }, [location.key])

    useEffect(() => {
        setAmount(task.uniqueTask.target)
        setCpu(task.uniqueTask.cpu)
        setTotal(task.uniqueTask.total_cost)
        setTargetAudience(task.uniqueTask.location);
        setStatus(task.uniqueTask.status);
        setDetails(task.uniqueTask.description)
        // setDetails('<p>This house is bitching</p>');
        return () => {
            return true;
        }
    }, [task.uniqueTask])


    return (
        <>
            <Helmet>
                <title>
                    Manage Task | The LIKEY
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
                                    </span> MANAGE Task
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
                                        <div className="card-body p-2">
                                            <h4 className="card-title">
                                                <strong>
                                                    EDIT TASK
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
                                                            <label htmlFor="promotionType">Title</label>
                                                            <input className='form-control' name="unique_id" disabled={true} value={task.uniqueTask.title} />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="details">
                                                                Details
                                                            </label>
                                                            <small>
                                                                Copy the text above into this text editor to edit it.
                                                            </small>
                                                            <textarea name="details" id="details"  placeholder="Enter detailed description" rows="5" onChange={(e) => setDetails(e.target.value)} required className="form-control" value={details}></textarea>
                                                            <CKEditor
                                                                editor={ClassicEditor}
                                                                className="form-control"
                                                                name="details"
                                                                id="details"
                                                                rows="5"
                                                                required={true}
                                                                style={{ outerHeight: '200px', innerHeight: '200px', maxHeight: '200px' }}
                                                                config={{
                                                                    toolbar: ['bold', 'italic']
                                                                }}
                                                                placeholder={'Copy the text above into this text editor to edit it.'}
                                                                onReady={ editor => {
                                                                    // You can store the "editor" and use when it is needed.
                                                                    console.log( 'Editor is ready to use!', editor );
                                                                    // editor.setData(details)
                                                                } }
                                                                onChange={(event, editor) => {
                                                                    setDetails(editor.getData());
                                                                }}
                                                            />
                                                            
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="weblink">Weblink</label>
                                                            <input type={'url'} className="form-control" disabled={true} name="weblink" id="weblink" value={task.uniqueTask.link} required placeholder="https://..." />
                                                            <small className={linkErr ? 'd-block w-100' : 'd-none'}>
                                                                {/* <span className='alert alert-danger w-100 d-block p-1 mt-2'>Invalid link for a {socialMedia} promotion</span> */}
                                                                <span className='alert alert-danger w-100 d-block p-1 mt-2'>
                                                                    Accepted weblink format: https://www.{socialMedia}.com/...
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
                                                                            <option key={country.name} id={country.name} selected={targetAudience === country.name} value={country.name}>
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
                                                            <input type={'number'} className="form-control" name="amount" readOnly={true} id="amount" value={amount} onChange={(e) => calcTotal(cpu, e.target.value)} required />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label htmlFor="cpu">Cost per user</label>
                                                            <select className="form-select p-2" id="cpu" name="cpu" disabled={true} required onChange={(e) => calcTotal(e.target.value, amount)}>
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
                                                            <label htmlFor="total">TOTAL</label>
                                                            <input type={'number'} className="form-control" readOnly={true} name="total" id="total" value={total} required />
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-12'>
                                                        <div className='w-100 d-flex justify-content-end'>
                                                            <button className='btn btn-success' disabled={task.addingNew ? true : false}>
                                                                {task.addingNew ? " updating... " : "Update"}
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

export default ManageTask