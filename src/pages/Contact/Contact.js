import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth';
import TopBar from '../TopBar';
import Helmet from 'react-helmet'
import BottomBar from '../BottomBar';
import swal from 'sweetalert2';
import { useHook } from '../../contexts/Hook';
import axios from 'axios';


const Contact = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const auth = useAuth();
    const hook = useHook();
    const [username, setUsername] = useState('');
    const [validatingUsername, setValidatingUsername] = useState('');
    const [usernameOk, setUsernameOk] = useState(false);
    const [name, setName] = useState('');

    const [email, setEmail] = useState('');
    const [validatingEmail, setValidatingEmail] = useState('');
    const [emailOk, setEmailOk] = useState(false);
    const [emailError, setEmailError] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [cpasswordError, setCPasswordError] = useState('');
    const [agree, setAgree] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [ref, setRef] = useState();


    const [phone, setPhone] = useState('');
    const [validatingPhone, setValidatingPhone] = useState('');
    const [phoneOk, setPhoneOk] = useState(false);
    const [phoneError, setPhoneError] = useState('');

    const [running, setRunning] = useState(false);


    const getRef = () => {
        let theRef = searchParams.get('ref');
        if (theRef === "" || theRef === null) {
            setRef('/dashboard')
        } else {
            setRef(`${theRef}`);
        }
    }

    const changeAgree = () => {
        if (agree)
            setAgree(false)
        else
            setAgree(true)
    }

    const usernameCheck = async (username) => {
        setUsername(username)
        setUsernameError('')
        setValidatingUsername(true);
        setUsernameOk(false)
        if (username.length > 3) {
            let data = {
                username: username
            }
            try {
                const res = await axios.post(`${hook.endpoint}/validate/username`, data, {
                    headers: {
                        'content-type': 'application/json',
                        'X-CSRF-TOKEN': hook.token
                    }
                })
                if (res.data.success) {
                    setUsernameError('');
                    setUsernameOk(true)
                } else {
                    setUsernameError('username in use');
                    setUsernameOk(false)
                }
                setValidatingUsername(false)
            } catch (error) {
                setUsernameError('validation error');
                setValidatingUsername(false)
            }
        }
    }

    const phoneCheck = async (phone) => {
        setPhone(phone)
        setPhoneError('')
        setValidatingPhone(true);
        setPhoneOk(false)
        if (phone.length > 3) {
            let data = {
                phone: phone
            }
            try {
                const res = await axios.post(`${hook.endpoint}/validate/phone`, data, {
                    headers: {
                        'content-type': 'application/json',
                        'X-CSRF-TOKEN': hook.token
                    }
                })
                if (res.data.success) {
                    setPhoneError('');
                    setPhoneOk(true)
                } else {
                    setPhoneError('phone number in use');
                    setPhoneOk(false)
                }
                setValidatingPhone(false)
            } catch (error) {
                setPhoneError('validation error');
                setValidatingPhone(false)
                setPhoneOk(false)
            }
        }
    }

    const emailCheck = async (email) => {
        setEmail(email)
        setEmailError('')
        setValidatingEmail(true);
        setEmailOk(false)
        if (email.length > 3) {
            let data = {
                email: email
            }
            try {
                const res = await axios.post(`${hook.endpoint}/validate/email`, data, {
                    headers: {
                        'content-type': 'application/json',
                        'X-CSRF-TOKEN': hook.token
                    }
                })
                if (res.data.success) {
                    setEmailError('');
                    setEmailOk(true)

                } else {
                    setEmailError('email in use');
                    setEmailOk(false)
                }
                setValidatingEmail(false)
            } catch (error) {
                setEmailError('validation error');
                setValidatingEmail(false)
                setEmailOk(false)
            }
        }
    }

    const passwordCheck = (password) => {
        setPassword(password);

        if (password.length < 8) {
            setPasswordError('minimum password length is 8')
        } else if (confirmPassword.length !== 0 & confirmPassword !== password) {
            setCPasswordError('password mismatch')
            setPasswordError('')
        } else {
            setPasswordError('');
            setCPasswordError('')
        }
    }

    const confirmPasswordCheck = (cpassword) => {
        setConfirmPassword(cpassword);
        if (cpassword !== password) {
            setCPasswordError('password mismatch')
        } else {
            setCPasswordError('')
        }
    }

    const login = (e) => {
        e.preventDefault();
        if (username.length < 3) {
            setUsernameError('minimum length not reached')
            return
        } else {
            setUsernameError('');
        }
        if (password.length < 8) {
            setPasswordError('minimum length not reached')
            return
        } else {
            setPasswordError('')
        }

        setIsLoading(true);

        let data = {
            username: username,
            password: password
        }
        Contact(data);
    }

    const Contact = async (data) => {
        setRunning(true);
        try {
            const res = await axios.post(`${hook.endpoint}/sign/in`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        let loggedIn = res.data.username;
                        let token = res.data.token;
                        auth.storeActiveToken(loggedIn, token, ref);
                    } else {
                        let source = res.data.error.source;
                        let message = res.data.error.message;
                        if (source === "username") {
                            setUsernameError(message);
                        } else if (source === "password") {
                            setPasswordError(message);
                        }
                    }
                    setIsLoading(false);
                })

        } catch (error) {
            // Handle errors
            console.log(error)
        }
    }

    useEffect(() => {
        getRef();
    }, [location.key]);

    const checkToProceed = () => {
        if(name !== "" & emailOk & phoneOk & usernameOk & passwordError === ""  & cpasswordError === "" & agree & !running) {
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
    }

    setTimeout(() => {
        checkToProceed();
    }, 500);

    return (
        <>
            <Helmet>
                <title>
                    Sign Up | TheLikey
                </title>
            </Helmet>
            <TopBar />

            <div className='columns m-4 mt-5 pt-5 p-3 is-centered is-vcentered'>
                <section className={`column  is-three-quarters `}>
                    <div className="card">
                        <div className="card-content">
                            <div className="media">
                                <form onSubmit={e => login(e)} className="media-content p-4">
                                    <h4 className='title is-3'>
                                        SIGN UP
                                    </h4>

                                    <div className="field is-horizontal">
                                        <div className="field-body">
                                            <div className="field mb-4">
                                                <label className='label' htmlFor='name'>
                                                    Name
                                                </label>
                                                <p className="control is-expanded has-icons-left has-icons-right">
                                                    <input className="input" name="name" id="name" type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-user"></i>
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="field mb-4">
                                                <label className='label' htmlFor='email'>
                                                    Email Address
                                                </label>
                                                <p className="control is-expanded has-icons-left has-icons-right">
                                                    <input className={`${emailError !== "" ? 'is-danger' : ''} input`} type="email" id="email" placeholder="Email" value={email} onChange={e => emailCheck(e.target.value)} />
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-envelope"></i>
                                                    </span>
                                                    <span class={`${emailError === "" ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-exclamation-triangle" style={{ color: 'red' }}></i>
                                                    </span>
                                                    <span class={`${!emailOk ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-check" style={{ color: 'green' }}></i>
                                                    </span>
                                                    <span class={`${!validatingEmail ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-spinner fa-spin is-info"></i>
                                                    </span>
                                                    <p className={`${emailError !== "" ? '' : 'is-hidden'} help is-danger`}>{emailError}</p>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* username, email, phonenumber,  */}
                                    <div className="field is-horizontal mb-3">
                                        <div className="field-body">
                                            <div className="field mb-4">
                                                <label className='label' htmlFor='username'>
                                                    Username
                                                </label>
                                                <p className="control is-expanded has-icons-left has-icons-right">
                                                    <input className={`${usernameError !== "" ? 'is-danger' : ''} input`} type="text" id="username" placeholder="Username" value={username} onChange={e => usernameCheck(e.target.value)} />
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-user-circle"></i>
                                                    </span>
                                                    <span class={`${usernameError === "" ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-exclamation-triangle" style={{ color: 'red' }}></i>
                                                    </span>
                                                    <span class={`${!usernameOk ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-check" style={{ color: 'green' }}></i>
                                                    </span>
                                                    <span class={`${!validatingUsername ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-spinner fa-spin is-info"></i>
                                                    </span>
                                                    <p className={`${usernameError !== "" ? '' : 'is-hidden'} help is-danger`}>{usernameError}</p>
                                                </p>
                                            </div>
                                            <div className="field mb-4">
                                                <label className='label' htmlFor='phone'>
                                                    Phone number
                                                </label>
                                                <p className="control is-expanded has-icons-left has-icons-right">
                                                    <input className={`${phoneError !== "" ? 'is-danger' : ''} input`} type="tel" id="phone" placeholder="Whatsapp number" value={phone} onChange={e => phoneCheck(e.target.value)} />
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-phone"></i>
                                                    </span>
                                                    <span class={`${phoneError === "" ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-exclamation-triangle" style={{ color: 'red' }}></i>
                                                    </span>
                                                    <span class={`${!phoneOk ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-check" style={{ color: 'green' }}></i>
                                                    </span>
                                                    <span class={`${!validatingPhone ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-spinner fa-spin is-info"></i>
                                                    </span>
                                                    <p className={`${phoneError !== "" ? '' : 'is-hidden'} help is-danger`}>{phoneError}</p>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="field is-horizontal mb-3">
                                        <div className="field-body">
                                            <div className="field mb-4">
                                                <label className='label' htmlFor='pasword'>
                                                    Password
                                                </label>
                                                <p className="control is-expanded has-icons-left has-icons-right">
                                                    <input className={`${passwordError !== "" ? 'is-danger' : ''} input`} type="password" id="password" placeholder="Password" value={password} onChange={e => passwordCheck(e.target.value)} />
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-key"></i>
                                                    </span>
                                                    <span class={`${passwordError === "" ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-exclamation-triangle" style={{ color: 'red' }}></i>
                                                    </span>
                                                    <p className={`${passwordError !== "" ? '' : 'is-hidden'} help is-danger`}>{passwordError}</p>
                                                </p>
                                            </div>
                                            <div className="field mb-4">
                                                <label className='label' htmlFor='confirm_password'>
                                                    Confirm password
                                                </label>
                                                <p className="control is-expanded has-icons-left has-icons-right">
                                                    <input className={`${cpasswordError !== "" ? 'is-danger' : ''} input`} type="password" id="confirm_password" placeholder="Confirm password" value={confirmPassword} onChange={e => confirmPasswordCheck(e.target.value)} />
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-key"></i>
                                                    </span>
                                                    <span class={`${cpasswordError === "" ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-exclamation-triangle" style={{ color: 'red' }}></i>
                                                    </span>
                                                    <p className={`${cpasswordError !== "" ? '' : 'is-hidden'} help is-danger`}>{cpasswordError}</p>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='field mb-4'>
                                        <div className='field-body'>
                                            <label className="checkbox">
                                                <input type="checkbox" checked={agree} className='m-2' value={agree} onChange={e => changeAgree(e.target.value)} />
                                                I agree to the <Link >terms and conditions</Link>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="control">
                                            <button
                                                type={'submit'}
                                                disabled={isLoading}
                                                className="button is-link is-fullwidth">
                                                {/* {isLoading ? "..." : "Login"} */}
                                                Sign Up
                                            </button>
                                        </div>
                                    </div>
                                    <p className='text-center mt-3' >
                                        <br />
                                        Need an account? <Link to={'/sign-in'}>Sign In</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <BottomBar />
        </>
    )
}

export default Contact