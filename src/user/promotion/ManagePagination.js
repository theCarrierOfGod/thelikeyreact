import React, { useState } from 'react'
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import './pagination.css'

const ManagePagination = ({ items, perpage, type }) => {
    const itemPerPage = perpage;
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
            <div className={total === 0 ? "d-none" : "col-lg-12 mt-4 text-right"}>
                <button onClick={() => handlePrevious()} className={currentPage === 1 ? 'd-none' : 'prevButton btn-info mr-3'} title={'Previous Page'} ></button>
                <button onClick={() => handleNext()} className={currentPage === pageCount ? 'd-none' : 'nextButton btn-info'} title={'Next Page'}></button>
            </div>

            <div>
                <div className={total !== 0 ? "d-none" : "col-lg-12 mt-4 text-center"}>
                    <div className="alert alert-info">
                        No data
                    </div>
                </div>
            </div>
            {currentItems.map((promotion) => (
                <>
                    <div className="col-md-4 col-sm-6 mt-4">
                        <div className="card p-2 pb-3 mb-1" style={{ border: '1px solid rgba(0, 0, 0, 0.125)', height: '100%' }}>
                            <form className="card-body p-0">
                                <h5>
                                    {promotion.title}
                                    <b className="text-info float-end">
                                        {promotion.cpu}<i className="mdi mdi-coin"></i>
                                    </b>
                                </h5>
                                {type === "task" ? <div dangerouslySetInnerHTML={{ __html: promotion.description }}></div> : null}
                                <table className="table mt-3">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <b>
                                                    Cost
                                                </b>
                                            </td>
                                            <td>
                                                {promotion.cpu} credits
                                            </td>
                                        </tr>
                                        {type !== "performed" ? (
                                            <tr>
                                                <td>
                                                    <b>
                                                        Target
                                                    </b>
                                                </td>
                                                <td>
                                                    {promotion.target}
                                                </td>
                                            </tr>
                                        ) : null}
                                        {type !== "performed" ? (
                                            <tr>
                                                <td>
                                                    <b>
                                                        Achieved
                                                    </b>
                                                </td>
                                                <td>
                                                    {promotion.achieved}
                                                </td>
                                            </tr>
                                        ) : null}
                                        {type !== "performed" ? (
                                            <tr>
                                                <td>
                                                    <b>
                                                        Total Cost
                                                    </b>
                                                </td>
                                                <td>
                                                    {promotion.total_cost} credits
                                                </td>
                                            </tr>
                                        ) : null}
                                        <tr>
                                            <td>
                                                <b>
                                                    Location
                                                </b>
                                            </td>
                                            <td>
                                                {promotion.location}
                                            </td>
                                        </tr>
                                        {type !== "performed" ? (
                                            <tr>
                                                <td>
                                                    <b>
                                                        Status
                                                    </b>
                                                </td>
                                                <td>
                                                    {promotion.status}
                                                </td>
                                            </tr>
                                        ) : null}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-end mt-2">
                                    {type === 'task' ? (
                                        <>
                                            <Link to={`/${type}/view/${promotion.unique_id}/creator`} type=" button" className="btn btn-info m-2 p-2">
                                                View Progress
                                            </Link>
                                        </>
                                    ) : null}
                                    {type !== "performed" ? (
                                        <Link to={`/${type}/manage/${promotion.unique_id}`} type=" button" className="btn btn-info m-2 p-2">
                                            Edit
                                        </Link>
                                    ) : null}
                                    {type === "performed" ? (
                                        <Link to={`/history/performed/${promotion.unique_id}`} type=" button" className="button btn is-link is-light m-2 p-2">
                                            View Status
                                        </Link>
                                    ) : null}
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            ))}
            <div className={total === 0 ? "d-none" : "col-lg-12 mt-4 text-right"}>
                <button onClick={() => handlePrevious()} className={currentPage === 1 ? 'd-none' : 'prevButton btn-info mr-3'} title={'Previous Page'} ></button>
                <button onClick={() => handleNext()} className={currentPage === pageCount ? 'd-none' : 'nextButton btn-info'} title={'Next Page'}></button>
                <br />
                <span>
                    {currentPage} of {pageCount} page(s)
                </span>
            </div>
        </>
    )
}

export default ManagePagination
