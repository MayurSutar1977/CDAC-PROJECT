
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
    this.props.history.push("/forgot-password");
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
        if (user != null || user != 'null' || user) {
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
          user != null && user.userName && window.localStorage.setItem("user_name", user.userName);
          user != null && user.userRole && window.localStorage.setItem("user_role", user.userRole);
          if (user != null && user.userRole === "ADMIN") { this.props.history.push('/admin_home'); }
          else {
            (user !== null && user.userRole === "CUSTOMER") && this.loadProfile(user.id);
            // (user !== null && user.userRole === "ADMIN") && this.props.history.push('/admin-home');
            (user !== null && user.userRole === "CUSTOMER") && this.updateUserCart();
            (user !== null && user.userRole === "CUSTOMER") && this.props.history.push('/home');
          }
        }
        else {
          this.setState({ message: 'Invalid Login credentials', userName: "", password: "" });
        }
      });

  }
  render() {
    return (
      <div style={{ backgroundColor: "lightgoldenrodyellow" }}>
        <Navbar />
        <div className="row ml-2 mt-2 mb-2 mr-2 ">
          <div className="col col-md-3 mt-1  ">
            <Sidebar />
          </div>
          <div className="col-md-9 mt-0">
            <div className="row offset-md-2 offset-md-2 ">
              <div className="col-md-4  mt-1 " style={{ marginRight: "-30px" }}>
                <div className="cart text-center rounded sidebar">
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
                <div className="card rounded border-secondary">
                  <div className="card-header" >
                    <h3 className="text-center font-weight-bold">Sign In</h3>
                  </div>
                  <div className="card-body" >
                    <form className="ml-3 mr-4 mb-4">
                      <div className="text-center">
                        <img style={{ width: "140px" }} src={SigninIcon} alt="profile-img" className="profile-img-card" />
                      </div>
                      <h6 className="text-danger text-center">{this.state.message}</h6>
                      <div class="mt-2">
                        <label class="sr-only" >User Name</label>
                        <div class="col input-group">
                          <div class="input-group-prepend">
                            <div class="input-group-text"><i class="far fa-user"></i></div>
                          </div>
                          <input type="text" className="form-control form-control-lg" name="userName" placeholder="User Name" value={this.state.userName}
                            onChange={this.onChange}
                          />
                        </div>
                        {/* <label className="col col-form-label col-form-label-lg"><i class="fas fa-user-check"></i>User Name</label>
                      <div className="col">
                        <input type="text" className="form-control form-control-lg" name="userName" value={this.state.userName}
                          onChange={this.onChange}
                          required
                        /> */}
                        {this.state.errors.userName && <p className="alert alert-danger  ">{this.state.errors.userName}</p>}
                        {/* </div> */}
                      </div>
                      <div class="mt-3">
                        <label class="sr-only">Password</label>
                        <div class="col input-group">
                          <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fas fa-key"></i></div>
                          </div>
                          <input type="password" className="form-control form-control-lg" name="password" placeholder="Password" value={this.state.password}
                            onChange={this.onChange}
                          />
                        </div>
                        {this.state.errors.password && <p className="alert alert-danger  ">{this.state.errors.password}</p>}                                    </div>
                      {/* <div class="mt-2">
                    <label className="col col-form-label col-form-label-lg"><i class="fas fa-key"></i> Password</label>
                    <div className="col">
                      <input type="password"
                        className="form-control form-control-lg"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        required />
                      {this.state.errors.password && <p className="alert alert-danger  ">{this.state.errors.password}</p>}
                    </div>
                  </div> */}


                    </form>
                  </div>
                  <div className="card-footer">
                    <div className="ml-3 mr-4 mt-2">
                      <button className="btn btn-outline-success btn-lg btn-block" onClick={this.authenticateUser}>
                        Login <i class="fas fa-arrow-circle-right"></i>  </button>
                      <div className="row ml-1 h5 mt-3" >
                        Click here to
                        <Link className="nav-item " onClick={() => this.handleReset()} > <i class="fas fa-hammer ml-1"></i>Forgot Password</Link>
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
}
export default LoginPage

