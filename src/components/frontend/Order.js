import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { numberFormat, formatDate } from "../../configs/constants";

import swal from "sweetalert";
// import moment from "moment";
// export const numberFormat = (value) =>
// 	new Intl.NumberFormat("vi-VN", {
// 		style: "currency",
// 		currency: "VND",
// 	}).format(value);

// export const formatDate = (value) =>
// 	moment(value).format("DD-MM-YYYY").split("T")[0];

function Order() {
	document.title = "Order"
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);
	const history = useHistory();

	if (!localStorage.getItem("auth_token")) {
		history.push("/login");
		swal("Warning", "Login to goto Order Page", "error");
	}

	useEffect(() => {
		let isMounted = true;
		document.title = "Orders";

		axios.get(`/api/ordersuser`).then((res) => {
			if (isMounted) {
				if (res.data.success === true) {
					setOrders(res.data.datas);
					setLoading(false);
				}
			}
		});
		return () => {
			isMounted = false;
		};
	}, []);

	var display_orders = "";
	if (loading) {
		return <h4>Loading Orders...</h4>;
	} else {
		display_orders = orders.map((item) => {
			return (
				<tr key={item.id}>
					<td className="center-format">
						<Link to={`order/${item.id}`} className="btn btn-success btn-sm">
							{item.id}
						</Link>
					</td>
					<td>{item.username}</td>
					<td>{item.name}</td>
					<td>{item.phone}</td>
					<td>{item.address}</td>
					<td className="center-format">{formatDate(item.date)}</td>
					<td className="center-format">{numberFormat(item.totalPrice)}</td>
					<td>
						{item.status === 0
							? "Unconfirm"
							: item.status === 1
								? "Unpaid"
								: "Paid"}
					</td>
				</tr>
			);
		});
	}

	return (
		<div className="container px-4 mt-3">
			<div className="card">
				<div className="card-header">
					<h4>List Order</h4>
				</div>
				<div className="card-body">
					<div className="table-responsive">
						<table className="table table-bordered table-striped">
							<thead>
								<tr>
									<th className="center-format" style={{ width: "6%" }}>
										ID
									</th>
									<th style={{ width: "15%" }}>Username</th>
									<th style={{ width: "15%" }}>Receiver</th>
									<th className="center-format" style={{ width: "9%" }}>
										Phone
									</th>
									<th>Address</th>
									<th className="center-format" style={{ width: "9%" }}>
										Order date
									</th>
									<th className="center-format" style={{ width: "8%" }}>
										Total price
									</th>
									<th style={{ width: "11%" }}>Status</th>
								</tr>
							</thead>
							<tbody>{display_orders}</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Order;
