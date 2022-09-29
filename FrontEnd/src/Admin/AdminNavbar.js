import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminIcon from "./Images/admin.jpg"
import "./HomePage.css";
import EquipmentService from './Services/EquipmentService'
export default function AdminNavbar(props) {
    const [search, setSearch] = useState("");

    const onChange = (e) => { setSearch(e.target.value) }

    const searchEquipment = (e) => {
        let id = "";
        e.preventDefault();
        alert("please wait searching............");
        EquipmentService.getEquipmentByName(search).then((res) => {

            if (res.data.result !== null) {
                id = res.data.result.id;
                window.open(`/view-equipment/${id}`);
            }
        })

    }
    return (
        <div className="w-100">
            <nav className="navbar navbar-dark bg-dark   navbar-expand-lg mt-0 mr-1 ml-1">
                <a className="navbar-brand" href="/admin_home">RSYS</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-center ml-4" id="navbarText">
                    <form className="form-inline my-2 my-lg-0" onSubmit={searchEquipment}>
                        <input className="form-control mr-sm-2 md-5" type="search" placeholder="Search" name="search" value={search} onChange={onChange} />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
                <div className="">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/admin_home" >
                                <i class="fa fa-home" aria-hidden="true"></i> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/show-all-category" >
                                |  <i class="fa fa-list-alt" aria-hidden="true"></i> Categories
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link class="nav-link text-light" to="#"  >
                                |  <i class="fab fa-product-hunt"></i> Equipments
                            </Link>
                        </li>
                       {window.localStorage.getItem("status")==="true"&& <li className="nav-item">
                            <Link class="nav-link text-light " to="/sign-out" >
                                |  Sign out <i class="fa fa-sign-out-alt"></i> 
                            </Link>
                        </li>}
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/show-all-category" >
                                |  <img src={AdminIcon} alt="profile-img" className="rounded-circle" style={{ width: "50px", height: "30px" }} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
