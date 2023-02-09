import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { numberFormat } from '../../../configs/constants';

function EditProduct(props) {
    document.title = "Edit Product";
    const history = useHistory();

    const [clubList, setClublist] = useState([]);
    const [productInput, setProduct] = useState({});
    const [pricture, setPicture] = useState({
        img: null,
    });
    const [errorlist, setError] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleInput = (e) => {
        e.persist();
        setProduct({ ...productInput, [e.target.name]: e.target.value });
        console.log(productInput.status);
    }

    const handleImage = (e) => {
        setPicture({ img: e.target.files[0] });
    }

    useEffect(() => {

        axios.get(`/api/clubs`).then(res => {
            if (res.data.success === true)
                setClublist(res.data.datas);
        });

        const product_id = props.match.params.id
        axios.get(`/api/product/${product_id}`).then(res => {
            if (res.data.success === true) {
                setProduct({
                    id_club: res.data.data.club.id,
                    name: res.data.data.name,
                    description: res.data.data.description,
                    price: res.data.data.price,
                });
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-product');
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    const updateProduct = (e) => {
        e.preventDefault();

        const product_id = props.match.params.id
        const formData = new FormData();
        formData.append('img', pricture.img);
        formData.append('id_club', productInput.id_club);
        formData.append('name', productInput.name);
        formData.append('status', productInput.status);
        formData.append('description', productInput.description);
        formData.append('price', productInput.price);
        formData.append('status', productInput.status);

        console.log(pricture.img)
        console.log(Object.fromEntries(formData))

        axios.put(`/api/admin/update_product/${product_id}`, formData).then(res => {
            if (res.data.success === true) {
                swal("Success", res.data.message, "success");
                setError([]);
                history.push('/admin/view-product');
            }
            // else if (res.data.status === 422) {
            //     swal("All Fields are mandetory", "", "error");
            //     setError(res.data.errors);
            // }
            // else if (res.data.status === 404) {
            //     swal("Error", res.data.message, "error");
            //     history.push('/admin/view-product');
            // }
        }).catch(err => {
            console.log(err)
        });

    }

    if (loading) {
        return <h4>Edit Product Data Loading...</h4>
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Product
                        <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateProduct} encType="multipart/form-data">
                        <div className="form-group mb-3">
                            <label>Select Club</label>
                            <select name="id_club" onChange={handleInput} value={productInput.id_club} className="form-control">
                                {
                                    clubList.map((item) => {
                                        return (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <small className="text-danger">{errorlist.id_club}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
                            <small className="text-danger">{errorlist.name}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea name="description" onChange={handleInput} value={productInput.description} className="form-control"></textarea>
                        </div>

                        <div className="form-group mb-3">
                            <label>Price ({numberFormat(productInput.price)})</label>
                            <input name="price" type="number" onChange={handleInput}
                                value={productInput.price} className="form-control"
                                max="2000000" min="10000" required></input>
                        </div>
                        <div className="col-md-8 form-group mb-3">
                            <label>Image</label>
                            <input type="file" name="img" onChange={handleImage} className="form-control" />
                            <small className="text-danger">{errorlist.image}</small>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2">Submit</button>

                    </form>
                </div>
            </div>
        </div>

    )
}

export default EditProduct;
