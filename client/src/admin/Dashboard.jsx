import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';


const Dashboard = (props) => {
    const [products, setProducts] = useState([])


    const getProducts = () => {
    axios.get("http://localhost:8000/api/products") 
      .then(res => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }
useEffect(() => {
    getProducts();
}, [props]);
    

    return (
        <div>
            {products.map((item, i) => {
                return(

                    <div className="card text-center">
                        <h4 className="card-title">{item.name}</h4>
                        <img className="card-img-top" src={item.image} style={{
                            width: "300px",  
                            height: "300px"
                        }} alt="Card image cap"></img>
                        <div className="card-body">
                            <p className="card-text"> Price: ${item.basePrice.toFixed(2)}</p>
                            <ul>
                                {console.log(item)}
                                {item.ingredients.map((ing)=>{
                                   
                                    return(

                                    <li key={ing._id}>{ing.name} <img src={ing.image} style={{
                                        height: "150px",
                                        width: "150px"
                                    }}alt=""/></li>
                                    )
                                })
                                    
                            }
                            </ul>
                        <Link to='/build'><img src="" alt-src="" className="card-image"></img></Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Dashboard;
