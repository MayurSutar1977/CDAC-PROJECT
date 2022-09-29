import React, { Component } from 'react';
import UserService from "../Services/UserServices"


class FileUpload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            productImage: null
        }
        this.changeImageUrlHandler = this.changeImageUrlHandler.bind(this);
        this.cancel = this.cancel.bind(this);
        this.changeFileUpload = this.changeFileUpload.bind(this);
    }

    cancel() {
       // this.props.history.push('/products/-1')
    }

    getTitle() {
        return <h3 className="text-center">Upload Product</h3>
    }
    changeImageUrlHandler = (event) => {
        this.setState({productImage : event.target.files[0]});
        
    }

    changeFileUpload() {
        const formData = new FormData();
        formData.append('file',this.state.productImage);
        this.setState({ productImage: formData });
        console.log(JSON.stringify(formData));
        UserService.fileUpload(formData).then(res => {
           // this.props.history.push(`/all-category`);
        });
    }


    render() {
        return (
            <div>
            
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group"  >
                                        <label><b>Choose images :</b> </label>
                                        <input type="file" onChange={this.changeImageUrlHandler} />
                                    </div>
                                    <button type="submit" className="btn btn-success" onClick={this.changeFileUpload} >Save</button>
                                    <button className="btn btn-dager" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>

                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default FileUpload;