import React, { useState } from 'react';
import Navbar from '../Components/Navigation/Navbar';
import Sidebar from '../Components/Navigation/Sidebar';
import ForgotPasswordImage from "./Images/ForgotPassword.png"
import CameraImage from "../CustomerScreen/Images/Camera_Image.jpg"
import { Link } from 'react-router-dom';
import AuthService from '../Services/AuthService';
function ForgotPassword() {
    const [error, setError] = useState(false);
    const [resetRequest, setResetRequest] = useState({
        userName: "",
        email: "",
    })

    const [errors, setErrors] = useState(
        {
            userName: "",
            email: "",
        }
    );
    const onChange = (event) => {
        const { name, value } = event.target;
        setResetRequest((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        })
    }

    const validateInfo = (values) => {
        if (!values.email) {
            setError(true);
            setErrors((preValue) => { return { ...preValue, ['email']: 'Email required' } })
        }
        else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)/.test(values.email.trim())) {
            setError(true);
            setErrors((preValue) => { return { ...preValue, ['email']: "Enter a valid email" } })
        }
        if (!values.userName) {
            setError(true);
            setErrors((preValue) => { return { ...preValue, ['userName']: 'Username required' } })
        }
        else if (!/^[A-Za-z]+/.test(values.userName.trim())) {
            setError(true);
            setErrors((preValue) => { return { ...preValue, ['userName']: "Enter a valid name" } })
        }
    }

    const forgotPassword = (e) => {
        e.preventDefault();
        let details = {
            userName: resetRequest.userName,
            email: resetRequest.email,
        };
        validateInfo(details)
        if (error || errors.email ) {
            alert("Plese retry........")
            setResetRequest({ userName: "", email: "" });
            //setTimeout(() => { setErrors({ userName: "", email: "" }) }, 500);
        }
        else {
            AuthService.resetPassword(details).then((res) => {
                alert(res.data.message)
                res.data.result !== null && setResetRequest({ userName: "", email: "" });
                res.data.result === null && setResetRequest({ userName: "", email: "" });
            })
        }


    }
    //alert("Please check email id ..")
    return (
        <div>
            <Navbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col col-md-3 mt-1  ">
                    <Sidebar />
                </div>
                <div className="col-md-9 mt-0" >
                    <div className="row offset-md-2 offset-md-2">
                        <div className="col-md-3 mt-1" style={{ marginRight: "-30px" }}>
                            <div className="cart text-center rounded sidebar ">
                                <div className="card-body">
                                    <div className="mt-3">
                                        <img
                                            src={CameraImage}
                                            alt="profile-img"
                                            className="rounded-circle"
                                            style={{ width: "100%", height: "480px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mt-1">
                            <div className="card rounded " >
                                <div className="card-header">
                                    <h3 className="text-center">Forgot Password?</h3>
                                    <h6 className="text-center">You can reset your password here.</h6>
                                </div>
                                <form className="ml-3 mr-4 mb-4">
                                    <div className="text-center mt-2 mb-2">
                                        <img style={{ width: "140px", height: "140px" }} src={ForgotPasswordImage} alt="profile-img" className="profile-img-card" />
                                    </div>
                                    <div class="mt-2">
                                        <label class="sr-only" >Email</label>
                                        <div class="col input-group">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="far fa-envelope"></i></div>
                                            </div>
                                            <input type="text" className="form-control form-control-lg" name="email" placeholder="Email" value={resetRequest.email}
                                                onChange={onChange}
                                            />
                                        </div>
                                        {errors.email && <p className="alert alert-danger ml-3 mr-3">{errors.email}</p>}
                                    </div>
                                    <div class="mt-3">
                                        <label class="sr-only" >User Name</label>
                                        <div class="col input-group">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fas fa-user-check"></i></div>
                                            </div>
                                            <input type="text" className="form-control form-control-lg" name="userName" placeholder="User Name" value={resetRequest.userName}
                                                onChange={onChange}
                                            />
                                        </div>
                                        {errors.userName && <p className="alert alert-danger sm ml-3 mr-3">{errors.userName}</p>}
                                    </div>
                                </form>
                                <div className="card-footer">
                                    <div className="ml-3 mr-4 mt-2">
                                        <button className="btn btn-outline-success btn-lg btn-block" onClick={forgotPassword}>
                                            Continue... <i class="fas fa-arrow-circle-right"></i>  </button>
                                        <div className="row ml-1 h5 mt-3" >
                                            Login?
                                            <Link className="nav-item " to="/sign_in" >Click to sign in</Link>
                                        </div>
                                        <div className="row ml-1 h5">
                                            New User? <Link to="/sign_up"><i class="fas fa-user-plus"></i>Create Account here</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ForgotPassword
