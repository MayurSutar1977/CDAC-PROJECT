package com.rsys.dto;

public class ForgotPasswordDto {

	private String userName;
	private String password;
	private String confirmPassword;
	private String token;

	public ForgotPasswordDto() {

	}

	public ForgotPasswordDto(String userName, String password, String confirmPassword, String token) {
		super();
		this.userName = userName;
		this.password = password;
		this.confirmPassword = confirmPassword;
		this.token = token;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "ForgotPasswordDto [userName=" + userName + ", password=" + password + ", confirmPassword="
				+ confirmPassword + ", token=" + token + "]";
	}

}
