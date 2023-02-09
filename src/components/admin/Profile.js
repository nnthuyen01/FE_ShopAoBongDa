import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function Profile() {
    document.title = "Account";
    const [loading, setLoading] = useState(true);
    const [accounts, setAccounts] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        document.title = "Accounts";

        axios.get(`/api/admin/accounts`).then(res => {
            if (res.data.success === true) {
                setAccounts(res.data.datas);
                setLoading(false);
            }
        });

    }, [isUpdate]);

    const blockUser = (id) => {
        axios.get(`/api/admin/block/${id}`).then(res => {
            if (res.data.success === true) {
                swal("Success", res.data.message, "success");
                setIsUpdate(oldState => !oldState);
            }

        });

    }

    var display_accounts = "";
    var display_status = "";
    var display_email = "";
    if (loading) {
        return <h4>Loading Accounts...</h4>
    }
    else {
        display_accounts = accounts.map((item) => {
            if (item.status) {
                display_status = (
                    <div className="p-2 flex-fill bd-highlight text-right"><button onClick={() => blockUser(item.id)} className='btn btn-success btn-sm' /></div>
                )
            } else {
                display_status = (
                    <div className="p-2 flex-fill bd-highlight text-right"><button onClick={() => blockUser(item.id)} className='btn btn-danger btn-sm' /></div>
                )
            }

            if (item.enable) {
                display_email = (
                    <div className="flex-fill bd-highlight text-right"><button className='btn btn-success btn-sm' /></div>
                )
            } else {
                display_email = (
                    <div className="flex-fill bd-highlight text-right"><button className='btn btn-danger btn-sm' /></div>
                )
            }


            return (
                <tr key={item.id}>
                    <td className='center-format'><Link to='/admin/profile' className="btn btn-success btn-sm">{item.id}</Link></td>
                    <td className='text-format'>{item.username}</td>
                    <td className='text-format'>{item.name}</td>
                    <td className='text-format'>{item.phone}</td>
                    <td className='text-format'>
                        <div className="d-flex flex-row bd-highlight">
                            <div className="flex-fill bd-highlight">{item.email}</div>
                            {display_email}
                        </div>
                    </td>
                    <td className='text-format'>
                        <div className="d-flex flex-row bd-highlight">
                            <div className="p-2 flex-fill bd-highlight">{item.status ? "Active " : "Block"}</div>
                            {display_status}
                        </div>
                    </td>
                </tr>
            )
        });
    }

    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h4>List Accounts Customer</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr style={{ backgroundColor: "black", color: "white" }}>
                                    <th className='center-format' style={{ width: "6%" }}>ID</th>
                                    <th>Account</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th className='center-format' style={{ width: "12%" }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_accounts}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
