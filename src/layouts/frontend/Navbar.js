import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import '../../components/admin/App.css'

// import swal from 'sweetalert';
// import axios from 'axios';

function Navbar() {
	const history = useHistory();
	const [leaguelist, setLeaguelist] = useState([]);
	const [keyword, setKeyword] = useState('');

	useEffect(() => {
		let isMounted = true;

		axios.get(`/api/leagues`).then(res => {
			if (isMounted) {
				if (res.status === 200) {
					setLeaguelist(res.data.datas);
				}
			}
		});

		return () => {
			isMounted = false
		};

	}, []);

	const logoutSubmit = (e) => {
		e.preventDefault();

		localStorage.removeItem("auth_token");
		localStorage.removeItem("auth_name");
		history.push("/");
		window.location.reload();
	};

	const handledSearch = () => {
		history.push('/listProduct?keyword=')
	}

	var Leagues = "";
	if (leaguelist) {
		Leagues = leaguelist.map((item) => {
			return (
				<Link key={item.id} to={`/league/${item.id}`} className="btn btn-outline-danger me-3">{item.name}</Link>
			);
		});
	}
	var AuthButtons = "";
	var currentUser = "";
	if (!localStorage.getItem("auth_token")) {
		AuthButtons = (
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link className="nav-link" to="/login">
						Login
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/register">
						Register
					</Link>
				</li>
			</ul>
		);
	} else {
		currentUser = localStorage.getItem("auth_name");
		AuthButtons = (
			<ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
				<li className="nav-item dropdown">
					<Link
						to="#"
						className="nav-link dropdown-toggle"
						id="navbarDropdown"
						role="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						{currentUser}
						<i className="fas fa-user fa-fw"></i>
					</Link>
					<ul
						className="dropdown-menu dropdown-menu-end"
						aria-labelledby="navbarDropdown">
						<li>
							<Link to="#" className="dropdown-item" onClick={logoutSubmit}>
								Logout
							</Link>
						</li>
						<li>
							<Link to={"/change_password"} className="dropdown-item">
								Change Password
							</Link>
						</li>
					</ul>
				</li>
			</ul>
		);
	}

	return (
		<div className="sticky-top">
			<nav className="navbar navbar-expand-lg navbar-dark bg-danger shadow">
				<div className="container">
					<Link className="navbar-brand" to="/">Website Áo Bóng Đá</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="d-flex collapse navbar-collapse justify-content-end" id="searchFrm">
						<form className="d-flex form-inline" onSubmit={handledSearch}>
							<input name="keyword" className="form-control me-sm-2" style={{width: "400px"}} type="search" placeholder="Search" aria-label="Search" />
							<button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
						</form>
					</div>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className="nav-link active" to="/">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/collections">
									Club
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/cart">
									Cart
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/order">
									Order
								</Link>
							</li>
							{AuthButtons}
						</ul>
					</div>
				</div>
			</nav>
			<nav className='navbar navbar-expand-lg navbar-light bg-light'>
				<div className="container">
					<div className='d-flex'>
						{Leagues}
					</div>
				</div>
			</nav>
		</div>

	);
}

export default Navbar;
