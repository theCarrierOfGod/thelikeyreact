import React from 'react'
import { Link } from 'react-router-dom'

export const Board = () => {
    return (
        <>
            <div className='col-md-12 strech-card grid-margin'>
                <div className='notification is-info is-light p-1' style={{ fontFamily: 'monospace', fontSize: '8px' }}>
                    <p>Earn daily 5% ROI on Thelikey Invest. Create a new account to unlock #100 bonus. <Link to={'https://mlm.thelikey.com/about.php'}>Click here to Learn More</Link></p>
                </div>
            </div>
        </>
    )
}
