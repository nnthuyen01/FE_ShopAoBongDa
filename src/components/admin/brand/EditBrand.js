import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditBrand(props) {
    document.title = "Edit Brand"
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [brandInput, setBrand] = useState([]);

    useEffect(() => {
        const brand_id = props.match.params.id;
        axios.get(`/api/brand/${brand_id}`).then(res => {
            if (res.data.success === true) {
                setBrand(res.data.data);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-brand');
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    const handleInput = (e) => {
        e.persist();
        setBrand({ ...brandInput, [e.target.name]: e.target.value });
    }

    const updateBrand = (e) => {
        e.preventDefault();

        const brand_id = props.match.params.id;
        const data = brandInput;
        axios.put(`/api/admin/update_brand/${brand_id}`, data).then(res => {
            if (res.data.success === true) {
                swal("Success", res.data.message, "success");
                history.push('/admin/view-brand');
            }
            else if (res.data.success === false) {
                swal("Warning", res.data.message, "warning");
            }
        }).catch(err =>{
            swal("Error", err.data.message, "error");
        });
    }

    if (loading) {
        return <h4>Loading Edit Brand...</h4>
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Brand
                        <Link to="/admin/view-brand" className="btn btn-primary btn-sm float-end">List Brand</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form onSubmit={updateBrand}>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-content" id="myTabContent">
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={brandInput.name} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Update</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default EditBrand;
