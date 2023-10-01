import React, { useEffect } from 'react'
import { useUser } from '../../contexts/User'
import Header from '../Header'
import Sidebar from '../Sidebar'
import { useAuth } from '../../contexts/Auth'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useTask } from '../../contexts/Tasks'
import { Helmet } from 'react-helmet'
import ManagePagination from '../promotion/ManagePagination'
import Footer from '../Footer'

const ViewProof = () => {
    const userHook = useUser();
    const auth = useAuth();
    const location = useLocation();
    const tasks = useTask();
    const params = useParams();
    let taskID = params.unique_id;
    const [status, setStatus] = useState('')

    const getNow = () => {
        tasks.myProofs(taskID, auth.userOnline);
    }

    useEffect(() => {
        getNow();
        tasks.setProofI([])

        return () => {
            return true;
        }
    }, [location.key, auth.userOnline])
    return (
        <div className='container-scroller'>

            <Helmet>
                <title>
                    Performed Tasks | The LIKEY
                </title>
            </Helmet>
            <Header />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper" style={{ minHeight: '100vh' }}>

                        <div className="page-header">
                            <h3 className="page-title">
                                <span className="page-title-icon bg-primary text-white me-2">
                                    <i className="mdi mdi-airplane-takeoff"></i>
                                </span> MY PERFORMED TASKS
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
                            {tasks.isLoading ? (
                                <>
                                    <div className="col-md-12 mt-4">
                                        <div className="alert alert-info text-center">
                                            <i className='fa fa-spinner fa-spin'></i>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {tasks.proofI.length !== 0 ? (
                                        <> 
                                            {tasks.proofI.map((proof) => (
                                                <>
                                                    <div className='row'>
                                                        <div className='col-sm-4'>
                                                            <div className='card'>
                                                                <div className='card-body p-2'>
                                                                    <p>
                                                                        <strong>STATUS: </strong> {proof.status}
                                                                    </p>
                                                                    {proof.reason ? (
                                                                        <p>
                                                                            <strong>Reason: </strong> {proof.reason}
                                                                        </p>
                                                                    ) : null}
                                                                    {proof.status === 'rejected' ? (
                                                                        <p>
                                                                            <Link to={`/task/view/${proof.taskID}`} >Redo</Link>
                                                                        </p>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {JSON.parse(proof.proofURL).map((image) => (
                                                            <div className='col-sm-4'>
                                                                <img src={image} style={{ width: '100%' }} alt={'proof '} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            ))}
                                        </>
                                    ) : null}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ViewProof