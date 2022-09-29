import React, { useState, useEffect } from "react";


export default function SigninUsingHook() {
    const [loginRequest, setLoginRequest] = useState({
        userName: "",
        password: "",
    })
    const onChange = (event) => {
        const { name, value } = event.target;
        setLoginRequest((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        })
    }
    const onSubmit = e => {
        e.preventDefault();
        console.log(JSON.stringify(loginRequest) + "😄 👍");
        alert(JSON.stringify(loginRequest) + "😄 👍");
    }
    return (
        <div>
            <br />
            <br />
            <br />
            <div className="card img-rounded col-md-4 offset-md-4 offset-md-4 " style={{ borderRadius: "25px", backgroundColor: "OldLace" }}>
                <h2 className="text-center card-title"> <b>Sign In </b></h2>
                <br />
                <img style={{ width: "190px" }}
                    // src={SigninIcon}
                    alt="profile-img"
                    className="profile-img-card"
                />
                <br />
                {/*<h5 className="nameColor1 text-center">{this.state.message}</h5>*/}
                <div class="row mb-3">
                    <label className="col-sm-4 col-form-label">User Name</label>
                    <div className="col-sm-8">
                        <input type="text"
                            className="form-control"
                            name="userName"
                            value={loginRequest.userName}
                            onChange={onChange}
                            required
                        />
                    </div>
                </div>
                <div class="row mb-3">
                    <label className="col-sm-4 col-form-label">Password</label>
                    <div className="col-sm-8">
                        <input type="password"
                            className="form-control"
                            name="password"
                            value={loginRequest.password}
                            onChange={onChange}
                            required />
                    </div>
                </div>
                <div className="mb-3">
                    <button className="btn btn-success float-start" onClick={onSubmit}>
                        Login
             </button>{/*}
            <div className="float-end" style={{ marginLeft: "10px" }}>
              Click here to <button className="btn btn-primary-outline" onClick={this.handleReset} >
           
              Forgot Password</button>
            </div>
            <div className="float-end">
              New User? <Link to="/create-account">Create Account here</Link>
            </div>*/}
                </div>
            </div>
            <br />
            <br />
            <br />
        </div>
    )
}
