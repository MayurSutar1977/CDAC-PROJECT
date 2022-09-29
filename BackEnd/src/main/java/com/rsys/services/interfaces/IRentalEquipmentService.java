package com.rsys.services.interfaces;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.rsys.pojos.entity.RentalEquipment;

public interface IRentalEquipmentService {

	List<RentalEquipment> getAllEquipment();

	RentalEquipment getEquipmentById(int equipId);

	RentalEquipment getEquipmentByName(String catName);

	RentalEquipment addNewEquipment(RentalEquipment equipment, int catId);

	RentalEquipment removeEquipment(int equipId);

	List<RentalEquipment> getEquipmentByCategoryName(@NotNull String catName);

	RentalEquipment updateEquipmentById(@NotNull int equipId, RentalEquipment equipment);

	 List<RentalEquipment> getEquipmentByCategoryId(@NotNull int catId);

	List<RentalEquipment> getAllEquipmentForAdmin();

	List<RentalEquipment> fetchEquipmentByCategoryId(int catId);

	List<RentalEquipment> getLatestEquipment();


}
