import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { useHook } from '../../contexts/Hook'
import { useTask } from '../../contexts/Tasks'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
import axios from 'axios'
import { useUser } from '../../contexts/User'
import TaskPage from './TaskPage'
import Pick from '../../pages/ads/Pick'

const Make = () => {
    const location = useLocation();
    const hook = useHook();
    const userHook = useUser();
    const auth = useAuth();
    const task = useTask();
    const [filterLocation, setFilterLocation] = useState('');
    const [platform, setPlatform] = useState('');
    const [type, setType] = useState('');
    const [total, setTotal] = useState('');


    const getTypeList = (platform) => {
        if (platform !== "") {
            hook.getPlatformPromotions(platform);
        }
    }

    const goNow = (platform, type, location) => {
        task.getTasksToDo(auth.userOnline, platform, type, location);

    }

    const getTasksToDo = async (username) => {
        setTotal(0)
        try {
            const res = await axios.get(`${hook.endpoint}/tasks/todo/all/${username}`);
            if (res.data.error) {
                setTotal(0);
            } else {
                setTotal(res.data.length);
            }
        } catch (error) {
            setTotal(0);
        }
    }

    const NewlineText = (text) => {
        text.split('<br />').map((item) => (
            <span>
                {item}
                <br />
            </span>
        ))
    }

    useEffect(() => {
        getTasksToDo(auth.userOnline)
        goNow(platform, type, filterLocation)
        setFilterLocation('');
        setPlatform('')
        setType('')
        return () => {
            return true;
        }
    }, [location.key])

    return (
        <>
            <Helmet>
                <title>
                    Make Money | LIKEY
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
                                        <i className="mdi mdi-wallet"></i>
                                    </span> MAKE MONEY
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <span>Wallet <span className="iconify icon-sm text-primary align-middle" data-icon="mdi:wallet"></span></span>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="row">
                                <Pick />
                                <div className="col-md-12 mb-2">
                                    <div className={(userHook.userPackage === 'free' ? "notification is-info is-light mb-4" : "d-none")}>
                                        Users on the free package can perfom only 3 of <b>10 Credits</b> tasks per day. <Link to={'/package/upgrade'}><strong>Upgrade NOW!</strong></Link>
                                    </div>

                                    <div className='notification is-info'>
                                        {total} tasks available for you. Scroll down to perform tasks.
                                    </div>

                                    {/* <div className="card mb-2">
                                        <div className="card-body">
                                            <form action="" method="get">
                                                <div className="row">
                                                    <div className='col-lg-12'>
                                                        <h5>
                                                            {total} tasks for you
                                                        </h5>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <select className="form-select mt-2" id="platform" name="platform" onChange={(e) => { setPlatform(e.target.value); getTypeList(e.target.value); goNow(e.target.value, type, filterLocation) }} defaultValue={platform}>
                                                            <option value="">Select platform</option>
                                                            {hook.taskPlatforms.length === 0 ? null : (
                                                                <>
                                                                    {hook.taskPlatforms.map((country) => (
                                                                        <option key={country.nicename} id={country.nicename} value={country.nicename}>
                                                                            {country.name}
                                                                        </option>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <select className="form-select mt-2" id="type" name="type" onChange={(e) => { setType(e.target.value); goNow(platform, e.target.value, filterLocation); }} defaultValue={type}>
                                                            <option value="">Select type</option>
                                                            {hook.promotionTypes.length === 0 ? null : (
                                                                <>
                                                                    {hook.promotionTypes.map((promotionType) => (
                                                                        <option key={promotionType.id} id={promotionType.V} value={promotionType.V}>
                                                                            {promotionType.D}
                                                                        </option>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </select>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <select className="form-select mt-2" id="location" name="targetAudience" onChange={(e) => { setFilterLocation(e.target.value); goNow(platform, type, e.target.value); }} defaultValue={filterLocation}>
                                                            <option value="">Location</option>
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
                                            </form>
                                        </div>
                                    </div> */}
                                </div>

                                <div className='col-lg-12 mb-3'>
                                    <div className='notification is-info is-light'>
                                        Do you want to post your own tasks? <Link to={'/task/new'}><b>Click here!</b></Link>
                                    </div>
                                </div>

                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body p-1">
                                            <div className='justify-content-center'>
                                                {task.isLoading ? (
                                                    <>
                                                        <div className="col-md-12 mt-4">
                                                            <div className="alert alert-info text-center">
                                                                <i className='fa fa-spinner fa-spin'></i>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        {task.tasksToDo.length === 0 ? (
                                                            <>
                                                                <div className="col-md-12 mt-4">
                                                                    <div className="alert alert-danger text-center">
                                                                        <i className='fa fa-info-circle'></i> <strong>No task.</strong>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            null
                                                        )}
                                                    </>
                                                )}
                                                {task.tasksToDo.length === 0 ? null : (
                                                    <TaskPage items={task.tasksToDo} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <marquee>Activities are being monitored!
                                Earning without performing tasks will lead to account's permanent suspension. <strong>Take Note</strong></marquee>
                        </div>
                    </div >
                </div >
                <Footer />
            </div >
        </>
    )
}

export default Make
