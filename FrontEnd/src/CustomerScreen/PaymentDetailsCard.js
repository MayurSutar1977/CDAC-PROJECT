import React from 'react'

function PaymentDetailsCard(props) {
    return (
        <div className="row">
            <div className="col-md-6 ">
                <div class=" border">
                    <label class="col-md-5 col-form-label">Payment Id</label> {props.payment.id}
                </div>
                <div class=" border">
                    <label class="col-md-5 col-form-label">Payment By User</label>{localStorage.getItem("user_name")}
                </div>
                <div class=" border">
                    <label class="col-md-5 col-form-label">Payment Currency</label> {(!props.booking.currency) ? "INR" : props.booking.currency}
                </div>

                <div class="row border" style={{ marginLeft: "0px", marginRight: "0px" }}>
                    <label class="col-md-5 col-form-label">Payment Gateway </label>
                    <span className="col-md-7 btn btn-block bg-info text-light disabled" > {props.payment.paymentGatway}
                    </span>
                </div>
            </div>
            <div className="col-md-6">
                <div class=" border">
                    <label class="col-md-5 col-form-label">Recipt Email</label> {(props.payment.reciptEmail) ? props.payment.reciptEmail : localStorage.getItem("user_email")}
                </div>
                <div class=" border">
                    <label class="col-md-5 col-form-label">Payment Date</label>{props.payment.paymentDate}
                </div>
                <div class=" border">
                    <label class="col-md-5 col-form-label">Payment Status</label> {props.payment.paymentStatus}
                </div>
                <div class=" border">
                    <label class="col-md-5 col-form-label">Payment Amount</label>{props.payment.amount}
                </div>
            </div>
        </div>
    )
}
export default PaymentDetailsCard
