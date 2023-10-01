import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth';
import TopBar from '../TopBar';
import Helmet from 'react-helmet'
import BottomBar from '../BottomBar';
import swal from 'sweetalert2';
import { useHook } from '../../contexts/Hook';
import axios from 'axios';


const SignUp = () => {
    const params = useParams();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const auth = useAuth();
    const hook = useHook();
    const [thelocation, setLocation] = useState('');
    const [username, setUsername] = useState('');
    const [validatingUsername, setValidatingUsername] = useState('');
    const [usernameOk, setUsernameOk] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');
    const [validatingEmail, setValidatingEmail] = useState('');
    const [emailOk, setEmailOk] = useState(false);
    const [emailError, setEmailError] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [referee, setReferee] = useState()
    const [refereeError, setRefereeError] = useState('')
    const [validatingReferee, setValidatingReferee] = useState('false');
    const [refereeOk, setRefereeOk] = useState(false)

    const [cpasswordError, setCPasswordError] = useState('');
    const [agree, setAgree] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [ref, setRef] = useState('');


    const [phone, setPhone] = useState('');
    const [validatingPhone, setValidatingPhone] = useState('');
    const [phoneOk, setPhoneOk] = useState(false);
    const [phoneError, setPhoneError] = useState('');

    const [running, setRunning] = useState(false);
    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState('');


    const getRef = () => {
        let theRef = params.referee
        if (theRef !== undefined) {
            setReferee(params.referee)
        }
    }

    const changeAgree = () => {
        if (agree)
            setAgree(false)
        else
            setAgree(true)
    }

    const checkReferee = async (referee) => {
        setRefereeError('');
        setReferee(referee)
        setRefereeOk(false)
        // setValidatingReferee(true)
        if (referee.length > 3 && hook.validateEmail(referee) && (referee.indexOf("#") !== -1)) {
            setRefereeError('unsupported username format');
            setRefereeOk(false);
            setValidatingReferee(false)
            return;
        }
        if (referee.length > 3) {
            let data = {
                username: referee
            }
            try {
                const res = await axios.post(`${hook.endpoint}/validate/referee`, data, {
                    headers: {
                        'content-type': 'application/json',
                        'X-CSRF-TOKEN': hook.token
                    }
                })
                if (res.data.success) {
                    setRefereeError('');
                    setRefereeOk(true)
                } else {
                    setRefereeError('invalid referral id');
                    setRefereeOk(false)
                }
                setValidatingReferee(false)
            } catch (error) {
                setRefereeError('validation error');
                setValidatingReferee(false)
            }
        }
    }

    const usernameCheck = async (username) => {
        setUsername(username)
        setUsernameError('')
        setValidatingUsername(true);
        setUsernameOk(false)
        if (username.length > 3 && hook.validateEmail(username) && username.includes("#")) {
            setUsernameError('unsupported username format');
            setUsernameOk(false);
            setValidatingUsername(false)
            return;
        }
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
        if (phone.length > 9) {
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
        if (email.length > 3 && hook.validateEmail(email)) {
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
        } else {
            setEmailError('invalid email format');
            setValidatingEmail(false)
            setEmailOk(false)
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

        setIsLoading(true);

        let data = {
            username: username,
            password: password,
            email: email,
            phone: phone,
            firstname: firstName,
            lastname: lastName,
            location: thelocation,
            referee: referee
        }
        SignUp(data);
    }

    const SignUp = async (data) => {
        setRunning(true);
        setErrors('')
        setSuccess('');
        try {
            const res = await axios.post(`${hook.endpoint}/sign/up`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        window.scrollTo(0, 75)
                        setSuccess(res.data.message)
                    } else {
                        let source = res.data.error.source;
                        let message = res.data.error.message;
                        if (source === "username") {
                            setUsernameError(message);
                            setUsernameOk(false);
                        } else if (source === "password") {
                            setPasswordError(message);
                        } else {
                            window.scrollTo(0, 50)
                            setErrors(res.error.message)
                        }
                    }
                    setIsLoading(false);
                    setRunning(false)
                })

        } catch (error) {
            // Handle errors
            setRunning(false)
            setIsLoading(false);
            window.scrollTo(0, 75);
            setErrors('sign up failed, try again')
        }
    }

    useEffect(() => {
        getRef();
    }, [location.key]);

    const checkToProceed = () => {
        if (firstName !== "" & lastName !== "" & thelocation !== "" & emailOk & phoneOk & usernameOk & passwordError === "" & cpasswordError === "" & agree & !running) {
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

            <div className='columns m-4 mt-5 pt-5 is-centered is-vcentered'>
                <section className={`column  is-three-quarters `}>
                    <div className="card">
                        <div className="card-content">
                            <div className="media">
                                <form onSubmit={e => login(e)} className="media-content p-4">
                                    <h4 className='title is-3'>
                                        SIGN UP
                                    </h4>
                                    <div className={errors === "" ? 'is-hidden' : 'alert alert-danger'}>
                                        {errors}
                                    </div>
                                    <div className={success === "" ? 'is-hidden' : 'notification is-success is-light'}>
                                        {success}
                                    </div>

                                    <div className="field is-horizontal">
                                        <div className="field-body">
                                            <div className="field mb-4">
                                                <label className='label' htmlFor='firstname'>
                                                    Firstname
                                                </label>
                                                <p className="control is-expanded has-icons-left has-icons-right">
                                                    <input className="input" name="firstname" id="firstname" type="text" placeholder="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-user"></i>
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="field mb-4">
                                                <label className='label' htmlFor='lastname'>
                                                    Lastname
                                                </label>
                                                <p className="control is-expanded has-icons-left has-icons-right">
                                                    <input className="input" name="lastname" id="lastname" type="text" placeholder="Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-user"></i>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="field is-horizontal">
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
                                                    <span className={`${usernameError === "" ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-exclamation-triangle" style={{ color: 'red' }}></i>
                                                    </span>
                                                    <span className={`${!usernameOk ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-check" style={{ color: 'green' }}></i>
                                                    </span>
                                                    <span className={`${!validatingUsername ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-spinner fa-spin is-info"></i>
                                                    </span>
                                                    <p className={`${usernameError !== "" ? '' : 'is-hidden'} help is-danger`}>{usernameError}</p>
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
                                                    <span className={`${emailError === "" ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-exclamation-triangle" style={{ color: 'red' }}></i>
                                                    </span>
                                                    <span className={`${!emailOk ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-check" style={{ color: 'green' }}></i>
                                                    </span>
                                                    <span className={`${!validatingEmail ? 'is-hidden' : ''} icon is-small is-right`}>
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
                                                <label className='label' htmlFor='phone'>
                                                    WhatsApp number
                                                </label>
                                                <p className="control is-expanded has-icons-left has-icons-right">
                                                    <input className={`${phoneError !== "" ? 'is-danger' : ''} input`} type="tel" id="phone" placeholder="Whatsapp number" value={phone} onChange={e => phoneCheck(e.target.value)} />
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-phone"></i>
                                                    </span>
                                                    <span className={`${phoneError === "" ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-exclamation-triangle" style={{ color: 'red' }}></i>
                                                    </span>
                                                    <span className={`${!phoneOk ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-check" style={{ color: 'green' }}></i>
                                                    </span>
                                                    <span className={`${!validatingPhone ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-spinner fa-spin is-info"></i>
                                                    </span>
                                                    <p className={`${phoneError !== "" ? '' : 'is-hidden'} help is-danger`}>{phoneError}</p>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="field mb-4">
                                        <label className='label' htmlFor='location'>
                                            Location
                                        </label>
                                        <p className="control select has-icons-right has-icons-left w-100">
                                            <select
                                                className='w-100 select has-icons-left'
                                                defaultValue={thelocation}
                                                onChange={e => setLocation(e.target.value)}
                                            >
                                                <option value="">Select target country</option>
                                                {hook.countries.length === 0 ? null : (
                                                    <>
                                                        {hook.countries.map((country) => (
                                                            <option key={country.name} id={country.name} value={country.name} className={country.name === "Worldwide" ? 'd-none' : ""} >
                                                                {country.name}
                                                            </option>
                                                        ))}
                                                    </>
                                                )}
                                            </select>
                                        </p>
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
                                                    <span className={`${passwordError === "" ? 'is-hidden' : ''} icon is-small is-right`}>
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
                                                    <span className={`${cpasswordError === "" ? 'is-hidden' : ''} icon is-small is-right`}>
                                                        <i className="fas fa-exclamation-triangle" style={{ color: 'red' }}></i>
                                                    </span>
                                                    <p className={`${cpasswordError !== "" ? '' : 'is-hidden'} help is-danger`}>{cpasswordError}</p>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="field mb-4">
                                        <label className='label' htmlFor='referee'>
                                            Referal ID <small style={{ fontSize: '10px'}}>(optional)</small>
                                        </label> 
                                        <p className="control is-expanded has-icons-left has-icons-right">
                                            <input className={`${refereeError !== "" ? 'is-danger' : ''} input`} type="text" id="referee" disabled={params.referee !== undefined} placeholder="Referall ID" value={referee} onChange={e => checkReferee(e.target.value)} />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-user-circle"></i>
                                            </span>
                                            <span className={`${refereeError === "" ? 'is-hidden' : ''} icon is-small is-right`}>
                                                <i className="fas fa-exclamation-triangle" style={{ color: 'red' }}></i>
                                            </span>
                                            <span className={`${!refereeOk ? 'is-hidden' : ''} icon is-small is-right`}>
                                                <i className="fas fa-check" style={{ color: 'green' }}></i>
                                            </span>
                                            {/* <span className={`${!validatingReferee ? 'is-hidden' : ''} icon is-small is-right`}>
                                                <i className="fas fa-spinner fa-spin is-info"></i>
                                            </span> */}
                                            <p className={`${refereeError !== "" ? '' : 'is-hidden'} help is-danger`}>{refereeError}</p>
                                        </p>
                                    </div>

                                    <div className='field mb-4'>
                                        <div className='field-body'>
                                            <label className="checkbox">
                                                <input type="checkbox" checked={agree} className='m-2' value={agree} onChange={e => changeAgree(e.target.value)} />
                                                I agree to the <Link to="https://thelikey.com/tos" >terms and conditions</Link>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="control">
                                            <button
                                                type={'submit'}
                                                disabled={isLoading}
                                                className="button is-link is-fullwidth">

                                                <span className={running ? "" : "is-hidden"}>
                                                    <span className='fa fa-spinner fa-spin'></span> &nbsp; signing up
                                                </span>
                                                <span className={!running ? "" : "is-hidden"}>
                                                    Sign Up 
                                                </span>
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

export default SignUp