
import React, { Component } from 'react';
import CategoryService from '../Services/CategoryServices';
import CategoryImage from '../Images/CategoryImage.png';
import IconImage from '../Images/CameraImage.jpg'
class AddCategoryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryName: '',
            categoryImage: null,
        }
        this.changeImageHandler = this.changeImageHandler.bind(this);
        this.addNewCategory = this.addNewCategory.bind(this);
    }
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    changeImageHandler = (event) => {
        this.setState({ categoryImage: event.target.files[0] });
    }

    addNewCategory(e) {
        e.preventDefault()
        if (this.state.categoryImage !== null) {
            const formData = new FormData();
            formData.append('file', this.state.categoryImage);
            CategoryService.addCategory(this.state.categoryName, formData).then(res => {
                res.data.result === null && alert("Failed to add......");
                res.data.result !== null && window.location.reload();
                console.log(res.data.result);
                this.props.closePopup();
            });
        }
    }
    render() {
        return (
            <div className="col mt-0" >
                <div className="row">
                    <div className="col-md-4 mb-2 mt-1" style={{ marginLeft: "-10px", marginRight: "-28px", backgroundColor: "dark" }}>
                        <div className="cart sidebar bg-dark text-center rounded">
                            <div className="card-body">
                                <div className="">
                                    <img
                                        src={IconImage}
                                        alt="profile-img"
                                        className="rounded-circle"
                                        style={{ width: "100%", height: "380px" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col mt-1 mb-2">
                        <div className="card-mb-3 col-md- border border-dark rounded float-fa-centercode">
                            <div className="card-header mt-2" >
                                <button onClick={this.props.closePopup} className="btn btn-danger float-right">X</button>
                                <h4 className="card-title text-center ">Add New Category</h4>
                            </div>
                            <div className="card-body mb-2" style={{ backgroundColor: "lightyellow" }}>
                                <div className="mt-2 text-center">
                                    <img
                                        src={CategoryImage}
                                        alt="profile-img"
                                        style={{ width: "10%" }}
                                    />
                                </div>
                                <br />
                                <div className="form">
                                    <div class="row mb-4" >
                                        <label className="col-sm-3 col-form-label "><i class="fab fa-product-hunt"></i>Category Name</label>
                                        <div className="col-sm-7">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="categoryName"
                                                value={this.state.categoryName}
                                                onChange={this.onChange}
                                                required=""
                                            />
                                        </div>
                                    </div>
                                    <div class="row mb-4">
                                        <label className="col-sm-3 col-form-label"><i class="fas fa-image"></i>Choose image :</label>
                                        <div className="col-sm-7">
                                            <input type="file" onChange={this.changeImageHandler} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer mt-2 mb-2">
                                <button className="btn btn-primary float-start" onClick={this.addNewCategory} > Submit </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddCategoryPage;