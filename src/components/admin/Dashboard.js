import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { numberFormat, formatDate } from '../../configs/constants';

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [totalPriceStatus, setTotalPriceStatus] = useState([]);

    useEffect(() => {

        let isMounted = true;
        document.title = "Dashboard";

        axios.get(`/api/admin/order?status=0`).then(res => {
            if (isMounted) {
                if (res.data.success === true) {
                    setOrders(res.data.datas);
                    setLoading(false);
                } else {
                    setOrders(res.data.datas);
                    setLoading(false);
                }
            }
        });

        axios.get(`/api/admin/order/totalByStatus`).then(res => {
            if (res.data.success === true) {
                setTotalPriceStatus(res.data.datas);
                setLoading(false);
            }
        });

        return () => {
            isMounted = false
        };
    }, []);


    var display_orders = "";
    var display_total = "";
    var totalPriceAll = 0;
    if (loading) {
        return <h4>Loading Dashboard...</h4>
    }
    else {
        if (orders.length === 0) {
            display_orders = (
                <tr><td className='center-format' colSpan="8">No new orders</td></tr>
            )
        } else {
            display_orders = orders.map((item) => {
                return (
                    <tr key={item.id}>
                        <td className='center-format'><Link to={`order/${item.id}`} className="btn btn-success btn-sm">{item.id}</Link></td>
                        <td>{item.username}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td className='center-format'>{formatDate(item.date)}</td>
                        <td className='center-format'>{numberFormat(item.totalPrice)}</td>
                        <td>{item.status === 0 ? 'Unconfirm' : item.status === 1 ? 'Unpaid' : 'Paid'}</td>
                    </tr>
                )
            });
        }

        display_total = totalPriceStatus.map((item) => {
            if (item.status === 0) {
                totalPriceAll += item.totalPrice;
                return (
                    <li key={item.status} className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger fs-5">
                        Total amount unconfirmed:
                        <span className="badge bg-primary rounded-pill">{numberFormat(item.totalPrice)}</span>
                    </li>
                )

            } else if (item.status === 1) {
                totalPriceAll += item.totalPrice;
                return (
                    <li key={item.status} className="list-group-item d-flex justify-content-between align-items-center list-group-item-warning fs-5">
                        Total amount unpaid:
                        <span className="badge bg-primary rounded-pill">{numberFormat(item.totalPrice)}</span>
                    </li>
                )
            } else {
                totalPriceAll += item.totalPrice;
                return (
                    <li key={item.status} className="list-group-item d-flex justify-content-between align-items-center list-group-item-success fs-5">
                        Total amount paid:
                        <span className="badge bg-primary rounded-pill">{numberFormat(item.totalPrice)}</span>
                    </li>
                )
            }

        })
    }

    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h4>Income</h4>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {display_total}
                        <li key="1000" className="list-group-item d-flex justify-content-between align-items-center list-group-item-info fs-5 fw-bold">
                            Total:
                            <span className="badge bg-primary rounded-pill">{numberFormat(totalPriceAll)}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <br />
            <div className="card">
                <div className="card-header">
                    <h4>New orders</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th className='center-format' style={{ width: "6%" }}>ID</th>
                                    <th style={{ width: "15%" }}>Username</th>
                                    <th style={{ width: "15%" }}>Receiver</th>
                                    <th className='center-format' style={{ width: "9%" }}>Phone</th>
                                    <th>Address</th>
                                    <th className='center-format' style={{ width: "9%" }}>Order date</th>
                                    <th className='center-format' style={{ width: "8%" }}>Total price</th>
                                    <th style={{ width: "11%" }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_orders}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Dashboard;
