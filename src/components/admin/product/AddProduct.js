import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { numberFormat } from '../../../configs/constants';

function AddProduct() {
    document.title = "Add Product";
    const [categorylist, setCategorylist] = useState([]);
    const [productInput, setProduct] = useState({
        id_club: '',
        name: '',
        description: '',
        price: '',
    });
    const [picture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setProduct({ ...productInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        setPicture({ img: e.target.files[0] });
    }

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/clubs`).then(res => {
            if (isMounted) {
                if (res.data.success === true) {
                    setCategorylist(res.data.datas);
                    setProduct({id_club: res.data.datas[0].id})
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);

    const submitProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('img', picture.img);
        formData.append('id_club', productInput.id_club);
        formData.append('name', productInput.name);
        formData.append('price', productInput.price);
        formData.append('description', productInput.description);

        axios.post(`/api/admin/create_product`, formData).then(res => {
            if (res.data.success === true) {
                swal("Success", res.data.message, "success");
                setProduct({
                    ...productInput,
                    id_club: '',
                    name: '',
                    description: '',
                    price: '',
                });
                setPicture({img: ''});
                setError([]);
                <Redirect to={'/admin/view-product'}/>
            }
            // else if(res.data.status === 422)
            // {
            //     swal("All Fields are mandetory","","error");
            //     setError(res.data.errors);
            // }
        }).catch((err) => console.log(err));

    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add Product
                        <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">List product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitProduct} encType="multipart/form-data">
                        <div className="tab-content" id="myTabContent">
                            <div className="form-group mb-3">
                                <label>Choose club</label>
                                <select name="id_club" onChange={handleInput} value={productInput.id_club} className="form-control">
                                    {
                                        categorylist.map((item) => {
                                            return (
                                                <option value={item.id} key={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <small className="text-danger">{errorlist.id_category}</small>
                            </div>

                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" required/>
                                <small className="text-danger">{errorlist.name}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Description</label>
                                <textarea name="description" onChange={handleInput} value={productInput.description} className="form-control" required></textarea>
                            </div>
                            <div className="form-group mb-3">
                                <label>Price ({numberFormat(productInput.price)})</label>
                                <input name="price" type="number" onChange={handleInput} 
                                value={productInput.price} className="form-control" 
                                max="2000000" min="10000" required></input>
                            </div>
                            <div className="col-md-8 form-group mb-3">
                                <label>Image</label>
                                <input type="file" name="img" onChange={handleImage} className="form-control" required/>
                                <small className="text-danger">{errorlist.image}</small>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2">Submit</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;
