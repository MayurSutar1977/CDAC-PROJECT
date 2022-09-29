package com.rsys.dto;

import com.rsys.pojos.enums.Currency;

public class InChargeRequestDto {

	private String description;
	private double amount;
	private Currency currency;
	private String stripeEmail;
	private String stripeToken=null;
	private int orderId;
	private int userId;

	public InChargeRequestDto() {
		// TODO Auto-generated constructor stub
	}

	public InChargeRequestDto(String description, double amount, Currency currency, String stripeEmail,
			String stripeToken, int orderId, int userId) {
		super();
		this.description = description;
		this.amount = amount;
		this.currency = currency;
		this.stripeEmail = stripeEmail;
		this.stripeToken = stripeToken;
		this.orderId = orderId;
		this.userId = userId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Currency getCurrency() {
		return currency;
	}

	public void setCurrency(Currency currency) {
		this.currency = currency;
	}

	public String getStripeEmail() {
		return stripeEmail;
	}

	public void setStripeEmail(String stripeEmail) {
		this.stripeEmail = stripeEmail;
	}

	public String getStripeToken() {
		return stripeToken;
	}

	public void setStripeToken(String stripeToken) {
		this.stripeToken = stripeToken;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "ChargeRequest [description=" + description + ", amount=" + amount + ", currency=" + currency
				+ ", stripeEmail=" + stripeEmail + ", stripeToken=" + stripeToken + ", orderId=" + orderId + ", userId="
				+ userId + "]";
	}

}