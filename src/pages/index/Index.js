import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import TopBar from '../TopBar';
// import phone from '../../images/4820c76.svg';


const Index = () => {
    const navigate = useNavigate();
    return (
        <>
            <TopBar />
            <section className="hero" style={{ background: '#3061d8', color: '#fff', fontFamily: 'Roboto' }}>
                <div className="hero-body has-text-centered">
                    <h4 className="title is-2 has-text-white pt-4" style={{ fontSize: '2.25rem ' }}>
                        SIMPLE TASKS, REAL MONEY
                    </h4>
                    <p className="subtitle is-6 has-text-white m-2" style={{ fontWeight: 'normal' }}>
                        Make extra money by performing stress-free <b>tasks</b> & <b>promotions</b> in the comfort of your <b>home</b>, from any <b>device</b>
                    </p>
                    <button
                        className='button is-link is-light is-medium mt-4'
                        onClick={() => {
                            navigate('/sign-in');
                        }}
                    >
                        START EARNING NOW
                    </button> <br />
                    <img src={'/4820c76.svg'} alt={''} />
                </div>
            </section>
            <div className='w-100 d-flex justify-content-evenly p-5 bg-light' style={{ height: '100vh' }}>
                <Link to={'/sign-in'} className="button is-primary" style={{ height: 'fit-content' }} >
                    Sign In
                </Link>
                <Link to={'/sign-up'} className="button is-primary" style={{ height: 'fit-content' }} >
                    Sign Up
                </Link>
                <Link to={'/dashboard'} className="button is-primary" style={{ height: 'fit-content' }} >
                    Dashboard
                </Link>
            </div>
        </>
    )
}

export default Index