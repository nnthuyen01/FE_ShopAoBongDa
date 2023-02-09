import React from 'react';
import {Link} from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseCategory" aria-expanded="false" aria-controls="collapseProduct">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Club
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseCategory" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" to="/admin/add-club">Add Club</Link>
                        <Link className="nav-link" to="/admin/view-club">List Club</Link>
                        </nav>
                    </div>

                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseProduct">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Product
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/admin/add-product">Create Product</Link>
                            <Link className="nav-link" to="/admin/view-product">List Product</Link>
                        </nav>
                    </div>


                    <Link className="nav-link" to="/admin/profile">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Account
                    </Link>

                    <Link className="nav-link" to="/admin/orders">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Order
                    </Link>

                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseBrand" aria-expanded="false" aria-controls="collapseBrand">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Brand
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseBrand" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" to="/admin/add-brand">Add Brand</Link>
                        <Link className="nav-link" to="/admin/view-brand">List Brand</Link>
                        </nav>
                    </div>

                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLeague" aria-expanded="false" aria-controls="collapseLeague">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        League
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseLeague" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" to="/admin/add-league">Add League</Link>
                        <Link className="nav-link" to="/admin/view-league">List League</Link>
                        </nav>
                    </div>
                    
                </div>
            </div>
        
        </nav>
    );
}

export default Sidebar;
