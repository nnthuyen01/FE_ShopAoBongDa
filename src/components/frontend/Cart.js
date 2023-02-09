import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";
import { APP_BASE_URL, numberFormat } from "../../configs/constants";

function Cart() {
  document.title = "Cart"
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  var totalCartPrice = 0;

  if (!localStorage.getItem("auth_token")) {
    history.push("/login");
    swal("Warning", "Login to goto Cart Page", "error");
  }

  useEffect(() => {
    let isMounted = true;

    axios.get(`/api/cart`).then((res) => {
      if (isMounted) {
        if (res.data.status === true) {
          setCart(res.data.data);
          setLoading(false);
        } else if (res.data.status === 401) {
          history.push("/login");
          swal("Warning", res.data.message, "error");
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [history]);

  const handleDecrement = (cart_id, quantity) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.product_Id
          ? {
            ...item,
            quantity: item.quantity - (item.quantity > 1 ? 1 : 0),
          }
          : item
      )
    );
    updateCartQuantity(cart_id, quantity - 1);
  };
  const handleIncrement = (cart_id, quantity) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.product_Id
          ? {
            ...item,
            quantity: item.quantity + (item.quantity < 10 ? 1 : 0),
          }
          : item
      )
    );
    updateCartQuantity(cart_id, quantity + 1);
  };
  function updateCartQuantity(cart_id, quantity) {
    axios
      .put(`/api/cart/update?productId=${cart_id}&quantity=${quantity}`)
      .then((res) => {
        if (res.data.status === true) {
          //swal("Success", res.data.message, "success");
        }
      });
  }
  const deleteCartItem = (e, cart_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Removing";

    axios.delete(`/api/cart/remove?productId=${cart_id}`).then((res) => {
      if (res.data.status === true) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
        window.location.reload();
      } else if (res.data.status === false) {
        swal("Error", res.data.message, "error");
        thisClicked.innerText = "Remove";
      }
    });
  };

  if (loading) {
    return <h4>Loading Product Detail...</h4>;
  }

  var cart_HTML = "";
  if (cart.length > 0) {
    cart_HTML = (
      <div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Total Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => {
                totalCartPrice += item.item.price * item.quantity;
                return (
                  <tr key={idx}>
                    <td width="10%">
                      <img
                        src={`${APP_BASE_URL}/images/${item.item.image}`}
                        alt={item.item.productName}
                        width="50px"
                        height="50px"
                      />
                    </td>
                    <td>{item.item.productName}</td>
                    <td width="15%" className="text-center">
                      {numberFormat(item.item.price)}
                    </td>
                    <td width="15%">
                      <div className="input-group">
                        <button
                          type="button"
                          onClick={() =>
                            handleDecrement(item.product_Id, item.quantity)
                          }
                          className="input-group-text"
                        >
                          -
                        </button>
                        <div className="form-control text-center">
                          {item.quantity}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleIncrement(item.product_Id, item.quantity)
                          }
                          className="input-group-text"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td width="15%" className="text-center">
                      {numberFormat(item.item.price * item.quantity)}
                    </td>
                    <td width="10%">
                      <button
                        type="button"
                        onClick={(e) => deleteCartItem(e, item.product_Id)}
                        className="btn btn-danger btn-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <div className="card card-body mt-3">
              <h4>
                Sub Total:
                <span className="float-end">
                  {numberFormat(totalCartPrice)}
                </span>
              </h4>
              <h4>
                Grand Total:
                <span className="float-end">
                  {numberFormat(totalCartPrice)}
                </span>
              </h4>
              <hr />
              <Link to="/checkout" className="btn btn-primary">
                {" "}
                Checkout{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    cart_HTML = (
      <div>
        <div className="card card-body py-5 text-center shadow-sm">
          <h4>Your Shopping Cart is Empty</h4>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Home / Cart</h6>
        </div>
      </div>

      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{cart_HTML}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
