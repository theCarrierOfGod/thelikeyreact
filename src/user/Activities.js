import React, { useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { useUser } from '../contexts/User'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import { useHook } from '../contexts/Hook'
import { Helmet } from 'react-helmet'

const Activities = () => {
    const userHook = useUser();
    const auth = useAuth();
    const location = useLocation();
    const hook = useHook();

    const getNow = () => {
        userHook.getActivities(auth.userOnline);
    }
 
    useEffect(() => {
        getNow();

        return () => {
            return true;
        }
    }, [location])

    return (
        <>
        <Helmet>
            <title>
                Activity Log | The LIKEY
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
                                    <span className="page-title-icon bg-danger text-white me-2">
                                        <i className="mdi mdi-log-24"></i>
                                        <span className="iconify" data-icon="icon-park:log"></span>
                                    </span>
                                    ACTIVITY LOG
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <span></span>Activities <span className="iconify icon-sm text-primary align-middle" data-icon="octicon:log-24"></span>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="row justify-content-start">
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card- p-1">
                                            <div className="d-flex justify-content-between table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Detail</th>
                                                            <th scope="col">Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className=''>
                                                        {userHook.activities.length === 0 ? null : (
                                                            <>
                                                                {userHook.activities.map((activity, index) => (
                                                                    <>
                                                                        <tr>
                                                                            <th scope="row">
                                                                                {index + 1}
                                                                            </th>
                                                                            <td>
                                                                                {activity.detail}
                                                                            </td>
                                                                            <td>
                                                                                {hook.getDate(activity.created_at)}
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                ))}
                                                            </>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Activities
