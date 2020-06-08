import React, { useState } from 'react';
import axios from 'axios';
import { navigate, Link } from '@reach/router'

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const login = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", { email, password }, {
            withCredentials: true
        })
            .then(res => {
                console.log(res.data.user._id);
                localStorage.setItem('user', res.data.user._id)
                if (res.data.msg === "invalid login attempt") {
                    setErrorMessage("Invalid login attempt");
                } else {
                    setIsAuthenticated(true)
                    navigate(`/home/${res.data.user._id}`);
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <div>
            <h1 style={{ textAlign: 'center' }} className="text-light">Sign In</h1>
            <div className="d-flex justify-content-center form_container m-5">
                <form onSubmit={login}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email..."
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="form-group">

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password..."
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <input type="submit" className="btn btn-success" value="Sign in" />
                    <p className="error-message text-danger">{errorMessage ? errorMessage : ""}</p>
                    <p className="text-light">Don't have an account?</p> <Link to="/">Register</Link>

                </form>
            </div>
        </div>
    )
}

export default Login
