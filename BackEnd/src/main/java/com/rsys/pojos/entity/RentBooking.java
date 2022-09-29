package com.rsys.pojos.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rsys.pojos.enums.BookingStatus;

@Entity
public class RentBooking extends BaseEntity {
	private LocalDate bookingDate;
	private LocalTime bookingTime;
	private double totalRentAmount;
	private double securityDeposit;
	private int delayCharges;
	@Enumerated(EnumType.STRING)
	@Column(length = 20, nullable = false)
	private BookingStatus bookingStatus;
	private LocalDate rentDate;
	private int rentDay;
	private LocalTime timeSlot;
	private LocalDate recivedDate;
	private LocalTime recivedTimeSlot;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", nullable = true)
	private User user;

	@JsonIgnore
	@OneToMany(targetEntity = BookingDetail.class, mappedBy = "rentBooking")
	private List<BookingDetail> bookingDetails = new ArrayList<>();

	public RentBooking() {
		// TODO Auto-generated constructor stub
	}

	public RentBooking(LocalDate bookingDate, LocalTime bookingTime, double totalRentAmount, double securityDeposit,
			BookingStatus bookingStatus, LocalDate rentDate, int rentDay, LocalTime timeSlot) {
		super();
		this.bookingDate = bookingDate;
		this.bookingTime = bookingTime;
		this.totalRentAmount = totalRentAmount;
		this.securityDeposit = securityDeposit;
		this.bookingStatus = bookingStatus;
		this.rentDate = rentDate;
		this.rentDay = rentDay;
		this.timeSlot = timeSlot;

	}

	public LocalDate getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(LocalDate bookingDate) {
		this.bookingDate = bookingDate;
	}

	public LocalTime getBookingTime() {
		return bookingTime;
	}

	public void setBookingTime(LocalTime bookingTime) {
		this.bookingTime = bookingTime;
	}

	public double getTotalRentAmount() {
		return totalRentAmount;
	}

	public void setTotalRentAmount(double totalRentAmount) {
		this.totalRentAmount = totalRentAmount;
	}

	public double getSecurityDeposit() {
		return securityDeposit;
	}

	public void setSecurityDeposit(double securityDeposit) {
		this.securityDeposit = securityDeposit;
	}

	public BookingStatus getBookingStatus() {
		return bookingStatus;
	}

	public void setBookingStatus(BookingStatus bookingStatus) {
		this.bookingStatus = bookingStatus;
	}

	public LocalDate getRentDate() {
		return rentDate;
	}

	public void setRentDate(LocalDate rentDate) {
		this.rentDate = rentDate;
	}

	public int getRentDay() {
		return rentDay;
	}

	public void setRentDay(int rentDay) {
		this.rentDay = rentDay;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<BookingDetail> getBookingDetails() {
		return bookingDetails;
	}

	public void setBookingDetails(List<BookingDetail> bookingDetails) {
		this.bookingDetails = bookingDetails;
	}

	public LocalTime getTimeSlot() {
		return timeSlot;
	}

	public void setTimeSlot(LocalTime timeSlot) {
		this.timeSlot = timeSlot;
	}

	public LocalDate getRecivedDate() {
		return recivedDate;
	}

	public void setRecivedDate(LocalDate recivedDate) {
		this.recivedDate = recivedDate;
	}

	public LocalTime getRecivedTimeSlot() {
		return recivedTimeSlot;
	}

	public void setRecivedTimeSlot(LocalTime recivedTimeSlot) {
		this.recivedTimeSlot = recivedTimeSlot;
	}

	public int getDelayCharges() {
		return delayCharges;
	}

	public void setDelayCharges(int delayCharges) {
		this.delayCharges = delayCharges;
	}

	@Override
	public String toString() {
		return "BookingDetail [bookingDate=" + bookingDate + ", totalRentAmount=" + totalRentAmount
				+ ", securityDeposit=" + securityDeposit + ", bookingStatus=" + bookingStatus + ", rentDate=" + rentDate
				+ ", rentDay=" + rentDay + "]";
	}
}
