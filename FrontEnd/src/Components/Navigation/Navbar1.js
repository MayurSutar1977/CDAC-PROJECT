import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
//import "./HomePage.css";

export default function Navbar1() {
    const [search, setSearch] = useState("");
    const searchProduct = (e) => {
        e.preventDefault();
        console.log(search);
    }
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg mt-0  mr-0 ">
            <a className="navbar-brand" href="RSYS"></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/" >
                            <i class="fa fa-home" aria-hidden="true"></i> Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/" >
                            <i class="fa fa-list-alt" aria-hidden="true"></i> Categories
                        </Link>
                    </li>
                    <li>
                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic" className="nav-link">
                                Equipments
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/all-equpment-to-sold">Equipments</Dropdown.Item>
                                <Dropdown.Item href="/all-equpment-to-sold">New Equipments</Dropdown.Item>
                                <Dropdown.Item href="/all-equpment-to-sold">Old Equipments</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </div>
            <div>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2 md-5" type="search" placeholder="Search" value={search} name="search" onChange={(e) => { setSearch(e.target.value) }} />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={searchProduct}>Search <i class="fas fa-search"></i></button>
                </form>
            </div>
        </nav>

    )
}



