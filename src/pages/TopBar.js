import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../images/logo-dark.png';
import 'bulma/css/bulma.css';
import './style.css'


const TopBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [seeNav, setSeeNav] = useState(false)


    const showMenu = () => {
        if (seeNav) {
            let body = document.getElementById('ourBody');
            let navbar = document.getElementById('sm-nav');
            body.classList.remove("is-clipped")
            navbar.classList.add("d-none");
            setSeeNav(false)
        } else {
            let body = document.getElementById('ourBody');
            let navbar = document.getElementById('sm-nav');
            body.classList.add("is-clipped")
            navbar.classList.remove("d-none")
            setSeeNav(true)
        }
    }

    return (
        <>
            <nav className="navbar p-2 fixed-top" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.11)', background: 'white', position: 'fixed' }}>
                <div className='container d-flex justify-content-between'>
                    <Link className="navbar-brand brand-logo d-flex" to="https://thelikey.com" style={{ alignItems: 'center' }}>
                        <img src={Logo} alt="logo" style={{ height: '35px', marginLeft: '10px', marginRight: '10px' }} />
                    </Link>
                    <button className='button  is-hidden-tablet mt-2' style={{ border: "none" }} onClick={() => showMenu()} >
                        <img src='/menu.png' alt="menu" style={{ width: '40px' }} />
                    </button>
                    <aside id="sm-nav" className="menu sm-nav d-none">
                        <ul className="menu-list">
                            <li className="mb-2">
                                <button
                                    onClick={() => {
                                        navigate('/sign-in')
                                    }}
                                    className='button is-link is-fullwidth is-uppercase has-text-weight-semibold is-family-code has-text-white'>
                                    SIGN IN
                                </button>
                            </li>
                            <li className="mb-2">
                                <button
                                    onClick={() => {
                                        navigate('/sign-up')
                                    }}
                                    className='button is-link is-outlined is-fullwidth is-uppercase has-text-weight-semibold is-family-code '>
                                    Sign Up
                                </button>
                            </li>
                            <li className="mb-2">
                                <button
                                    onClick={() => {
                                        window.location.href = "https://thelikey.com";
                                    }}
                                    className='button is-link is-fullwidth is-uppercase has-text-weight-semibold is-family-code is-focused is-outlined'>
                                    Go Home
                                </button>
                            </li>
                        </ul>
                    </aside>
                    <div id="menu" className='buttons  is-hidden-mobile '>
                        <button
                            className={`${(location.pathname === "/sign-up" || location.pathname === "/sign-in") ? "d-none" : " "} button is-link is-outlined`}
                            onClick={() => {
                                navigate('/sign-up')
                            }}
                        >
                            SIGN UP
                        </button>
                        &nbsp;
                        <button
                            className={`${(location.pathname === "/sign-up" || location.pathname === "/sign-in") ? "d-none" : " "} button is-link`}
                            onClick={() => {
                                navigate('/sign-in')
                            }}
                        >
                            LOG IN
                        </button>
                        &nbsp;
                        <button
                            className={`${(location.pathname === "/sign-up" || location.pathname === "/sign-in") ? "" : "d-none"} button is-link`}
                            onClick={() => {
                                window.location.href = "https://thelikey.com";
                            }}
                        >
                            GO HOME
                        </button>
                    </div>
                </div>
            </nav>
            <div style={{ height: '70px' }}></div>
        </>
    )
}

export default TopBar
