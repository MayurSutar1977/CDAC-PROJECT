
import React, { Component } from 'react'
import SigninIcon from "./Images/SignIn.png"
import { Link } from 'react-router-dom';
import CameraImage from "../CustomerScreen/Images/Camera_Image.jpg"
//import CameraImage from "./Images/Camera_Image.jpg"
import AuthService from "../Services/AuthService";
import UserService from "../Services/UserServices";
import AllServices from '../Services/AllServices';
import Navbar from '../Components/Navigation/Navbar';
import Sidebar from '../Components/Navigation/Sidebar';
class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      profileImage: '',
      dateOfBirth: '',
      userRole: '',
      error: false,
      message: '',
      errors: {
        userName: "",
        password: "",
      },
    }
    this.authenticateUser = this.authenticateUser.bind(this);
    this.getCartSize = this.getCartSize.bind(this);
    this.updateUserCart = this.updateUserCart.bind(this);
  }
  validateInfo(values) {
    let errors = {};

    if (!values.userName) {
      errors.userName = 'Username required';
      this.setState({ error: true });
    }
    else if (!/^[A-Za-z]+/.test(values.userName.trim())) {
      errors.name = 'Enter a valid user name';
      this.setState({ error: true });
    }
    if (!values.password) {
      errors.password = 'Password is required';
      this.setState({ error: true });
    } else if (values.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
      this.setState({ error: true });
    }
    this.setState({ errors: errors })
    return errors;
  }

  handleReset(e) {
    alert("forgot password");
  }
  onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });

  getCartSize() {
    setTimeout(() => {
      AllServices.getCartByUserId(window.localStorage.getItem("user_id"))
        .then((res) => {
          console.log(res.data.result)
          JSON.stringify(window.localStorage.setItem("cart_size", res.data.result.length));
        });
    }, 1000);
  }
  updateUserCart() {
    let cartUserId = JSON.parse(window.localStorage.getItem("user_id"));
    let cartSize = JSON.parse(window.localStorage.getItem("cart_size"));
    if (cartSize > 0) {
      AllServices.updateCartUserId(cartUserId);
    }
    this.getCartSize();
  }

  loadProfile(userId) {
    UserService.getUserProfile(userId)
      .then(res => {
        let user = res.data.result;
        user === null && this.props.history.push('/user_profile');
        //user === null && this.setState({ message: 'Invalid Login Credentials', userName: "", password: "" }) ;
        user != null && window.localStorage.setItem("user_fname", user.firstName);
        user != null && window.localStorage.setItem("user_lname", user.lastName);
        user != null && window.localStorage.setItem("user_email", user.email);
        user != null && window.localStorage.setItem("user_dob", user.dateOfBirth);
        user != null && window.localStorage.setItem("user_phone", user.phoneNumber);
        user != null && window.localStorage.setItem("user_image", user.profileImage);
        user != null && window.localStorage.setItem("user_idNum", user.idNumber);

      });
  }
  authenticateUser = (e) => {
    e.preventDefault();
    let loginRequest = { userName: this.state.userName, password: this.state.password };
    this.validateInfo(loginRequest);

    AuthService.authenticateUser(loginRequest)
      .then(res => {
        let user = res.data.result;
        console.log(user);
        user === null && this.setState({ message: 'Invalid Login credentials', userName: "", password: "" });
        user !== null && this.setState({
          id: user.id,
          userName: user.userName,
          userRole: user.userRole,
          message: '',
        });
        user != null && alert("User Login successfully")
        user != null && this.setState({ message: 'User Login successfully.' });
        user != null && window.localStorage.setItem("status", true);
        user != null && window.localStorage.setItem("user_id", user.id);
        user != null && window.localStorage.setItem("user_name", user.userName);
        user != null && window.localStorage.setItem("user_role", user.userRole);
        user != null && this.loadProfile(user.id);
        (user !== null && user.userRole === "ADMIN") && this.props.history.push('/admin-home');
        (user !== null && user.userRole === "CUSTOMER") && this.updateUserCart();
        (user !== null && user.userRole === "CUSTOMER") && this.props.history.push('/home');
      });

  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="row ml-2 mt-2 mb-2 mr-2 ">
          <div className="col col-md-3 mt-1  ">
            <Sidebar />
          </div>
          <div className="col mt-0" >
            <div className="row">
              <div className="col-md-3 mt-1" style={{ marginLeft: "140px", marginRight: "-30px" }}>
                <div className="cart text-center rounded sidebar ">
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
              <div className="col-md-5 mt-1">
                <div className="card rounded " >
                  <div className="card-header">
                    <h2 className="text-center">Sign-In</h2>
                  </div>
                  <div className="text-center">
                    <img style={{ width: "140px" }} src={SigninIcon} alt="profile-img" className="profile-img-card" />
                  </div>
                  <h6 className="text-danger text-center">{this.state.message}</h6>
                  <div class="row ml-5 mt-4 ">
                    <label className="col-sm-9 col-form-label col-form-label-lg"><i class="fas fa-user-check"></i>User Name</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control form-control-lg" name="userName" value={this.state.userName}
                        onChange={this.onChange}
                        required
                      />
                      {this.state.errors.userName && <p className="alert alert-danger  ">{this.state.errors.userName}</p>}
                    </div>
                  </div>
                  <div class="row mb-3 mt-4 ml-5 ">
                    <label className="col-sm-9 col-form-label col-form-label-lg"><i class="fas fa-key"></i> Password</label>
                    <div className="col-sm-9">
                      <input type="password"
                        className="form-control form-control-lg"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        required />
                      {this.state.errors.password && <p className="alert alert-danger  ">{this.state.errors.password}</p>}
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="ml-4 mr-4">
                      <button className="btn btn-outline-success btn-lg btn-block" onClick={this.authenticateUser}>
                        Login <i class="fas fa-arrow-circle-right"></i>  </button>

                      <div className="row" >
                        Click here to
                        <Link className="nav-item" to={() => this.handleReset} > <i class="fas fa-hammer ml-1"></i>Forgot Password</Link>
                      </div>
                      <div className="row ">
                        New User? <Link to="/sign_up"> <i class="fas fa-user-plus ml-1 "></i>Create Account here</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
export default LoginPage

