import React, { useState, useEffect } from 'react'
// import "./HomePage.css";
import { Link } from "react-router-dom";
import EquimentList from './Images/EquimentList.png'
import SoldEqupiment from './Images/SoldEquipment.png'
import Bookings from './Images/Bookings.png'
import CategoryImage from './Images/CategoryImage.png';
import NewEqupiment from "./Images/NewEqupiment.jpg"
import UsersImage from './Images/UsersImage.jpg';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import UserServices from "./Services/UserServices";
import EquipmentService from "./Services/EquipmentService";
import CategoryServices from './Services/CategoryServices';
import BookingService from './Services/BookingService';
import BookingChart from './AdminPages/BookingChart';
import UsersChart from './AdminPages/UsersChart';
export default function HomePage(props) {
    const [userCount, setUserCount] = useState(0);
    const [categoriesCount, setCategoriesCountCount] = useState(0);
    const [allEquipmentsCount, setAllEquipmentsCount] = useState(0);
    const [bookingsCount, setBookingsCount] = useState(0);
    const [newEquipmentsCount, setNewEquipmentsCount] = useState(0);
    const [rentEquipmentsCount, setRentEquipmentsCount] = useState(0);


    const loadUsers = () => {
        UserServices.getAllUsers().then((res) => {
            res.data.result !== null && setUserCount(res.data.result.length);
        });
    }
    const loadCategories = () => {
        CategoryServices.getAllCategory().then((res) => {
            res.data.result !== null && setCategoriesCountCount(res.data.result.length);

        });
    }
    const loadAllEquipments = () => {
        EquipmentService.getAllEquipments().then((res) => {
            res.data.result !== null && setAllEquipmentsCount(res.data.result.length);

        });
    }
    const loadNewEquipments = () => {
        EquipmentService.loadNewEquipments().then((res) => {
            res.data.result !== null && setNewEquipmentsCount(res.data.result.length);

        });
    }

    const loadRentEquipments = () => {
        EquipmentService.getAllEquipments().then((res) => {
            res.data.result !== null && setRentEquipmentsCount(res.data.result.length);

        });
    }
    const getAllBookings = () => {
        BookingService.getAllBookings().then(res => {
            setBookingsCount(res.data.result.length);
        })
    }

    useEffect(() => {
        loadUsers();
        getAllBookings();
        loadCategories();
        loadAllEquipments();
        loadNewEquipments();
        loadRentEquipments();
    }, [])
    const showUsers = () => {
        props.history.push("/fatch-all-user");
    }
    const showEquipments = () => {
        props.history.push("/equipment-all");
    }
    const showNewEquipments = () => {
        props.history.push("/new-equipment");
    }


    const showBookings = () => {
        props.history.push("/bookings");
    }
    return (
        <div >
            <div className="row">
                <AdminNavbar />
            </div>
            <div className="row">
                <div className="col-md-2 mt-1 mr-n3">
                    <AdminSidebar />
                </div>
                <div className="col mt-0">
                    <div className="card mt-2 mr-2 ">
                        <div className="card-header bg-secondary">
                            <h3 className="text-center  text-light">Admin Panel</h3>
                        </div>
                        <div className="card-body">
                            <div className="row row-cols-1 row-cols-md-2 ">
                                <div className="col ">
                                    <h4 className="text-center">Users Chart</h4>
                                    <UsersChart />
                                </div>
                                <div className="col ">
                                    <h4 className="text-center">Bookings Chart</h4>
                                    <BookingChart />
                                </div>
                            </div>
                        </div>
                        <div className="card-header bg-secondary rounded">
                            <h3 className="text-center text-light"> Counting Of Rental</h3>
                        </div>
                        <div className="card-body">
                            <div className="row row-cols-1 row-cols-md-3 g-4 ">
                                <div className="col">
                                    <div className="card ">
                                        <button className="btn btn-outline-info custom-btn" onClick={() => showUsers()}>
                                            <div className="text-center">
                                                <img src={UsersImage} className="card-img-top float-center " alt="..." style={{ width: "360px", height: "120px" }} />
                                            </div>
                                            <div class="card-body">
                                                <h4 className="card-title text-center">All Users</h4>
                                                <p className="card-text">{userCount}</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card ">
                                        <button className="btn btn-outline-info custom-btn" onClick={() => showUsers()}>
                                            <div className="text-center">
                                                <img src={CategoryImage} className="card-img-top float-center " alt="..." style={{ width: "360px", height: "120px" }} />
                                            </div>
                                            <div class="card-body">
                                                <h4 className="card-title text-center">All Categories</h4>
                                                <p className="card-text">{categoriesCount}</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card ">
                                        <button className="btn btn-outline-info custom-btn" onClick={() => showEquipments()}>
                                            <div className="text-center">
                                                <img src={EquimentList} className="card-img-top float-center " alt="..." style={{ width: "360px", height: "120px" }} />
                                            </div>
                                            <div class="card-body">
                                                <h4 className="card-title text-center">All Equipments</h4>
                                                <p className="card-text">{allEquipmentsCount}</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card mt-4">
                                        <button className="btn btn-outline-info custom-btn" onClick={() => showNewEquipments()}>
                                            <div className="text-center">
                                                <img src={NewEqupiment} className="card-img-top float-center " alt="..." style={{ width: "360px", height: "120px" }} />
                                            </div>
                                            <div class="card-body">
                                                <h4 className="card-title text-center">New Equipments</h4>
                                                <p className="card-text">{newEquipmentsCount}</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card mt-4">
                                        <button className="btn btn-outline-info custom-btn" onClick={() => showBookings()}>
                                            <div className="text-center">
                                                <img src={SoldEqupiment} className="card-img-top float-center " alt="..." style={{ width: "360px", height: "120px" }} />
                                            </div>
                                            <div class="card-body">
                                                <h4 className="card-title text-center">Rent Equipments</h4>
                                                <p className="card-text">{rentEquipmentsCount}</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card mt-4">
                                        <button className="btn btn-outline-info custom-btn" onClick={() => showBookings()}>
                                            <div className="text-center">
                                                <img src={Bookings} className="card-img-top float-center " alt="..." style={{ width: "360px", height: "120px" }} />
                                            </div>
                                            <div class="card-body">
                                                <h4 className="card-title text-center">Rent Bookings</h4>
                                                <p className="card-text">{bookingsCount}</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



/*


export default class HomePage extends Component {
    render(props) {
        return (
            <div >
                <div className="main ml-0 mr-0" >
                    <div className="row">
                        <div class="container-fluid mt-0">
                            <AdminNavbar />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md-2 mt-1 ">
                            <AdminSidebar />
                        </div>
                        <div className="col mt-0">
                            <div className="card-mb-3 mt-0 content">
                                <h1 className="m-3 pt-3 text-center"></h1>
                                <div className="card-body">


                                    <div className="row row-cols-1 row-cols-md-4 g-4 ">
                                        <div className="col">
                                            <div className="card mt-1">
                                            <button className="btn btn-outline-info">
                                                <div className="text-center">
                                                    <img src={UsersImage} className="card-img-top float-center " alt="..." style={{ width: "255px", height: "120px" }} />
                                                </div>
                                                <div class="card-body">
                                                    <h5 className="card-title text-center">All Users</h5>
                                                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                </div>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card mt-1">
                                                <div className="text-center">
                                                    <img src={CategoryImage} className="card-img-top float-center " alt="..." style={{ width: "265px", height: "120px" }} />
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title">All Categories</h5>
                                                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card mt-1">
                                                <div className="text-center">
                                                    <img src={CategoryImage} className="card-img-top float-center " alt="..." style={{ width: "265px", height: "120px" }} />
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title">Card title</h5>
                                                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card mt-1">
                                                <img src="..." class="card-img-top" alt="..." />
                                                <div class="card-body">
                                                    <h5 class="card-title">Card title</h5>
                                                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card mt-2">
                                                <img src="..." class="card-img-top" alt="..." />
                                                <div class="card-body">
                                                    <h5 class="card-title">Card title</h5>
                                                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                </div>
                                            </div>
                                        </div><div class="col mt-2">
                                            <div class="card">
                                                <img src="..." class="card-img-top" alt="..." />
                                                <div class="card-body">
                                                    <h5 class="card-title">Card title</h5>
                                                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card mt-2">
                                                <img src="..." class="card-img-top" alt="..." />
                                                <div class="card-body">
                                                    <h5 class="card-title">Card title</h5>
                                                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card mt-2">
                                                <img src="..." class="card-img-top" alt="..." />
                                                <div class="card-body">
                                                    <h5 class="card-title">Card title</h5>
                                                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card mt-2">
                                                <img src="..." class="card-img-top" alt="..." />
                                                <div class="card-body">
                                                    <h5 class="card-title">Card title</h5>
                                                    <p class="card-text"> below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card mt-2">
                                                <img src="..." class="card-img-top" alt="..." />
                                                <div class="card-body">
                                                    <h5 class="card-title">Card title</h5>
                                                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card mt-2">
                                                <img src="..." class="card-img-top" alt="..." />
                                                <div class="card-body">
                                                    <h5 class="card-title">Card title</h5>
                                                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card mt-2">
                                                <img src="..." class="card-img-top" alt="..." />
                                                <div class="card-body">
                                                    <h5 class="card-title">Card title</h5>
                                                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card mt-2">
                                                <img src="..." class="card-img-top" alt="..." />
                                                <div class="card-body">
                                                    <h5 class="card-title">Card title</h5>
                                                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }

}
*/


