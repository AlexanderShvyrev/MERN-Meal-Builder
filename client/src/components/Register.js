import React, { useState } from 'react'
import { navigate, Link } from '@reach/router'
import axios from 'axios'



const Register = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errors, setErrors] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const register = e => {
        e.preventDefault();
        const newUser = { name, email, password, confirm };
        axios.post("http://localhost:8000/api/register", newUser, {
            withCredentials: true
        })
            .then(res => {
                console.log(res.data.user._id);
                localStorage.setItem('user', res.data.user._id)
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    setIsAuthenticated(true)
                    navigate(`/home/${res.data.user._id}`)
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }} className="text-light">Please Register</h1>
            <div className="d-flex justify-content-center form_container m-5">
                <form onSubmit={register}>
                    <div className="form-group">
                        {errors.name ? <p style={{ color: 'red' }}>{errors.name.message}</p> : ""}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name..."
                            onChange={e => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className="form-group">
                        {errors.email ? <p style={{ color: 'red' }}>{errors.email.message}</p> : ""}

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email..."
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="form-group">
                        {errors.password ? <p style={{ color: 'red' }}>{errors.password.message}</p> : ""}
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password..."
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="form-group">
                        {errors.confirm ? <p style={{ color: 'red' }}>{errors.confirm.message}</p> : ""}
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password..."
                            onChange={e => setConfirm(e.target.value)}
                            value={confirm}
                        />
                    </div>
                    <input type="submit" className="btn btn-warning" value="Register" />
                    <p className="text-light">Already registered?</p> <Link to="/login">Sign in</Link>
                </form>
            </div>
        </div>
    )
}

export default Register