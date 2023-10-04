import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../images/logo-dark.png';
import { useAuth } from '../contexts/Auth';
import { useHook } from '../contexts/Hook';
import { useUser } from '../contexts/User';
import 'bulma/css/bulma.css';
import './user.css';
import axios from 'axios';

const Header = () => {
    const auth = useAuth();
    const hook = useHook();
    const userHook = useUser();
    const location = useLocation();
    const [userDP, setUserDP] = useState();
    const [admin, setAdmin] = useState(false);

    const checkPrivi = async () => {
        try {
            const res = await axios.get(`${hook.endpoint}/admin/checkPrivi/${auth.userOnline}`);
            if (res.data === 1) {
                console.log(res.data);
                setAdmin(true)
            } else {
                setAdmin(false)
            }
        } catch (error) {
            setAdmin(false)
        }
    }


    useEffect(() => {
        setUserDP(userHook.userImage);
    }, [userHook.userImage])

    useEffect(() => {
        checkPrivi();
        console.log(location);
    }, [])
    return (
        <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row" style={{
            position: "fixed"
        }}>
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <Link className="navbar-brand brand-logo d-flex" to="/" style={{ alignItems: 'center' }}>
                    <img src={Logo} alt="logo" style={{ marginLeft: '20px', marginRight: '10px' }} />
                </Link>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-stretch">
                <div className="search-field d-none d-md-block">
                    <form className="d-flex align-items-center h-100" action="#">
                        <div className="input-group">
                            <div className="input-group-prepend bg-transparent">
                                <i className="input-group-text border-0 mdi mdi-magnify"></i>
                            </div>
                            <input type="text" className="form-control bg-transparent border-0" placeholder="Search projects" />
                        </div>
                    </form>
                </div>
                <ul className="navbar-nav navbar-nav-right">
                    <li className="nav-item nav-profile dropdown">
                        <Link className="nav-link dropdown-toggle" id="profileDropdown" to="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="nav-profile-img">
                                <img src={userDP} alt="image" />
                                <span className="availability-status online"></span>
                            </div>
                            <div className="nav-profile-text">
                                <p className="mb-1 text-black">
                                    <b style={{ textTransform: 'uppercase', fontFamily: 'fantasy' }}>
                                        {auth.userOnline}
                                    </b>
                                </p>
                            </div>
                        </Link>
                        <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                            <Link className="dropdown-item" to="/activities">
                                <i className="mdi mdi-cached me-2 text-info"></i> Activity Log </Link>
                            <Link className="dropdown-item" to="/profile">
                                <i className="mdi mdi-account-convert me-2 text-success"></i> My Profile </Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item isBtn" onClick={() => auth.logOut()}>
                                <i className="mdi mdi-logout me-2 text-primary"></i> Signout </Link>
                        </div>
                    </li>
                    {/* <li className="nav-item d-none d-lg-block full-screen-link">
                        <Link className="nav-link">
                            <i className="mdi mdi-fullscreen" id="fullscreen-button"></i>
                        </Link>
                    </li> */}

                    <li className="nav-item nav-logout d-none d-lg-block">
                        <span className="nav-link is-hoverable" onClick={() => auth.logOut()}>
                            <i className="mdi mdi-power"></i>
                        </span>
                    </li>
                </ul>
                <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas" onClick={() => hook.toggleMenu()}>
                    <span className="mdi mdi-menu"></span>
                </button>
            </div>
        </nav>
    )
}

export default Header