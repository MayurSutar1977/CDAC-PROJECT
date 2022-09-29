import React from 'react'
import "./HomePage.css";
import { Link } from 'react-router-dom'
import AdminIcon from "./Images/admin.jpg"

export default function AdminSidebar() {
    return (
        <div className="cart sidebar mt-1 ">
            <div className="card-body  ">
                <div className="row">
                    <div className="col text-center">
                        <img
                            src={AdminIcon}
                            alt="profile-img"
                            className="rounded-circle"
                            style={{ width: "50%" }}
                        />
                    </div>
                </div>
                <div className="col text-center">
                    <h6>Welcome, {window.localStorage.getItem("user_fname")}</h6>
                </div>
                <br />
                <ul className="navbar-nav ml-auto ">
                    <div className="hori-selector">
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin_home" >
                            <i class="fa fa-home" aria-hidden="true"></i> Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/show-all-category" >
                            <i class="fa fa-list-alt" aria-hidden="true"></i> Categories
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link class="nav-link " to="/equipment-all"  >
                            <i class="fab fa-product-hunt"></i> Equipments
                        </Link>

                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/fatch-all-user" >
                            <i class="fas fa-users"></i> Users
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/bookings" >
                            <i class="fab fa-jedi-order"></i> All Bookings
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/make-new-admin" >
                            <i class="fab fa-jedi-order"></i> Make Admin
                        </Link>
                    </li>
                    <hr />
                    <li className="nav-item">
                        <Link className="nav-link" to="/sign-out" >
                            <i class="fas fa-sign-out-alt"></i> Sign out
                        </Link>
                    </li>

                </ul>
            </div>
        </div>

    )
}
