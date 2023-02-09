import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewClub() {
	document.title = "Club";
	const [loading, setLoading] = useState(true);
	const [club, setClub] = useState([]);

	useEffect(() => {
		let isMountered = true;
		axios.get(`/api/clubs`).then((res) => {
			if (isMountered) {
				if (res.data.success === true) {
					// console.log(res.data.club);
					setClub(res.data.datas);
					setLoading(false);
				}
			}
		});
		return () => {
			isMountered = false;
		};
	}, []);

	if (loading) {
		return <h4>Loading Club...</h4>;
	} else {
		var showClubList = "";
		showClubList = club.map((item, idx) => {
			return (
				<div className="col-md-4" key={idx}>
					<div className="card">
						{/* <Link to={`collections/${item.name}`}>
              <img src="" className="w-100" alt={item.name} />
            </Link> */}
						<div className="card-body">
							<Link to={`collections/${item.id}`}>
								<h5>{item.name}</h5>
							</Link>
						</div>
					</div>
				</div>
			);
		});
	}

	if (showClubList.length > 0) {
		return (
			<div>
				<div className="py-3 bg-warning">
					<div className="container">
						<h6>Club Page</h6>
					</div>
				</div>

				<div className="py-3">
					<div className="container">
						<div className="row">{showClubList}</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<div className="py-3 bg-warning">
					<div className="container">
						<h6>Club Page</h6>
					</div>
				</div>

				<div className="py-3">
					<div className="container">
						<h4>No Club</h4>
					</div>
				</div>
			</div>
		);
	}
}

export default ViewClub;
