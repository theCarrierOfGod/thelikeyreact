import React, { useEffect, useState } from 'react';
import { Offline } from "react-detect-offline";
import { useLocation } from 'react-router-dom';

const Network = () => {
    const location = useLocation();
    const [show, setShow] = useState('');
    const body = document.getElementById("ourBody");

    // const checkNetwork = () => {
        // if (Offline) {
        //     setShow(true)
        //     body.style.overflowY = "hidden"
        // } else {
        //     setShow(false)
        //     body.style.overflowY = "auto"
        // }
    // }
    useEffect(() => {
        // checkNetwork();

        return () => {
            // checkNetwork();
        }
    }, [location.key])

    return (
        <>
            {/* <Offline>
                <div className={show ? 'floating' : 'd-none'}>
                    <div style={{ width: '100vw', height: '100vh', background: 'white' }} className='d-flex justify-content-center align-items-center'>
                        <img src='/logo.png' alt="LIKEY" width={100} height={100} />
                        <div className='subtitle'>
                            You can't use the likey without internet connection
                        </div>
                        <button className='button is info is-outlined'>
                            Retry
                        </button>
                    </div>
                </div>
            </Offline> */}
        </>
    )
}

export default Network
