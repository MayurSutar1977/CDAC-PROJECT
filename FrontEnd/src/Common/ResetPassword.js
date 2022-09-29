
import CameraImage from "../CustomerScreen/Images/Camera_Image.jpg"
import ResetPasswordImage from "./Images/ResetPassword.png"
import { Link } from "react-router-dom";
import UserService from "../Services/UserServices";
import React, { useState } from "react";
import Sidebar from "../Components/Navigation/Sidebar";
import Navbar from "../Components/Navigation/Navbar";
import AuthService from "../Services/AuthService";

const ResetPassword = (props) => {
    const [error, setError] = useState(false);
    const [errors, setErrors] = useState(
        {
            password: "",
            confirmPassword: "",
            message: "",
        }
    );

    const [resetRequest, setResetRequest] = useState({
        password: "",
        confirmPassword: "",
        message: "",
    });

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
        let errors = {};
        if (!values.password) {
            setErrors((preValue) => { return { ...preValue, ['password']: 'Password required' } })
            setError(true);
        } else if (values.password.length < 6) {
            errors.password = 'Password needs to be 6 characters or more';
            setError(true);
            setErrors((preValue) => { return { ...preValue, ['password']: 'Password needs to be 6 characters or more' } })
            setError(true);
        }

        if (!values.confirmPassword) {
            setErrors((preValue) => { return { ...preValue, ['confirmPassword']: "Confirm password required" } })
            setError(true);
        } else if (values.confirmPassword !== values.password) {
            setErrors((preValue) => { return { ...preValue, ['confirmPassword']: "Passwords do not match" } })
            setError(true);
        }
    }

    const resetPassword = (e) => {
        e.preventDefault();

        let details = {
            userName: props.match.params.userName,
            token: props.match.params.token,
            password: resetRequest.password,
            confirmPassword: resetRequest.confirmPassword,
        };
        validateInfo(details);
        setTimeout(() => {
            if (!error) {
                console.log(JSON.stringify(details));
                AuthService.forgotPassword(details).then((res) => {
                    if (res.data.result === null) {
                        alert( res.data.message+" 😲");
                        setResetRequest({ password: "", confirmPassword: "" });
                        window.location.reload();
                    } else {
                        alert(res.data.message+" 😄");
                        setResetRequest({ password: "", confirmPassword: "" });
                        // props.history.push('/sign_in');
                        window.close();
                    }
                })
            }
            else {
                alert("Plese retry........")
                setResetRequest({ password: "", confirmPassword: "" });
                //window.lo.cation.reload();
            }
        }, 300);
    };


    const cancel = () => {
        props.history.push('/')
    }

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
                                    <h3 className="text-center">Reset Password?</h3>
                                    <h6 className="text-center">You can reset your password here.</h6>
                                </div>
                                <form className="ml-3 mr-4 mb-4">
                                    <div className="text-center mt-2 mb-2">
                                        <img style={{ width: "140px", height: "140px" }} src={ResetPasswordImage} alt="profile-img" className="profile-img-card" />
                                    </div>
                                    <div class="mt-3">
                                        <label class="sr-only" >Password</label>
                                        <div class="col input-group">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fas fa-key"></i></div>
                                            </div>
                                            <input type="password" className="form-control form-control-lg" name="password" placeholder="Password" value={resetRequest.password}
                                                onChange={onChange}
                                            />
                                        </div>
                                        {errors.password && <p className="alert alert-danger sm ml-3 mr-3">{errors.password}</p>}
                                    </div>
                                    <div class="mt-2">
                                        <label class="sr-only" >Confirm Password</label>
                                        <div class="col input-group">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="far fa-check-circle"></i></div>
                                            </div>
                                            <input type="password" className="form-control form-control-lg" name="confirmPassword" placeholder="Confirm Password" value={resetRequest.confirmPassword}
                                                onChange={onChange}
                                            />
                                        </div>
                                        {errors.confirmPassword && <p className="alert alert-danger ml-3 mr-3">{errors.confirmPassword}</p>}
                                    </div>

                                </form>
                                <div className="card-footer">
                                    <div className="ml-3 mr-4 mt-2">
                                        <button className="btn btn-outline-success btn-lg btn-block" onClick={resetPassword}>
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

    );
}
export default ResetPassword
