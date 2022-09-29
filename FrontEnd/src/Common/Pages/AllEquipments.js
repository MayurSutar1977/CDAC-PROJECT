import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navigation/Navbar';
import Sidebar from '../../Components/Navigation/Sidebar';
import AllServices from '../../Services/AllServices';
import CameraImage from '../Images/CameraImage.jpg'

function AllEquipments(props) {
    const [equipments, setEquipments] = useState([]);
    const [categories, setCategories] = useState([]);

    const getAllCategories = () => {
        AllServices.getAllCategories().then((res) => {
            setCategories(res.data.result);
            console.log(JSON.stringify(categories));
        })
    }

    const getAllEquipments = () => {
        AllServices.getAllEquipments().then((res) => {
            setEquipments(res.data.result);
            console.log(JSON.stringify(equipments));
        })
    }
    const viewEquipments = (id, equipName) => {
        props.history.push(`show-equipments-details/${id}/${equipName}`);
    }
    const buyNow= ()=> {
        props.history.push(`/rent-line`);
    }

    const addToRent = (id, equipName) => {
        let equipmentCartId = {
            userId: JSON.parse(window.localStorage.getItem("user_id")),
            equipmentId: id
        };
        AllServices.addEquipmentToCart(equipmentCartId)
            .then((res) => {
                alert(res.data.message);
                res.data.result !== null && JSON.stringify(window.localStorage.setItem("cart_size", JSON.parse(window.localStorage.getItem("cart_size")) + 1));
            });
        setInterval(() => { window.location.reload() }, 1000);
        // window.location.reload();
    }

    useEffect(() => {
        getAllCategories();
        getAllEquipments();
    }, [])
    return (
        <div>
            <Navbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col col-md-3 mt-0  ">
                    <Sidebar />
                </div>
                <div className="col mt-0">
                    <div className="card-mb-3 mt-0 content">
                        <div style={{ backgroundColor: "lightgrey" }}>
                            <br />
                            <h2 className="text-center">All Avialable Equipments</h2>
                            <hr />
                        </div>

                        <div className="card-body h-100">
                            <div className="row row-cols-1 row-cols-md-3 g-4 ">
                                {
                                    equipments.map(equipment =>
                                        <div key={equipment.id}>
                                            <div className="col">
                                                <div className="card border border-dark mb-4">
                                                    <button className="btn btn-outline-secondary custom-btn ml-2 mr-2 mt-2 mb-0" onClick={() => viewEquipments(equipment.id, equipment.equipmentName)} >
                                                        <div className="text-center">
                                                            <img className="card-img-top float-center " src={equipment.image} alt="..." style={{ height: "300px" }} />
                                                        </div>
                                                        <div class="card-body">
                                                            <h4 className="card-title text-center">{equipment.equipmentName}</h4>
                                                            <h4 className="card-title text-center">{equipment.brand}</h4>
                                                            <h5 className="card-title text-center text-danger"><strike><i class="fas fa-rupee-sign"></i>{equipment.rentPerDay}</strike></h5>
                                                            <h5 className="card-title text-center btn btn-success btn-md" style={{ height: "40px", borderRadius: "70px",paddingRight:"30px",paddingLeft:"30px" }}>{equipment.offerDiscount} %</h5>
                                                            <h5 className="card-title text-center"><i class="fas fa-rupee-sign"></i>{equipment.finalRent} <i class="fas fa-calendar-day"></i></h5>
                                                            <h5 className="card-title text-center">{parseFloat(equipment.finalRent / 24).toFixed(2)} per hrs</h5>
                                                            {/* <h5 className="card-title text-center">{equipment.decription}</h5> */}
                                                        </div>
                                                    </button>
                                                    {(JSON.parse(window.localStorage.getItem("cart_size"))> 0 ) && <button className="btn btn-outline-info custom-btn btn-lg ml-2 mr-2 mt-2 mb-2 h-120" onClick={buyNow} >Buy Now <i class="fas fa-arrow-circle-right"></i></button>}
                                                    <button className="btn btn-outline-success custom-btn btn-lg ml-2 mr-2 mt-2 mb-2 h-120" onClick={() => addToRent(equipment.id, equipment.equipmentName)} ><i class="fas fa-cart-plus"></i> | Add To Rent</button>
                                                    <button className="btn btn-outline-info custom-btn btn-lg ml-2 mr-2 mt-0 mb-2" onClick={() => viewEquipments(equipment.id, equipment.equipmentName)}><i class="fas fa-info-circle"></i> | View</button>
                                                </div>
                                            </div>
                                            <hr/>
                                        </div>
                                        
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllEquipments


