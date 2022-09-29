import React, { useState, useEffect } from 'react'
import AdminNavbar from '../AdminNavbar';
import AdminSidebar from '../AdminSidebar';
import BookingService from '../Services/BookingService';

function BookingDetails(props) {
    let counter = 0;
    const [bookings, setBookings] = useState([])
    const [bookingDetails, setBookingDetails] = useState([])
    const [userId, setUserId] = useState();

    const back = () => {
        window.history.back();
    }

    // const viewBookingDetails = (id) => {
    //     AllServices.viewBookingDetails(id).then((res) => {
    //         res.data.result !== null && JSON.stringify(window.localStorage.setItem("cart_size", (JSON.parse(window.localStorage.getItem("cart_size")) - 1)));
    //         res.data.result !== null && window.location.reload();
    //     })
    // }
    const loadRentBookingDetails = () => {
        BookingService.viewBookingDetails(props.match.params.id).then((res) => {
            console.log(JSON.stringify(res.data.result))
            setBookingDetails(res.data.result);
        })
        BookingService.getBookingById(props.match.params.id).then((res) => {
            console.log(JSON.stringify(res.data.result))
            setBookings(res.data.result);
        })
    }

    useEffect(() => {
        loadRentBookingDetails();
    }, [])

    return (
        <div>
            <AdminNavbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col col-md-3 mt-1  ">
                    <AdminSidebar />
                </div>
                <div className="col mt-0">
                    <div className="card-mb-3 mt-0 content">
                        <div className="card-header" style={{ backgroundColor: "lightgrey" }}>
                            <h3 className="text-center font-weight-bold">Booking Details </h3>
                        </div>
                        <div className="card-body  ">
                            <div className="row ">
                                <h5 className="ml-auto font-weight-bold ml-4 mr-4">Booking Date : {bookings.bookingDate}</h5>
                            </div>
                            <div className="row">
                                <div className="card" style={{ backgroundColor: "lightcyan" }}>
                                    <div className=" ">
                                        <h5 className="float-left font-weight-bold text-danger ml-4 mr-1 mt-1">Booking Status : {bookings.bookingStatus}</h5>
                                        <h5 className="float-left font-weight-bold text-secondary ml-4 mr-1 mt-1">Rent Date : {bookings.rentDate}</h5>
                                        <h5 className="float-left font-weight-bold text-success ml-4 mr-1 mt-1">Rent Days : {bookings.rentDay}</h5>
                                        <h5 className="float-left font-weight-bold text-primary ml-4 mr-1 mt-1">Security Deposit : {bookings.securityDeposit}</h5>
                                        <h5 className="float-left font-weight-bold text-danger ml-4 mr-1 mt-1">Delay Charges : {bookings.delayCharges}</h5>
                                        <h5 className="float-left font-weight-bold text-success ml-4 mr-1 mt-1">Total Rent Amount : {bookings.totalRentAmount}</h5>
                                    </div>
                                </div>
                            </div>
                            {/* <div className=" float-left ">
                                <h5 className=" font-weight-bold ml-4 mr-4 mt-1">Booking Status : {bookings.bookingStatus}</h5>
                                <h5 className=" font-weight-bold ml-4 mr-4">Rent Date : {bookings.rentDate}</h5>
                                <h5 className=" font-weight-bold text-success ml-4 mr-4">Rent Days : {bookings.rentDay}</h5>
                                <h5 className=" font-weight-bold text-success ml-4 mr-4 ">Security Deposit : {bookings.securityDeposit}</h5>
                                <h5 className=" font-weight-bold text-success ml-4 mr-4  ">Total Rent Amount : {bookings.totalRentAmount}</h5>
                                <h5 className=" font-weight-bold text-danger ml-4 mr-4 ">Delay Charges : {bookings.delayCharges}</h5>
                            </div> */}
                            <table className="table table-hover" >
                                <thead >
                                    <tr className="h5">
                                        <th> Sr.No. </th>
                                        <th> Equipement Name</th>
                                        <th> Quantity </th>
                                        <th> Rent Per Day </th>
                                        <th> Offer Discount </th>
                                        <th> Final Rent </th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        bookingDetails.map(
                                            (booking) =>
                                                <tr key={booking.id}>
                                                    <td>{++counter}</td>
                                                    <td>{booking.equipementName}</td>
                                                    <td>{booking.quantity}</td>
                                                    <td>{booking.rentPerDay}</td>
                                                    <td>{booking.offerDiscount}</td>
                                                    <td>{booking.finalRent}</td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <button className="btn btn-outline-danger mt-2 mb-2 h-100" style={{ width: "130px", borderRadius: "10px" }} onClick={() => back()}>Back<i class="fas fa-back"></i></button>

                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default BookingDetails;
