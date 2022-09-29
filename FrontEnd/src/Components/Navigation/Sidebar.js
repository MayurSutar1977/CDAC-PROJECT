import React, { useState, useEffect } from 'react';
import AllServices from '../../Services/AllServices';
import { Link } from 'react-router-dom';
import CameraImage from '../../Common/Images/CameraImage.jpg';
import Carousel from './Carousel';
export default function Sidebar(props) {
    const i = 0;
    const [equipments, setEquipments] = useState([]);
    const [newEquipments, setNewEquipments] = useState([]);
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
    const getNewEquipments = () => {
        AllServices.getNewEquipments().then((res) => {
            setNewEquipments(res.data.result);
            console.log(JSON.stringify(equipments));
        })
    }
    useEffect(() => {
        getAllCategories();
        getAllEquipments();
        getNewEquipments();
    }, []);
    return (
        <div className="card" style={{ backgroundColor: "lightcyan" }}>
            <div className="card-body text-center mt-0">
                <img className="card-img-top img-fluid float-center " src={CameraImage} alt="..." style={{ height: "190px" }} />
            </div>
            {/* <Carousel/> */}
            <hr />
            <div class="card-body ">
                <h4 className="card-title text-center ">Categories</h4>
                {categories.map(category =>
                    <div key={category.id}>
                        <Link to={`/show-equipments-under-category/${category.id}/${category.categoryName}`} className="nav-link"><h5 className="text-center">{category.categoryName}</h5></Link>
                    </div>
                )}
            </div>
            <hr />
            <div class="card-body ">
                <h4 className="card-title text-center">All Equipments</h4>
                {equipments.map(equipment =>
                    <div key={equipment.id}>
                        <Link to={`/show-equipments-details/${equipment.id}/${equipment.equipmentName}`} className="nav-link" ><h5 className="text-center">{equipment.equipmentName}</h5></Link>
                    </div>
                )}
            </div>
            <hr />
            <div class="card-body">
                <h4 className="card-title text-center">New Equipments</h4>
                {i !== 5 &&
                    newEquipments.map(equipment =>
                        <div key={equipment.id}>
                            <Link to={`/show-equipments-details/${equipment.id}/${equipment.equipmentName}`} className="nav-link" ><h5 className="text-center">{equipment.equipmentName}</h5></Link>
                            <h5 className="text-center ">{equipment.brand}</h5>
                            <h5 className="text-center" >{equipment.offerDiscount} %</h5>
                            <hr />
                        </div>
                    )}
            </div>
        </div>
    )
}
