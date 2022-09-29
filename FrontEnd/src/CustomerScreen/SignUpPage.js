import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navigation/Navbar';
import Sidebar from '../Components/Navigation/Sidebar';
//import validate from './validateInfo';
//import useForm from './useForm';
//import './Form.css';
class FormSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            email: "",
            confirmPassword: "",
            phoneNumber: "",
            message: "",
            error: false,
            errors: {
                userName: "",
                password: "",
                email: "",
                confirmPassword: "",
                phoneNumber: "",
                message: ""
            },
        };
    }
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    validateInfo(values) {
        let errors = {};

        if (!values.userName) {
            errors.userName = 'Username required';
            this.setState({ error: true });
        }
        else if (!/^[A-Za-z]+/.test(values.userName.trim())) {
            errors.name = 'Enter a valid name';
            this.setState({ error: true });
        }

        if (!values.email) {
            errors.email = 'Email required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
            this.setState({ error: true });
        }

        if (!values.password) {
            errors.password = 'Password is required';
            this.setState({ error: true });
        } else if (values.password.length < 6) {
            errors.password = 'Password needs to be 6 characters or more';
            this.setState({ error: true });
        }

        if (!values.confirmPassword) {
            this.setState({ error: true });
            errors.confirmPassword = 'Password is required';
        } else if (values.confirmPassword !== values.password) {
            this.setState({ error: true });
            errors.confirmPassword = 'Passwords do not match';
        }

        if (values.phoneNumber.length !== 10) {
            this.setState({ error: true });
            errors.phoneNumber = 'Phone number needs to be 10 digits !';
        }
        else if (!values.phoneNumber.match('[0-9]{10}')) {
            this.setState({ error: true });
            errors.phoneNumber = 'Passwords do not match';
        }

        this.setState({ errors: errors })
        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let user = {
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            phoneNumber: this.state.phoneNumber,
        };
        this.validateInfo(user);
        if (this.state.error) {
            console.log(user);
            alert("Ok")
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="row ml-2 mt-2 mb-2 mr-2 ">
                    <div className="col col-md-3 mt-1  ">
                        <Sidebar />
                    </div>
                    <div className="col mt-0">
                        <div className="card-mb-3 mt-0 content">
                            <div style={{ backgroundColor: "lightgrey" }}>
                                <br />
                                <h2 className="text-center font-weight-bold">Sign Up </h2>
                                <hr />
                            </div>
                            <div className="card-body mt-n5 ">
                                <div className="card-body mt-n1 ">
                                    <form  >
                                        <div className="form-input row mt-4">
                                            <label className="col-sm-3 col-form-label ml-3 ">User Name</label>
                                            <div className="col-sm-7">
                                                <input
                                                    className="form-control"
                                                    type='username'
                                                    name='userName'
                                                    placeholder='Enter your email'
                                                    value={this.state.userName}
                                                    onChange={this.onChange}
                                                />
                                                {this.state.errors.userName && <p className="alert alert-danger  ">{this.state.errors.userName}</p>}
                                            </div>
                                        </div>
                                        <div className="form-input row mt-4">
                                            <label className="col-sm-3 col-form-label ml-3 ">Email</label>
                                            <div className="col-sm-7">
                                                <input
                                                    className="form-control"
                                                    type='email'
                                                    name='email'
                                                    placeholder='Enter your email'
                                                    value={this.state.email}
                                                    onChange={this.onChange}
                                                />
                                                {this.state.errors.email && <p className="alert alert-danger ">{this.state.errors.email}</p>}
                                            </div>
                                        </div>
                                        <div className="form-input row mt-4">
                                            <label className="col-sm-3 col-form-label ml-3 ">password</label>
                                            <div className="col-sm-7">
                                                <input
                                                    className="form-control"
                                                    type='password'
                                                    name='password'
                                                    placeholder='Enter your password'
                                                    value={this.state.password}
                                                    onChange={this.onChange}
                                                />
                                                {this.state.errors.password && <p className="alert alert-danger ">{this.state.errors.password}</p>}
                                            </div>
                                        </div>
                                        <div className="form-input row mt-4">
                                            <label className="col-sm-3 col-form-label ml-3 ">Confirm Password</label>
                                            <div className="col-sm-7">
                                                <input
                                                    className="form-control"
                                                    type='password'
                                                    name='confirmPassword'
                                                    placeholder='Enter your confirm Password'
                                                    value={this.state.confirmPassword}
                                                    onChange={this.onChange}
                                                />
                                                {this.state.errors.confirmPassword && <p className="alert alert-danger  ">{this.state.errors.confirmPassword}</p>}
                                            </div>
                                        </div>
                                        <div className="form-input row mt-4">
                                            <label className="col-sm-3 col-form-label ml-3 ">Phone Number</label>
                                            <div className="col-sm-7">
                                                <input
                                                    className="form-control"
                                                    type='number'
                                                    name='phoneNumber'
                                                    placeholder='Enter your phone number'
                                                    value={this.state.phoneNumber}
                                                    onChange={this.onChange}
                                                />
                                                {this.state.errors.phoneNumber && <p className="alert alert-danger  ">{this.state.errors.phoneNumber}</p>}
                                            </div>
                                        </div>
                                        <button className='btn btn-info' type='submit' onClick={this.handleSubmit}>Sign up</button>
                                        <span className='lg-col-1'>
                                            Already have an account? Login <Link to='/sign_in'>here</Link>
                                        </span>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default FormSignup;