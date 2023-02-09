import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function ViewLeague() {
    document.title = "League"

    const [loading, setLoading] = useState(true);
    const [leaguelist, setLeaguelist] = useState([]);

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/leagues`).then(res=>{
            if(isMounted)
            {
                if(res.status === 200)
                {
                    setLeaguelist(res.data.datas)
                    setLoading(false);
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);

    var viewLeague_HTMLTABLE = "";
    if(loading)
    {
        return <h4>Loading League...</h4>
    }
    else
    {
        viewLeague_HTMLTABLE = 
        leaguelist.map( (item) => {
            return (
                <tr key={item.id}>
                    <td className='center-format'><Link to={`edit-league/${item.id}`} className="btn btn-success btn-sm">{item.id}</Link></td>
                    <td>{item.name}</td>
                </tr>
            )
        });
    }

    return  (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>List League
                        <Link to="/admin/add-brand" className="btn btn-primary btn-sm float-end">Add League</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className='center-format' style={{width: "10%"}}>ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewLeague_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewLeague;

