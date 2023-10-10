import React from 'react'
import { Link } from 'react-router-dom'

export const Draw = () => {
    return (
        <>
            <div className='col-md-12 grid-margin stretch-card'>
                <div className='notification is-info is-light' style={{ fontFamily: 'monospace', fontSize: '8px' }}>
                    <p>Earn daily 5% ROI on Thelikey Invest. Create a new account to unlock #100 bonus. <Link to={'https://mlm.thelikey.com/about.php'}>Click here to Learn More</Link></p>
                </div>
            </div>
        </>
    )
}
