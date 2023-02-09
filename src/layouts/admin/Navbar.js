import React from 'react';
import { Link, useHistory } from 'react-router-dom';


const Navbar = () => {
    const currentUser = localStorage.getItem('auth_name');
    const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault();

        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        history.push('/login');

    }

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <div className='container-fluid'>
                <Link className="navbar-brand ps-3" to="/admin">Website Football</Link>

                {/* <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button> */}

                {/* <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
    <div className="input-group">
        <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
        <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
    </div>
</form> */}

                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {currentUser}<i className="fas fa-user fa-fw"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li className="dropdown-item" onClick={logoutSubmit}>Logout</li>
                        </ul>
                    </li>
                </ul>
            </div>

        </nav>
    );

}

export default Navbar;
