import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { APP_BASE_URL, formatDate, numberFormat } from "../../configs/constants";


function OrderDetail(props) {
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [order, setOrder] = useState({});
	//const [isUpdate, setIsUpdate] = useState(false);

	useEffect(() => {
		document.title = "Order Details";

		const order_id = props.match.params.id;
		axios.get(`/api/user/order/${order_id}`).then((res) => {
			if (res.data.success === true) {
				setOrder(res.data.data);
			} else {
				swal("Error", res.data.message, "error");
				history.push("/order");
			}
			setLoading(false);
		});
	}, [props.match.params.id, history]);

	var display_Productdata = "";
	if (loading) {
		return <h4>View Products Loading...</h4>;
	} else {
		display_Productdata = order.products.map((item) => {
			return (
				<div key={item.id} className="card shadow-0 border mb-4">
					<div className="card-body">
						<div className="row">
							<div className="col-md-2">
								<img
									src={`${APP_BASE_URL}/images/${item.image}`}
									className="img-fluid"
									alt={item.name}
								/>
							</div>
							<div className="col-md-4 text-center d-flex justify-content-center align-items-center">
								<p className="text-muted mb-0">{item.name}</p>
							</div>
							<div className="col-md-2 text-center d-flex justify-content-center align-items-center">
								<p className="text-muted mb-0 small">{item.description}</p>
							</div>

							<div className="col-md-2 text-center d-flex justify-content-center align-items-center">
								<p className="text-muted mb-0 small">Qty: {item.quantity}</p>
							</div>
							<div className="col-md-2 text-center d-flex justify-content-center align-items-center">
								<p className="text-muted mb-0 small">
									{numberFormat(item.price)}
								</p>
							</div>
						</div>
						<hr
							className="mb-4"
							style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
						/>
					</div>
				</div>
			);
		});
	}

	return (
		<div>
			<section className="h-100 gradient-custom">
				<div className="container py-5 h-100">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col-lg-10 col-xl-8">
							<div className="card" style={{ borderRadius: "10px" }}>
								<div className="card-header px-4 py-5">
									<h5 className="text-muted mb-0">Order Details</h5>
								</div>
								<div className="card-body p-4">
									<div className="d-flex justify-content-between align-items-center mb-4">
										<p
											className="lead fw-normal mb-0"
											style={{ color: "#a8729a" }}
										>
											{order.status === 0
												? "Unconfirm"
												: order.status === 1
													? "Unpaid"
													: "Paid"}
										</p>
									</div>
									<div className="d-flex justify-content-between pt-2 mb-4">
										<p className="fw-bold mb-0">
											Receiver:{" "}
											<span style={{ color: "#6c757d" }}>{order.name}</span>
										</p>
										<p className="fw-bold mb-0">
											Phone:{" "}
											<span style={{ color: "#6c757d" }}>{order.phone}</span>
										</p>
										<p className="fw-bold mb-0">
											Account:{" "}
											<span style={{ color: "#6c757d" }}>{order.username}</span>
										</p>
									</div>
									<div className="d-flex justify-content-between pt-2 mb-4">
										<p className="fw-bold mb-0">
											Address:{" "}
											<span style={{ color: "#6c757d" }}>{order.address}</span>
										</p>
									</div>
									{display_Productdata}
									<div className="d-flex justify-content-between pt-2">
										<p className="fw-bold mb-0">Invoice information</p>
										<p className="text-muted mb-0">
											<span className="fw-bold me-4">Total amount:</span>
											{numberFormat(order.totalPriceOrigin)}
										</p>
									</div>

									<div className="d-flex justify-content-between pt-2">
										<p className="text-muted mb-0">ID: {order.id}</p>
										<p className="text-muted mb-0">
											<span className="fw-bold me-4">Discount:</span>
											{numberFormat(order.priceOff)}
										</p>
									</div>

									<div className="d-flex justify-content-between">
										<p className="text-muted mb-0">
											Date: {formatDate(order.date)}
										</p>
										<p className="text-muted mb-0">
											<span className="fw-bold me-4">Price ship:</span>
											{numberFormat(order.priceShip)}
										</p>
									</div>
								</div>
								<div
									className="card-footer border-0 px-4 py-5"
									style={{
										backgroundColor: "#a8729a",
										borderBottomLeftRadius: "10px",
										borderBottomRightRadius: "10px",
									}}
								>
									<h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
										Total payment:{" "}
										<span className="h2 mb-0 ms-2">
											{numberFormat(order.totalPrice)}
										</span>
									</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default OrderDetail;
