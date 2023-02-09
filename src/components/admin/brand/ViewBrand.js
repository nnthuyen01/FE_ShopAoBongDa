import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function ViewBrand() {
    document.title = "Brand"
    const [loading, setLoading] = useState(true);
    const [brandlist, setBrandlist] = useState([]);

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/brands`).then(res=>{
            if(isMounted)
            {
                if(res.status === 200)
                {
                    setBrandlist(res.data.datas)
                    setLoading(false);
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);

    var viewBrand_HTMLTABLE = "";
    if(loading)
    {
        return <h4>Loading Club...</h4>
    }
    else
    {
        viewBrand_HTMLTABLE = 
        brandlist.map( (item) => {
            return (
                <tr key={item.id}>
                    <td className='center-format'><Link to={`edit-brand/${item.id}`} className="btn btn-success btn-sm">{item.id}</Link></td>
                    <td>{item.name}</td>
                </tr>
            )
        });
    }

    return  (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>List Brand
                        <Link to="/admin/add-brand" className="btn btn-primary btn-sm float-end">Add Brand</Link>
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
                            {viewBrand_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewBrand;

