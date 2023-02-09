import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { APP_BASE_URL, numberFormat } from '../../../configs/constants';
import swal from 'sweetalert';

function ViewProduct() {
    document.title = "Product";
    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {

        let isMounted = true;
        document.title = "Products";

        axios.get(`/api/products`).then(res => {
            if (isMounted) {
                if (res.data.success === true) {
                    setProduct(res.data.datas);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, [isUpdate]);

    const changeStatus = (id) => {
        axios.get(`/api/admin/product/change_status/${id}`).then(res => {
            if (res.data.success === true) {
                swal("Success", res.data.message, "success");
                setIsUpdate(oldState => !oldState);
            }

        });

    }

    var display_Productdata = "";
    var display_status = "";
    if (loading) {
        return <h4>View Products Loading...</h4>
    }
    else {
        display_Productdata = viewProduct.map((item) => {
            if (item.status === 1) {
                display_status = (
                    <div className="p-2 flex-fill bd-highlight text-right"><button onClick={() => changeStatus(item.id)} className='btn btn-success btn-sm' /></div>
                )
            } else {
                display_status = (
                    <div className="p-2 flex-fill bd-highlight text-right"><button onClick={() => changeStatus(item.id)} className='btn btn-danger btn-sm' /></div>
                )
            }

            return (
                <tr key={item.id}>
                    <td className='center-format'>
                        <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm">{item.id}</Link>
                    </td>
                    <td className='text-format'>{item.club.name}</td>
                    <td className='text-format'>{item.name}</td>
                    <td className='text-format'>
                        <div className="d-flex flex-row bd-highlight">
                            <div className="p-2 flex-fill bd-highlight">{item.status === 1 ? 'Stocking' : 'Out sold'}</div>
                            {display_status}
                        </div>
                    </td>
                    <td className='center-format'><img src={`${APP_BASE_URL}/images/${item.image}`} width="50px" alt={item.name} /></td>
                    <td className='center-format'>{numberFormat(item.price)}</td>
                    <td className='text-format'>{item.description}</td>

                </tr>

            )
        });
    }

    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h4>View Product
                        <Link to="/admin/add-product" className="btn btn-primary btn-sm float-end">Add Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th className='center-format' style={{ width: "5%" }}>ID</th>
                                    <th style={{ width: "14%" }}>Club</th>
                                    <th style={{ width: "20%" }}>Product name</th>
                                    <th style={{ width: "8%" }}>Status</th>
                                    <th className='center-format' style={{ width: "7%" }}>Image</th>
                                    <th className='center-format' style={{ width: "8%" }}>Price</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_Productdata}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;
