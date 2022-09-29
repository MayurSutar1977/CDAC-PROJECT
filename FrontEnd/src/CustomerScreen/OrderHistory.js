import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navigation/Navbar'
import Sidebar from '../Components/Navigation/Sidebar'
import AllServices from '../Services/AllServices'

function OrderHistory(props) {
    let counter = 0;
    const [bookings, setBookings] = useState([])
    const [userId, setUserId] = useState();

    const back = () => {
        window.history.back();
    }
    const cancelBooking = (id) => {

        AllServices.cancelBooking(id).then((res) => {
            console.log(JSON.stringify(res.data.result))
            res.data.result === null && alert(res.data.message);
            res.data.result !== null && alert(res.data.message);
            res.data.result !== null && window.location.reload();
        });
    }

    const viewBookingDetails = (id) => {
        props.history.push(`/booking-details/${id}`)
    }


    const loadRentBookingHistory = () => {
        AllServices.loadRentBookingHistory(JSON.parse(window.localStorage.getItem("user_id"))).then((res) => {
            console.log(JSON.stringify(res.data.result))
            setBookings(res.data.result);
        })
    }

    useEffect(() => {
        setUserId(JSON.parse(window.localStorage.getItem("user_id")))
        loadRentBookingHistory();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col col-md-2 mt-1  ">
                    <Sidebar />
                </div>
                <div className="col mt-0">

                    <div className="card-mb-3 mt-0 content">
                        <div style={{ backgroundColor: "lightgrey" }}>
                            <br />
                            <h2 className="text-center font-weight-bold">Booking History </h2>
                            <hr />
                        </div>

                        <div className="card-body mt-n5 ">
                            <div className="card-body mt-n1 ">

                                <div className="row" >
                                    <table className="table table-hover" >
                                        <thead >
                                            <tr className="h5">
                                                <th> Sr <br />.No. </th>
                                                <th> Booking Date</th>
                                                <th> Total Amount </th>
                                                <th> Security Deposit </th>
                                                <th> Status </th>
                                                <th> Rent Date </th>
                                                <th> Rent Day </th>
                                                <th>Action</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {
                                                bookings.map(
                                                    (booking) =>
                                                        <tr key={booking.id}>
                                                            <td>{++counter}</td>
                                                            <td>{booking.bookingDate}</td>
                                                            <td>{booking.totalRentAmount}</td>
                                                            <td>{booking.securityDeposit}</td>
                                                            <td>{booking.bookingStatus}</td>
                                                            <td>{booking.rentDate}</td>
                                                            <td>{booking.rentDay}</td>
                                                            <td>
                                                                <button className="btn btn-outline-danger" style={{ borderRadius: "10px" }} onClick={() => cancelBooking(booking.id)} >Cancel<i class="fas fa-trash"></i></button>
                                                                <button className="btn btn-outline-info ml-2" style={{ borderRadius: "10px" }} onClick={() => viewBookingDetails(booking.id)} >View <i class="fas fa-info-circle"></i></button>
                                                            </td>
                                                        </tr>
                                                )
                                            }
                                        </tbody>

                                    </table>
                                    {/* <button className="btn btn-outline-success mt-2 mb-2 h-100" style={{ width: "130px", borderRadius: "10px" }} onClick={() => back()}>Add More <i class="fas fa-plus-circle"></i></button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderHistory;
