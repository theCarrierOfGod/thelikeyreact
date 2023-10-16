import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { useTask } from '../../contexts/Tasks';
import { useAuth } from '../../contexts/Auth';
import swal from 'sweetalert';
import axios from 'axios';
import { useHook } from '../../contexts/Hook';

const Approve = () => {
    const hook = useHook();
    let { unique_id } = useParams();
    const auth = useAuth();
    const task = useTask();
    const goNow = () => {
        task.fetchTask(unique_id);
        task.getProofs(auth.userOnline, unique_id);
    }

    useEffect(() => {
        goNow();

        return () => {
            return true;
        }
    }, [unique_id]);

    const nextStep = () => {
        // setVerify(true);
    }

    const approveProof = async (proofID) => {
        try {
            const res = await axios.get(`${hook.endpoint}/admin/approve_task/${proofID}/approved`);
            console.log(res.data);
            if (res.data.success) {
                swal({
                    title: 'Approve Proof',
                    text: 'Proof approved',
                    icon: 'success',
                    timer: 2000
                })
                    .then((res) => {
                        goNow();
                    })

            } else {
                swal({
                    title: 'Approve Proof',
                    text: res.data.error,
                    icon: 'error',
                })
            }
        } catch (error) {
            swal({
                title: 'Approve Proof',
                text: error.message,
                icon: 'error',
            })
        }
    }

    const approveAProof = async (taskID) => {
        try {
            const res = await axios.get(`${hook.endpoint}/admin/approve/task/${taskID}`);
            console.log(res.data);
            if (res.data.success) {
                swal({
                    title: 'Approve all Proofs',
                    text: 'Proof approved',
                    icon: 'success',
                    timer: 2000
                })
                    .then((res) => {
                        goNow();
                    })

            } else {
                swal({
                    title: 'Approve all Proofs',
                    text: res.data.error,
                    icon: 'error',
                })
            }
        } catch (error) {
            swal({
                title: 'Approve all Proofs',
                text: error.message,
                icon: 'error',
            })
        }
    }

    const rejectProof = async (proofID, reason) => {
        try {
            let data = {
                proofID: proofID,
                reason: reason,
            }
            const res = await axios.post(`${hook.endpoint}/admin/proof/reject`, data);
            if (res.data.success) {
                swal({
                    title: 'Reject Proof',
                    text: 'Proof rejected!',
                    icon: 'success',
                })
                    .then((res) => {
                        goNow();
                    })
            } else {
                swal({
                    title: 'Reject Proof',
                    text: res.data.error,
                    icon: 'error',
                })
            }
        } catch (error) {
            swal({
                title: 'Reject Proof',
                text: error.message,
                icon: 'error',

                buttons: false,
            })
        }
    }

    return (
        <>
            <Helmet>
                <title>
                    View Task | The LIKEY
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
                                        <span className="iconify" data-icon="ph:eye-duotone"></span>
                                    </span> VIEW TASK
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
                                <div className="col-md-4 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            {task.fetchingTask ? (
                                                <>
                                                    <div className="alert text-center">
                                                        <i className='fa fa-spinner fa-spin'></i>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    {task.uniqueTask.length === 0 ? (
                                                        <>

                                                        </>
                                                    ) : (
                                                        <>
                                                            <h5>
                                                                {task.uniqueTask.title}
                                                                <b className="text-info float-end">
                                                                    {task.uniqueTask.cpu}<i className="mdi mdi-coin"></i>
                                                                </b>
                                                            </h5>
                                                            <div style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: task.uniqueTask.description }}></div>
                                                            <table className="table">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <b>
                                                                                CPU
                                                                            </b>
                                                                        </td>
                                                                        <td>
                                                                            {task.uniqueTask.cpu} credits
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <b>
                                                                                Target
                                                                            </b>
                                                                        </td>
                                                                        <td>
                                                                            {task.uniqueTask.target}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <b>
                                                                                Achieved
                                                                            </b>
                                                                        </td>
                                                                        <td>
                                                                            {task.uniqueTask.achieved}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <b>
                                                                                Approved
                                                                            </b>
                                                                        </td>
                                                                        <td>
                                                                            {task.uniqueTask.approved}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <b>
                                                                                Total Cost
                                                                            </b>
                                                                        </td>
                                                                        <td>
                                                                            {task.uniqueTask.total_cost} credits
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <b>
                                                                                Location
                                                                            </b>
                                                                        </td>
                                                                        <td>
                                                                            {task.uniqueTask.location}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <b>
                                                                                Status
                                                                            </b>
                                                                        </td>
                                                                        <td>
                                                                            {task.uniqueTask.status}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <b>
                                                                                Verified by Admin? 
                                                                            </b>
                                                                        </td>
                                                                        <td>
                                                                            {task.uniqueTask.verified === '1' ? 'Yes' : 'No'}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            {/* <button
                                                                className='button is-success'
                                                                onClick={() => {
                                                                    swal({
                                                                        title: 'Approve all Proofs',
                                                                        text: 'Do you really want to proceed?',
                                                                        icon: 'warning',
                                                                        buttons: ["Stop", "Yes, Proceed!"],
                                                                    })
                                                                        .then((res) => {
                                                                            if (res) {
                                                                                approveAProof(task.uniqueTask.unique_id)
                                                                            } else {
                                                                                swal({
                                                                                    title: 'Approve all Proofs',
                                                                                    text: 'Cancelled by user',
                                                                                    icon: 'error',
                                                                                    timer: 2000
                                                                                })
                                                                            }
                                                                        })
                                                                }}
                                                            >
                                                                Approve all proofs
                                                            </button> */}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {task.isLoading ? (
                                    <>
                                        <div className="alert text-center">
                                            <i className='fa fa-spinner fa-spin'></i>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {task.proofs.length === 0 ? (
                                            <>

                                            </>
                                        ) : null}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div >
                <Footer />
            </div >
        </>
    )
}

export default Approve
