import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../Services/UserServices";
import CameraImage from "./Images/Camera_Image.jpg"
import Navbar from "../Components/Navigation/Navbar";
import Sidebar from "../Components/Navigation/Sidebar";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            idNumber: "",
            phoneNumber: "",
            dateOfBirth: "",
            profileImage: "",
            message: "",
            uploadFile: null,
        };
        this.registerUser = this.registerUser.bind(this);
        this.changeImageHandler = this.changeImageHandler.bind(this);
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    changeImageHandler = (event) => {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        UserService.fileUpload(formData).then(res => {
            res.data.result != null && this.setState({ profileImage: res.data.result });
            console.log(res.data.result);
        });
    }
    /*
    userProfilePicture() {
            const formData = new FormData();
            formData.append('file', this.state.uploadFile);
            UserService.fileUpload(formData).then(res => {
                res.data.result != null && this.setState({ profileImage: res.data.result });
                console.log(res.data.result);
                return res.data.result;
            });
        }
    */
    registerUser = (e) => {
        e.preventDefault()
        //this.userProfilePicture();
        let saveUser = {
            userId: window.localStorage.getItem("user_id"),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            idNumber: this.state.idNumber,
            profileImage: this.state.profileImage,
        };
        UserService.userProfile(saveUser).then((res) => {
            res.data.result != null && alert("SignUp successfully");
            let user = res.data.result;
            user != null && this.props.history.push('/user_profile');
            user === null && this.setState({ message: 'Invalid Login Credentials', userName: "", password: "" });
            user !== null && this.setState({
                // id : user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                phoneNumber: user.phoneNumber,
                profileImage: user.profileImage,
                idNumber: user.idNumber,
                message: '',
            });
            user != null && window.localStorage.setItem("user_fname", user.firstName);
            user != null && window.localStorage.setItem("user_lname", user.lastName);
            user != null && window.localStorage.setItem("user_email", user.email);
            user != null && window.localStorage.setItem("user_dob", user.dateOfBirth);
            user != null && window.localStorage.setItem("user_phone", user.phoneNumber);
            user != null && window.localStorage.setItem("user_image", user.profileImage);
            user != null && window.localStorage.setItem("user_idNum", user.idNumber);
            if (res.data.result === null) {
                alert(res.data.message);
                this.setState({
                    firstName: "", lastName: "", dateOfBirth: "", phoneNumber: "", email: "", profileImage: "", idNumber: "",
                });
                this.props.history.push("/user_profile");
            }
            else {
                this.props.history.push("/sign_in");
            }
        })
    };
    cancel() {
        this.props.history.push('/home')
    }


    render() {
        return (
            <div>
                <Navbar />
                <div className="row ml-2 mt-2 mb-2 mr-2 ">
                    <div className="col col-md-3 mt-1  ">
                        <Sidebar />
                    </div>
                    <div className="col card img-rounded mt-1">
                        <div className="row" >
                            <div className="col-md-4" style={{ marginLeft: "-14px", marginRight: "-14px" }}>
                                <div className="cart text-center rounded sidebar " >
                                    <div className="card-body">
                                        <div className="mt-3">
                                            <img
                                                src={CameraImage}
                                                alt="profile-img"
                                                className="rounded-circle"
                                                style={{ width: "100%" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card col rounded content" >
                                <div className="card-header">
                                    <h2 className="text-center" >User Profile</h2>
                                </div>
                                <div className="card-body">
                                    <img style={{ width: "190px" }}
                                        src={window.localStorage.getItem("user_image")}
                                        alt={this.state.profileImage}
                                        className="profile-img-card"
                                    />
                                    <div className="form">
                                        <div className="row mb-3">
                                            <label className="col-sm-4 col-form-label col-form-label-lg">Choose images</label>
                                            <div className="col-sm-8">
                                                <input className="form-control-lg" type="file" onChange={this.changeImageHandler} />
                                            </div>
                                        </div>
                                        <div class="row mb-4" >
                                            <label className="col-sm-3 col-form-label col-form-label-lg">First Name</label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    name="firstName"
                                                    value={this.state.firstName}
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <label className="col-sm-3 col-form-label col-form-label-lg">Last Name</label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    name="lastName"
                                                    value={this.state.lastName}
                                                    onChange={this.onChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <label className="col-sm-3 col-form-label col-form-label-lg">Date Of Birth</label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="date"
                                                    className="form-control form-control-lg"
                                                    name="dateOfBirth"
                                                    value={this.state.dateOfBirth}
                                                    onChange={this.onChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <label className="col-sm-3 col-form-label col-form-label-lg">Phone Number</label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    name="phoneNumber"
                                                    value={this.state.phoneNumber}
                                                    onChange={this.onChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <label className="col-sm-3 col-form-label col-form-label-lg">Email</label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="email"
                                                    className="form-control form-control-lg"
                                                    name="email"
                                                    value={this.state.email}
                                                    onChange={this.onChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <label className="col-sm-3 col-form-label col-form-label-lg">Id Number</label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    name="idNumber"
                                                    value={this.state.idNumber}
                                                    onChange={this.onChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="card-footer mb-3">
                                            <div className="float-end mt-2">
                                                <button className="btn btn-outline-success btn-block btn-lg" onClick={this.registerUser}>Continue <i class="fas fa-arrow-circle-right"></i></button>
                                            </div>
                                            <div className="float-end mt-2">
                                                <button className="btn btn-outline-danger btn-block btn-lg" onClick={this.cancel.bind(this)}><i class="fas fa-arrow-circle-left"></i>Cancel</button>
                                            </div>
                                            <div className="float-end mt-2">
                                                Already have an account? <Link to="/login">Login here </Link>
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
}
export default UserProfile;


