
import React, { useEffect, useState } from 'react';
import icon from "./profile.png"
import Icon from "./Icon.png"
import { Link } from 'react-router-dom';
import './Navbar.css';
import $ from 'jquery';
import Navbar1 from './Navbar1';
import Marquee from "react-fast-marquee";
const Navbar = () => {

    const [st, setSt] = useState(window.localStorage.getItem("status"));
    const setStatus = () => {
        setSt(JSON.parse(window.localStorage.getItem("status")));
        console.log(st);
    }

    function animation() {
        var tabsNewAnim = $('#navbarSupportedContent');
        var activeItemNewAnim = tabsNewAnim.find('.active');
        var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
        var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
        var itemPosNewAnimTop = activeItemNewAnim.position();
        var itemPosNewAnimLeft = activeItemNewAnim.position();
        $(".hori-selector").css({
            "top": itemPosNewAnimTop.top + "px",
            "left": itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
        });
        $("#navbarSupportedContent").on("click", "li", function (e) {
            $('#navbarSupportedContent ul li').removeClass("active");
            $(this).addClass('active');
            var activeWidthNewAnimHeight = $(this).innerHeight();
            var activeWidthNewAnimWidth = $(this).innerWidth();
            var itemPosNewAnimTop = $(this).position();
            var itemPosNewAnimLeft = $(this).position();
            $(".hori-selector").css({
                "top": itemPosNewAnimTop.top + "px",
                "left": itemPosNewAnimLeft.left + "px",
                "height": activeWidthNewAnimHeight + "px",
                "width": activeWidthNewAnimWidth + "px"
            });
        });
    }

    useEffect(() => {
        setStatus();
        animation();
        $(window).on('resize', function () {
            setTimeout(function () { animation(); }, 500);
        });

    }, []);
    return (
        <div>
            <div>
                <Navbar1 />
            </div>
            <nav className="navbar navbar-expand-lg navbar-mainbg ">
                <Link className="nav-link navbar-brand navbar-logo" to="/home">
                    <img src={Icon} style={{ width: "50px", marginLeft: "20px", backgroundColor: "white" }}></img>
                </Link>
                <button
                    className="navbar-toggler"
                    onClick={function () {
                        setTimeout(function () { animation(); });
                    }}
                    type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars text-white"></i>
                </button>
                <div
                    className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">

                        <div className="hori-selector">
                            <div className="left"></div>
                            <div className="right"></div>
                        </div>

                        {/*st !== true && (
                        <li class="nav-item dropdown">
                            <h5>
                                <a style={{ color: "white" }}
                                    class="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    My Account
                                        </a>
                                <ul style={{ color: "white" }}
                                    class="dropdown-menu"
                                    aria-labelledby="navbarDropdown">
                                    <li>
                                        <a class="dropdown-link" href="/myaccount/profile">Profile</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-link" href="/myaccount/editprofile">Edit Profile</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-link" href="/myaccount/change-password" > Update Password </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-link" href="/myaccount/changeaddress" >Change Address</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-link" href="/myaccount/orderhistory"> Order History</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-link" href="/logout"> Sign Out </a>
                                    </li>
                                </ul>
                            </h5>
                        </li>
                    )*/}

                        <li className="nav-item active">
                            <Link className="nav-link" to="/" exact>
                                <i className="fas fa-tachometer-alt"></i>Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/about_us" exact>
                                <i class="fas fa-address-book"></i>About
                             </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/all-equpment-to-sold" exact>
                                <i class="fab fa-product-hunt"></i>Equipments
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact_us" exact>
                                <i className="far fa-copy"></i>Contact Us
                            </Link>
                        </li>
                        {/*window.localStorage.getItem("status") === true &&*/}
                        <li className="nav-item">
                            <Link className="nav-link" to="/rent-line" >
                                <i class="fas fa-cart-plus"></i>Rent
                            </Link>
                        </li>

                        {st !== true &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/sign_in" >
                                    <i class="fas fa-sign-in-alt"></i>Sign in
                                </Link>
                            </li>
                        }
                        {st !== true &&
                            <li className="nav-item ">
                                <Link className="nav-link" to="/sign_up" >
                                    <i class="fas fa-user-plus"></i>Sign Up
                                </Link>
                            </li>
                        }
                        {st === true &&
                            <li className="nav-item" >
                                <Link className="nav-link" to="/sign-out" exact>
                                    <i class="fas fa-sign-out-alt"></i>Sign out
                            </Link>
                            </li>
                        }
                        {st === true &&
                            <li className="nav-item " >
                                <Link className="nav-link" to="/view_profile" >
                                    <i class="fas fa-id-card"></i><img src={icon} style={{ width: "35px" }}></img>
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav >
            <div className="d-flex flex-row flex-grow-0 flex-fill justify-content-center bg-primary py-2 text-white px-0 news">
                <Marquee className="news-scroll" style={{ direction: "left", scrollamount: "30" }}><h3>Welome to Rental System For Photography Accessories </h3></Marquee>
            </div>
        </div>
    );
}

export default Navbar;



/*

import React, { useEffect, useState } from 'react';
import icon from "./profile.png"
import Icon from "./Icon.png"
import { Link } from 'react-router-dom';
import './Navbar.css';
import $ from 'jquery';
import Navbar1 from './Navbar1';
import Marquee from "react-fast-marquee";
const Navbar = () => {

    const [st, setSt] = useState(window.localStorage.getItem("status"));
    const setStatus = () => {
        setSt(JSON.parse(window.localStorage.getItem("status")));
        console.log(st);
    }

    function animation() {
        var tabsNewAnim = $('#navbarSupportedContent');
        var activeItemNewAnim = tabsNewAnim.find('.active');
        var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
        var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
        var itemPosNewAnimTop = activeItemNewAnim.position();
        var itemPosNewAnimLeft = activeItemNewAnim.position();
        $(".hori-selector").css({
            "top": itemPosNewAnimTop.top + "px",
            "left": itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
        });
        $("#navbarSupportedContent").on("click", "li", function (e) {
            $('#navbarSupportedContent ul li').removeClass("active");
            $(this).addClass('active');
            var activeWidthNewAnimHeight = $(this).innerHeight();
            var activeWidthNewAnimWidth = $(this).innerWidth();
            var itemPosNewAnimTop = $(this).position();
            var itemPosNewAnimLeft = $(this).position();
            $(".hori-selector").css({
                "top": itemPosNewAnimTop.top + "px",
                "left": itemPosNewAnimLeft.left + "px",
                "height": activeWidthNewAnimHeight + "px",
                "width": activeWidthNewAnimWidth + "px"
            });
        });
    }

    useEffect(() => {
        setStatus();
        animation();
        $(window).on('resize', function () {
            setTimeout(function () { animation(); }, 500);
        });

    }, []);
    return (
        <div>
            <div>
                <Navbar1 />
            </div>
            <nav className="navbar navbar-expand-lg navbar-mainbg ">
                <Link className="nav-link navbar-brand navbar-logo" to="/home">
                    <img src={Icon} style={{ width: "50px", marginLeft: "20px", backgroundColor: "white" }}></img>
                </Link>
                <button
                    className="navbar-toggler"
                    onClick={function () {
                        setTimeout(function () { animation(); });
                    }}
                    type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars text-white"></i>
                </button>
                <div
                    className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">

                        <div className="hori-selector">
                            <div className="left"></div>
                            <div className="right"></div>
                        </div>

                       

                    <li className="nav-item active">
                    <Link className="nav-link" to="/" exact>
                        <i className="fas fa-tachometer-alt"></i>Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/about_us" exact>
                        <i class="fas fa-address-book"></i>About
                     </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/all-equpment-to-sold" exact>
                        <i class="fab fa-product-hunt"></i>Equipments
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/contact_us" exact>
                        <i className="far fa-copy"></i>Contact Us
                    </Link>
                </li>
                window.localStorage.getItem("status") === true &&
                <li className="nav-item">
                    <Link className="nav-link" to="/rent-line" >
                        <i class="fas fa-cart-plus"></i>Rent
                    </Link>
                </li>

                {st !== true &&
                    <li className="nav-item">
                        <Link className="nav-link" to="/sign_in" >
                            <i class="fas fa-sign-in-alt"></i>Sign in
                        </Link>
                    </li>
                }
                {st !== true &&
                    <li className="nav-item ">
                        <Link className="nav-link" to="/sign_up" >
                            <i class="fas fa-user-plus"></i>Sign Up
                        </Link>
                    </li>
                }
                {st === true &&
                    <li className="nav-item" >
                        <Link className="nav-link" to="/sign-out" exact>
                            <i class="fas fa-sign-out-alt"></i>Sign out
                    </Link>
                    </li>
                }
                {st === true &&
                    <li className="nav-item " >
                        <Link className="nav-link" to="/view_profile" >
                            <i class="fas fa-id-card"></i><img src={icon} style={{ width: "35px" }}></img>
                        </Link>
                    </li>
                }
            </ul>
        </div>
    </nav >
    <div className="d-flex flex-row flex-grow-0 flex-fill justify-content-center bg-primary py-2 text-white px-0 news">
        <Marquee className="news-scroll" style={{ direction: "left", scrollamount: "30" }}><h3>Welome to Rental System For Photography Accessories </h3></Marquee>
    </div>
</div>
);
}

export default Navbar;
*/