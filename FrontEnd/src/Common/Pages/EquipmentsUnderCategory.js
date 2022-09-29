import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navigation/Navbar';
import Sidebar from '../../Components/Navigation/Sidebar';
import AllServices from '../../Services/AllServices';
import CameraImage from '../Images/CameraImage.jpg'

function EquipmentsUnderCategory(props) {

    const [equipments, setEquipments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [message, setMessage] = useState("");

    const getAllCategories = () => {
        AllServices.getAllCategories().then((res) => {
            setCategories(res.data.result);
            console.log(JSON.stringify(categories));
        })
    }
    //get all equipments by category id
    const getAllEquipmentsByCategoryId = () => {
        let catId = props.match.params.catId;//window.localStorage.getItem("cat_id")
        AllServices.getAllEquipmentsByCategoryId(catId).then((res) => {
            setEquipments(res.data.result);
            console.log(JSON.stringify(equipments));
        })
    }

    const buyNow= ()=> {
        props.history.push(`/rent-line`);
    }

    //get all equipments by category name
    /* const getAllEquipmentsByCategoryName = () => {
         console.log(props.match.params.catName)
         AllServices.getAllEquipmentsByCategoryName(props.match.params.catName).then((res) => {
             setEquipments(res.data.result);
             console.log(JSON.stringify(equipments));
         })
     }*/
    const addToRent = (equipment) => {
        let equipmentCartId = {
            userId: JSON.parse(window.localStorage.getItem("user_id")),
            equipmentId: equipment.id
        };
        AllServices.addEquipmentToCart(equipmentCartId)
            .then((res) => {
                alert(res.data.message);
                res.data.result !== null && JSON.stringify(window.localStorage.setItem("cart_size", JSON.parse(window.localStorage.getItem("cart_size")) + 1));
                setMessage(res.data.message)
            });
        console.log(message);
        setInterval(()=>{window.location.reload()}, 1000);
        //window.location.reload();
        //this.props.history.push('/product-category');
    }

    const viewEquipment = (id, equipName) => {
        props.history.push(`/show-equipments-details/${id}/${equipName}`);
    }

    useEffect(() => {
        getAllCategories();
        getAllEquipmentsByCategoryId();
    }, [])
    return (
        <div>
            <Navbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col col-md-3 mt-0  ">
                    <Sidebar />
                    {/*<div className="card--mb-3 ">
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
                            {equipments.map(equipment =>
                                <div key={equipment.id}>
                                    <h5 className="text-center">{equipment.equipmentName}</h5>
                                </div>
                            )}
                        </div>
                        <hr />
                        <div class="card-body">
                            <h4 className="card-title text-center">Equipments</h4>
                        </div>
                        <hr />
                    </div> */}
                </div>
                <div className="col mt-0">
                    <div className="card-mb-3 mt-0 content">
                        <div style={{ backgroundColor: "lightgrey" }}>
                            <br />
                            <h2 className="text-center">Equipments in, {props.match.params.catName}</h2>
                            <hr />
                        </div>

                        <div className="card-body ">
                            <div className="row row-cols-1 row-cols-md-3 g-4  ">
                                {
                                    equipments !== null && equipments.map(equipment =>
                                        <div key={equipment.id}>
                                            <div className="col">
                                                <div className="card border border-dark mb-3 " style={{ backgroundColor: "lightyellow" }}>
                                                    <button className="btn btn-outline-secondary custom-btn ml-2 mr-2 mt-2 mb-0" onClick={() => viewEquipment(equipment.id, equipment.equipmentName)} >
                                                        <div className="text-center">
                                                            <img className="card-img-top float-center " src={equipment.image} alt="..." style={{ height: "300px" }} />
                                                        </div>
                                                        <div class="card-body">
                                                            <h4 className="card-title text-center">{equipment.equipmentName}</h4>
                                                            <h4 className="card-title text-center">{equipment.brand}</h4>
                                                            <h5 className="card-title text-center text-danger"><strike>{equipment.rentPerDay} Rs.</strike></h5>
                                                            <h5 className="card-title text-center btn btn-success btn-md" style={{ height: "40px", borderRadius: "70px",paddingRight:"30px",paddingLeft:"30px" }}>{equipment.offerDiscount} %</h5>
                                                            <h5 className="card-title text-center">{equipment.finalRent} Rs.</h5>
                                                            <h5 className="card-title text-center">{parseFloat(equipment.finalRent / 24).toFixed(2)} per hrs</h5>
                                                            {/* <h5 className="card-title text-center">{equipment.decription}</h5> */}
                                                        </div>
                                                    </button>
                                                     {(JSON.parse(window.localStorage.getItem("cart_size"))> 0 ) && <button className="btn btn-outline-info custom-btn btn-lg ml-2 mr-2 mt-2 mb-2 h-120" onClick={buyNow} >Buy Now <i class="fas fa-arrow-circle-right"></i></button>}
                                                    <button className="btn btn-outline-success custom-btn btn-lg ml-2 mr-2 mt-2 mb-2 h-120" onClick={() => addToRent(equipment)}><i class="fas fa-cart-plus"></i>| Add To Rent</button>
                                                    <button className="btn btn-outline-info custom-btn btn-lg ml-2 mr-2 mt-0 mb-2" onClick={() => viewEquipment(equipment.id, equipment.equipmentName)}><i class="fas fa-info-circle"></i> View</button>
                                                </div>
                                            </div>
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

export default EquipmentsUnderCategory
/*
const Card = (props) => {

    const viewEquipments = (id, equipName) => {
        props.history.push(`show-equipments-details/${id}/${equipName}`);
    }
    return (
        <div>
            <div className="col">
                <div className="card border border-dark mt-0">
                    <button className="btn btn-outline-secondary custom-btn" onClick={() => viewEquipments(props.id, props.equipmentName)} >
                        <div className="text-center">
                            <img className="card-img-top float-center " src={props.image} alt="..." style={{ height: "300px" }} />
                        </div>
                        <div class="card-body">
                            <h4 className="card-title text-center">{props.equipmentName}</h4>
                            <h4 className="card-title text-center">{props.brand}</h4>
                            <h5 className="card-title text-center text-danger"><strike>{props.rentPerDay} Rs.</strike></h5>
                            <h5 className="card-title text-center">{props.offerDiscount} %</h5>
                            <h5 className="card-title text-center">{props.finalRent} Rs.</h5>
                            <h5 className="card-title text-center">{props.finalRent / 24} per hrs</h5>
                            <h5 className="card-title text-center">{props.decription}</h5>
                        </div>
                    </button>
                    <button className="btn btn-outline-success custom-btn btn-lg ml-2 mr-2 mt-2 mb-2 h-120" >Add To Rent</button>
                    <button className="btn btn-outline-info custom-btn btn-lg ml-2 mr-2 mt-0 mb-2" onClick={() => viewEquipments(props.id, props.equipmentName)}>View</button>
                </div>
            </div>
            {/*
            <div className="col">
                <div className="card border border-dark mt-0">
                    <button className="btn btn-outline-secondary custom-btn" onClick={() => viewEquipments(props.id, props.equipmentName)} >
                        <div className="text-center">
                            <img className="card-img-top float-center " src={props.image} alt="..." style={{ height: "300px" }} />
                        </div>
                        <div class="card-body">
                            <h4 className="card-title text-center">{props.equipmentName}</h4>
                            <h4 className="card-title text-center">{props.brand}</h4>
                            <h5 className="card-title text-center text-danger"><strike>{props.rentPerDay} Rs.</strike></h5>
                            <h5 className="card-title text-center">{props.offerDiscount} %</h5>
                            <h5 className="card-title text-center">{props.finalRent} Rs.</h5>
                            <h5 className="card-title text-center">{props.finalRent / 24} per hrs</h5>
                            <h5 className="card-title text-center">{props.decription}</h5>
                        </div>
                    </button>
                      <div className="row row-cols-2 row-cols-md-2 g-4 ml-2 mr-2 mt-2 mb-2">
                        <button className="btn btn-outline-success custom-btn btn-lg   " >Add To Rent</button>
                        <button className="btn btn-outline-info custom-btn btn-lg ">View</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


/*
            <div className="col">
                <div className="card border border-dark mt-0">
                    <button className="btn btn-outline-info custom-btn" onClick={() => viewEquipments(equipment.id, equipment.categoryName)} >
                        <div className="text-center">
                            <img className="card-img-top float-center " src={equipment.image} alt="..." style={{ height: "300px" }} />
                        </div>
                        <div class="card-body">
                            <h4 className="card-title text-center">{equipment.equipmentName}</h4>
                            <h6 className="card-title text-center">{equipment.brand}</h6>
                            <h6 className="card-title text-center text-danger"><strike>{equipment.rentPerDay} Rs.</strike></h6>
                            <h6 className="card-title text-center">{equipment.offerDiscount} %</h6>
                            <h6 className="card-title text-center">{equipment.finalRent} Rs.</h6>
                            <h6 className="card-title text-center">{equipment.finalRent / 24} per hrs</h6>
                            <h6 className="card-title text-center">{equipment.decription}</h6>
                            <p className="card-text"></p>
                        </div>
                    </button>
                </div>
            </div>
*/

