import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth';
import TopBar from '../TopBar';
import Helmet from 'react-helmet'
import BottomBar from '../BottomBar';
import { useHook } from '../../contexts/Hook';
import axios from 'axios';
import { useUser } from '../../contexts/User';


const SignIn = () => {
    const location = useLocation();
    const auth = useAuth();
    const userHook = useUser();
    const hook = useHook();
    const [searchParams, setSearchParams] = useSearchParams();
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [ref, setRef] = useState();

    const getRef = () => {
        let theRef = searchParams.get('ref');
        if (theRef === "" || theRef === null) {
            setRef('/')
        } else {
            setRef(`${theRef}`);
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
        signIn(data);
    }



    const signIn = async (data) => {
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
                        auth.setUserOnline(res.data.username);
                        auth.storeActiveToken(loggedIn, token, ref);
                        userHook.getUserDetails(res.data.username);
                        userHook.setUserDetails([]);
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
            setIsLoading(false);
            setUsernameError('sign in error');
        }
    }

    useEffect(() => {
        getRef();
    }, [location.key]);

    return (
        <>
            <Helmet>
                <title>
                    Sign In | TheLikey
                </title>
            </Helmet>

            <TopBar />

            <div className='columns m-4 mt-5 pt-5 is-centered is-vcentered'>
                <section className='column is-half '>
                    <img src="https://firebasestorage.googleapis.com/v0/b/likey-603a7.appspot.com/o/images%2F6343845.jpg?alt=media&token=2a15a001-2c13-4699-9319-275cb7dcf8eb" alt="" />
                </section>
                <section className={`column is-half`}>
                    <div className="card">
                        <div className="card-content">
                            <div className="media">
                                <form onSubmit={e => login(e)} className="media-content">
                                    <h4 className='title is-3'>
                                        SIGN IN
                                    </h4>
                                    <div className="field">
                                        <label className="label">Username</label>
                                        <div className="control has-icons-left has-icons-right">
                                            <input className={`${usernameError !== "" ? 'is-danger' : ''} input`} type="text" placeholder="Username" onChange={(e) => { setUsernameError(''); setUsername(e.target.value) }} value={username} />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-user"></i>
                                            </span>
                                            <span class={`${usernameError === "" ? 'is-hidden' : ''} icon is-small is-right`}>
                                                <i className="fas fa-exclamation-triangle"></i>
                                            </span>
                                            <p className={`${usernameError !== "" ? '' : 'is-hidden'} help is-danger`}>{usernameError}</p>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control has-icons-left has-icons-right">
                                            <input class={`${passwordError !== "" ? 'is-danger' : ''} input`} type="password" placeholder="password" onChange={(e) => { setPasswordError(''); setPassword(e.target.value) }} value={password} />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-key"></i>
                                            </span>
                                            <span class={`${passwordError === "" ? 'is-hidden' : ''} icon is-small is-right`}>
                                                <i className="fas fa-exclamation-triangle"></i>
                                            </span>
                                            <p className={`${passwordError !== "" ? '' : 'is-hidden'} help is-danger`}>{passwordError}</p>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button
                                                type={'submit'}
                                                disabled={isLoading}
                                                className="button is-link is-fullwidth">
                                                {isLoading ? "..." : "SIGN IN"}
                                            </button>
                                        </div>
                                    </div>
                                    <span className='mt-3' >
                                        Forgot Password? <Link to={'/reset-password'}>Reset</Link>
                                    </span> <br/>
                                    <p className='text-center mt-3' >
                                        Don't have an account? <Link to={'/sign-up'}>Sign Up</Link>
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

export default SignIn