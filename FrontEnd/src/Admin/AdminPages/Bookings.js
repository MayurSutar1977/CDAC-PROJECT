import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminNavbar'
import AdminSidebar from '../AdminSidebar'
import BookingService from '../Services/BookingService';

function Bookings(props) {
    const [bookings, setBookings] = useState([]);
    const [creteria, setCretaria] = useState("");
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");

    const onFocus = (e) => {
        if (creteria === "bookingDate")
            e.currentTarget.type = "date"
        else
            e.currentTarget.type = "text"
    }

    const onSearch = (e) => {
        e.preventDefault();
        BookingService.getBookingsByCriteria(creteria, search).then(res => {
            if (res.data.result !== null) {
                setBookings(res.data.result);
                setMessage("")
            }
            else {
                setBookings([]);
                setMessage("Bookings are not found...")
            }
            // console.log(res.data.result)
        })
    }

    const getAllBookings = () => {
        BookingService.getAllBookings().then(res => {
            setBookings(res.data.result);
            setMessage("")
        })
    }
    const updateBookingStatus = (id, status) => {
        BookingService.updateBookingStatus(id, status).then(res => {
            // setBookings(res.data.result);
            res.data.result !== null && alert("Booking " + status.toLowerCase())
            res.data.result === null && alert("Action failed ....")
            res.data.result !== null && window.location.reload();
        })
    }

    const viewBookingDetals = (id) => {
        props.history.push(`/view-booking-details/${id}`);
    }
    useEffect(() => {
        getAllBookings();
    }, [])
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
                        <div className="card mt-0 content">
                            <div className="card-header">
                                <h2 className="text-center">All avilable Bookings list</h2>
                            </div>
                            <div className="card-body ">
                                <div className="row">
                                    <div class="input-group input-group-lg mr-2 ml-2 mb-2">
                                        <input type="text" class="form-control" onFocus={onFocus} onChange={(e) => { setSearch(e.target.value) }} value={search} />
                                        <select className="form-control p-2" onChange={(e) => { setCretaria(e.target.value) }}>
                                            <option selected value="">Select Searching Criteria</option>
                                            <option value="bookingDate">Select by Booking date</option>
                                            <option value="userId">Select by User Id</option>
                                            <option value="userName">Select by User Name </option>
                                            <option value="bookingDate">Select by Booking date</option>
                                        </select>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-primary" onClick={onSearch}>Search</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row ">
                                    <span className="" >
                                        <h5 className="text-center ">{message}</h5>
                                    </span>
                                </div>
                                <table className="table table-hover" >
                                    <thead className="text-center  ">
                                        <tr>
                                            <th>Id</th>
                                            <th>Booking date </th>
                                            <th>Booking Status </th>
                                            <th>Rent Date </th>
                                            <th>Time Slot </th>
                                            <th>Rent day  </th>
                                            <th>Security Deposit </th>
                                            <th>Total Amount </th>
                                            <th>Extra Charges </th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            bookings.map(
                                                booking =>
                                                    <tr key={booking.id}>
                                                        <td>{booking.id}</td>
                                                        <td>{booking.bookingDate}</td>
                                                        <td className={booking.bookingStatus === 'PENDING' ? "text-danger" : "text-success"}>{booking.bookingStatus}</td>
                                                        <td>{booking.rentDate}</td>
                                                        <td>{booking.timeSlot}</td>
                                                        <td>{booking.rentDay}</td>
                                                        <td >{booking.securityDeposit}</td>
                                                        <td>{booking.totalRentAmount}</td>
                                                        <td>{booking.delayCharges}</td>
                                                        <td>
                                                            <button className={(booking.bookingStatus !== 'ACCEPTED') ? ('btn btn-outline-success') : ('btn btn-outline-success disabled')} onClick={() => updateBookingStatus(booking.id, "ACCEPTED")} >Accept</button>
                                                            <button className="btn btn-outline-primary ml-2 disabled" onClick={() => updateBookingStatus(booking.id, "PICKUPED_BY_CUSTOMER")} >Pickuped</button>
                                                            <button className="btn btn-outline-secondary ml-2" onClick={() => updateBookingStatus(booking.id, "RECIVED_AT_CENTER")} >Recived</button>
                                                            <button className="btn btn-outline-info  ml-2" onClick={() => viewBookingDetals(booking.id)} >View</button>
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
    )
}

export default Bookings
