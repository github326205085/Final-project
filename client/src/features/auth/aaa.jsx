import React, { useEffect, useState, useRef } from 'react';
import { useLoginMutation } from './authApiSlice';
import { setToken } from './authSlice';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../../CSS/loginRgister.css'
import { Button } from 'primereact/button';

const Login = () => {
    const dispatch = useDispatch()
    const [role, setRole] = useState("2222")

    const navigate = useNavigate()
    const [loginFunc, { isError, error, isSuccess, data }] = useLoginMutation()
    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            setRole(data.role)
            if(role==='user')
                 navigate("/layoutUser")
        }
    }, [isSuccess])
    const logister = useRef({
        password: "",
        identity: ""
    })
    const handleSubmit = (formData) => {
        loginFunc(formData)
    };


    return (
        
        <div style={{
            "height": "100vh",
	"width": "100vw",
	"display": "flex",
	"justify-content": "center",
	"align-items": "center",
	"flex-direction": "column",
	"gap": "30px",
	"background-color": "rgb(231, 231, 231)"
        }}>
            <Button label  ="hiiii"></Button>
        <div class="container" >
            <div class="slider"></div>
            <div class="btn">
                <button class="login" ><Link to={'/login'} >Login</Link></button>
                <button class="signup"><Link to={'/register'} >Register</Link></button>
            </div>

            {/* <!-- Form section that contains the login and the signup form --> */}
            <div class="form-section">

                {/* <!-- login form --> */}
                <div class="login-box">
                    <input type="identity"
                        class="email ele"
                        placeholder="Enter identity"
                        onChange={e => logister.identity = e.target.value} />
                    <input type="password"
                        class="password ele"
                        placeholder="password"
                        onChange={e => logister.password = e.target.value} />
                    <button class="clkbtn" onClick={() => handleSubmit({ identity: logister.identity, password: logister.password })}>Login</button>
                </div>
                </div>
            </div>
        </div>

    );
};
export default Login;
