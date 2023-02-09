import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useHistory, useLocation } from "react-router-dom";
import { APP_BASE_URL } from "../../../configs/constants";

function SearchProduct(props) {
	document.title = "Product"
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState([]);
	const [quantity] = useState(1);
	// const params = useParams();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

	const keyword = queryParams.get("keyword");

	const submitAddtocart = (id) => {
		axios
			.post(`/api/cart/add?productId=${id}&quantity=${quantity}`)
			.then((res) => {
				if (res.data.status === true) {
					//Created - Data Inserted
					swal("Success", res.data.message, "success");
				} else if (res.data.status === 500) {
					swal("Warning", "Login to add to Cart", "error");
				}
			})
			.catch((err) => {
				swal("Warning", "Login to add to Cart", "error");
			});
	};

	useEffect(() => {
		let isMounted = true;

		axios.get(`/api/product/search?keyword=${keyword}`).then((res) => {
			if (isMounted) {
				if (res.data.success === true) {
					setProduct(res.data.datas);
					setLoading(false);
				} else if (res.data.suscess === false) {
					history.push("/collections");
					swal("Warning", res.data.message, "error");
				}
			}
		});

		return () => {
			isMounted = false;
		};
	}, [history, keyword]);

	var showProductList = "";
	if (loading) {
		return <h4>Loading Products...</h4>;
	} else {
		if (product.length > 0) {
			showProductList = product.map((item, idx) => {
				return (
					<div className="col-md-3 py-2" key={idx}>
						<div className="card">
							<Link to={`/collections/${item.club.name}/${item.id}`}>
								<img
									src={`${APP_BASE_URL}/images/${item.image}`}
									className="w-100"
									alt={item.image}
								/>
							</Link>
							<div className="card-body">
								<div className="d-flex flex-column">
									<Link to={`/collections/${item.club.name}/${item.id}`}>
										<p
											style={{
												overflow: "hidden",
												textOverflow: "ellipsis",
												whiteSpace: "nowrap",
											}}
										>
											{item.name}
										</p>
									</Link>
									<div className="d-flex">
										<button
											type="button"
											className="btn btn-outline-warning w-100 text-danger"
										>
											{item.price}
										</button>
										<button
											type="button"
											className="btn btn-warning w-75 text-danger"
											onClick={() => submitAddtocart(item.id)}
										>
											Add to Cart
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			});
		}
	}

	return (
		<div>
			<div className="py-3 bg-warning">
				<div className="container">
					<h6 className="mb-0">Search results for keyword "{keyword}" </h6>
				</div>
			</div>

			<div className="py-3">
				<div className="container">
					<div className="row">{showProductList}</div>
				</div>
			</div>
		</div>
	);
}

export default SearchProduct;
