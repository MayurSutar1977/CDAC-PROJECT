package com.rsys.pojos.entity;

import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class PasswordResetToken {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private int userId;

	private String token;
	@Column(columnDefinition = "TIMESTAMP")
	private LocalDateTime tokenCreationDate;

	private LocalTime tokenTime;

	public PasswordResetToken() {

	}

	public PasswordResetToken(Integer id, int userId, String token, LocalDateTime tokenCreationDate,
			LocalTime tokenTime) {
		super();
		this.id = id;
		this.userId = userId;
		this.token = token;
		this.tokenCreationDate = tokenCreationDate;
		this.tokenTime = tokenTime;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public LocalDateTime getTokenCreationDate() {
		return tokenCreationDate;
	}

	public void setTokenCreationDate(LocalDateTime tokenCreationDate) {
		this.tokenCreationDate = tokenCreationDate;
	}

	public LocalTime getTokenTime() {
		return tokenTime;
	}

	public void setTokenTime(LocalTime tokenTime) {
		this.tokenTime = tokenTime;
	}

	@Override
	public String toString() {
		return "PasswordResetToken [id=" + id + ", userId=" + userId + ", token=" + token + ", tokenCreationDate="
				+ tokenCreationDate + "]";
	}

}