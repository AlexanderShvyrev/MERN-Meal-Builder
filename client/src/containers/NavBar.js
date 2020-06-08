import React from 'react'
import { Link, navigate } from '@reach/router';

const NavBar = () => {
  const logout = () => { 
    localStorage.removeItem("user");
  }  
  const goHome = (e) => {
    e.preventDefault();
    let id = localStorage.getItem("user");
    navigate(`/home/${id}`)
    }
  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <Link to='/menu' className="nav-link active">Menu</Link>
            </li>
            <li className="nav-item">
            <Link to='/cart/:id' className="nav-link active">Cart</Link>

            </li>
            <li className="nav-item">
            <a href="#" onClick={ goHome }  className="nav-link active">Home</a>
          </li>
          <li className="float-right nav-item">
            <Link to='/login' onClick={ logout } className="nav-link active">Logout</Link>
          </li>
        </ul>

        </div>
    </div>
  )
}
    
    export default NavBar
