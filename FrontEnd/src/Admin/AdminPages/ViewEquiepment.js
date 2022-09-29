import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar'
import AdminSidebar from '../AdminSidebar'
import EquipmentService from '../Services/EquipmentService';

function ViewEquiepment(props) {

    const [equipment, setEquipment] = useState([]);

    const back = () => {
        window.history.back();
    }

    const getEquipmentById = () => {
        EquipmentService.getEquipmentById(props.match.params.id).then((res) => {
            setEquipment(res.data.result);
        })
    }

    const deleteOldEquipment = () => {
        EquipmentService.deleteProduct(props.match.params.id).then((res) => {
            setEquipment(res.data.result);
            //this.setState({ equipments: this.state.equipments.filter(products => products.id !== id) });
            // window.location.reload();
        });
    }

    useEffect(() => {
        getEquipmentById();
    }, [])

    return (
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
                <div className="col center mt-2">
                    <div className="card border-dark rounded">
                        <div className="card-header" style={{ backgroundColor: "lightcyan" }}>
                            <h4 className="card-title text-center mt-2">Details of equipment, {equipment.equipmentName}</h4>
                        </div>
                        <div className="card" >
                            <div className="row">
                                <div className="col-md-3 ml-2 mb-3">
                                    <img className="rounded mt-2 border border-dark " src={equipment.image} style={{ width: "100%", height: "100%" }} alt="..." />
                                </div>
                                <div class="col mt-2 mr-2">
                                    <div className="card">
                                        <div class="card-body border border-dark rounded mb-2" style={{ backgroundColor: "lightyellow" }}>
                                            <div className=" col mr-2">
                                                <h4 className="card-title mt-2 ml-4">Brand : {equipment.brand}</h4>
                                                <hr />
                                                <h5 className="card-title mt-2 ml-4">Registration Date : {equipment.registrationDate}</h5>
                                                <hr />
                                                <h5 className="card-title mt-2 ml-4 ">Prize : <strike className="text-danger">{equipment.rentPerDay} Rs.</strike></h5>
                                                <hr />
                                                <h5 className="card-title mt-2 ml-4">Offer : {equipment.offerDiscount} %</h5>
                                                <hr />
                                                <h5 className="card-title mt-2 ml-4">Final Rent : {equipment.finalRent} Rs.</h5>
                                                <hr />
                                                <h5 className="card-title mt-2 ml-4">Late Charges : {equipment.finalRent / 24} per hrs</h5>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-md-2 h5 ml-4 font-weight-bold">Decription :</div> 
                                                    <h5 className="col card-title mt-2"> {equipment.decription}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-outline-secondary btn-lg" onClick={back} ><i class="fas fa-backward"></i>Back</button>
                        <Link to={`/update-equipment/${props.match.params.id}`} className="btn btn-outline-primary btn-lg float-right">Update <i class="fas fa-edit"></i></Link>
                        <button className="btn btn-outline-danger btn-lg float-right mr-4" onClick={deleteOldEquipment} >Delete <i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewEquiepment

/*import React, { Component } from 'react';
import EquipmentService from '../Services/EquipmentService';

//import ImageUploader from 'react-images-upload';
//import { Form, Modal, Button, Header, Dropdown } from "semantic-ui-react";
//import Navigation from "../Navbar/index"

class UpdateEquipment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            equipmentName: '',
            brand: '',
            avialableQuantity: '',
            rentPerDay: '',
            offerDiscount: '',
            finalRent: '',
            delayCharges: '',
            image: '',
            decription: '',

        }
        this.changeFinalPriceCalculatetor = this.changeFinalPriceCalculatetor.bind(this);
        this.changeDiscountOfferHandler = this.changeDiscountOfferHandler.bind(this);
        this.changeImageUrlHandler = this.changeImageUrlHandler.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.cancel = this.cancel.bind(this);
        this.getTitle = this.getTitle.bind(this);
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    changeFinalPriceCalculatetor = (discount, price) => {
        let tempPrice = parseFloat((price - ((price * discount) / 100))).toFixed(2)
        this.setState({ finalRent: tempPrice });
    }
    changeDiscountOfferHandler = (event) => {
        this.setState({ offerDiscount: event.target.value });
        this.changeFinalPriceCalculatetor(event.target.value, this.state.rentPerDay)
    }

    changeImageUrlHandler = (event) => {
        //this.setState({ productImage: event.target.files[0] })
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        EquipmentService.fileUpload(formData).then(res => {
            res.data.result != null && this.setState({ image: res.data.result });
            console.log(res.data.result);
            // return res.data.result;
        });
    }

    saveProduct = (e) => {
        e.preventDefault()

        let product = {
            equipmentName: this.state.equipmentName,
            brand: this.state.brand,
            avialableQuantity: this.state.avialableQuantity,
            rentPerDay: this.state.rentPerDay,
            offerDiscount: this.state.offerDiscount,
            finalRent: this.state.finalRent,
            delayCharges: this.state.delayCharges,
            decription: this.state.decription,
            image: this.state.image
        }
        console.log('product => ' + JSON.stringify(product))

    }
    cancel() {
        this.props.history.push(`/equipment-under-category/${this.state.id}`)
    }
    componentDidMount() {
        EquipmentService.getEquipmentById(this.state.id).then((res) => {
            let equipment = res.data.result;
            console.log(equipment)
            this.setState({
                equipmentName: equipment.equipmentName,
                brand: equipment.brand,
                avialableQuantity: equipment.avialableQuantity,
                rentPerDay: equipment.rentPerDay,
                offerDiscount: equipment.offerDiscount,
                finalRent: equipment.finalRent,
                delayCharges: equipment.delayCharges,
                decription: equipment.decription,
                image: equipment.image
            });
        });

    }
    getTitle() {
        return <h3 className="text-center">Add Product</h3>
    }


    render() {
        return (
            <div class="container">
                <br />

                <div className="card col-md">
                    {
                        this.getTitle()
                    }
                    <form>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label"><i class="far fa-image"></i> Choose images :</label>
                            <div className="col-sm-5">
                            <img src={this.state.image} alt="image" width="10%"/>
                                <input type="file" onChange={this.changeImageUrlHandler} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label"><i class="fab fa-product-hunt"></i> Equipment Name :</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" name="equipmentName" value={this.state.equipmentName} onChange={this.onChange} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label"><i class="fas fa-industry"></i>Equipment Brand </label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" name="brand" value={this.state.brand} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label"><i class="fab fa-wolf-pack-battalion"></i> AvialableQuantity </label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" name="avialableQuantity" value={this.state.avialableQuantity} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label"><i class="fas fa-rupee-sign"></i> Rent Per Day </label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" name="rentPerDay" value={this.state.rentPerDay} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label"><i class="fas fa-percent"></i> Discount </label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" name="offerDiscount" value={this.state.offerDiscount} onChange={this.changeDiscountOfferHandler} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label"><i class="fas fa-rupee-sign"></i> Equipment Final Rent</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" name="finalRent" value={this.state.finalRent} readOnly />
                            </div>
                        </div>
                        <div className="row w-100 mb-3">
                            <label className="col-sm-3 col-form-label"><i class="fas fa-audio-description"></i> Equipment Description</label>
                            <div className="col-sm-5">
                                <textarea type="text" className="form-control" name="decription" value={this.state.decription} onChange={this.onChange} />
                            </div>
                        </div>

                        <button className="btn btn-outline-success btn-lg" onClick={this.saveProduct} ><i class="fas fa-edit"></i>Update</button>
                        <button className="btn btn-outline-danger btn-lg" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}><i class="fas fa-backward"></i>Cancel</button>
                    </form>
                </div>
                <br />
            </div>

        );
    }
}


export default UpdateEquipment;
*/