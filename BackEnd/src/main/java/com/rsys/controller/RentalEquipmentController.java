package com.rsys.controller;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rsys.dto.ResponseDTO;
import com.rsys.pojos.entity.RentalEquipment;
import com.rsys.services.interfaces.IRentalEquipmentService;

@RestController
@CrossOrigin
@RequestMapping("/api/equipment")

public class RentalEquipmentController {

	@Autowired
	private IRentalEquipmentService equipmentService;
	
	
	@GetMapping("/fetch-all-equipments")
	public ResponseDTO<?> getAllEquipmentForAdmin() {
		try {
			return new ResponseDTO<>(HttpStatus.OK, equipmentService.getAllEquipmentForAdmin(),
					"This are all avilable equipments......");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Unable to load categories");
		}
	}
	
	@GetMapping("/fetch-equipments")
	public ResponseDTO<?> getAllEquipment() {
		try {
			return new ResponseDTO<>(HttpStatus.OK, equipmentService.getAllEquipment(),
					"This are all avilable equipments......");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Unable to load categories");
		}
	}

	@GetMapping("/get-equipment-by-id/{equipId}")
	public ResponseDTO<?> getEquipmentById(@PathVariable int equipId) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, equipmentService.getEquipmentById(equipId),
					"This is the details of Equipment.............");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Unable to find Equipment");
		}
	}

	
	@GetMapping("/get-equipment-by-name/{equipName}")
	public ResponseDTO<?> getEquipmentByName(@NotNull @PathVariable String equipName) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, equipmentService.getEquipmentByName(equipName),
					"This is the details of Equipment.............");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Unable to find Equipment");
		}
	}
	
	@GetMapping("/get-latest-equipment")
	public ResponseDTO<?> getLatestEquipment() {
		try {
			return new ResponseDTO<>(HttpStatus.OK, equipmentService.getLatestEquipment(),
					"This is the details of Equipment.............");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Unable to find Equipment");
		}
	}

	@PostMapping("/add-equipment/{catId}")
	public ResponseDTO<?> addNewEquipment(@RequestBody RentalEquipment equipment,@PathVariable int catId) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, equipmentService.addNewEquipment(equipment,catId),
					"Equipment added sucessfully");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Unable to add Equipment......");
		}
	}

	@DeleteMapping("/remove-equipment/{equipId}")
	public ResponseDTO<?> removeEquipment(@PathVariable int equipId) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, equipmentService.removeEquipment(equipId),
					"Equipment removed successfully...........");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Unable to remove categories");
		}
	}

	
	
	@GetMapping("/fetch-equipment-by-cat-id/{catId}")
	public ResponseDTO<?> fetchEquipmentByCategoryId(@PathVariable int catId) {
		try {
			System.out.println(catId);
			return new ResponseDTO<>(HttpStatus.OK, equipmentService.fetchEquipmentByCategoryId(catId),
					"This is the details of Equipment.............");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Unable to load equipment.......");
		}
	}
	
	@GetMapping("/get-equipment-by-cat-id/{catId}")
	public ResponseDTO<?> getEquipmentByCategoryId(@PathVariable int catId) {
		try {
			System.out.println(catId);
			return new ResponseDTO<>(HttpStatus.OK, equipmentService.getEquipmentByCategoryId(catId),
					"This is the details of Equipment.............");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Unable to load equipment.......");
		}
	}
	
	//Rental side.................................
	@GetMapping("/find-equipment-by-cat-name/{catName}")
	public ResponseDTO<?> getEquipmentByCategoryName(@NotNull @PathVariable String catName) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, equipmentService.getEquipmentByCategoryName(catName),
					"This is the details of Equipment.............");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Unable to load equipment.......");
		}
	}
	
	@PutMapping("/update-equipment/{equipId}")
	public ResponseDTO<?> updateEquipmentById( @PathVariable int equipId , @RequestBody RentalEquipment equipment) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, equipmentService.updateEquipmentById(equipId,equipment),
					"This is the details of Equipment.............");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Unable to load equipment.......");
		}
	}

}
