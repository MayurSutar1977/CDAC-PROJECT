package com.rsys.pojos.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class BookingDetail extends BaseEntity {
	@Column(length = 50, nullable = false)
	private String equipementName;

	private int quantity;

	private double rentPerDay;

	private double offerDiscount;

	private double finalRent;

	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "equipement_id", nullable = true)
	private RentalEquipment rentalEquiepment;

	@ManyToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "booking_id")
	private RentBooking rentBooking;

	public BookingDetail() {
		// TODO Auto-generated constructor stub
	}

	public BookingDetail(String equipementName, int quantity, double rentPerDay, double offerDiscount,
			double finalRent) {
		super();
		this.equipementName = equipementName;
		this.quantity = quantity;
		this.rentPerDay = rentPerDay;
		this.offerDiscount = offerDiscount;
		this.finalRent = finalRent;
	}

	public String getEquipementName() {
		return equipementName;
	}

	public void setEquipementName(String equipementName) {
		this.equipementName = equipementName;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getRentPerDay() {
		return rentPerDay;
	}

	public void setRentPerDay(double rentPerDay) {
		this.rentPerDay = rentPerDay;
	}

	public double getOfferDiscount() {
		return offerDiscount;
	}

	public void setOfferDiscount(double offerDiscount) {
		this.offerDiscount = offerDiscount;
	}

	public double getFinalRent() {
		return finalRent;
	}

	public void setFinalRent(double finalRent) {
		this.finalRent = finalRent;
	}

	public RentalEquipment getRentalEquiepment() {
		return rentalEquiepment;
	}

	public void setRentalEquiepment(RentalEquipment rentalEquiepment) {
		this.rentalEquiepment = rentalEquiepment;
	}

	public RentBooking getRentBooking() {
		return rentBooking;
	}

	public void setRentBooking(RentBooking rentBooking) {
		this.rentBooking = rentBooking;
	}

	@Override
	public String toString() {
		return "BookingDetail [equipementName=" + equipementName + ", quantity=" + quantity + ", rentPerDay="
				+ rentPerDay + ", offerDiscount=" + offerDiscount + ", finalRent=" + finalRent + ", getId()=" + getId()
				+ "]";
	}
	
	
}
