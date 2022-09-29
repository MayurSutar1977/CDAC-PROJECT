package com.rsys.pojos.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class UserAddress extends BaseEntity {

	@Column(length = 10)
	private String homeNumber;
	@NotNull
	@Column(length = 40)
	private String society;
	@NotNull
	@Column(length = 10, nullable = false)
	private String area;
	@NotNull
	@Column(length = 20, nullable = false)
	private String city;
	@NotNull
	@Column(length = 20, nullable = false)
	private String state;
	@NotNull
	private int pinCode;

	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "profile_id", nullable = true)
	private UserProfile userProfile;

	/*
	 * @OneToOne(targetEntity = UserProfile.class, mappedBy = "user") private
	 * UserProfile userProfile;
	 */

	public UserAddress() {

	}

	public UserAddress(String homeNumber, @NotNull String society, @NotNull String area, @NotNull String city,
			@NotNull String state, @NotNull int pinCode) {
		super();
		this.homeNumber = homeNumber;
		this.society = society;
		this.area = area;
		this.city = city;
		this.state = state;
		this.pinCode = pinCode;
	}

	public String getHomeNumber() {
		return homeNumber;
	}

	public void setHomeNumber(String homeNumber) {
		this.homeNumber = homeNumber;
	}

	public String getSociety() {
		return society;
	}

	public void setSociety(String society) {
		this.society = society;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public int getPinCode() {
		return pinCode;
	}

	public void setPinCode(int pinCode) {
		this.pinCode = pinCode;
	}

	public UserProfile getUserProfile() {
		return userProfile;
	}

	public void setUserProfile(UserProfile userProfile) {
		this.userProfile = userProfile;
	}

	@Override
	public String toString() {
		return  homeNumber + ", " + society + ",  " + area + ",  " + city
				+ ", " + state + ", " + pinCode+".";
	}

}
