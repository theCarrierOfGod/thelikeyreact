import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';
import { useHook } from '../contexts/Hook';
import { useUser } from '../contexts/User';
import './user.css';

const Sidebar = () => {
    const auth = useAuth();
    const userHook = useUser();
    const hook = useHook();
    const location = useLocation();
    const [userDP, setUserDP] = useState();
    const [userName, setUserName] = useState();

    const getNow = () => {
        // userHook.getHomeActivities(auth.userOnline);
    }

    useEffect(() => {
        getNow();

        return () => {
            return true;
        }
    }, [location]);


    useEffect(() => {
        setUserDP(userHook.userImage);
        setUserName(userHook.userName)
    }, [userHook.userImage])
    return (
        <>
            <nav className={`${hook.showMenu ? "vw-100 l0 " : "no "} sidebar sidebar-offcanvas`} id="sidebar">
                <ul className="nav">
                    <li className={`nav-item ${location.pathname === "/profile" ? "active" : ""} nav-profile`}>
                        <Link to="/profile" className="nav-link">
                            <div className="nav-profile-image">
                                <img src={userDP} alt="profile" />
                                <span className="login-status online"></span>
                                {/* <!--change to offline or busy as needed--> */}
                            </div>
                            <div className="nav-profile-text d-flex flex-column">
                                <span className="font-weight-bold mb-2" style={{ textTransform: 'uppercase' }}>
                                    {auth.userOnline}
                                </span>
                                <span>
                                    {userHook.userPackage}
                                </span>
                            </div>
                            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                        </Link>
                    </li>

                    {/* <!-- dashboard  --> */}

                    <li className={`nav-item ${location.pathname === "/" ? "active" : ""} border-bottom`}>
                        <Link className="nav-link " to="/">
                            <i class="mdi mdi-home  menu-icon m-0 p-0"></i> &nbsp; &nbsp;
                            <span className="menu-title">Dashboard</span>
                        </Link>
                    </li>

                    <li class="nav-item border-bottom">
                        <a class={`nav-link ${location.pathname === "/promotion/new" ? "active" : ""}`} data-bs-toggle="collapse" href="#tasks" aria-expanded="false" aria-controls="tasks">
                            <i class="mdi mdi-book-open-page-variant  menu-icon m-0 p-0"></i> &nbsp; &nbsp;
                            <span class="menu-title">Tasks</span>
                            <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="tasks">
                            <ul class="nav flex-column sub-menu">
                                <li className={`nav-item ${location.pathname === "/make_money" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/make_money">
                                        <span className="menu-title">Make money</span>
                                    </Link>
                                </li>
                                <li className={`nav-item ${location.pathname === "/task/new" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/task/new">
                                        <span className="menu-title">Add Task</span>
                                    </Link>
                                </li>
                                <li className={`nav-item ${location.pathname === "/task/manage" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/task/manage">
                                        <span className="menu-title">Manage Tasks</span>
                                    </Link>
                                </li>
                                <li className={`nav-item ${location.pathname === "/history/performed" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/history/performed">
                                        <span className="menu-title">Performed Tasks</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li class="nav-item border-bottom">
                        <a class={`nav-link ${location.pathname === "/promotion/new" ? "active" : ""}`} data-bs-toggle="collapse" href="#wallet" aria-expanded="false" aria-controls="tasks">
                            <i class="mdi mdi-square-inc-cash  menu-icon m-0 p-0"></i> &nbsp; &nbsp;
                            <span class="menu-title">Wallet</span>
                            <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="wallet">
                            <ul class="nav flex-column sub-menu">

                                {/* <!-- fund wallet  --> */}

                                <li className={`nav-item ${location.pathname === "/wallet/add_fund" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/wallet/add_fund">
                                        <span className="menu-title">Fund Wallet</span>
                                    </Link>
                                </li>

                                {/* <!-- transfer  --> */}

                                {/* <li className={`nav-item ${location.pathname === "/wallet/transfer" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/wallet/transfer">
                                        <span className="menu-title">Credit Internal transfer</span>
                                    </Link>
                                </li> */}

                                {/* <!-- withdraw earnings  --> */}

                                <li className={`nav-item ${location.pathname === "/wallet/withdraw" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/wallet/withdraw">
                                        <span className="menu-title">Withdrawal</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    {/* Refer and earn  */}

                    <li className={`nav-item ${location.pathname === "/package/upgrade" ? "active" : ""} border-bottom`}>
                        <Link className="nav-link" to="/package/upgrade">
                            <i class="mdi mdi-chart-areaspline  menu-icon m-0 p-0"></i> &nbsp; &nbsp;
                            <span className="menu-title">Upgrade Account to Premium</span>
                        </Link>
                    </li>

                    {/* Refer and earn  */}

                    <li className={`nav-item ${location.pathname === "/refer-n-earn" ? "active" : ""} border-bottom`}>
                        <Link className="nav-link" to="/refer-n-earn">
                            <i class="mdi mdi-chart-areaspline  menu-icon m-0 p-0"></i> &nbsp; &nbsp;
                            <span className="menu-title">Refer N Earn</span>
                        </Link>
                    </li>

                    {/* <!-- how it works  --> */}

                    <li className={`nav-item ${location.pathname === "/how-it-works" ? "active" : ""} border-bottom`}>
                        <Link className="nav-link" to="https://thelikey.com/how-thelikey-works" target='_blank' >
                            <i class="mdi mdi-alert-circle menu-icon m-0 p-0"></i> &nbsp; &nbsp;
                            <span className="menu-title">How it works</span>
                        </Link>
                    </li>

                    {/* <!-- MLM  --> */}

                    <li className={`nav-item ${location.pathname === "https://mlm.thelikey.com/about.php" ? "active" : ""} border-bottom`}>
                        <Link className="nav-link" to="https://mlm.thelikey.com/about.php" target='_blank' >
                            <i class="mdi mdi-alert-circle menu-icon m-0 p-0"></i> &nbsp; &nbsp;
                            <span className="menu-title">Join TheLikey Invest</span>
                        </Link>
                    </li>

                    {/* <!-- signout  --> */}

                    <li className={`nav-item ${location.pathname === "" ? "active" : ""} border-bottom`}>
                        <span className="nav-link isBtn" onClick={(e) => auth.logOut()}>
                            <i class="mdi mdi-logout-variant  menu-icon m-0 p-0"></i> &nbsp; &nbsp;
                            <span className="menu-title">Sign out</span>
                        </span>
                    </li>
                </ul>
            </nav>
            <br />
            <br />
        </>
    )
}

export default Sidebar