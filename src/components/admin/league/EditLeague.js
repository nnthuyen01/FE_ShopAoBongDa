import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditLeague(props) {
    document.title = "Edit League"
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [leagueInput, setLeague] = useState([]);

    useEffect(() => {
        const league_id = props.match.params.id;
        axios.get(`/api/league/${league_id}`).then(res => {
            if (res.data.success === true) {
                setLeague(res.data.data);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-league');
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    const handleInput = (e) => {
        e.persist();
        setLeague({ ...leagueInput, [e.target.name]: e.target.value });
    }

    const updateLeague = (e) => {
        e.preventDefault();

        const league_id = props.match.params.id;
        const data = leagueInput;
        axios.put(`/api/admin/update_league/${league_id}`, data).then(res => {
            if (res.data.success === true) {
                swal("Success", res.data.message, "success");
                history.push('/admin/view-league');
            }
            else if (res.data.success === false) {
                swal("Warning", res.data.message, "warning");
            }
        }).catch(err =>{
            swal("Error", err.data.message, "error");
        });
    }

    if (loading) {
        return <h4>Loading Edit League...</h4>
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit League
                        <Link to="/admin/view-league" className="btn btn-primary btn-sm float-end">List League</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form onSubmit={updateLeague}>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-content" id="myTabContent">
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={leagueInput.name} className="form-control" />
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

export default EditLeague;
