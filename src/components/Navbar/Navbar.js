import { faShop, faUser, faHouse, faDashboard, faDollar, faArrowRightFromBracket, faCity } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authnAction } from '../../stores/slice/authn';
import LoadingSpinnerModal from '../LoadingSpinnerModal/LoadingSpinnerModal';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoadingSpinnerModal, setIsLoadingSpinnerModal] = useState(false)
    const logout = () => {
        try {
            dispatch(authnAction.logout());
            navigate('/admin/login');
        } catch (error) {
            navigate('/admin/login');
        }
    }

    return (
        <>
            {
                isLoadingSpinnerModal ? <LoadingSpinnerModal /> : <div className={`${styles['navbar']} f-1 h-100`}>
                    <div className="ms-2">
                        <p className={`${styles['navbar-title']} text-uppercase mb-2 mt-3`}>Main</p>
                        <NavLink to="/admin/dashboard" className={({ isActive }) => {
                            let defaultClass = `py-1 d-flex text-decoration-none align-items-center`;
                            return isActive ? `${defaultClass} ${styles['isACtiveTab']}` : defaultClass
                        }}>
                            <FontAwesomeIcon icon={faDashboard} className={`${styles['icon']} f-1`} />
                            <span className={`${styles['tab-name']} text-capitalize f-5`}>dashboard</span>
                        </NavLink>
                    </div>
                    <div className="ms-2">
                        <p className={`${styles['navbar-title']} text-uppercase mb-2 mt-3`}>list</p>
                        <NavLink to="/admin/users" className={({ isActive }) => {
                            let defaultClass = `py-1 d-flex text-decoration-none align-items-center mb-2`;
                            return isActive ? `${defaultClass} ${styles['isACtiveTab']}` : defaultClass
                        }}>
                            <FontAwesomeIcon icon={faUser} className={`${styles['icon']} f-1`} />
                            <span className={`${styles['tab-name']} text-capitalize f-5`}>users</span>
                        </NavLink>
                        <NavLink to="/admin/hotels" className={({ isActive }) => {
                            let defaultClass = `py-1 d-flex text-decoration-none align-items-center mb-2`;
                            return isActive ? `${defaultClass} ${styles['isACtiveTab']}` : defaultClass
                        }}>
                            <FontAwesomeIcon icon={faShop} className={`${styles['icon']} f-1`} />
                            <span className={`${styles['tab-name']} text-capitalize f-5`}>hotels</span>
                        </NavLink>
                        <NavLink to="/admin/rooms" className={({ isActive }) => {
                            let defaultClass = `py-1 d-flex text-decoration-none align-items-center mb-2`;
                            return isActive ? `${defaultClass} ${styles['isACtiveTab']}` : defaultClass
                        }}>
                            <FontAwesomeIcon icon={faHouse} className={`${styles['icon']} f-1`} />
                            <span className={`${styles['tab-name']} text-capitalize f-5`}>rooms</span>
                        </NavLink>
                        <NavLink to="/admin/transactions" className={({ isActive }) => {
                            let defaultClass = `py-1 d-flex text-decoration-none align-items-center mb-2`;
                            return isActive ? `${defaultClass} ${styles['isACtiveTab']}` : defaultClass
                        }}>
                            <FontAwesomeIcon icon={faDollar} className={`${styles['icon']} f-1`} />
                            <span className={`${styles['tab-name']} text-capitalize f-5`}>Transactions</span>
                        </NavLink>
                        <NavLink to="/admin/areas" className={({ isActive }) => {
                            let defaultClass = `py-1 d-flex text-decoration-none align-items-center mb-2`;
                            return isActive ? `${defaultClass} ${styles['isACtiveTab']}` : defaultClass
                        }}>
                            <FontAwesomeIcon icon={faCity} className={`${styles['icon']} f-1`} />
                            <span className={`${styles['tab-name']} text-capitalize f-5`}>City</span>
                        </NavLink>
                        <NavLink to="/admin/types" className={({ isActive }) => {
                            let defaultClass = `py-1 d-flex text-decoration-none align-items-center mb-2`;
                            return isActive ? `${defaultClass} ${styles['isACtiveTab']}` : defaultClass
                        }}>
                            <FontAwesomeIcon icon={faHouse} className={`${styles['icon']} f-1`} />
                            <span className={`${styles['tab-name']} text-capitalize f-5`}>Type</span>
                        </NavLink>
                    </div>
                    <div className="ms-2">
                        <p className={`${styles['navbar-title']} text-uppercase mb-2 mt-3`}>list</p>
                        <button to="/admin/users" onClick={() => {
                            setIsLoadingSpinnerModal(true);
                            logout();
                        }} className={`${styles['logout-btn']} py-1 d-flex text-decoration-none align-items-center border-0 w-100`}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} className={`${styles['icon']} f-1`} />
                            <span className={`${styles['tab-name']} text-capitalize f-5 text-start`}>Logout</span>
                        </button>
                    </div>
                </div>
            }
        </>
    );
}

export default Navbar;



