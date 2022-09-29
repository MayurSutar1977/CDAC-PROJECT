package com.rsys.pojos.entity;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class UserProfile extends BaseEntity {

	@NotNull
	@Column(name = "first_name", length = 30, nullable = false)
	private String firstName;

	@NotNull
	@Column(name = "last_name", length = 30, nullable = false)
	private String lastName;

	@NotNull
	@Column(name = "email", length = 30, unique = true, nullable = false)
	private String email;

	@Column( length = 30, unique = true, nullable = false)
	private String idNumber;

	@NotNull
	@Column(length = 10, nullable = true)
	private long phoneNumber;

	@NotNull
	@Column(nullable = false)
	private LocalDate dateOfBirth;

	private String profileImage;

	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", nullable = true)
	private User user;
	
	@JsonIgnore
	@OneToOne(targetEntity = UserAddress.class, mappedBy = "userProfile")
	private UserAddress userAddress;
	/*
	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id", nullable = true)
	private UserAddress userAddress;*/

	public UserProfile() {

	}

	public UserProfile(@NotNull String firstName, @NotNull String lastName, @NotNull String email,
			@NotNull Long phoneNumber, @NotNull LocalDate dateOfBirth, @NotNull String profileImage) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.dateOfBirth = dateOfBirth;
		this.profileImage = profileImage;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public long getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getIdNumber() {
		return idNumber;
	}

	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}

	public UserAddress getUserAddress() {
		return userAddress;
	}

	public void setUserAddress(UserAddress userAddress) {
		this.userAddress = userAddress;
	}

	@Override
	public String toString() {
		return "UserProfile [firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", phoneNumber="
				+ phoneNumber + ", dateOfBirth=" + dateOfBirth + ", profileImage=" + profileImage + "]";
	}
}
