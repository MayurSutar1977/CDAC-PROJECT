package com.rsys.dto;

import org.springframework.http.HttpStatus;

public class ResponseDTO<T> 
{
	private HttpStatus status;
	private T result;
	private String message;
	
	public ResponseDTO() {
		// TODO Auto-generated constructor stub
	}

	public ResponseDTO(HttpStatus status, T result, String message) {
		super();
		this.status = status;
		this.result = result;
		this.message = message;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public T getresult() {
		return result;
	}

	public void setresult(T result) {
		this.result = result;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "ResponseDTO [status=" + status + ", result=" + result + ", message=" + message + "]";
	}
	
}
