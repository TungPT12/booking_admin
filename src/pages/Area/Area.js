import React, { useEffect, useState } from 'react';
import styles from './Area.module.css'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { deleteAreaAdminApi, getAreasAdminApi } from '../../apis/area';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function Area() {
    const { token } = useSelector(state => state.authn)
    const [areas, setAreas] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const loadAreas = () => {
        getAreasAdminApi(token, page).then((response) => {
            if (response.status === 403 || response.status === 401) {
                localStorage.removeItem('bookingAdminToken');
                window.location.href = '/admin/login'
            }
            if (response.status !== 200) {
                throw new Error('Something wrong');
            }
            return response.data;
        }).then((data) => {
            setTotalPage(data.total_pages);
            setAreas(data.results);
            setIsLoading(false);
        }).catch((error) => {
            console.log(error)
            alert(error.message)
        })
    }

    useEffect(() => {
        loadAreas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])


    const deleteArea = (id) => {
        deleteAreaAdminApi(token, id).then((response) => {
            if (response.status === 403 || response.status === 401) {
                localStorage.removeItem('bookingAdminToken');
                window.location.href = '/admin/login'
            }
            if (response.status !== 200) {
                throw new Error(response.data.message);
            }
        }).then(() => {
            let tmpAreas = areas;
            const position = tmpAreas.findIndex((area) => {
                return id === area._id;
            })
            tmpAreas.splice(position, 1);
            setAreas([...tmpAreas])
            alert('Successfully!')
        }).catch((error) => {
            loadAreas();
            console.log(error)
            alert(error.message)
        })
    }
    const renderAreas = (areas) => {
        return areas.map((area) => {
            return <tr className='w-100'>
                <td className='f-1 text-center'>
                    <input type="checkbox" />
                </td>
                <td className='f-3 ps-3'>{area._id}</td>
                <td className='f-3 ps-3 text-capitalize'>{area.name}</td>
                <td className='f-3 ps-3 text-capitalize'>
                    <img className="w-25" alt={area.name} src={area.backgroundImage} />
                </td>
                <td className='f-1 ps-3'>
                    <button onClick={() => {
                        deleteArea(area._id)
                    }} className={`${styles['delete-btn']}`}>Delete</button>
                </td>
                <td className='f-1 ps-3'>
                    <Link to={`/admin/area/edit/${area._id}`} className={`${styles['delete-btn']} text-decoration-none px-2`}>Edit</Link>
                </td>
            </tr>
        })
    }

    return (
        <>
            {
                isLoading ? <LoadingSpinner /> : <div>
                    <Card>
                        <div className='px-4 pb-3'>
                            <div className='d-flex justify-content-between py-2 align-items-center'>
                                <h3 className={`${styles['title']} pe-3 pt-3 pb-2 mb-0 text-capitalize`}>areas list</h3>
                                <Link to="/admin/area/add" className={`${styles['btn-add_area']} text-decoration-none`}>Add new </Link>
                            </div>
                            <div className={`${styles['list-area']}`}>
                                <table className={`${styles['table']} w-100`}>
                                    <thead className='w-100 bg-light'>
                                        <tr className='w-100'>
                                            <th className='f-1'>
                                                <span className='d-flex justify-content-center'>
                                                    <input type="checkbox" />
                                                </span>
                                            </th>
                                            <th className='f-3 text-uppercase ps-3'>
                                                <span>id</span>
                                            </th>
                                            <th className='f-3 text-capitalize ps-3'>
                                                <span className='pe-5'>name</span>
                                            </th>
                                            <th className='f-3 text-capitalize ps-3 pe-3'>
                                                <span>image</span>
                                            </th>
                                            <th className='f-1 text-capitalize ps-3'>
                                                <span>Action</span>
                                            </th>
                                            <th className='f-1 text-capitalize ps-3'>
                                                <span>Action</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderAreas(areas)}
                                    </tbody>
                                </table>
                                <div className={`${styles['paging']} mt-5 d-flex justify-content-end px-5 py-3`}>
                                    <span className='me-4'>{page}-{totalPage} of {totalPage}</span>
                                    <div className='d-flex'>
                                        <button disabled={page === 1} onClick={() => {
                                            setPage(page - 1)
                                        }} className={`${styles['pre-btn']} d-flex justify-content-center align-items-center me-1 outline-none`}>
                                            <FontAwesomeIcon icon={faChevronLeft} className={`${styles['chevron-icon']}  px-3`} />
                                        </button>
                                        <button disabled={page === totalPage} onClick={() => {
                                            setPage(page + 1)
                                        }} className={`${styles['next-btn']} d-flex justify-content-center align-items-center py-1  outline-none`}>
                                            <FontAwesomeIcon icon={faChevronRight} className={`${styles['chevron-icon']} px-3`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            }
        </>
    );
}

export default Area;