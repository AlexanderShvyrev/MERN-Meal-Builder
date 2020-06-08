import React, { useState, useEffect } from 'react'
import axios from 'axios';


const Home = (props) => {

    const [users, setUsers]=useState([])
    const [user, setUser] = useState({})

    
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/users/${props._id}`)
            .then(res => {
                setUser(res.data)
                
                console.log(user);
            })
            
    }, [])

    return (
        <div>
            <div className="jumbotron">
                <h1 className="display-3">Welcome to the Van-Goes, {user.name}</h1>
                <p className="lead"><em>The meal building application for the creative</em></p>
                <p className="lead">You can start your order by clicking on the menu link and choosing your desired food category</p>
                <hr className="my-2"></hr>
                <p className="lead">
                    Don't eat to much!!! 
                </p>
            </div>
        </div>
    )
}
export default Home;
