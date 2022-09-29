import React, { Component } from 'react'
import "./HomePage.css";
// import { Link } from "react-router-dom";
// import UserRegistration from '../CustomerScreen/UserRegistration1'
// import UserProfile from '../CustomerScreen/ViewProfile'
// import CategoryPage from './AdminPages/AllCategoryPage';
// import AdminIcon from "./Images/admin.jpg"
// import AddEquipment from './AdminPages/AddEquipment';
import EquipmentService from './Services/EquipmentService';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';



export default class HomePage extends Component {
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

        let equipment = {
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
        console.log('equipment => ' + JSON.stringify(equipment))
        EquipmentService.AddEquipmentByCategory(this.state.id, equipment).then(res => {
            res.data.result !== null && alert(res.data.message + "😃");
            res.data.result === null && alert(res.data.message + "🙃");
            this.props.history.push(`/equipment-under-category/${this.state.id}`)
        });
    }
    cancel() {
        this.props.history.push(`/equipment-under-category/${this.state.id}`)
    }/*
    componentDidMount() {
        CategoryServices.getCategory().then((res) => {
            this.setState({ category: res.data });
            console.log(res.data)
        });
        this.state.id !== null && CategoryServices.getCategoryById(this.state.id).then((res) => {
            let category = res.data;
            this.setState({ categoryName: category.categoryName });
            console.log(category)
        });

    }*/
    getTitle() {
        return <h3 className="text-center">Add Equipment</h3>
    }
    render(props) {
        return (
            <div >
                <div className="main ml-0 mr-0" >
                    <div className="row">
                        <div class="container-fluid mt-0">
                            <AdminNavbar/>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md-2 mt-1 "> 
                            <AdminSidebar/>
                        </div>
                        <div className="col center mt-0">
                            <div className="card-mb-3 mt-0 content">
                                <h1 className="m-3 pt-3 text-center"></h1>
                                <div className="card-body ">
                                    {
                                        this.getTitle()
                                    }
                                    <form >
                                        <div className="row  mb-3">
                                            <label className="col-sm-3 col-form-label"><i class="far fa-image"></i> Choose images :</label>
                                            <div className="col-sm-5">
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
                                        <div className="row mb-3">
                                            <label className="col-sm-3 col-form-label"><i class="fas fa-audio-description"></i> Equipment Description</label>
                                            <div className="col-sm-5">
                                                <textarea type="text" className="form-control" name="decription" value={this.state.decription} onChange={this.onChange} />
                                            </div>
                                        </div>

                                        <button className="btn btn-outline-success" onClick={this.saveProduct} ><i class="fas fa-plus-square"></i>Save</button>
                                        <button className="btn btn-outline-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}><i class="fas fa-backward"></i>Cancel</button>
                                    </form>
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }

}



