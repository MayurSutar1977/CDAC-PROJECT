import React, { Component } from 'react'
import AddCategoryPage from './AddCategoryPage';
import CategoryService from '../Services/CategoryServices'
import Popup from './PopUp';
import AdminSidebar from '../AdminSidebar';
import AdminNavbar from '../AdminNavbar';

class CategoryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            categories: [],
        }
        //this.viewEquipment = this.viewEquipment.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    viewEquipment(id, name) {
        console.log(id + "    " + name);
        window.localStorage.setItem("cat_id", id);
        window.localStorage.setItem("cat_name", name);
        this.props.history.push(`/equipment-under-category/${id}`)
        //this.props.history.push(`/equipment-under-category/${id}`);     
    }

    removeCategory(id) {
        CategoryService.removeCategory(id).then(res => {
            res.data.result === null && alert("Failed to remove......");
            res.data.result !== null && alert(res.data.message);
            console.log(res.data.result);
        });
    }
    componentDidMount() {
        CategoryService.getAllCategory().then(res => {
            res.data.result === null && alert("Failed to add......");
            res.data.result !== null && this.setState({ categories: res.data.result }) && window.location.reload();
            console.log(res.data.result);
        });
    }
    render() {
        let i = 0;
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
                        <div className="col center mt-2">
                            <div className="card-mb-3 mt-0 ">
                                <div className="card-header" style={{ backgroundColor: "lightcyan" }}>
                                    <h4 className="card-title text-center mt-2">Category List</h4>
                                </div>
                                <div className="card-body ">
                                    {!this.state.showPopup && <button className="btn btn-outline-primary md-col-4" onClick={this.togglePopup.bind(this)} >Add Category </button>}
                                    {this.state.showPopup ?
                                        <Popup
                                            closePopup={this.togglePopup.bind(this)}>
                                        </Popup>
                                        : null
                                    }
                                    <div >
                                        <hr />
                                        <div class="row row-cols-1 row-cols-md-4">

                                            {/* <div class="row mb-3 font-weight-bold h5" style={{ backgroundColor: "lightyellow" }}>
                                                <div class="col col-sm-1 text-center ml-5 "> Sr. No</div>
                                                <div class="col col col-sm-3 ml-5"> Category Name</div>
                                                <div class="col col-sm-3 text-center"> Image</div>
                                                <div class="col col col-sm-2 text-center ml-4"> Action</div>
                                            </div>
                                            <hr /> */}
                                            {
                                                this.state.categories.map(
                                                    category =>
                                                        <div key={category.id}>
                                                            <div className="card ml-2 mr-2 mb-2 mt-2">
                                                                <div className="card-body rounded">
                                                                    <div className="mb-2 h5"> Sr. No. {++i}</div>
                                                                    <div className="mb-2 h5"> {category.categoryName}</div>
                                                                    <div className="card rounded mr-1">
                                                                        <img src={category.categoryImage} style={{ width: "250px", height: "160px" }} alt="Category Image" />
                                                                    </div>
                                                                    <button type="button" class="btn btn-outline-info btn-block  mt-2" onClick={() => this.viewEquipment(category.id, category.categoryName)}  >View</button>
                                                                    <button type="button" class="btn btn-outline-danger btn-block mt-2 " onClick={() => this.removeCategory(category.id)}>Remove</button>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                        </div>
                                                )}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CategoryPage;
