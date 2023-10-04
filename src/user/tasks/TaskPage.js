import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './pagination.css'

const TaskPage = ({ items }) => {
    const itemPerPage = 10;
    const total = items.length;
    const pageCount = Math.ceil(total / itemPerPage);
    const [itemOffset, setItemOffset] = useState(0);
    const [endOffset, setEndOffset] = useState(itemPerPage)
    const [currentPage, setCurrentPage] = useState(1);
    const currentItems = items.slice(itemOffset, endOffset);


    const handleNext = () => {
        if (pageCount !== currentPage) {
            setCurrentPage(currentPage + 1);
            setItemOffset(itemOffset + itemPerPage);
            setEndOffset(endOffset + itemPerPage)
        }
    }

    const handlePrevious = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
            setItemOffset(itemOffset - itemPerPage);
            setEndOffset(endOffset - itemPerPage)
        }
    }

    return (
        <>
            <div>
                <div className={total !== 0 ? "d-none" : "col-lg-12 mt-4 text-center"}>
                    <div className="alert alert-info">
                        No data
                    </div>
                </div>
            </div>

            <div className="row">
                {currentItems.map((promotion, index) => (
                    <div className='col-md-4 col-sm-6 col-12 mb-3'>
                        <div className="card p-2 " key={index} style={{ border: "1px solid rgba(0, 0, 0, 0.125)" }}>
                            <div className="card-content p-0 text-center">
                                <h5>
                                    {promotion.title}
                                    <b className="text-info float-end">
                                        &#8358;{promotion.cpu - promotion.deduction}
                                    </b>
                                </h5>
                                <div style={{ textAlign: 'left' }} className='content' dangerouslySetInnerHTML={{ __html: promotion.description.length > 40 ? `${promotion.description.substring(0, 40)}...` : promotion.description }}></div>
                                <Link to={`/task/view/${promotion.unique_id}`} className="btn btn-gradient-success me-1">
                                    <i className="mdi mdi-arrow-right-bold"></i> proceed
                                </Link>
                                <div className={"mt-1 p-2 badge badge-info prembadge"}>
                                    {(promotion.cpu > 20) ? "PREMIUM" : "FREE"}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={total === 0 ? "d-none" : "col-lg-12 mt-4 text-right"}>
                <button onClick={() => handlePrevious()} className={currentPage === 1 ? 'd-none' : 'button btn-info mr-3'} title={'Previous Page'}> Previous </button>
                <button onClick={() => handleNext()} className={currentPage === pageCount ? 'd-none' : 'button btn-info'} title={'Next Page'}> Next </button>
            </div>
        </>
    )
}

export default TaskPage
