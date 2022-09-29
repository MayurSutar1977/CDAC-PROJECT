package com.rsys.dto;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

public class LoginDTO {
	@NotNull
	private String userName;
	@NotNull
	private String password;

	public LoginDTO() {
		
	}

	public LoginDTO(@NotNull String userName, @NotNull String password) {
		super();
		this.userName = userName;
		this.password = password;
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

	@Override
	public String toString() {
		return "LoginDTO [userName=" + userName + ", password=" + password + "]";
	}

}
