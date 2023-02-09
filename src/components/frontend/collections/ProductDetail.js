import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { APP_BASE_URL, numberFormat } from "../../../configs/constants";

function ProductDetail(props) {
	document.title = "Product Detail";
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState([]);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		let isMounted = true;
		const name_product = props.match.params.product;
		axios.get(`/api/product/${name_product}`).then((res) => {
			if (isMounted) {
				if (res.data.success === true) {
					setProduct(res.data.data);
					setLoading(false);
				} else if (res.data.success === false) {
					history.push("/collections");
					swal("Warning", res.data.success, "error");
				}
			}
		});

		return () => {
			isMounted = false;
		};
	}, [props.match.params.club, props.match.params.product, history]);

	// Quantity Increment/Decrement in Hooks - Start
	const handleDecrement = () => {
		if (quantity > 1) {
			setQuantity((prevCount) => prevCount - 1);
		}
	};
	const handleIncrement = () => {
		if (quantity < 10) {
			setQuantity((prevCount) => prevCount + 1);
		}
	};
	// Quantity Increment/Decrement in Hooks - End

	const submitAddtocart = (e) => {
		e.preventDefault();
		axios
			.post(`/api/cart/add?productId=${product.id}&quantity=${quantity}`)
			.then((res) => {
				if (res.data.status === true) {
					//Created - Data Inserted
					swal("Success", res.data.message, "success");
				}
			})
			.catch((err) => {
				swal("Warning", "Login to add to Cart", "error");
			});
	};

	if (loading) {
		return <h4>Loading Product Detail...</h4>;
	} else {
		var avail_stock = "";
		if (product.status > 0) {
			avail_stock = (
				<div>
					<label className="btn-sm btn-success px-4 mt-2">In stock</label>
					<div className="row">
						<div className="col-md-3 mt-3">
							<div className="input-group">
								<button
									type="button"
									onClick={handleDecrement}
									className="input-group-text"
								>
									-
								</button>
								<div className="form-control text-center">{quantity}</div>
								<button
									type="button"
									onClick={handleIncrement}
									className="input-group-text"
								>
									+
								</button>
							</div>
						</div>
						<div className="col-md-3 mt-3">
							<button
								type="button"
								className="btn btn-primary w-100"
								onClick={submitAddtocart}
							>
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			);
		} else {
			avail_stock = (
				<div>
					<label className="btn-sm btn-danger px-4 mt-2">Out of stock</label>
				</div>
			);
		}
	}

	return (
		<div>
			<div className="py-3 bg-warning">
				<div className="container">
					<h6>
						Club / {product.club.name} / {product.name}
					</h6>
				</div>
			</div>

			<div className="py-3">
				<div className="container">
					<div className="row">
						<div className="col-md-4 border-end">
							<img
								src={`${APP_BASE_URL}/images/${product.image}`}
								alt={product.name}
								className="w-100"
							/>
						</div>

						<div className="col-md-8">
							<h4>
								{product.name}
							</h4>
							<p> {product.description} </p>
							<h4 className="mb-1">
								Rs: {numberFormat(product.price)}
								{/* <s className="ms-2"> Rs: {product.original_price} </s> */}
							</h4>
							<div>{avail_stock}</div>

							{/* <button type="button" className="btn btn-danger mt-3">
                Add to Wishlist
              </button> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductDetail;
