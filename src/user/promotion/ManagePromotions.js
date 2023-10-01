import React, { useEffect } from 'react'
import { useUser } from '../../contexts/User'
import Header from '../Header'
import Sidebar from '../Sidebar'
import { useAuth } from '../../contexts/Auth'
import { Link, useLocation } from 'react-router-dom'
import { usePromotion } from '../../contexts/Promotions'
import { useState } from 'react'
import Footer from '../Footer'
import { Helmet } from 'react-helmet'
import ManagePagination from './ManagePagination'

const ManagePromotions = () => {
    const userHook = useUser();
    const auth = useAuth();
    const location = useLocation();
    const promotions = usePromotion();
    const [status, setStatus] = useState('');


    const getNow = () => {
        userHook.countPromotions(auth.userOnline);
        promotions.getMyPromotions(auth.userOnline, status);
    }

    const filterPromotions = (e) => {
        e.preventDefault();
        promotions.getMyPromotions(auth.userOnline, status);
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
                    Manage Promotions | The LIKEY
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
                                    <i className="mdi mdi-airplane-takeoff"></i>
                                </span> MY PROMOTIONS
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

                            <div className='col-lg-12'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className="row justify-content-between">
                                            <div className='col-sm-12'>
                                                <h4 className="card-title mb-4">
                                                    <strong>
                                                        MANAGE YOUR CREATED PROMOTIONS ({userHook.promotionCount})
                                                    </strong>
                                                </h4>
                                            </div>
                                            <div className="col-sm-4">
                                                <Link to="/promotion/new" className="btn btn-primary">
                                                    Add Promotion
                                                </Link>
                                            </div>
                                            <div className="col-sm-8">
                                                <form action="" method="GET" onSubmit={(e) => filterPromotions(e)}>
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

                            {promotions.isLoading ? (
                                <>
                                    <div className="col-md-12 mt-4">
                                        <div className="alert alert-info text-center">
                                            <i className='fa fa-spinner fa-spin'></i>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className='row'>
                                    <ManagePagination items={promotions.myPromotions} perpage={6} type={'promotion'} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ManagePromotions