import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AddLeague() {
    document.title = "Add League"
    const [leagueInput, setLeague] = useState({
        name: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLeague({ ...leagueInput, [e.target.name]: e.target.value })
    }

    const submitLeague = (e) => {
        e.preventDefault();
        const data = leagueInput;

        axios.post(`/api/admin/create_league`, data).then(res => {
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

    return (
        <div className="container-fluid px-4">

            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add League
                        <Link to="/admin/view-league" className="btn btn-primary btn-sm float-end">List League</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form onSubmit={submitLeague} id="LEAGUE_FORM">
                        <div className="tab-content" id="myTabContent">
                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input type="text" name="name" onChange={handleInput} value={leagueInput.name} className="form-control" required/>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddLeague;

