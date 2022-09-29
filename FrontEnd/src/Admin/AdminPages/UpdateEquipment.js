import React, { Component } from 'react';
import EquipmentService from '../Services/EquipmentService';
import AdminNavbar from '../AdminNavbar'
import IconImage from '../Images/CameraImage.jpg'
import AdminSidebar from '../AdminSidebar'

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
            registrationDate: '',
        }
        this.changeFinalPriceCalculatetor = this.changeFinalPriceCalculatetor.bind(this);
        this.changeDiscountOfferHandler = this.changeDiscountOfferHandler.bind(this);
        this.changeImageUrlHandler = this.changeImageUrlHandler.bind(this);
        this.saveEquipment = this.saveEquipment.bind(this);
        this.cancel = this.cancel.bind(this);
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

    saveEquipment = (e) => {
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
            image: this.state.image,
            registrationDate: this.state.registrationDate,
        }
        console.log('equipment => ' + JSON.stringify(equipment))
           EquipmentService.updateEquipment(this.state.id,equipment).then(res => {
               alert(res.data.message);
               this.props.history.push(`/equipment-under-category/${this.state.id}`)
           });
    }
    cancel() {
        window.history.back();
        // this.props.history.push(`/equipment-under-category/${this.state.id}`)
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
                image: equipment.image,
                registrationDate: equipment.registrationDate,
            });
        });

    }
    render() {
        return (
            <div className=" ml-0 mr-0" >
                <div className="row">
                    <div class="container-fluid mt-0 ">
                        <AdminNavbar />
                    </div>
                </div>
                <div className="row ">
                    <div className="col-md-2 mt-1 mb-2 ">
                        <AdminSidebar />
                    </div>
                    <div className="col mt-0" >
                        <div className="row">
                            <div className="col-md-4 mb-2 mt-1" style={{ marginLeft: "-10px", marginRight: "-28px",backgroundColor:"dark" }}>
                                <div className="cart sidebar bg-dark text-center rounded">
                                    <div className="card-body">
                                        <div className="">
                                            <img
                                                src={IconImage}
                                                alt="profile-img"
                                                className="rounded-circle"
                                                style={{ width: "100%",height:"770px" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col mt-1 mb-2">
                                <div className="card rounded content">
                                    <div className="card-header mt-2" style={{ backgroundColor: "lightcyan" }}>
                                        <h4 className="card-title text-center mt-2">Update equipment details</h4>
                                    </div>
                                    <div className="card-body rounded">

                                        {/* <div className=" col-md"> */}
                                        <div className="row mt-3 mt-4">
                                            <label className="col-sm-4 col-form-label col-form-label-lg"><i class="far fa-image"></i> Choose images :</label>
                                            <div className="col-sm-8">
                                                <img src={this.state.image} alt="image" width="10%" />
                                                <input type="file" onChange={this.changeImageUrlHandler} />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fab fa-product-hunt"></i> Equipment Name :</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-lg" name="equipmentName" value={this.state.equipmentName} onChange={this.onChange} />
                                            </div>
                                        </div>

                                        <div className="row mt-3 mt-4">
                                            <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fas fa-industry"></i>Equipment Brand </label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-lg" name="brand" value={this.state.brand} onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-sm-4 col-form-label col-form-label-lg "><i class="fas fa-industry"></i>Registration Date</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-lg" name="registrationDate" value={this.state.registrationDate} readOnly />
                                            </div>
                                        </div>
                                        <div className="row mt-3 ">
                                            <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fab fa-wolf-pack-battalion"></i> AvialableQuantity </label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-lg" name="avialableQuantity" value={this.state.avialableQuantity} onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="row mt-3 mt-4">
                                            <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fas fa-rupee-sign"></i> Rent Per Day </label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-lg" name="rentPerDay" value={this.state.rentPerDay} onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="row mt-3 ">
                                            <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fas fa-percent"></i> Discount </label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-lg" name="offerDiscount" value={this.state.offerDiscount} onChange={this.changeDiscountOfferHandler} />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fas fa-rupee-sign"></i> Equipment Final Rent</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-lg" name="finalRent" value={this.state.finalRent} readOnly />
                                            </div>
                                        </div>
                                        <div className="row  mt-3">
                                            <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fas fa-audio-description"></i> Equipment Description</label>
                                            <div className="col-sm-8">
                                                <textarea type="text" className="form-control form-control-lg" name="decription" value={this.state.decription} onChange={this.onChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-outline-success " onClick={(e) => this.saveEquipment(e)} ><i class="fas fa-edit"></i>Update</button>
                                        <button className="btn btn-outline-danger " onClick={() => this.cancel()} style={{ marginLeft: "10px" }}><i class="fas fa-backward"></i>Cancel</button>
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                        </div></div></div></div>
        );
    }
}


export default UpdateEquipment;
