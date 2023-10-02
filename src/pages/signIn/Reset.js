import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth';
import TopBar from '../TopBar';
import Helmet from 'react-helmet'
import BottomBar from '../BottomBar';
import { useHook } from '../../contexts/Hook';
import axios from 'axios';
import { useUser } from '../../contexts/User';


const Reset = () => {
    const location = useLocation();
    const auth = useAuth();
    const userHook = useUser();
    const hook = useHook();
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const login = (e) => {
        e.preventDefault();
        if (username.length < 3) {
            setUsernameError('enter a valid username')
            return
        } else {
            setUsernameError('');
        }

        setIsLoading(true);

        let data = {
            username: username,
        }
        Reset(data);
    }

    const Reset = async (data) => {
        try {
            const res = await axios.post(`${hook.endpoint}/password/reset`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        alert(res.data.success.message);
                    } else {
                        let message = res.data.error.message;
                        setUsernameError(message);
                    }
                    setIsLoading(false);
                })

        } catch (error) {
            setIsLoading(false);
            setUsernameError('password reset error');
        }
    }

    return (
        <>
            <Helmet>
                <title>
                    Password Reset | TheLikey
                </title>
            </Helmet>

            <TopBar />

            <div className='columns m-4 mt-5 pt-5 is-centered is-vcentered'>
                <section className='column is-half '>
                    <img src="https://firebasestorage.googleapis.com/v0/b/likey-603a7.appspot.com/o/images%2Fcomputer-security-with-login-password-padlock.jpg?alt=media&token=4bce0274-fbc3-404d-b33a-d55ca949e36d" alt="" />
                </section>
                <section className={`column is-half`}>
                    <div className="card">
                        <div className="card-content">
                            <div className="media">
                                <form onSubmit={e => login(e)} className="media-content">
                                    <h4 className='title is-3'>
                                        RESET PASSWORD
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
                                        <div className="control">
                                            <button
                                                type={'submit'}
                                                disabled={isLoading}
                                                className="button is-link is-fullwidth">
                                                {isLoading ? "..." : "Reset Password"}
                                            </button>
                                        </div>
                                    </div>

                                    <p className='text-center mt-3' >
                                        <br />
                                        Already have an account? <Link to={'/sign-in'}>Sign In</Link>
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

export default Reset