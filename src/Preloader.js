import React from 'react'

const Preloader = () => {
    return (
        <>
            <div style={{ width: '100vw', height: '100vh', background: 'transparent' }} className='d-flex justify-content-center align-items-center'>
                <p style={{ background: '#fff', padding: '0.5rem', borderRadius: '10px' }}>
                    <i className='fa fa-spinner fa-spin'></i> Loading
                </p>
            </div>

            {/* <div style={{ width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.02)', opacity: '0.2' }} className='d-flex justify-content-center align-items-center'></div> */}
        </>
    )
}

export default Preloader