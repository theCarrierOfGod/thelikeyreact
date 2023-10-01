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

const ManageTasks = () => {
    const userHook = useUser();
    const auth = useAuth();
    const location = useLocation();
    const tasks = useTask();
    const [status, setStatus] = useState('');

    const getNow = () => {
        userHook.countTasks(auth.userOnline);
        tasks.getMyTasks(auth.userOnline, status);
    }

    const filterTasks = (e) => {
        e.preventDefault();
        tasks.getMyTasks(auth.userOnline, status);
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
                    Manage Tasks | The LIKEY
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
                                </span> MY TASKS
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

                            <div className='col-lg-12'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className="row justify-content-between">
                                            <div className='col-sm-12'>
                                                <h4 className="card-title mb-4">
                                                    <strong>
                                                        MANAGE YOUR CREATED TASKS ({userHook.taskCount})
                                                    </strong>
                                                </h4>
                                            </div>
                                            <div className="col-sm-4">
                                                <Link to="/task/new" className="btn btn-primary">
                                                    Add task
                                                </Link>
                                            </div>
                                            <div className="col-sm-8">
                                                <form action="" method="GET" onSubmit={(e) => filterTasks(e)}>
                                                    <div className="input-group mt-2">
                                                        <select name='status' id="status" defaultChecked={status} onChange={(e) => setStatus(e.target.value)} className='form-select'>
                                                            <option>Select status</option>
                                                            <option value={'active'}>Active</option>
                                                            <option value={'inactive'}>Inactive</option>
                                                            <option value={'completed'}>Completed</option>
                                                        </select>
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-info" type="submit">
                                                                <i className="mdi mdi-filter-outline"></i> Filter
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {tasks.isLoading ? (
                                <>
                                    <div className="col-md-12 mt-4">
                                        <div className="alert alert-info text-center">
                                            <i className='fa fa-spinner fa-spin'></i>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className='row'>
                                    <ManagePagination items={tasks.myTasks} perpage={6} type={'task'} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageTasks