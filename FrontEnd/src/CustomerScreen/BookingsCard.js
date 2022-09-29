import React, { useState, useEffect } from 'react'
// import AllServices from '../Services/AllServices';

function BookingsCard(props) {
    let counter = 0;
    let counter1 = 0;
    const [bookings, setbookings] = useState([])

    const loadBookings = () => {       
            setbookings(props.bookings);  
    }
    useEffect(() => {
        loadBookings();
    }, []);
    return (
        <div>
            {/* {bookings.length > 0 && props.viewBooking && */}
                <div className="row">
                    <div className="col-md-3 mt-1">
                        <div className="cart sidebar rounded" style={{ backgroundColor: "black" }}>
                            <div className="card-body rounded">
                                {
                                    bookings.map((booking) =>
                                        <div>
                                            <h5>Serial Number : {++counter}</h5>
                                            <div className="h5">Booking Date : {booking.bookingDate}</div>
                                            <div className="h5">Booking Status : {booking.bookingStatus}</div>
                                            <div className="h5">Rent Date : {booking.rentDate}</div>
                                            <div className="h5">Rent Slot : {booking.timeSlot}</div>
                                            <div className="h5">Total Rent Amount : {booking.totalRentAmount}</div>
                                            <hr style={{borderColor:"white"}}/>
                                        </div>
                                        
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 mt-0">
                        <div className="card-mb-3 content mt-1 ml-n2">
                            <div className="card-header">
                                <h3 className=" text-center">Bookings Details</h3>
                            </div>
                            <div className="card-body">
                                <div className="row row-cols-1 row-cols-md-2">
                                    {bookings.map((booking) =>
                                        <div className="col ">
                                            <div className="card mb-2 mt-1" style={{backgroundColor:"lightgoldenrodyellow"}}>
                                                <div className="card-body">
                                                    <h5>Serial Number : {++counter1}</h5>
                                                    <div className="row">
                                                        <label className="col-form-label col-form-label-lg col-md-4 font-weight-bold font-weight-bold ">Booking Date  </label>
                                                        <label className="col-form-label col-form-label-lg col-md-7">: {booking.bookingDate}</label>
                                                    </div>
                                                    <div className="row">
                                                        <label className="col-form-label col-form-label-lg col-md-4 font-weight-bold">Booking Status  </label>
                                                        <label className="col-form-label col-form-label-lg col-md-7">: {booking.bookingStatus}</label>
                                                    </div>
                                                    <div className="row">
                                                        <label className="col-form-label col-form-label-lg col-md-4 font-weight-bold">Booking Time Slot  </label>
                                                        <label className="col-form-label col-form-label-lg col-md-7">: {booking.timeSlot}</label>
                                                    </div>
                                                    <div className="row">
                                                        <label className="col-form-label col-form-label-lg col-md-4 font-weight-bold">Booking Rent Day  </label>
                                                        <label className="col-form-label col-form-label-lg col-md-7">: {booking.rentDay}</label>
                                                    </div>
                                                    <div className="row">
                                                        <label className="col-form-label col-form-label-lg col-md-4 font-weight-bold">Security Deposit  </label>
                                                        <label className="col-form-label col-form-label-lg col-md-7">: {booking.securityDeposit}</label>
                                                    </div>
                                                    <div className="row"><label className="col-form-label col-form-label-lg col-md-4 font-weight-bold">Total Rent Amount  </label>
                                                        <label className="col-form-label col-form-label-lg col-md-7">: {booking.totalRentAmount}</label>
                                                    </div>
                                                    <div className="row">
                                                        <label className="col-form-label col-form-label-lg col-md-4 font-weight-bold">Delay Charges  </label>
                                                        <label className="col-form-label col-form-label-lg col-md-7">: {booking.delayCharges}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default BookingsCard
