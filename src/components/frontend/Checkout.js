import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { APP_BASE_URL, numberFormat } from "../../configs/constants";

function Checkout() {
	document.title = "Check out";
	const history = useHistory();
	const [payment, setPayment] = useState([]);
	if (!localStorage.getItem("auth_token")) {
		history.push("/");
		swal("Warning", "Login to goto Cart Page", "error");
	}

	const [loading, setLoading] = useState(true);
	const [cart, setCart] = useState([]);
	var totalCartPrice = 0;

	const [checkoutInput, setCheckoutInput] = useState({
		address: "",
		note: "",
		code: "",
		id_payment: "",
	});
	const [error, setError] = useState([]);

	useEffect(() => {
		let isMounted = true;

		axios.get(`/api/cart`).then((res) => {
			if (isMounted) {
				if (res.data.status === true) {
					setCart(res.data.data);
					setLoading(false);
				} else if (res.data.status === false) {
					history.push("/");
					swal("Warning", res.data.message, "error");
				}
			}
		});
		axios.get(`/api/payment`).then((res) => {
			if (isMounted) {
				if (res.data.status === true) {
					setPayment(res.data.data);
					setCheckoutInput({ id_payment: res.data.data[0].id })
				}
			}
		});

		return () => {
			isMounted = false;
		};
	}, [history]);

	const handleInput = (e) => {
		e.persist();
		setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
	};

	var orderinfo_data = {
		address: checkoutInput.address,
		note: checkoutInput.note,
		code: checkoutInput.code,
		id_payment: checkoutInput.id_payment,
	};

	// Paypal Code

	const createOrder = (data, actions) => {
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						value: totalCartPrice,
					},
				},
			],
		});
	};
	const onApprove = (data, actions) => {
		// return actions.order.capture();
		return actions.order.capture().then(function (details) {
			console.log(details);
			orderinfo_data.payment_id = details.id;

			axios.post(`/api/order`, orderinfo_data).then((res) => {
				if (res.data.success === true) {
					swal("Order Placed Successfully", res.data.message, "success");
					setError([]);
					history.push("/thank-you");
				} else if (res.data.success === false) {
					swal("All fields are mandetory", "", "error");
					setError(res.data.errors);
				}
			});
		});
	};
	// End-Paypal Code
	const submitOrder = (e, payment_mode) => {
		e.preventDefault();

		var data = {
			address: checkoutInput.address,
			note: checkoutInput.note,
			code: checkoutInput.code,
			id_payment: Number(checkoutInput.id_payment),
		};

		console.log(data);

		switch (payment_mode) {
			case "cod":
				axios.post(`/api/order`, data).then((res) => {
					if (res.data.success === true) {
						swal("Order Placed Successfully", res.data.message, "success");
						setError([]);
						history.push("/thank-you");
					} else if (res.data.success === false) {
						swal("All fields are mandetory", "", "error");
						setError(res.data.errors);
					}
				});
				break;

			default:
				break;
		}
	};

	if (loading) {
		return <h4>Loading Checkout...</h4>;
	}

	var checkout_HTML = "";
	if (cart.length > 0) {
		checkout_HTML = (
			<div>
				<div className="row">
					<div className="col-md-7">
						<div className="card">
							<div className="card-header">
								<h4>Basic Information</h4>
							</div>
							<div className="card-body">
								<div className="row">
									<div className="col-md-12">
										<div className="form-group mb-3">
											<label> Address</label>
											<input
												type="text"
												name="address"
												onChange={handleInput}
												value={checkoutInput.address}
												className="form-control"
											/>
											<small className="text-danger">{error.address}</small>
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group mb-3">
											<label> Note</label>
											<textarea
												rows="3"
												name="note"
												onChange={handleInput}
												value={checkoutInput.note}
												className="form-control"
											></textarea>
											<small className="text-danger">{error.note}</small>
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group mb-3">
											<label>Code</label>
											<input
												type="text"
												name="code"
												onChange={handleInput}
												value={checkoutInput.code}
												className="form-control"
											/>
											<small className="text-danger">{error.code}</small>
										</div>
									</div>

									<div className="form-group mb-3">
										<label>Payment</label>
										<select
											name="id_payment"
											onChange={handleInput}
											value={Number(checkoutInput.id_payment)}
											className="form-control"
										>
											{payment.map((item) => {
												return (
													<option value={Number(item.id)} key={item.id}>
														{item.name}
													</option>
												);
											})}
										</select>
									</div>

									<div className="col-md-12">
										<div className="form-group text-end">
											<button
												type="button"
												className="btn btn-primary mx-1"
												onClick={(e) => submitOrder(e, "cod")}
											>
												Place Order
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-md-5">
						<table className="table table-bordered">
							<thead>
								<tr>
									<th width="50%">Product</th>
									<th width="50%">Image</th>
									<th>Price</th>
									<th>Quantity</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								{cart.map((item, idx) => {
									totalCartPrice += item.item.price * item.quantity;
									return (
										<tr key={idx}>
											<td>{item.item.productName}</td>
											<td width="10%">
												<img
													src={`${APP_BASE_URL}/images/${item.item.image}`}
													alt={item.item.productName}
													width="50px"
													height="50px"
												/>
											</td>
											<td width="15%" className="text-center">
												{numberFormat(item.item.price)}
											</td>
											<td width="15%" className="text-center">
												{item.quantity}
											</td>
											<td width="15%" className="text-center">
												{numberFormat(item.item.price * item.quantity)}
											</td>
										</tr>
									);
								})}
								<tr>
									<td colSpan="2" className="text-end fw-bold">
										Grand Total
									</td>
									<td colSpan="3" className="text-end fw-bold">
										{numberFormat(totalCartPrice)}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	} else {
		checkout_HTML = (
			<div>
				<div className="card card-body py-5 text-center shadow-sm">
					<h4>Your Shopping Cart is Empty. You are in Checkout Page.</h4>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="py-3 bg-warning">
				<div className="container">
					<h6>Home / Checkout</h6>
				</div>
			</div>

			<div className="py-4">
				<div className="container">{checkout_HTML}</div>
			</div>
		</div>
	);
}

export default Checkout;
