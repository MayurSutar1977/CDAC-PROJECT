package com.rsys.pojos.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "rental_equipment")
public class RentalEquipment extends BaseEntity {

	@Column(length = 50, nullable = false, unique = true)
	private String equipmentName;

	@Column(length = 50, nullable = false)
	private String brand;

	private int avialableQuantity;

	private double rentPerDay;

	private double offerDiscount;

	private double finalRent;

	private double delayCharges;

	@Column(length = 100, nullable = false)
	private String image;

	@Column(length = 250, nullable = false)
	private String decription;

	private LocalDate registrationDate;

	private LocalDate updatedDate;
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "equipment_category", nullable = false)
	private Category category;

	public RentalEquipment() {

	}

	public RentalEquipment(String equipmentName, String brand, int avialableQuantity, double rentPerDay,
			double offerDiscount, double finalRent, double delayCharges, String image, String decription,
			LocalDate registrationDate, LocalDate updatedDate) {
		super();
		this.equipmentName = equipmentName;
		this.brand = brand;
		this.avialableQuantity = avialableQuantity;
		this.rentPerDay = rentPerDay;
		this.offerDiscount = offerDiscount;
		this.finalRent = finalRent;
		this.delayCharges = delayCharges;
		this.image = image;
		this.decription = decription;
		this.registrationDate = registrationDate;
		this.updatedDate = updatedDate;
	}

	public String getEquipmentName() {
		return equipmentName;
	}

	public void setEquipmentName(String equipmentName) {
		this.equipmentName = equipmentName;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public int getAvialableQuantity() {
		return avialableQuantity;
	}

	public void setAvialableQuantity(int avialableQuantity) {
		this.avialableQuantity = avialableQuantity;
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

	public double getDelayCharges() {
		return delayCharges;
	}

	public void setDelayCharges(double delayCharges) {
		this.delayCharges = delayCharges;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDecription() {
		return decription;
	}

	public void setDecription(String decription) {
		this.decription = decription;
	}

	public LocalDate getRegistrationDate() {
		return registrationDate;
	}

	public void setRegistrationDate(LocalDate registrationDate) {
		this.registrationDate = registrationDate;
	}

	public LocalDate getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(LocalDate updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	@Override
	public String toString() {
		return "RentalEquipment [equipmentName=" + equipmentName + ", brand=" + brand + ", avialableQuantity="
				+ avialableQuantity + ", rentPerDay=" + rentPerDay + ", offerDiscount=" + offerDiscount + ", finalRent="
				+ finalRent + ", delayCharges=" + delayCharges + ", image=" + image + ", decription=" + decription
				+ ", registrationDate=" + registrationDate + ", updatedDate=" + updatedDate + "]";
	}

}
