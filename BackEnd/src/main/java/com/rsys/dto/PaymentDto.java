package com.rsys.dto;

public class PaymentDto {

	private String paymentGatway;
	private int orderId;
	private int userId;

	public PaymentDto() {
		
	}

	public PaymentDto(String paymentGatway, int orderId, int userId) {
		super();
		this.paymentGatway = paymentGatway;
		this.orderId = orderId;
		this.userId = userId;
	}

	public String getPaymentGatway() {
		return paymentGatway;
	}

	public void setPaymentGatway(String paymentGatway) {
		this.paymentGatway = paymentGatway;
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
		return "PaymentDto [paymentGatway=" + paymentGatway + ", orderId=" + orderId + ", userId=" + userId + "]";
	}

}
