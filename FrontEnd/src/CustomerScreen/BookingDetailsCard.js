import React from 'react'

function BookingDetailsCard(props) {
    return (
        <div className="row">
            <div className="col-md-6 ">
                <div class=" border">
                    <label class="col-md-5 col-form-label">Security Deposit</label> {props.booking.securityDeposit}
                </div>
                <div class=" border">
                    <label class="col-md-5 col-form-label">Rent date</label>{props.booking.rentDate}
                </div>
                <div class=" border">
                    <label class="col-md-5 col-form-label">Rent Time Slot</label> {props.booking.timeSlot}
                </div>
                <div class=" border">
                    <label class="col-md-5 col-form-label">Rent days</label> {props.booking.rentDay}
                </div>
                <div class=" border">
                    <label class="col-md-5 col-form-label">Total Amount</label> {props.totalAmount}
                </div>
                <div class="row border" style={{ marginLeft: "0px", marginRight: "0px" }}>
                    <label class="col-md-5 col-form-label">Bookinng Status </label> <span className="col-md-7 btn btn-block bg-warning disabled"> {props.booking.bookingStatus}</span>
                </div>
            </div>
            <div className="col-md-6">
                <div class=" border">
                    <label class="col-md-5 col-form-label">Booking Id </label>{props.booking.id}
                </div>
                <div class=" border">
                    <label class="col-md-5 col-form-label">Booking date </label>{props.booking.bookingDate}
                </div>
                <div class=" border">
                    <label class="col-md-5 col-form-label">Total Equipment</label>{props.bookingDetails.length}
                </div>
                <div class=" border">
                    <label class="col-md-5 col-form-label">Saving Amount</label> {props.totalAmount - props.booking.totalRentAmount}
                </div>
                <div class=" border">
                    <label class="col-md-5 col-form-label">Final Amount</label>{props.booking.totalRentAmount}
                </div>
            </div>
        </div>
    )
}
export default BookingDetailsCard
