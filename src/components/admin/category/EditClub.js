import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditClub(props) {
    document.title = "Edit Club"
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [clubInput, setClub] = useState([]);
    const [brand, setBrand] = useState([]);
    const [league, setLeague] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const club_id = props.match.params.id;
        axios.get(`/api/club/${club_id}`).then(res => {
            if (res.data.success === true) {
                setClub(res.data.data);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-category');
            }
            setLoading(false);
        });

        axios.get(`/api/brands`).then(res => {
            if (isMounted) {
                if (res.data.success === true) {
                    setBrand(res.data.datas);
                }
            }
        });

        axios.get(`/api/leagues`).then(res => {
            if (isMounted) {
                if (res.data.success === true) {
                    setLeague(res.data.datas);
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, [props.match.params.id, history]);

    const handleInput = (e) => {
        e.persist();
        setClub({ ...clubInput, [e.target.name]: e.target.value });
    }

    const updateClub = (e) => {
        e.preventDefault();

        const club_id = props.match.params.id;
        const data = clubInput;
        axios.put(`/api/admin/update_category/${club_id}`, data).then(res => {
            if (res.data.success === true) {
                swal("Success", res.data.message, "success");
                history.push('/admin/view-category');
            }
            else if (res.data.success === false) {
                swal("Warning", res.data.message, "warning");
            }
            else if (res.data.status === 422) {
                swal("All fields are mandetory", "", "error");
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-category');
            }
        });
    }

    if (loading) {
        return <h4>Loading Edit Category...</h4>
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Club
                        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">List Club</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form onSubmit={updateClub}>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-content" id="myTabContent">
                                <div className="form-group mb-3">
                                    <label>Choose brand</label>
                                    <select name="brandId" onChange={handleInput} value={clubInput.brand.id} className="form-control">
                                        {
                                            brand.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Choose league</label>
                                    <select name="leagueId" onChange={handleInput} value={clubInput.league.id} className="form-control">
                                        {
                                            league.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={clubInput.name} className="form-control" />
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

export default EditClub;
