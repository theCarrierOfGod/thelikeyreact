import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { useUser } from '../../contexts/User'
import { useAuth } from '../../contexts/Auth'
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid';
import '../user.css'
import { useHook } from '../../contexts/Hook'

const Profile = () => {
    const auth = useAuth();
    const hook = useHook();
    const userHook = useUser();
    const ref_address = `https://user.thelikey.com/sign_up/${auth.userOnline}`;
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [thelocation, setLocation] = useState('');
    const [uploading, setUploading] = useState(false);
    const [tiktok, setTiktok] = useState('')
    const [alert, setAlert] = useState('');
    const [op, setOP] = useState('');
    const [np, setNP] = useState('');
    const [cnp, setCNP] = useState('');

    const UploadImages = (e) => {
        setUploading(true)
        // setIsLoading(true)
        let imageUpload = e.target.files[0];

        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            getDownloadURL(imageRef).then((url) => {
                let data = {
                    username: auth.userOnline,
                    url: url,
                }
                userHook.updatePicture(data);
                setUploading(false)
            })
        })
    }

    const saveSocial = (e) => {
        e.preventDefault();
        var button = document.getElementById('socialButton');
        button.innerHTML = "..."
        button.setAttribute('disabled', true);
        let data = {
            facebook: facebook,
            twitter: twitter,
            instagram: instagram,
            tiktok: tiktok,
            username: auth.userOnline,
        }
        userHook.updateSocial(data);
    }

    const updatePassword = (e) => {
        e.preventDefault();
        var button = document.getElementById('pwdBtn');
        button.innerHTML = "..."
        button.setAttribute('disabled', true);
        let data = {
            op: op,
            np: np,
            cnp: cnp,
        }
        userHook.updatePassword(data);
    }

    const savePersonal = (e) => {
        e.preventDefault();
        var button = document.getElementById('perosnalBtn');
        button.innerHTML = "..."
        button.setAttribute('disabled', true);
        let data = {
            lastname: lastName,
            firstname: firstName,
            location: thelocation,
            username: auth.userOnline,
        }
        userHook.updatePersonal(data);
    }

    const copyText = (id) => {
        // Get the text field
        var copyText = document.getElementById(id);

        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
        setAlert('Copied to clipboard!');
    }

    useEffect(() => {
        setTimeout(() => {
            setAlert('')
        }, 6000);
    }, [alert])

    useEffect(() => {
        setFacebook(userHook.facebook)
        setTwitter(userHook.twitter);
        setInstagram(userHook.instagram);
        setFirstName(userHook.firstname);
        setLastName(userHook.userDetails.lastname);
        setLocation(userHook.userDetails.location);
    }, [userHook.userDetails]);

    return (
        <>
            <Helmet>
                <title>
                    {auth.userOnline.toUpperCase()} | The LIKEY
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
                                    <span className="page-title-icon bg-gradient-success text-white me-2">
                                        <i className="mdi mdi-account-outline"></i>
                                    </span> PROFILE
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <span></span>Account <i className="mdi mdi-account-circle-outline icon-sm text-light align-middle"></i>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <div className='notification'>
                                <span className='title is-6 mb-3' style={{ textTransform: 'uppercase', fontFamily: 'monospace' }}>
                                    Earn as much as 25 credits for referring new users.
                                </span>
                                
                                <p className={alert !== "" ? "floatingAlert" : "d-none"} >
                                    {alert}
                                </p>
                                <input name='ref_address' type={'url'} disabled={true} id={'ref_address'} value={ref_address} className='input is-transparent' style={{ background: 'transparent', border: '0 none', borderColor: 'transparent' }} />
                                <button className='button is-link is-light mt-2' onClick={() => copyText('ref_address')}>
                                    Copy
                                </button>
                            </div>

                            <div className="row justify-content-start">
                                <div className="col-md-5 grid-margin stretch-card">
                                    <div className="card">
                                        <label htmlFor='newDP' className='label pictureLabel'>
                                            <span className={uploading ? "d-none" : ""}>Change DP</span>
                                            <span className={!uploading ? "d-none" : ""}>
                                                <i className='fa fa-spinner fa-spin fa-3x'></i>
                                            </span>
                                        </label>
                                        <input type='file' accept='image/*' id="newDP" name='newDP' hidden onChange={(e) => UploadImages(e)} />
                                        <img className="card-img-top" src={userHook.userImage} alt={userHook.userName} />
                                    </div>
                                </div>
                                <div className="col-md-4 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body p-2">
                                            <div className="">
                                                <p>
                                                    <b>Firstname: </b>  {userHook.firstname}
                                                </p>
                                                <p>
                                                    <b>Lastname: </b> {userHook.lastname}
                                                </p>
                                                <p>
                                                    <b>Username: </b>  {userHook.userName}
                                                </p>
                                                <p>
                                                    <b>Phone number: </b>  {userHook.phoneNumber}
                                                </p>
                                                <p>
                                                    <b>Email Adress: </b> {userHook.userEmail}
                                                </p>
                                                <p>
                                                    <b>Free Credits: </b> {userHook.earnedBalance}
                                                </p>
                                                <p>
                                                    <b>Withdrawable Credits: </b>  {userHook.depositedBalance}
                                                </p>
                                                <p>
                                                    <b>Location: </b> {userHook.userDetails.location}
                                                </p>
                                                <p>
                                                    <b>Facebook ID: </b>  {userHook.facebook}
                                                </p>
                                                <p>
                                                    <b>Twitter handle: </b>  {userHook.twitter}
                                                </p>
                                                <p>
                                                    <b>Instagram handle: </b>  {userHook.instagram}
                                                </p>
                                                <p>
                                                    <b>Tiktok handle: </b>  {userHook.tiktok}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row justify-content-start">
                                <div className="col-md-4 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body p-2">
                                            <div className='card-title'>
                                                Update personal details
                                            </div>
                                            <hr />
                                            <div className="">
                                                <form onSubmit={(e) => savePersonal(e)}>
                                                    <div className='form-group mt-2'>
                                                        <label className='label' htmlFor='firstname'>Firstname</label>
                                                        <input name="firstname" id="firstname" defaultValue={userHook.firstname} onChange={e => setFirstName(e.target.value)} className='form-control' placeholder={'Firstname'} />
                                                    </div>
                                                    <div className='form-group mt-2'>
                                                        <label className='label' htmlFor='lastname'>Lastname</label>
                                                        <input name="lastname" id="lastname" defaultValue={userHook.lastname} onChange={e => setLastName(e.target.value)} className='form-control' placeholder={'Lastname'} />
                                                    </div>
                                                    <div className="field mb-2">
                                                        <label className='label' htmlFor='location'>
                                                            Location
                                                        </label>
                                                        <p className="control select has-icons-right has-icons-left w-100">
                                                            <select
                                                                className='w-100 select has-icons-left'
                                                                defaultValue={thelocation}
                                                                onChange={e => setLocation(e.target.value)}
                                                                disabled={true}
                                                            >
                                                                <option value="">Select target country</option>
                                                                {hook.countries.length === 0 ? null : (
                                                                    <>
                                                                        {hook.countries.map((country) => (
                                                                            <option key={country.name} id={country.name} value={country.name} selected={country.name === thelocation} className={country.name === "Worldwide" ? 'd-none' : ""} >
                                                                                {country.name}
                                                                            </option>
                                                                        ))}
                                                                    </>
                                                                )}
                                                            </select>
                                                        </p>
                                                    </div>
                                                    <div className='d-flex w-100 justify-content-end'>
                                                        <button name="personalBtn" id="perosnalBtn" className='button is-info'>
                                                            Update
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body p-2">
                                            <div className='card-title'>
                                                Update Social media handles
                                            </div>
                                            <hr />
                                            <div className="">
                                                <form onSubmit={(e) => saveSocial(e)}>
                                                    <div className='form-group mt-2'>
                                                        <label htmlFor='facebook'>Facebook profile URL</label>
                                                        <input name="facebook" id="facebook" defaultValue={userHook.facebook} onChange={e => setFacebook(e.target.value)} className='form-control' placeholder={'Facebook ID'} />
                                                    </div>
                                                    <div className='form-group mt-2'>
                                                        <label htmlFor='twitter'>Twitter handle</label>
                                                        <input name="twitter" id="twitter" defaultValue={userHook.twitter} onChange={e => setTwitter(e.target.value)} className='form-control' placeholder={'Twitter Handle'} />
                                                    </div>
                                                    <div className='form-group mt-2'>
                                                        <label htmlFor='instagram'>Instagram handle</label>
                                                        <input name="instagram" id="instagram" defaultValue={userHook.instagram} onChange={e => setInstagram(e.target.value)} className='form-control' placeholder={'Instagram Handle'} />
                                                    </div>
                                                    <div className='form-group mt-2'>
                                                        <label htmlFor='tiktok'>Tiktok handle</label>
                                                        <input name="tiktok" id="tiktok" defaultValue={userHook.tiktok} onChange={e => setTiktok(e.target.value)} className='form-control' placeholder={'Tiktok Handle'} />
                                                    </div>
                                                    <div className='d-flex w-100 justify-content-end'>
                                                        <button name="socialButton" id="socialButton" className='button is-info'>
                                                            Update
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body p-2">
                                            <div className='card-title'>
                                                Change Password
                                            </div>
                                            <hr />
                                            <div className="">
                                                <form onSubmit={(e) => updatePassword(e)}>
                                                    <div className='form-group mt-2'>
                                                        <label htmlFor='op'>Old Password</label>
                                                        <input name="op" id="op" required value={op} type="password" onChange={e => setOP(e.target.value)} className='form-control' placeholder={'Old Password'} />
                                                    </div>
                                                    <div className='form-group mt-2'>
                                                        <label htmlFor='twitter'>New Password</label>
                                                        <input name="np" id="np" required value={np} type='password' onChange={e => setNP(e.target.value)} className='form-control' placeholder={'New Password'} />
                                                    </div>
                                                    <div className='form-group mt-2'>
                                                        <label htmlFor='cnp'>Confirm New Password</label>
                                                        <input name="cnp" id="cnp" required type="password" value={cnp} onChange={e => setCNP(e.target.value)} className='form-control' placeholder={'Confirm New Password'} />
                                                    </div>
                                                    <div className='d-flex w-100 justify-content-end'>
                                                        <button name="pwdBtn" id="pwdBtn" className='button is-success'>
                                                            Change
                                                        </button>
                                                    </div>
                                                </form>
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

export default Profile
