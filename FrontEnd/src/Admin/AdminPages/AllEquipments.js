import React, { Component } from 'react'
import AdminNavbar from '../AdminNavbar';
import AdminSidebar from '../AdminSidebar';
import EquipmentService from '../Services/EquipmentService';

export default class AllEquipments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            catId: this.props.match.params.id,
            equipments: [],
        }
        this.addNewEquipment = this.addNewEquipment.bind(this);
        this.viewOldEquipment = this.viewOldEquipment.bind(this);
        this.editOldEquipment = this.editOldEquipment.bind(this);
        this.deleteOldEquipment = this.deleteOldEquipment.bind(this);

    }

    deleteOldEquipment(id) {
        EquipmentService.deleteProduct(id).then((res) => {
            this.setState({ equipments: this.state.equipments.filter(products => products.id !== id) });
            window.location.reload();
        });
    }
    viewOldEquipment(id) {
        this.props.history.push(`/view-equipment/${id}`);
    }
    editOldEquipment(id) {
        this.props.history.push(`/update-equipment/${id}`);
    }
    addNewEquipment(id) {
        // let catId=window.localStorage.getItem("cat_id");
        this.props.history.push(`/add-equipment-in-category/${id}`);
    }
    componentDidMount() {
        EquipmentService.getAllEquipments().then((res) => {
            this.setState({ equipments: res.data.result });
        });
    }
    render() {
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
                        <div className="col center mt-0">
                            <div className="card-mb-3 mt-0 content">
                                <h1 className="m-3 pt-3 text-center"></h1>
                                <div className="card-body ">
                                    <h2 className="text-center">All avilable equipment list</h2>
                                    <div className="row ">
                                        <h2><button className="btn btn-primary" onClick={() => this.addNewEquipment(this.state.catId)} >Add new equipment</button></h2>
                                    </div>
                                    <div className="row" >
                                        <table className="table table-hover" >
                                            <thead className="text-center ">
                                                <tr>
                                                    <th> Equipment Name </th>
                                                    <th> Equipment Brand </th>
                                                    <th> Equipment <br/> Quantity </th>
                                                    <th> Equipment <br/> Per Day </th>
                                                    <th> Equipment  <br/>Discount </th>
                                                    <th> Equipment <br/> Final Rent </th>
                                                    <th> Delay <br/> Charges </th>
                                                    <th> Equipment decription </th>
                                                    <th>Action</th>
                                                </tr>

                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.equipments.map(
                                                        products =>
                                                            <tr key={products.id}>
                                                                <td>{products.equipmentName}</td>
                                                                <td>{products.brand}</td>
                                                                <td>{products.avialableQuantity}</td>
                                                                <td>{products.rentPerDay}</td>
                                                                <td>{products.offerDiscount}</td>
                                                                <td>{products.finalRent}</td>
                                                                <td>{products.delayCharges}</td>
                                                                <td>{products.decription}</td>
                                                                <td>
                                                                    <button className="btn btn-info" onClick={() => this.editOldEquipment(products.id)} >Update</button>
                                                                    <button style={{ backgroundColor: "darkcyan", marginLeft: "10px" }} className="btn btn-info" onClick={() => this.viewOldEquipment(products.id)} >View</button>
                                                                    <button style={{ marginLeft: "10px", backgroundColor: "red" }} className="btn btn-danger" onClick={() => this.deleteOldEquipment(products.id)} >Delete</button>
                                                                </td>

                                                            </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
