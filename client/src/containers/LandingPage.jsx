import React, {useEffect, useState} from 'react'
import {Link} from '@reach/router'
import axios from 'axios';


const LandingPage = (props) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then(res => setProducts(res.data))
    }, [])
    
    return (
       
        <div className="row">
            {products.map((prod, IDX)=>{
                return(
                   <div className="col-sm-4 mb-5">
                        <div className="card"  key={prod._id}>
                            <Link to={`/menu/${prod._id}`}><img className="card-img-top" style={{height:'500px'}} src={prod.image} alt="Card image cap"/></Link>
                                <div className="card-body" > <h5 style={{color:'#BD6026'}}>{prod.name}</h5></div>
                        </div>
                    </div> 
                )
            })}
        </div>
    );
}

export default LandingPage
