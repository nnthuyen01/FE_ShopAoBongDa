import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function ViewClub() {
    document.title = "Club"
    const [loading, setLoading] = useState(true);
    const [clublist, setClublist] = useState([]);

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/clubs`).then(res=>{
            if(isMounted)
            {
                if(res.status === 200)
                {
                    setClublist(res.data.datas)
                    setLoading(false);
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);

    var viewcategory_HTMLTABLE = "";
    if(loading)
    {
        return <h4>Loading Club...</h4>
    }
    else
    {
        viewcategory_HTMLTABLE = 
        clublist.map( (item) => {
            return (
                <tr key={item.id}>
                    <td className='center-format'><Link to={`edit-club/${item.id}`} className="btn btn-success btn-sm">{item.id}</Link></td>
                    <td>{item.name}</td>
                    <td>{item.brand.name}</td>
                    <td>{item.league.name}</td>
                </tr>
            )
        });
    }

    return  (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>List Clubs 
                        <Link to="/admin/add-club" className="btn btn-primary btn-sm float-end">Add Club</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className='center-format' style={{width: "10%"}}>ID</th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>League</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewcategory_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewClub;

