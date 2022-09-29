import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navigation/Navbar'
import Sidebar from '../Components/Navigation/Sidebar'
import AllServices from '../Services/AllServices'
import Modal from "react-bootstrap/Modal";

function RentLine(props) {
    let counter = 0;
    const [rentLine, setRentLine] = useState([])
    const [rentDay, setRentDay] = useState(1);
    const [rentTotalAmt, setRentTotalAmt] = useState(0);
    const [rentTotalSavingAmt, setRentTotalSavingAmt] = useState(0);
    const [userId, setUserId] = useState();
    const [slotTime, setSlotTime] = useState("");
    const [bookingDate, setBookingDate] = useState("");

    const [userAddress, setUserAddress] = useState(null);
    const [isBslotOpen, setIsBslotOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState();
    const [aggrement, setAggrement] = useState({
        aggrement1: false,
        aggrement2: false,
        aggrement3: false,
        aggrement4: false,
    })
    const onChange = (event, value1) => {
        const { name, value } = event.target;
        setAggrement((preValue) => {
            return {
                ...preValue,
                [name]: value1,
            };
        })
    }


    const handleSlotChange = (e) => {
        setSlotTime(e.target.value);
    }
    const handleDateChange = (e) => {
        setBookingDate(e.target.value);
    }

    const handleRentDayChange = (e) => {
        setRentDay(e.target.value);
    }

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    const showSlotModal = () => {
        setIsBslotOpen(true);
    }

    const hideSlotModal = () => {
        setIsBslotOpen(false);
    };

    const addMore = () => {
        // window.history.back();
        props.history.push("/all-equpment-to-sold")
    }

    const removeFromRent = (id) => {
        AllServices.removeFromRent(id).then((res) => {
            res.data.result !== null && JSON.stringify(window.localStorage.setItem("cart_size", (JSON.parse(window.localStorage.getItem("cart_size")) - 1)));
            res.data.result !== null && window.location.reload();
        })
    }

    const getPaybleAmount = () => {
        return parseFloat(rentTotalAmt - rentTotalSavingAmt);
    }

    const selectSlotForBooking = () => {
        let cartSize = JSON.parse(window.localStorage.getItem("cart_size"));
        if (cartSize === 0) {
            setSlotTime("");
            alert(" Please add equipment then procced 😞")
        }
        else {

            status && showSlotModal();
            !status && props.history.push('/sign_in')
        }
    }

    const acceptAggrement = () => {
        console.log(slotTime);
        let cartSize = JSON.parse(window.localStorage.getItem("cart_size"));
        if (cartSize === 0) {
            alert(" Please add equipment then procced 😞")
        }
        else {
            hideSlotModal();
            status && showModal();
            !status && props.history.push('/sign_in')
        }
    }

    const proceedToBuy = () => {
        console.log(JSON.stringify(aggrement));
        window.localStorage.setItem("add", userAddress)
        if (status === true) {
            if (userAddress !== null) {
                window.localStorage.setItem("total_price", parseFloat(getPaybleAmount()).toFixed(2) * rentDay)
                window.localStorage.setItem("booking_date", bookingDate);
                window.localStorage.setItem("time_slot", slotTime);
                window.localStorage.setItem("rent_day", rentDay);
                props.history.push('/book-now');
            }
            else if (userAddress === null) {
                alert(" !!! Enter Valid Address !!!");
                hideModal();
            }
        }
        else {
            props.history.push('/sign_in');
        }
    }

    const loadRentLine = () => {
        AllServices.loadRentLine(JSON.parse(window.localStorage.getItem("user_id"))).then((res) => {
            console.log(JSON.stringify(res.data.result))
            setRentLine(res.data.result);
        })
    }

    const getRentTotalAmt = () => {
        console.log(window.localStorage.getItem("user_id"))
        AllServices.getRentTotalAmt(JSON.parse(window.localStorage.getItem("user_id"))).then((res) => {
            setRentTotalAmt(res.data.result);
        })
    }

    const getRentTotalSavingAmt = () => {
        console.log(window.localStorage.getItem("user_id"))
        AllServices.getRentTotalSavingAmt(window.localStorage.getItem("user_id")).then((res) => {
            setRentTotalSavingAmt(res.data.result);
        })
    }

    const getUserAddress = () => {
        AllServices.getUserAddress(window.localStorage.getItem("user_id")).then((res) => {
            let address = res.data.result;
            setUserAddress(address);
        })
    }

    useEffect(() => {
        setStatus(JSON.parse(window.localStorage.getItem("status")));
        setUserId(JSON.parse(window.localStorage.getItem("user_id")))
        let size = JSON.parse(window.localStorage.getItem("cart_size"))
        if (size !== 0) {
            getUserAddress();
            loadRentLine();
            getRentTotalAmt();
            getRentTotalSavingAmt();
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col col-md-3 mt-1  ">
                    <Sidebar />
                </div>
                <div className="col mt-0">
                    <div className="card-mb-3 mt-1 content">
                        <div style={{ backgroundColor: "lightgrey" }}>
                            <br />
                            <h2 className="text-center font-weight-bold">Rent Items </h2>
                            <hr />
                        </div>
                        <div className="card-body mt-n5">
                            <div className="card-body mt-0 mb-n4">
                                <div className="row" >
                                    <table className="table table-hover" >
                                        <thead >
                                            <tr className="h5">
                                                <th> Sr.No. </th>
                                                <th> Equipment Name </th>
                                                <th> Equipment Brand </th>
                                                <th> Quantity </th>
                                                <th> Rent Per Day </th>
                                                <th> Discount </th>
                                                <th> Final Rent </th>
                                                <th> Late Charges/hrs </th>
                                                <th>Action</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {
                                                rentLine.map(
                                                    equipment =>
                                                        <tr key={equipment.id}>
                                                            <td>{++counter}</td>
                                                            <td>{equipment.equipmentName}</td>
                                                            <td>{equipment.brand}</td>
                                                            <td>{equipment.quantity}</td>
                                                            <td>{equipment.rentPerDay}</td>
                                                            <td>{equipment.offerDiscount}</td>
                                                            <td>{equipment.finalRent}</td>
                                                            <td>{equipment.delayCharges}</td>
                                                            <td>
                                                                <button className="btn btn-outline-danger  ml-2" style={{ width: "115px", borderRadius: "10px" }} onClick={() => removeFromRent(equipment.id)} >Remove <i class="fas fa-trash-alt"></i></button>
                                                            </td>
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    <button className="btn btn-outline-success mt-2 mb-2 h-100" style={{ width: "130px", borderRadius: "10px" }} onClick={() => addMore()}>Add More <i class="fas fa-plus-circle"></i></button>
                                </div>
                            </div>
                            {JSON.parse(window.localStorage.getItem("cart_size")) > 0 &&
                                <div className="card float-right mt-3">
                                    <h5 className="text-right font-weight-bold ml-4 mr-4 mt-3">Total Amount  :  <strike className="text-danger"><i class="far fa-times-circle"></i>{rentTotalAmt}</strike></h5>
                                    <h5 className="text-right font-weight-bold ml-4 mr-4">Saving Amount :  <i class="fas fa-minus-circle"></i>{rentTotalSavingAmt}</h5>
                                    <h5 className="text-right font-weight-bold text-success ml-4 mr-4">Payble Amount :  <i class="fas fa-rupee-sign"></i>{getPaybleAmount()}</h5>
                                    <button className="btn btn-outline-info font-weight-bold mr-4 mt-1 mb-4 ml-4 " autofocus="autofocus" onClick={selectSlotForBooking}>Proceed to Book now ({counter} item) <i class="fas fa-arrow-circle-right"></i></button>
                                </div>
                            }
                        </div>

                        {/* popup for bookingdetails */}
                        <Modal className="modal-open" show={isBslotOpen} onHide={hideSlotModal} size="" backdrop="static">
                            <div className="modal-header" >
                                <h5 className="modal-title"> * Select Booking Slot</h5>
                                <button class="btn btn-outline-danger btn-sm" onClick={hideSlotModal}>X</button>
                            </div>
                            <div className="modal-body">
                                <div class=" row mt-2 ml-4 mr-4">
                                    {/* <label className="form-label form-label-lg float-center col-md-4 ml-4">
                                        Pick time slot for booking :
                                    </label> */}
                                    <select className=" form-control form-control-lg col-md- float-center" type="text" placeholder="Select Time solt" value={slotTime} onChange={handleSlotChange}>
                                        <option selected value="">Pick time slot for booking</option>
                                        <option value="09:00AM">Morning (09:00 AM)</option>
                                        <option value="05:00PM">Evining (05:00 AM)</option>
                                    </select>
                                </div>
                                <div class="row mt-4 ml-4 mr-4">
                                    {/* <label className="form-label  form-label-lg float-center ml-4 col-md-4">
                                        Select Booking date :
                                    </label> */}
                                    <input type="text" onBlur={(e) => (e.target.type = "text")} onFocus={(e) => (e.target.type = "date")}
                                        className="form-control form-control-lg col-md- float-center" value={bookingDate}
                                        onChange={handleDateChange} placeholder="Enter Booking date" />
                                </div>
                                <div class=" row mt-4 ml-4 mr-4">
                                    <select className=" form-control form-control-lg col-md- float-center" type="number" placeholder="Select Number of day" value={rentDay} onChange={handleRentDayChange}>
                                        <option selected value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                                <div className="card float-right mt-3">
                                    <h5 className="text-right font-weight-bold ml-4 mr-4 mt-3">Total Amount  :  <strike className="text-danger"><i class="far fa-times-circle"></i>{(rentTotalAmt * rentDay)}</strike></h5>
                                    <h5 className="text-right font-weight-bold ml-4 mr-4">Saving Amount :  <i class="fas fa-minus-circle"></i>{(rentTotalSavingAmt * rentDay)}</h5>
                                    <h5 className="text-right font-weight-bold text-success ml-4 mr-4">Payble Amount :  <i class="fas fa-rupee-sign"></i>{getPaybleAmount() * rentDay}</h5>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {slotTime !== "" && bookingDate !== "" &&
                                    <button class="btn btn-success" onClick={acceptAggrement}><i class="far fa-check-circle"></i> Procced  </button>}
                                <button class="btn btn-danger" onClick={handleSlotChange}>Cancel</button>
                            </div>
                        </Modal>
                        {/* popup for accepet aggrement */}
                        <Modal className="modal-open" show={isOpen} onHide={hideModal} size="lg" backdrop="static">
                            <div className="modal-header" >
                                <h5 className="modal-title"> * Terms And Conditions</h5>
                                <button class="btn btn-outline-danger btn-sm" onClick={hideModal}>X</button>
                            </div>
                            <div className="modal-body">
                                <input type="checkbox" className="custom-checkbox ml-2 mr-2 " name="aggrement1" value="aggrement1" onChange={(e) => onChange(e, (!aggrement.aggrement1))} />
                                <label for="aggrement1" > If you break the equipment then you have to total amount of equipment</label><br />
                                <input type="checkbox" className="custom-checkbox ml-2 mr-2" name="aggrement2" value="aggrement2" onChange={(e) => onChange(e, (!aggrement.aggrement2))} />
                                <label for="aggrement2" > If you have to submit deposit/Security amount at the time of pikup equipment</label><br />
                                <input type="checkbox" className="custom-checkbox ml-2 mr-2" name="aggrement3" value="aggrement3" onChange={(e) => onChange(e, (!aggrement.aggrement3))} />
                                <label for="aggrement3"> You have to return equipment within 24 hours only. </label><br />
                                <input type="checkbox" className="custom-checkbox ml-2 mr-2" name="aggrement4" value="aggrement4" onChange={(e) => onChange(e, (!aggrement.aggrement4))} />
                                <label for="aggrement4" > If you have extended time then you are applicable for extra charges.</label><br />
                            </div>
                            <div className="modal-footer">
                                {aggrement.aggrement1 && aggrement.aggrement2 && aggrement.aggrement3 && aggrement.aggrement4 &&
                                    <button class="btn btn-success" onClick={proceedToBuy}><i class="far fa-check-circle"></i> Agree With All  </button>}
                                <button class="btn btn-danger" onClick={hideModal}>Cancel</button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RentLine;
