package com.rsys.pojos.entity;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rsys.pojos.enums.Currency;
import com.rsys.pojos.enums.PaymentGatway;
import com.rsys.pojos.enums.PaymentStatus;

@Entity
public class Payment extends BaseEntity {

	@Enumerated(EnumType.STRING)
	private Currency currency;

	private String reciptEmail;

	private String chId;

	@Enumerated(EnumType.STRING)
	@Column(length = 20, nullable = false)
	private PaymentGatway paymentGatway;

	private LocalDate paymentDate;

	@Enumerated(EnumType.STRING)
	@Column(length = 20, nullable = false)
	private PaymentStatus paymentStatus;

	private double amount;

	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "booking_id")
	private RentBooking rentBooking;

	@OneToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "user_id")
	private User user;

	public Payment() {

	}

	public Payment(Currency currency, String reciptEmail, String chId, PaymentGatway paymentGatway,
			LocalDate paymentDate, PaymentStatus paymentStatus, double amount) {
		super();
		this.currency = currency;
		this.reciptEmail = reciptEmail;
		this.chId = chId;
		this.paymentGatway = paymentGatway;
		this.paymentDate = paymentDate;
		this.paymentStatus = paymentStatus;
		this.amount = amount;
	}

	public Currency getCurrency() {
		return currency;
	}

	public void setCurrency(Currency currency) {
		this.currency = currency;
	}

	public String getReciptEmail() {
		return reciptEmail;
	}

	public void setReciptEmail(String reciptEmail) {
		this.reciptEmail = reciptEmail;
	}

	public String getChId() {
		return chId;
	}

	public void setChId(String chId) {
		this.chId = chId;
	}

	public PaymentGatway getPaymentGatway() {
		return paymentGatway;
	}

	public void setPaymentGatway(PaymentGatway paymentGatway) {
		this.paymentGatway = paymentGatway;
	}

	public LocalDate getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(LocalDate paymentDate) {
		this.paymentDate = paymentDate;
	}

	public PaymentStatus getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(PaymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public RentBooking getRentBooking() {
		return rentBooking;
	}

	public void setRentBooking(RentBooking rentBooking) {
		this.rentBooking = rentBooking;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Payment [currency=" + currency + ", reciptEmail=" + reciptEmail + ", chId=" + chId + ", paymentGatway="
				+ paymentGatway + ", paymentDate=" + paymentDate + ", paymentStatus=" + paymentStatus + ", amount="
				+ amount + "]";
	}

}
