import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { useTask } from '../../contexts/Tasks';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid';
import { useAuth } from '../../contexts/Auth';
import { useUser } from '../../contexts/User';

const ViewTask = () => {
    let { unique_id } = useParams();
    const auth = useAuth();
    const task = useTask();
    const imageListFinal = [];
    const userHook = useUser();
    const [verify, setVerify] = useState(false);
    const [moreDetails, setMoreDetails] = useState();
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploadData, setUploadData] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [done, setDone] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    const goNow = () => {
        task.fetchTask(unique_id);
    }

    useEffect(() => {
        goNow();

        return () => {
            return true;
        }
    }, [unique_id]);

    const nextStep = () => {
        setVerify(true);
    }

    const onImageChange = event => {
        let images = [];
        for (let i = 0; i < event.target.files.length; i++) {
            images.push(URL.createObjectURL(event.target.files[i]));
            setUploadData((prev) => [...prev, event.target.files[i]]);
        }

        setSelectedFiles(event.target.files);
        setImagePreviews(images);
    };

    const UploadImages = (e) => {
        e.preventDefault();
        let theImageList = "";
        setIsLoading(true)
        for (let i = 0; i < uploadData.length; i++) {
            let imageUpload = uploadData[i];
            let last = i + 1;
            const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

            uploadBytes(imageRef, imageUpload).then(() => {
                getDownloadURL(imageRef).then((url) => {
                    imageListFinal.push(url);
                    setImageList((prev) => [...prev, url]);
                    if (uploadData.length === last) {
                        setDone(true);
                    }
                })
            })
        }
    }

    const finalClass = () => {
        setIsUploading(true)
        setImagePreviews([])

        let data = {
            images: JSON.stringify(imageList),
            unique_id: unique_id,
            username: auth.userOnline,
            details: moreDetails,
            created_by: task.uniqueTask.created_by
        }
        task.uploadTask(data);
    }

    return (
        <>
            <Helmet>
                <title>
                    View Task | The LIKEY
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
                                    <span className="page-title-icon bg-primary text-white me-2">
                                        <i className="mdi mdi-transfer-line"></i>
                                        <span className="iconify" data-icon="ph:eye-duotone"></span>
                                    </span> VIEW TASK
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <span></span>Tasks <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="row justify-content-start">
                                <div className='col-lg-7 grid-margin stretch-card'>
                                    <div className='notification is-info is-light'>
                                        Read through the task, perform the task, get the neccessary proofs, click on the <b>"I have done the task"</b> button, upload the proofs, and click <b>Submit Proof</b>.
                                    </div>
                                </div>
                                <div className="col-md-6 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            {task.fetchingTask ? (
                                                <>
                                                    <div className="alert text-center">
                                                        <i className='fa fa-spinner fa-spin'></i>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    {task.uniqueTask.length === 0 ? null : (
                                                        <>
                                                            <div className={(task.uniqueTask.status !== "active") ? 'd-none' : 'd-block'}>

                                                                <div className={`${(userHook.userPackage === 'free' && task.uniqueTask.cpu > 21) ? 'd-block notification is-warning p-1' : 'd-none'}`}>
                                                                    Users on the free package cannot perform PREMIUM tasks. <Link to={'/account/upgrade'}><b>UPGRADE NOW!</b></Link>
                                                                </div>

                                                                <span className={`${(userHook.userDetails.location === task.uniqueTask.location || task.uniqueTask.location === 'Worldwide') ? 'd-none' : 'd-block notification is-warning is-light'}`} >
                                                                    Task not for your location
                                                                </span>

                                                                <p className="card-title">
                                                                    {task.uniqueTask.title.toUpperCase()}
                                                                    <div className={"mt-1 p-2 badge badge-info prembadge"}>
                                                                        {(task.uniqueTask.cpu > 20) ? "PREMIUM" : "FREE"}
                                                                    </div>
                                                                </p>

                                                                <p className="text-info">
                                                                    Reward: <b>&#8358;{task.uniqueTask.cpu - task.uniqueTask.deduction}</b>
                                                                </p>

                                                                <div style={{ textAlign: 'left', fontFamily: 'monospace' }} dangerouslySetInnerHTML={{ __html: task.uniqueTask.description }}></div>
                                                                {task.link === null ? null : (
                                                                    <p> <b>LINK: </b><br />
                                                                        <Link to={task.uniqueTask.link} className='mt-2 mb-2' style={{ fontFamily: 'monospace', textTransform: 'lowercase' }}>
                                                                            {task.uniqueTask.link}
                                                                        </Link> <br />
                                                                    </p>
                                                                )}

                                                                <p className="">
                                                                    Target area: {task.uniqueTask.location.toUpperCase()}
                                                                </p>

                                                                <div className={`${(userHook.userPackage === 'free' && task.uniqueTask.cpu > 21) ? 'd-none' : 'd-block'}`}>
                                                                    <button type='button' className={`${(userHook.userDetails.location === task.uniqueTask.location || task.uniqueTask.location === 'Worldwide') ? 'button is-primary' : 'd-none'}`} onClick={() => nextStep()} >
                                                                        I have done the task
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className={(task.uniqueTask.status === "active") ? 'd-none' : 'd-block'}>
                                                                <div className={`notification is-success is-light p-2`}>
                                                                    <b>
                                                                        Task Completed!
                                                                    </b>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className={`${verify ? 'd-block' : 'd-none'} col-md-12 grid-margin stretch-card`}>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <div className="card">
                                                <div className="card-body">
                                                    <small className='card-title'>
                                                        Upload photo proofs of task then click on the submit button.
                                                    </small>
                                                    <form onSubmit={(e) => UploadImages(e)} className='mt-2'>
                                                        <div className='form-group'>
                                                            <label htmlFor='proof'>
                                                                Select Image(s)
                                                            </label> <br />
                                                            <input type='file' onChange={onImageChange} name='files[]' accept='image/*' multiple={true} />

                                                            {imagePreviews && (
                                                                <div>
                                                                    {imagePreviews.map((img, i) => {
                                                                        return (
                                                                            <img
                                                                                className="preview"
                                                                                src={img}

                                                                                alt={"image-" + i}
                                                                                key={i}
                                                                                style={{
                                                                                    margin: "10px",
                                                                                    width: "200px",
                                                                                    height: "200px"
                                                                                }}
                                                                            />
                                                                        );
                                                                    })}
                                                                </div>
                                                            )}
                                                            <button
                                                                className={`${!done ? "d-block" : "d-none"} btn btn-info btn-sm m-3`}
                                                                disabled={!selectedFiles}
                                                                type='submit'
                                                            >
                                                                {isLoading ? (
                                                                    <>
                                                                        <span className='fa fa-spinner fa-spin'></span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        Upload Images
                                                                    </>
                                                                )}
                                                            </button>
                                                            <div className='form-group mt-'>
                                                                <label htmlFor='proof'>
                                                                    More details
                                                                </label> <br />
                                                                <textarea value={moreDetails} onChange={(e) => setMoreDetails(e.target.value)} name='detials' className='form-control' rows={3}></textarea>
                                                            </div>
                                                            <button
                                                                className={`${done ? "d-block" : "d-none"} btn btn-success btn-sm`}
                                                                disabled={!selectedFiles}
                                                                type='button'
                                                                onClick={() => finalClass()}
                                                            >
                                                                {isUploading ? (
                                                                    <>
                                                                        <span className='fa fa-spinner fa-spin'></span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        Submit Proof
                                                                    </>
                                                                )}
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
                </div>
                <Footer />
            </div>

        </>
    )
}

export default ViewTask
