import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="footer" style={{ position: 'relative' }}>
                <div className="container-fluid d-flex justify-content-between">
                    <span className="text-dark d-block text-center text-sm-start d-sm-inline-block">Copyright ©
                        thelikey.com
                        {/* {new Date()} */}
                    </span>
                    {/* <!-- <span className="float-none float-sm-end mt-1 mt-sm-0 text-end"> By <a
                        href="https://www.bootstrapdash.com/bootstrap-admin-template/" target="_blank">Bootstrap
                        admin template</a> from Bootstrapdash.com</span> --> */}
                </div>
            </footer>
        </>
    )
}

export default Footer