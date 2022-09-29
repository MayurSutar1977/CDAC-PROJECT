// import "./Styles/ViewProfile.css";
import CameraImage from "../Images/Camera_Image.jpg"
// import CameraImage from '../Images/Camera_Image.jpg'
import SignUp from "../Images/SignUp.png"
import { Link } from "react-router-dom";
import UserService from "../Services/UserServices";
import React, { useState } from "react";
import AdminNavbar from "../AdminNavbar";
import AdminSidebar from "../AdminSidebar";

const MakeNewAdmin = (props) => {
    const [error, setError] = useState(false);
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
        userRole: "ADMIN",
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
            userRole: "ADMIN",
        };
        validateInfo(user);
        setTimeout(() => {
            if (!error) {
                console.log(JSON.stringify(user));
                UserService.addNewAdmin(user).then((res) => {
                    // res.data.result != null && alert("SignUp successfully");
                    if (res.data.result === null) {
                        alert("Sign up failed..............." + res.data.message);
                        setNewUser({ userName: "", password: "", confirmPassword: "", userRole: "" });
                        props.history.push("/make-new-admin");
                    } else {
                        alert(res.data.message);
                        props.history.push("/admin_home");
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


    const cancel = () => {
        props.history.push('/')
    }

    return (
        <div >
            <AdminNavbar />
            <div className="row ml-1 mt-2 mb-2 mr-2 ">
                <div className="col col-md-3 mt-1  ">
                    <AdminSidebar />
                </div>
                <div className="col mt-0" >
                    <div className="row">
                        <div className="col-md-4 mt-1" style={{ marginLeft: "-14px", marginRight: "-30px" }}>
                            <div className="cart text-center rounded bg-dark h-100 ">
                                <div className="card-body">
                                    <div className="mt-3 ">
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
                        <div className="col mt-1">
                            <div className="card rounded content">
                                <div className="card-header" style={{ backgroundColor: "silver" }}>
                                    <h2 className="text-center " >Make as Admin </h2>
                                </div>
                                <div className="card-body rounded" style={{ backgroundColor: "lightgoldenrodyellow" }}>
                                    <div className="text-center">
                                        <img
                                            src={SignUp}
                                            alt="profile-img"
                                            className="  "
                                            style={{ width: "30%", height: "20%" }}
                                        />
                                    </div>
                                    <div className="form ml-4  ">
                                        <div class="form-group row mb-4 mt-5" >
                                            <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fas fa-user-check"></i>User Name</label>
                                            <div className="col-sm-8">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    name="userName"
                                                    value={newUser.userName}
                                                    onChange={onChange}
                                                    placeholder="User Name"
                                                    required=""
                                                />
                                                {errors.userName && <p className="alert alert-danger  ">{errors.userName}</p>}
                                            </div>
                                        </div>
                                        <div class="form-group row mb-4">
                                            <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fas fa-key"></i> Password</label>
                                            <div className="col-sm-8">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    name="password"
                                                    placeholder={() => { return <i class="fas fa-key"></i> }}
                                                    value={newUser.password}
                                                    onChange={onChange}
                                                    placeholder="Password"
                                                    required
                                                />
                                                {errors.password && <p className="alert alert-danger  ">{errors.password}</p>}
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fas fa-key"></i> Confirm Password</label>
                                            <div className="col-sm-8">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg hover"
                                                    name="confirmPassword"
                                                    value={newUser.confirmPassword}
                                                    onChange={onChange}
                                                    placeholder="Confirm Password"
                                                    required
                                                />
                                                {errors.confirmPassword && <p className="alert alert-danger  ">{errors.confirmPassword}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer" style={{ backgroundColor: "silver" }}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button className="btn btn-success btn-lg btn-block float-right " onClick={registerUser} ><i class="fas fa-plus-circle"></i>Make</button>
                                        </div>
                                        <div className="col-md-6">
                                            <button className="btn btn-danger btn-block float-right btn-lg " onClick={cancel} ><i class="fas fa-arrow-circle-left"></i>Cancel</button>
                                        </div>
                                    </div>
                                    {/* <div className="mt-0 col-sm-7 col-form-label-lg">
                                        Already have an account?<Link to="/sign_in" >Login here<i class="fas fa-sign-in-alt"></i></Link>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MakeNewAdmin;
