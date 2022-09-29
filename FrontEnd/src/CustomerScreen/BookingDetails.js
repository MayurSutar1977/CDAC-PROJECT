import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navigation/Navbar'
import Sidebar from '../Components/Navigation/Sidebar'
import AllServices from '../Services/AllServices'
import BookingDetailsCard from './BookingDetailsCard';
import PaymentDetailsCard from './PaymentDetailsCard';

function BookingDetails(props) {
    let counter = 0;
    const [totalAmount, setTotalAmount] = useState(0)
    const [bookingDetails, setBookingDetails] = useState([])
    const [booking, setBooking] = useState({})
    const [payment, setPayment] = useState({});
    // const [userId, setUserId] = useState();

    const back = () => {
        window.history.back();
    }

    const getBookingTotalAmount = () => {
        AllServices.getBookingTotalAmount(props.match.params.id).then((res) => {
            console.log(JSON.stringify(res.data.result))
            res.data.result !== null && setTotalAmount(res.data.result);
        })

    }

    const getBookingById = () => {
        AllServices.getBookingById(props.match.params.id).then((res) => {
            // console.log(JSON.stringify(res.data.result))
            res.data.result !== null && setBooking(res.data.result);
        })
    }

    const getPaymentDetailsByBookingId = () => {
        AllServices.getPaymentDetailsByBookingId(props.match.params.id).then((res) => {
            res.data.result !== null && setPayment(res.data.result);
            console.log(payment)
        })
    }

    const loadRentBookingHistory = () => {
        AllServices.viewBookingDetails(props.match.params.id).then((res) => {
            // console.log(JSON.stringify(res.data.result))
            setBookingDetails(res.data.result);
        })
    }

    useEffect(() => {
        loadRentBookingHistory();
        getBookingById();
        getPaymentDetailsByBookingId();
        getBookingTotalAmount();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col col-md-3 mt-1  ">
                    <Sidebar />
                </div>
                <div className="col mt-0">
                    <div className="card  mt-0 content">
                        <div className="card-header bg-secondary text-light">
                            <h2 className="text-center font-weight-bold ">Booking Details </h2>
                        </div>
                        <div className="card">
                            <BookingDetailsCard booking={booking} totalAmount={totalAmount} savingAmount={booking} bookingDetails={bookingDetails} />
                        </div>
                    </div>
                    <div className="card border mt-5">
                        <div className="card-header bg-secondary text-light">
                            <h4 className="text-center font-weight-bold">Payment Details </h4>
                        </div>
                        <PaymentDetailsCard payment={payment} booking={booking} />
                    </div>
                    <div className="card border mt-5 ">
                        <div className="card-header bg-secondary text-light">
                            <h4 className="text-center font-weight-bold">Equipements Details </h4>
                        </div>
                        <table className="table table-hover" >
                            <thead >
                                <tr className="h5">
                                    <th className="border text-center"> Sr.No. </th>
                                    <th className="border text-center"> Equipement Name</th>
                                    <th className="border text-center"> Quantity </th>
                                    <th className="border text-right"> Rent Per Day </th>
                                    <th className="border"> Offer Discount </th>
                                    <th className="border text-right"> Final Rent </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bookingDetails.map(
                                        (booking) =>
                                            <tr key={booking.id}>
                                                <td className="border text-center">{++counter}</td>
                                                <td className="border">{booking.equipementName}</td>
                                                <td className="border text-center">{booking.quantity}</td>
                                                <td className="border text-right">{booking.rentPerDay}</td>
                                                <td className="border text-center">{booking.offerDiscount} %</td>
                                                <td className="border text-right">{booking.finalRent}</td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <div className="card-footer mt-n3">
                            <button className="btn btn-outline-warning" onClick={back}>Back</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default BookingDetails;
