import React from 'react'

function AddressCard(props) {
    return (
        <div className="row">
            <div className="col-md-3">
                <h5>Address </h5>
            </div>
            <div className="col text-secondary">
                <div className="row mb-2">
                    <div className="col-md-3 col-form-label col-form-label-lg">
                        <h5>Home Number :</h5>
                    </div>
                    <div className="col-md-2 ">
                        <input className="form-control form-control-lg" type='text'
                            value={props.address.homeNumber} readOnly />
                    </div>
                    <div className="col-md-2 col-form-label col-form-label-lg mr-2">
                        <h5>Society :</h5>
                    </div>
                    <div className="col-md-3 ">
                        <input className="form-control form-control-lg" type='text'
                            value={props.address.society} readOnly />
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-md-2 col-form-label col-form-label-lg ">
                        <h5>Area :</h5>
                    </div>
                    <div className="col-md-3 ">
                        <input className="form-control form-control-lg" type='text'
                            value={props.address.area} readOnly />
                    </div>
                    <div className="col-md-2 col-form-label col-form-label-lg mr-2">
                        <h5>City :</h5>
                    </div>
                    <div className="col-md-3 ">
                        <input className="form-control form-control-lg" type='text'
                            value={props.address.city} readOnly />
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-md-2 col-form-label col-form-label-lg ">
                        <h5>State :</h5>
                    </div>
                    <div className="col-md-3 ">
                        <input className="form-control form-control-lg" type='text'
                            value={props.address.state} readOnly />
                    </div>
                    <div className="col-md-2 col-form-label col-form-label-lg mr-2">
                        <h5>Pin Code :</h5>
                    </div>
                    <div className="col-md-3 ">
                        <input className="form-control form-control-lg" type='text'
                            value={props.address.pinCode} readOnly />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressCard
