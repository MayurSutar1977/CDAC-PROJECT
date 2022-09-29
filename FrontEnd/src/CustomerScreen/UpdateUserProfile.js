import { Link } from "react-router-dom";
import UserService from "../Services/UserServices";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navigation/Navbar";
import Sidebar from "../Components/Navigation/Sidebar";

function UpdateUserProfile() {
    const [updateStatus, setUpdateStatus] = useState(false);
    const [userDetail, setUserDetail] = useState({
        firstName: "",
        lastName: "",
        email: "",
        idNumber: "",
        phoneNumber: "",
        dateOfBirth: "",
        profileImage: "",
        message: "",
        /* errors: {
             userName: "",
             password: "",
             email: "",
             confirmPassword: "",
             phoneNumber: "",
             message: "",*/
    })
    const [imageUrl, setImageUrl] = useState("")

    const onChange = (event) => {
        setUpdateStatus(true)
        const { name, value } = event.target;
        setUserDetail((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        })
    }
    const loadUserDetail = () => {
        UserService.getUserProfile(window.localStorage.getItem("user_id"))
            .then(res => {
                res.data.result !== null && setUserDetail(res.data.result)
            });
    }

    const changeImageHandler = (e) => {
        setUpdateStatus(true)
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        UserService.fileUpload(formData).then(res => {
            console.log(res.data.result)
            res.data.result != null && setImageUrl(res.data.result);
        });
    }



    const handleSubmit = (e) => {
        e.preventDefault()

        let saveUser = {
            userId: window.localStorage.getItem("user_id"),
            firstName: userDetail.firstName,
            lastName: userDetail.lastName,
            dateOfBirth: userDetail.dateOfBirth,
            phoneNumber: userDetail.phoneNumber,
            email: userDetail.email,
            idNumber: userDetail.idNumber,
            profileImage: imageUrl,
        };
        UserService.updateProfile(window.localStorage.getItem("user_id"), saveUser).then((res) => {
            res.data.result != null && setUserDetail(res.data.result);
            !res.data.result.imageUrl && window.localStorage.setItem("user_image", res.data.result.imageUrl);
        });

    }
    useEffect(() => {
        loadUserDetail()
    }, [])
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
                            <h2 className="text-center font-weight-bold">Update profile </h2>
                            <hr />
                        </div>
                        <div className="card-body mt-n5 ">
                            <div className="card-body mt-n1 ">
                                <form  >
                                    <div className="text-center">
                                        <img style={{ width: "190px" }}
                                            src={userDetail.profileImage}
                                            alt="profile-img"
                                            className="profile-img-card rounded"
                                        />
                                        <div className="text-center mt-2 ml-5">
                                            <input type="file" placeholder="" onChange={changeImageHandler} />
                                        </div>
                                        {updateStatus && <button className='btn btn-outline-info mt-2' type='submit' onClick={handleSubmit}><i class="fas fa-upload"></i> Upload Image</button>}
                                    </div>
                                    <div className="form-input row mt-4">
                                        <label className="col-sm-3 col-form-label col-form-label-lg ml-3">User Name</label>
                                        <div className="col-sm-7">
                                            <input
                                                className="form-control form-control-lg"
                                                type='username'
                                                name='userName'
                                                placeholder='Enter your email'
                                                value={window.localStorage.getItem('user_name')}
                                                onChange={onChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="form-input row mt-4">
                                        <label className="col-sm-3 col-form-label col-form-label-lg ml-3">First Name</label>
                                        <div className="col-sm-7">
                                            <input
                                                className="form-control form-control-lg"
                                                type='firstName'
                                                name='firstName'
                                                placeholder='Enter your first name'
                                                value={userDetail.firstName}
                                                onChange={onChange}
                                            />
                                            {/* {userDetail.errors.email && <p className="alert alert-danger ">{userDetail.errors.email}</p>} */}
                                        </div>
                                    </div>
                                    <div className="form-input row mt-4">
                                        <label className="col-sm-3 col-form-label col-form-label-lg ml-3">Last Name</label>
                                        <div className="col-sm-7">
                                            <input
                                                className="form-control form-control-lg"
                                                type='lastName'
                                                name='lastName'
                                                placeholder='Enter your last name'
                                                value={userDetail.lastName}
                                                onChange={onChange}
                                            />
                                            {/* {userDetail.errors.email && <p className="alert alert-danger ">{userDetail.errors.email}</p>} */}
                                        </div>
                                    </div>
                                    <div className="form-input row mt-4">
                                        <label className="col-sm-3 col-form-label col-form-label-lg ml-3">Email Id</label>
                                        <div className="col-sm-7">
                                            <input
                                                className="form-control form-control-lg"
                                                type='email'
                                                name='email'
                                                placeholder='Enter your email'
                                                value={userDetail.email}
                                                onChange={onChange}
                                            />
                                            {/* {userDetail.errors.password && <p className="alert alert-danger ">{userDetail.errors.password}</p>} */}
                                        </div>
                                    </div>
                                    <div className="form-input row mt-4">
                                        <label className="col-sm-3 col-form-label col-form-label-lg ml-3">Id Number</label>
                                        <div className="col-sm-7">
                                            <input
                                                className="form-control form-control-lg"
                                                type='text'
                                                name='idNumber'
                                                placeholder='Enter your confirm Password'
                                                value={userDetail.idNumber}
                                                onChange={onChange}
                                            />
                                            {/* {userDetail.errors.confirmPassword && <p className="alert alert-danger  ">{userDetail.errors.confirmPassword}</p>} */}
                                        </div>
                                    </div>
                                    <div className="form-input row mt-4">
                                        <label className="col-sm-3 col-form-label col-form-label-lg ml-3">Phone Number</label>
                                        <div className="col-sm-7">
                                            <input
                                                className="form-control form-control-lg"
                                                type='text'
                                                name='phoneNumber'
                                                placeholder='Enter your phone number'
                                                value={userDetail.phoneNumber}
                                                onChange={onChange}
                                            />
                                            {/* {userDetail.errors.phoneNumber && <p className="alert alert-danger  ">{userDetail.errors.phoneNumber}</p>} */}
                                        </div>
                                    </div>
                                    <div className="form-input row mt-4">
                                        <label className="col-sm-3 col-form-label col-form-label-lg ml-3">Date of Birth</label>
                                        <div className="col-sm-7">
                                            <input
                                                className="form-control form-control-lg"
                                                type='date'
                                                name='dateOfBirth'
                                                placeholder='Enter your date of birth'
                                                value={userDetail.dateOfBirth}
                                                onChange={onChange}
                                            />
                                            {/* {userDetail.errors.phoneNumber && <p className="alert alert-danger  ">{userDetail.errors.phoneNumber}</p>} */}
                                        </div>
                                    </div>
                                    {updateStatus && <button className='btn btn-success ml-3 mt-4' type='submit' onClick={handleSubmit}><i class="fas fa-upload"></i> Update</button>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateUserProfile;