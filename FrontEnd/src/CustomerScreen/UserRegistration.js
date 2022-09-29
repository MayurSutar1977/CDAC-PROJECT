import "./Styles/ViewProfile.css";
import CameraImage from "./Images/Camera_Image.jpg"
import SignUp from "./Images/SignUp.png";
import { Link } from "react-router-dom";
import UserService from "../Services/UserServices";
import React, { useState } from "react";
import Sidebar from "../Components/Navigation/Sidebar";
import Navbar from "../Components/Navigation/Navbar";

const UserRegistration = (props) => {
    const [error, setError] = useState(false);
    const [viewPass, setViewPass] = useState("password")
    const [errors, setErrors] = useState(
        {
            userName: "",
            password: "",
            confirmPassword: "",
            message: "",
        }
    );

    const [newUser, setNewUser] = useState({
        userName: "",
        password: "",
        confirmPassword: "",
        message: "",
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setNewUser((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        })
    }

    const validateInfo = (values) => {
        let errors = {};

        if (!values.userName) {
            setErrors((preValue) => { return { ...preValue, ['userName']: 'Username required' } })
            setError(true);
        }
        else if (!/^[A-Za-z]+/.test(values.userName.trim())) {
            setErrors((preValue) => { return { ...preValue, ['userName']: "Enter a valid name" } })
            setError(true);
        }
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

    const registerUser = (e) => {
        e.preventDefault();

        let user = {
            userName: newUser.userName,
            password: newUser.password,
            confirmPassword: newUser.confirmPassword,
        };
        validateInfo(user);
        setTimeout(() => {
            if (!error) {
                console.log(JSON.stringify(user));
                UserService.registerNewUser(user).then((res) => {
                    // res.data.result != null && alert("SignUp successfully");
                    if (res.data.result === null) {
                        alert(" Sign up failed..............." + res.data.message);
                        setNewUser({ userName: "", password: "", confirmPassword: "" });
                        props.history.push("/sign_up");
                    } else {
                        alert(res.data.message);
                        props.history.push("/sign_in");
                    }
                })
            }
            else {
                alert("Plese retry........")
                setNewUser({ userName: "", password: "", confirmPassword: "" });
                //window.lo.cation.reload();
            }
        }, 300);
    };

    const viewPassword = () => {
        if (viewPass === "password")
            setViewPass("text")
        else
            setViewPass("password")
    }

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
                <div className="col mt-1" >
                    <div className="card">
                        <div className="card-header" >
                            <h2 className="text-center">User Registration</h2>
                        </div>
                        <div className="row ">
                            <div className="col-md-3">
                                <div className="card mr-lg-n4 h-100  bg-secondary">
                                    <div className="card-body">
                                        <div className="mt-3">
                                            <img
                                                src={CameraImage}
                                                alt="profile-img"
                                                className="rounded-circle"
                                                style={{ width: "100%", height: "600px" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <div className="card h-100 mr-lg-n4">
                                    {/* <div className="card-header">
                                        <h2 className="text-center " >User Registration</h2>
                                    </div> */}
                                    <div className="card-body ">
                                        <div className="text-center mt-5 mb-2 ">
                                            <img
                                                src={SignUp}
                                                alt="profile-img"
                                                className=""
                                                style={{ width: "35%", height: "35%" }}
                                            />
                                        </div>
                                        <div className="form mt-5">
                                            <div className="row mb-4">
                                                <div class="input-group col-md-12">
                                                    <div class="input-group-prepend">
                                                        <span className=" input-group-text"><i class="fas fa-user"></i></span>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg"
                                                        name="userName"
                                                        value={newUser.userName}
                                                        onChange={onChange}
                                                        placeholder="User Name"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    {errors.userName && <p className="alert alert-danger  ">{errors.userName}</p>}
                                                </div>
                                            </div>
                                            <div class=" row mb-4">
                                                <div class="input-group col-md-12">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i class="fas fa-key"></i></span>
                                                    </div>
                                                    <input
                                                        type={viewPass}
                                                        className="form-control form-control-lg"
                                                        name="password"
                                                        value={newUser.password}
                                                        onChange={onChange}
                                                        placeholder="Password"
                                                        required
                                                    />
                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-secondary" onClick={viewPassword}><i class="far fa-eye-slash"></i></button>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    {errors.password && <p className="alert alert-danger  ">{errors.password}</p>}
                                                </div>
                                            </div>
                                            <div class=" row mb-4">
                                                <div class="input-group col-md-12">
                                                    <div className="input-group-prepend ">
                                                        <span className="input-group-text"><i class="fas fa-key"></i></span>
                                                    </div>
                                                    <input
                                                        type={viewPass}
                                                        className="form-control form-control-lg"
                                                        name="confirmPassword"
                                                        value={newUser.confirmPassword}
                                                        onChange={onChange}
                                                        placeholder="confirmPassword"
                                                        required
                                                    />
                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-secondary" onClick={viewPassword}><i class="far fa-eye-slash"></i></button>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    {errors.confirmPassword && <p className="alert alert-danger  ">{errors.confirmPassword}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer bg-light text-dark">
                                        <div className="row mt-1">
                                            <div className="col-md-6 ">
                                                <button className="btn btn-outline-success btn-lg btn-block mt-2" onClick={registerUser} >Sign up <i class="fas fa-plus-circle"></i></button>
                                            </div>
                                            <div className="col-md-6 ">
                                                <button className="btn btn-outline-danger btn-lg btn-block mr-3 mt-2" onClick={cancel} ><i class="fas fa-arrow-circle-left"></i>Cancel</button>
                                            </div>
                                        </div>
                                        <div className="ml-1 mt-1 row col-form-label-lg">
                                            Already have an account?<Link to="/sign_in" >Login here<i class="fas fa-sign-in-alt"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card text-center rounded sidebar bg-secondary">
                                    <div className="card-body">
                                        <div className="mt-3">
                                            <img
                                                src="https://images.pexels.com/photos/339379/pexels-photo-339379.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                                                alt="profile-img"
                                                className="rounded-circle"
                                                style={{ width: "100%", height: "600px" }}
                                            />
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

export default UserRegistration;
