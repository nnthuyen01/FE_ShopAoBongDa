import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { APP_BASE_URL, numberFormat } from "../../configs/constants";

function Home() {
  document.title = "Website Football";
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get(`/api/product_top`).then((res) => {
      if (res.data.success === true) {
        setProduct(res.data.datas);
        setLoading(false);
      }
    });
  });

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
                      className="text-truncate"
                      style={{ maxWidth: "100%" }}
                      data-mdb-toggle="tooltip"
                      title={item.name}
                    >
                      {item.name}
                    </p>
                  </Link>
                  <div className="d-flex">
                    <button
                      type="button"
                      className="btn btn-outline-warning w-100 text-danger"
                    >
                      {numberFormat(item.price)}
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
    <div className="container-fluid">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={`${APP_BASE_URL}/images/slide2.jpg`}
              className="rounded mx-auto d-block w-75"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>New product</h5>
              <p>Manchester United Away kit 2022-2023</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={`${APP_BASE_URL}/images/slide3.jpg`}
              className="rounded mx-auto d-block w-75"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>New product</h5>
              <p>Manchester United Home kit 2022-2023</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={`${APP_BASE_URL}/images/slide4.jpg`}
              className="rounded mx-auto d-block w-75"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>High-quality products</h5>
              <p>Genuine commitment</p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 my-2 bg-warning">
        <div className="d-flex justify-content-center text-uppercase fs-3 text">
          Featured products
        </div>
      </div>
      <div className="container my-2">
        <div className="row">{showProductList}</div>
      </div>
    </div>
  );
}

export default Home;
