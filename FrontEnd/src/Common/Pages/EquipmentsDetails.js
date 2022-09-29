import React, { useEffect, useState, setState } from 'react'
import Navbar from '../../Components/Navigation/Navbar';
import Sidebar from '../../Components/Navigation/Sidebar';
import AllServices from '../../Services/AllServices';
import BackgroundImage from '../Images/BackgroundImage.jpg'
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
//import CameraImage from '../Images/CameraImage.jpg';

export default function EquipmentsDetails(props) {

    const [equipments, setEquipments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [categoryId, setCategoryId] = useState();

    /*   const getAllCategories = () => {
           AllServices.getAllCategories().then((res) => {
               setCategories(res.data.result);
               console.log(JSON.stringify(categories));
           })
       }*/

    const getEquipmentById = () => {
        AllServices.getEquipmentById(props.match.params.id).then((res) => {
            setEquipment(res.data.result);
            console.log(JSON.stringify(equipments));
        })
    }


    /*
        const getAllEquipments = () => {
            AllServices.getAllEquipments().then((res) => {
                setEquipments(res.data.result);
                console.log(JSON.stringify(equipments));
            })
        }*/

    const buyNow = () => {
        props.history.push(`/rent-line`);
    }
    const backPage = () => {
        window.history.back();
    }
    const addToRent = (id, equipName) => {
        let equipmentCartId = {
            userId: JSON.parse(window.localStorage.getItem("user_id")),
            equipmentId: equipment.id
        };
        AllServices.addEquipmentToCart(equipmentCartId)
            .then((res) => {
                alert(res.data.message + " 😄");
                res.data.result !== null && JSON.stringify(window.localStorage.setItem("cart_size", JSON.parse(window.localStorage.getItem("cart_size")) + 1));
            });
        // window.location.reload();
        setInterval(() => { window.location.reload() }, 1000);
    }

    useEffect(() => {
        setCategoryId(props.match.params.id);
        getEquipmentById();
        // getAllCategories();
        // getAllEquipments();

    }, [])
    return (
        <div style={{ backgroundImage: `url(${BackgroundImage})` }} >
            <Navbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col col-md-3 mt-1  ">
                    <Sidebar />
                </div>
                <div className="col center mt-2">
                    <div className="card border-dark rounded">
                        <div className="card-header" style={{ backgroundColor: "lightcyan" }}>
                            <h4 className="card-title text-center mt-2">Details of equipment, {equipment.equipmentName}</h4>
                        </div>
                        <div class="card" >
                            <div className="row ">
                                <div className="col-md-3 ml-2 mb-3 mr-0 hover-zoom">
                                    <img className="rounded mt-2 border border-dark " src={equipment.image} style={{ width: "100%", height: "100%" }} alt="..." />
                                </div>
                                <div class="col ml-0  mt-2 mr-2" >
                                    <div class="card-body border border-dark rounded mb-2" style={{ backgroundColor: "lightyellow" }}>
                                        <div className="col mr-2">
                                            <div className="row">
                                                <div className="col-md-3 h5 ml-4 font-weight-bold">Brand : </div>
                                                <h5 className="col card-title">{equipment.brand}</h5>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-3 h5 ml-4 font-weight-bold">Prize :</div>
                                                <h5 className="col card-title"> <strike className="text-danger">{equipment.rentPerDay} Rs.</strike></h5>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-3 h5 ml-4 font-weight-bold">Offer :</div>
                                                <h5 className="col card-title"> {equipment.offerDiscount} %</h5>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-3 h5 ml-4 font-weight-bold">Final Rent :</div>
                                                <h5 className="col card-title"> {equipment.finalRent} Rs.</h5>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-3 h5 ml-4 font-weight-bold">Late Charges  :</div>
                                                <h5 className="col card-title"> {parseFloat(equipment.finalRent / 24).toFixed(2)} per hrs</h5>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-3 h5 ml-4 font-weight-bold">Decription :</div>
                                                <h5 className="col card-title"> {equipment.decription}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                            {(JSON.parse(window.localStorage.getItem("cart_size")) > 0) && <button className="btn btn-outline-info custom-btn btn-lg btn-lg ml-2 mr-2 mt-0 mb-2 float-right" onClick={buyNow} >Buy Now <i class="fas fa-arrow-circle-right"></i></button>}
                            <button className="btn btn-outline-success custom-btn btn-lg btn-lg ml-2 mr-2 mt-0 mb-2 float-right" onClick={addToRent} ><i class="fas fa-cart-plus"></i>| Add To Rent</button>
                            <button className="btn btn-outline-secondary custom-btn btn-lg ml-2 mr-2 mt-0 mb-2 float-left" onClick={backPage}><i class="fas fa-arrow-circle-left"></i>Back</button>
                        </div>
                    </div>
                </div>
                {/*
        <div>
            <Navbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col col-md-3 mt-0  ">
                    <div className="card--mb-3 ">
                        <div className="text-center mt-0">
                            <img className="card-img-top float-center " src={CameraImage} alt="..." style={{ height: "190px" }} />
                        </div>
                        <div class="card-body ">
                            <h4 className="card-title text-center ">Categories</h4>
                            {categories.map(category =>
                                <div key={category.id}>
                                    <h5 className="text-center">{category.categoryName}</h5>
                                </div>
                            )}
                        </div>
                        <hr />
                        <div class="card-body ">
                            <h4 className="card-title text-center">Equipments</h4>
                            {equipments.map(equipment1 =>
                                <div key={equipment1.id}>
                                    <h5 className="text-center">{equipment1.equipmentName}</h5>
                                </div>
                            )}
                        </div>
                        <hr />
                        <div class="card-body">
                            <h4 className="card-title text-center">New Equipments</h4>
                        </div>
                        <hr />
                    </div>*/}

                {/* <div className="col mt-0">
                    <div className="card-mb-3 mt-0 content">
                        <div style={{ backgroundColor: "lightgrey" }}>
                            <br />
                            <h2 className="text-center"> Equipment Details </h2>
                            <hr />
                        </div>
                        <div className="card-body ">
                            <div className="row row-cols-1 row-cols-md-1 g-4 ">
                                <div className="col">
                                    <div className="card border border-dark ">
                                        <Popup trigger={<button className="btn btn-outline-secondary custom-btn ml-2 mr-2 mt-2 mb-0"  >
                                            <div className="text-center">
                                                <img className="card-img-top float-center " src={equipment.image} alt="..." style={{ height: "450px" }} />
                                            </div>
                                            <div class="card-body">
                                                <h4 className="card-title text-center">{equipment.equipmentName}</h4>
                                                <h4 className="card-title text-center">{equipment.brand}</h4>
                                                <h5 className="card-title text-center text-danger"><strike>{equipment.rentPerDay} Rs.</strike></h5>
                                                <h5 className="card-title text-center">{equipment.offerDiscount} %</h5>
                                                <h5 className="card-title text-center">{equipment.finalRent} Rs.</h5>
                                                <h5 className="card-title text-center">{equipment.finalRent / 24} per hrs</h5>
                                                <h5 className="card-title text-center">{equipment.decription}</h5>
                                            </div>
                                        </button>} position="right center" />
                                        <button className="btn btn-outline-success custom-btn btn-lg ml-2 mr-2 mt-2 mb-2 h-120" onClick={() => addToRent()} > |<i class="fas fa-cart-plus float-left"></i> Add To Rent</button>
                                        <button className="btn btn-outline-info custom-btn btn-lg ml-2 mr-2 mt-0 mb-2" onClick={() => backPage()}><i class="fas fa-arrow-circle-left" ></i>Back</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
