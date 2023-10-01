import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { Helmet } from 'react-helmet'
import { useWallet } from '../../contexts/Wallet'
import Swal from 'sweetalert2'
import { useAuth } from '../../contexts/Auth'
import { useHook } from '../../contexts/Hook'
import { useUser } from '../../contexts/User'

const Transfer = () => {
    const walletHook = useWallet();
    const auth = useAuth();
    const hook = useHook();
    const userHook = useUser();
    const [credit, setCredit] = useState(0);

    const transferNow = (e) => {
        e.preventDefault();
        let data = {
            amount: credit,
            username: auth.userOnline
        }
        Swal.fire({
            title: 'Are you sure?',
            text: `Transfer ${credit}credits`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes, transfer it!'
        }).then((result) => {
            if (result.isConfirmed) {
                walletHook.internalTransfer(data);
                goNow();
            } else {
                return;
            }
        })
    }

    const goNow = () => {
        walletHook.transferHistory(auth.userOnline);
        userHook.getUserDetails(auth.userOnline);
    }

    useEffect(() => {
        goNow();

        return () => {
            return true;
        }
    }, [])

    return (
        <>
            <Helmet>
                <title>
                    Internal transfer | The LIKEY
                </title>
            </Helmet>
            <div className='container-scroller'>
                <Header />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">

                            <div className="page-header">
                                <h3 className="page-title">
                                    <span className="page-title-icon bg-success text-white me-2">
                                        <i className="mdi mdi-transfer-line"></i>
                                        <span className="iconify" data-icon="mingcute:transfer-line"></span>
                                    </span> TRANSFER CREDITS
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <span></span>Wallet <i className="mdi mdi-wallet icon-sm text-primary align-middle"></i>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="row justify-content-start">

                                <div className="col-lg-12 grid-margin">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                <strong>
                                                    <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                                                </strong>
                                                INFORMATION 
                                            </h4>
                                            <p className="card-description">
                                                You can only transfer from your withdrawable account to your free account.
                                                <br />
                                                <small
                                                    style={{ fontFamily: "monospace" }}>
                                                    <strong>
                                                        No transaction fee required.
                                                    </strong>
                                                </small>
                                            </p>
                                            <h4 className="card-title">
                                                FREE CREDITS: {userHook.earnedBalance} <br /> 
                                                WITHDRAWABLE CREDITS: {userHook.depositedBalance} <span style={{ fontSize: '1rem' }}>(${userHook.depositedBalance * 0.0015})</span>
                                            </h4>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-lg-5 grid-margin'>
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                Make transfer
                                            </h4>
                                            <form onSubmit={(e) => transferNow(e)}>
                                                <div className="form-group">
                                                    <label for="credits">Amount (CREDITS)</label>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        name="credits"
                                                        className="form-control"
                                                        value={credit}
                                                        onChange={(e) => setCredit(e.target.value)}
                                                        placeholder="Credits"
                                                        required
                                                        id="credits"
                                                    />
                                                </div>

                                                <div className="d-flex justify-content-right" >
                                                    <button type="submit" id="cryptoproceed" className="btn btn-primary">Proceed</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-12 col-sm-12 col-md-7'>
                                    <div className="card" style={{ height: 'max-content', marginBottom: "20px" }}>
                                        <div className="card-body">
                                            <h4 className="card-title mb-4">Recent Transfers</h4>
                                            <div className="d-flex justify-content-between table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">TRANSACTION ID</th>
                                                            <th scope="col">AMOUNT</th>
                                                            <th scope="col">DATE</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className=''>
                                                        {walletHook.myTransfers.length === 0 ? null : (
                                                            <>
                                                                {walletHook.myTransfers.map((activity, index) => (
                                                                    <>
                                                                        <tr>
                                                                            <th scope="row">
                                                                                {index + 1}
                                                                            </th>
                                                                            <td>
                                                                                {activity.transaction_id}
                                                                            </td>
                                                                            <td>
                                                                                {activity.amount}
                                                                            </td>
                                                                            <td>
                                                                                {hook.getDate(activity.created_at)}
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                ))}
                                                            </>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Transfer
