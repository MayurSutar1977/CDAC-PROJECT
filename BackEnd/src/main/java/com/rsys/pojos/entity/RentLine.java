package com.rsys.pojos.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class RentLine extends BaseEntity {

	@Column(name = "user_id", nullable = true)
	private int userId;
	@Column(length = 50, nullable = false)
	private String equipmentName;

	@Column(length = 50, nullable = false)
	private String brand;

	@Column(nullable = true)
	private int quantity;

	private double rentPerDay;

	private double offerDiscount;

	private double finalRent;

	private double delayCharges;

	@Column(length = 100, nullable = false)
	private String image;

	@Column(length = 100, nullable = false)
	private String decription;

	@Column(length = 30, nullable = false)
	private String categoryName;

	public RentLine() {

	}

	public RentLine(int userId, String equipmentName, String brand,int quantity, double rentPerDay, double offerDiscount,
			double finalRent, double delayCharges, String image, String decription, String categoryName) {
		super();
		this.userId = userId;
		this.equipmentName = equipmentName;
		this.brand = brand;
		this.quantity=quantity;
		this.rentPerDay = rentPerDay;
		this.offerDiscount = offerDiscount;
		this.finalRent = finalRent;
		this.delayCharges = delayCharges;
		this.image = image;
		this.decription = decription;
		this.categoryName = categoryName;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
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

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}


	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	@Override
	public String toString() {
		return "RentLine [userId=" + userId + ", equipmentName=" + equipmentName + ", brand=" + brand + ", rentPerDay="
				+ rentPerDay + ", offerDiscount=" + offerDiscount + ", finalRent=" + finalRent + ", delayCharges="
				+ delayCharges + ", image=" + image + ", decription=" + decription + ", categoryName=" + categoryName
				+ "]";
	}

}
