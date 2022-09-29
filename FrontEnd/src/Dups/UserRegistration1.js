import "../CustomerScreen/Styles/ViewProfile.css";
import CameraImage from "../CustomerScreen/Images/Camera_Image.jpg"
import SignUp from "../CustomerScreen/Images/SignUp.png";
import { Link } from "react-router-dom";
import UserService from "../Services/UserServices";
import React, { Component } from "react";
import Sidebar from "../Components/Navigation/Sidebar";
import Navbar from "../Components/Navigation/Navbar";


class UserRegistration1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            confirmPassword: "",
            message: "",
        };
        this.registerUser = this.registerUser.bind(this);
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    registerUser = (e) => {
        e.preventDefault();

        let user = {
            userName: this.state.userName,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        };
        UserService.registerNewUser(user).then((res) => {
            res.data.result != null && alert("SignUp successfully");
            if (res.data.result === null) {
                alert(" Sign up failed..............." + res.data.message);
                this.setState({
                    firstName: "", lastName: "", dateOfBirth: "", phoneNumber: "", email: "", password: "",
                    confirmPassword: ""
                });
                this.props.history.push("/create-account");
            } else {
                alert(res.data.message);
                this.props.history.push("/user_profile");
            }
        })
    };


    cancel() {
        this.props.history.push('/')
    }


    render() {
        return (
            <div >
                <div className="main" ></div>
                <Navbar />
        <div className="row ml-2 mt-2 mb-2 mr-2 ">
          <div className="col col-md-3 mt-1  ">
            <Sidebar />
          </div>
          <div className="col mt-0 ">
                    <div className="row">
                        <div className="col-md-4 mt-1 ">
                            <div className="cart text-center rounded sidebar ">
                                <div className="card-body bg ">
                                    <div className="mt-3">
                                        <img
                                            src={CameraImage}
                                            alt="profile-img"
                                            className="rounded-circle"
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                    <div className="mt-3">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 mt-0">
                            <div className="card-mb-3 rounded content">
                                <br/>
                                <h2 className="text-center " >Register New </h2>
                                <div className="card-body ">
                                    <div className="mt-3 text-center">
                                        <img
                                            src={SignUp}
                                            alt="profile-img"
                                            className="  "
                                            style={{ width: "20%" }}
                                        />
                                    </div>
                                    <br />
                                    <div className="form">
                                        <div class="row mb-4" >
                                            <label className="col-sm-3 col-form-label "><i class="fas fa-user-check"></i>User Name</label>
                                            <div className="col-sm-7">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="userName"
                                                    value={this.state.userName}
                                                    onChange={this.onChange}
                                                    required=""
                                                />

                                            </div>
                                        </div>

                                        <div class="row mb-4">
                                            <label className="col-sm-3 col-form-label "><i class="fas fa-key"></i> Password</label>
                                            <div className="col-sm-7">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    placeholder={() => { return <i class="fas fa-key"></i> }}
                                                    value={this.state.password}
                                                    onChange={this.onChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div class="row mb-4">
                                            <label className="col-sm-3 col-form-label "><i class="fas fa-key"></i> Confirm Password</label>
                                            <div className="col-sm-7">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="confirmPassword"
                                                    value={this.state.confirmPassword}
                                                    onChange={this.onChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <button className="btn btn-success float-start" onClick={this.registerUser} >
                                                <i class="fas fa-plus-circle"></i>Sign up</button>
                                            <button className=" btn-danger btn" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px", backgroundColor: "Tomato" }}><i class="fas fa-backward"></i>Cancel</button>
                                            <div className="float-end">
                                                Existing User? <Link to="/sign_in"> <i class="fas fa-sign-in-alt"></i>Login here </Link>
                                            </div>
                                            <br></br>


                                        </div>
                                    </div>   </div>
                            </div>
                        </div>   </div>
                </div>
            </div>
</div>
        );
    }
}
export default UserRegistration1;





/*
import "../App.css";
import { Link } from "react-router-dom";
import UserService from "../Services/UserServices";
import React, { Component } from "react";

class UserRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            confirmPassword: "",
            message: "",
        };
        this.registerUser = this.registerUser.bind(this);
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    registerUser = (e) => {
        e.preventDefault();

        let user = {
            userName: this.state.userName,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        };
        UserService.registerNewUser(user).then((res) => {
            res.data.result != null && alert("SignUp successfully");
            if (res.data.result === null) {
                alert(" Sign up failed..............." + res.data.message);
                this.setState({
                    firstName: "", lastName: "", dateOfBirth: "", phoneNumber: "", email: "", password: "",
                    confirmPassword: ""
                });
                this.props.history.push("/create-account");
            } else {
                alert(res.data.message);
                this.props.history.push("/user_profile");
            }
        })
    };


    cancel() {
        this.props.history.push('/')
    }


    render() {
        return (
            <div>
            <br/>
            <br/>
            <br/>





                <div className="card img-rounded col-md-4 offset-md-4 offset-md-4" style={{ backgroundColor: 'OldLace' }} >
                    <h2 className="text-center" style={{ color: "chocolate" }}>Register New </h2>
                    <div className="card-body ">
                        <img style={{ width: "190px" }}

                            alt="profile-img"
                            className="profile-img-card"
                        />
                        <br />
                        <div className="form">
                            <div class="row mb-4" >
                                <label className="col-sm-3 col-form-label ">User Name</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="userName"
                                        value={this.state.userName}
                                        onChange={this.onChange}
                                        required=""
                                    />

                                </div>
                            </div>

                            <div class="row mb-4">
                                <label className="col-sm-3 col-form-label">Password</label>
                                <div className="col-sm-8">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div class="row mb-4">
                                <label className="col-sm-3 col-form-label">Confirm Password</label>
                                <div className="col-sm-8">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-success float-start" onClick={this.registerUser} >
                                    Register
                     </button>
                                <button className=" btn-danger btn" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px", backgroundColor: "Tomato" }}>Cancel</button>
                                <div className="float-end">
                                    Existing User? <Link to="/sign_in">Login here </Link>
                                </div>
                                <br></br>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default UserRegistration;*/