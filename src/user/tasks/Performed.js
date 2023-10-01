import React, { useEffect } from 'react'
import { useUser } from '../../contexts/User'
import Header from '../Header'
import Sidebar from '../Sidebar'
import { useAuth } from '../../contexts/Auth'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useTask } from '../../contexts/Tasks'
import { Helmet } from 'react-helmet'
import ManagePagination from '../promotion/ManagePagination'
import Footer from '../Footer'

const Performed = () => {
    const userHook = useUser();
    const auth = useAuth();
    const location = useLocation();
    const tasks = useTask();
    const [status, setStatus] = useState('')

    const getNow = () => {
        tasks.myPerformed(auth.userOnline);
    }

    useEffect(() => {
        getNow();

        return () => {
            return true;
        }
    }, [location.key])
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
                    <div className="content-wrapper">

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
                                    <ManagePagination items={tasks.proofs} perpage={12} type={'performed'} />
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

export default Performed