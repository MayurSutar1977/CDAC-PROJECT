package com.rsys.dto;

public class UserIdEquipmentIdDTO {
	private int userId;
	private int equipmentId;
	public UserIdEquipmentIdDTO() {
	
	}
	public UserIdEquipmentIdDTO(int userId, int equipmentId) {
		super();
		this.userId = userId;
		this.equipmentId = equipmentId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getEquipmentId() {
		return equipmentId;
	}
	public void setEquipmentId(int equipmentId) {
		this.equipmentId = equipmentId;
	}
	@Override
	public String toString() {
		return "UserIdEquipmentIdDTO [userId=" + userId + ", equipmentId=" + equipmentId + "]";
	}
	
}
