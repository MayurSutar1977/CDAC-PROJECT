import React, { Link } from "react-router-dom";
import "./Styles/ViewProfile.css";
import { Component } from "react";
import Navbar from "../Components/Navigation/Navbar";
import AllServices from "../Services/AllServices";
import BookingsCard from "./BookingsCard";
import AddressCard from "./AddressCard";
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            idNumber: "",
            phoneNumber: "",
            dateOfBirth: "",
            profileImage: "",
            message: "",
            uploadFile: null,
            bookings: [],
            viewBooking: false,
            address: {
                homeNumber: "",
                society: "",
                area: "",
                city: "",
                state: "",
                pinCode: "",
            }
        };
        this.getUserAddress = this.getUserAddress.bind(this);
    }

    getUserAddress = () => {
        AllServices.getUserAddress(window.localStorage.getItem("user_id")).then((res) => {
            let loadedAddress = res.data.result;
            this.setState({ address: loadedAddress });
        })
    }

    loadRentBookingHistory = () => {
        AllServices.loadRentBookingHistory(JSON.parse(window.localStorage.getItem("user_id"))).then((res) => {
            console.log(JSON.stringify(res.data.result))
            this.setState({ bookings: res.data.result });
        })
    }

    componentDidMount() {
        this.loadRentBookingHistory();
        this.getUserAddress();
        this.setState({
            userId: window.localStorage.getItem("user_id"),
            userName: window.localStorage.getItem("user_name"),
            firstName: window.localStorage.getItem("user_fname"),
            lastName: window.localStorage.getItem("user_lname"),
            dateOfBirth: window.localStorage.getItem("user_dob"),
            phoneNumber: window.localStorage.getItem("user_phone"),
            email: window.localStorage.getItem("user_email"),
            idNumber: window.localStorage.getItem("user_idNum"),
            profileImage: window.localStorage.getItem("user_image"),
        })

    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="main" >
                    <div className="row">
                        <div className="col-md-3 mt-1">
                            <div className="cart sidebar rounded" style={{ backgroundColor: "black" }}>
                                <div className="card-body rounded">
                                    <div className="mt-3">
                                        <img
                                            src={this.state.profileImage}
                                            alt="profile-img"
                                            className="rounded-circle"
                                            style={{ width: "100%" }}
                                        />
                                        <div className="text-center">
                                            <h3 className="text-center">{this.state.userName}</h3>
                                            <h4 className="text-center">Hi, {this.state.firstName}</h4>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="float-left ml-3">
                                        <Link className="nav-link " to="/update-profile"><i class="fas fa-user-edit"></i>Update Profile </Link>
                                        <Link className="nav-link " to="/update-address"><i class="far fa-address-card"></i>Update address </Link>
                                        <Link className="nav-link " to="/update-password"><i class="far fa-address-card"></i>Update Password</Link>
                                        <Link className="nav-link " to="/order-history"><i class="far fa-address-card"></i>Order History</Link>
                                        <hr className="bg-success mr-n5" />
                                        <Link className="nav-link " to="/sign-out"><i class="fas fa-sign-out-alt"></i> Sign Out  </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9 mt-0">
                            <div className="card-mb-3 content mt-1 ml-n2">
                                <div className="card-header">
                                    <h1 className=" text-center">Profile Details</h1>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-3 ">
                                            <h5>First Name </h5>
                                        </div>
                                        <div className="col-md-9 text-secondary">
                                            <h5>{this.state.firstName}</h5>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>Last Name </h5>
                                        </div>
                                        <div className="col-md-9 text-secondary">
                                            <h5>{this.state.lastName}</h5>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>Email Name </h5>
                                        </div>
                                        <div className="col-md-9 text-secondary">
                                            <h5>{this.state.email}</h5>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>Date of Birth </h5>
                                        </div>
                                        <div className="col-md-9 text-secondary">
                                            <h5>{this.state.dateOfBirth}</h5>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>ID Number </h5>
                                        </div>
                                        <div className="col-md-9 text-secondary">
                                            <h5>{this.state.idNumber}</h5>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>Phone Number </h5>
                                        </div>
                                        <div className="col-md-9 text-secondary">
                                            <h5>{this.state.phoneNumber}</h5>
                                        </div>
                                    </div>
                                    <hr />
                                    {
                                        this.state.address && <AddressCard address={this.state.address} />
                                    }
                                </div>
                            </div>
                            <div className="card-mb-3 content">
                                <h2 className="m-3 pt-3">Bookings Details</h2>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>Total No. Bookings </h5>
                                        </div>
                                        <div className="col-md-9 text-secondary">
                                            <h5>{this.state.bookings && this.state.bookings.length}</h5>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="text-center">
                                {!this.state.viewBooking && <button className="btn btn-outline-info btn-lg focus btn-block" onClick={(e) => { this.setState({ viewBooking: !this.state.viewBooking }) }}> {" "}<i class="fas fa-chevron-down"></i></button>}
                                {this.state.viewBooking && <button className="btn btn-outline-info btn-lg focus btn-block" onClick={(e) => { this.setState({ viewBooking: !this.state.viewBooking }) }}> {" "}<i class="fas fa-chevron-up"></i></button>}
                            </div>
                        </div>
                    </div>
                    {this.state.bookings.length > 0 && this.state.viewBooking &&
                        <BookingsCard bookings={this.state.bookings} viewBooking={this.state.viewBooking} />}
                </div>
            </div>
        );
    }
}
export default UserProfile;