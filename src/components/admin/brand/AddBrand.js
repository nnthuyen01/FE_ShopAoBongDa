import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AddBrand() {
    document.title = "Add Brand"
    const [brandInput, setBrand] = useState({
        name: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setBrand({ ...brandInput, [e.target.name]: e.target.value })
    }

    const submitBrand = (e) => {
        e.preventDefault();

        const data = brandInput;

        axios.post(`/api/admin/create_brand`, data).then(res => {
            if (res.data.success === true) {
                e.target.reset();
                swal("Success", res.data.message, "success");
            }
            else {
                swal("Warning", res.data.message, "warning");
            }
        })
            .catch(err => {
                swal("Warning", err.message, "warning");
            });

    }

    // var display_errors = [];
    // if (categoryInput.error_list) {
    //     display_errors = [
    //         categoryInput.error_list.name,
    //     ]
    // }

    return (
        <div className="container-fluid px-4">

            {/* {
                display_errors.map((item) => {
                    return (<p className="mb-1" key={item}>{item}</p>)
                })
            } */}

            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add Brand
                        <Link to="/admin/view-brand" className="btn btn-primary btn-sm float-end">List Brand</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form onSubmit={submitBrand} id="BRAND_FORM">
                        <div className="tab-content" id="myTabContent">
                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input type="text" name="name" onChange={handleInput} value={brandInput.name} className="form-control" required/>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddBrand;

