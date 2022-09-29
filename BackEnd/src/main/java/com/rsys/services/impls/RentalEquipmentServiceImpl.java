package com.rsys.services.impls;

import java.awt.print.Pageable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rsys.dao.ICategoryRepository;
import com.rsys.dao.IRentalEquipmentRepository;
import com.rsys.exception.UserException;
import com.rsys.pojos.entity.Category;
import com.rsys.pojos.entity.RentalEquipment;
import com.rsys.services.interfaces.IRentalEquipmentService;

import net.bytebuddy.asm.Advice.OffsetMapping.Sort;

@Service
@Transactional
public class RentalEquipmentServiceImpl implements IRentalEquipmentService {

	@Autowired
	IRentalEquipmentRepository equipmentRepository;

	@Autowired
	ICategoryRepository categoryRepository;

	@Override
	public List<RentalEquipment> getAllEquipmentForAdmin() {
		return equipmentRepository.findAll();
	}

	@Override
	public List<RentalEquipment> getAllEquipment() {
		List<RentalEquipment> allEquipment = equipmentRepository.findAll();
		List<RentalEquipment> allEquipmentList = new ArrayList<RentalEquipment>();
		for (RentalEquipment equipment : allEquipment) {
			if (equipment.getAvialableQuantity() > 0)
				allEquipmentList.add(equipment);
		}
		return allEquipmentList;
	}

	@Override
	public List<RentalEquipment> getLatestEquipment() {
		List<RentalEquipment> latestEquipment = equipmentRepository.getLatestEquipment();
		int counter = 0;
		List<RentalEquipment> fiveLatestEquipment = new ArrayList<RentalEquipment>();
		for (RentalEquipment rentalEquipment : latestEquipment) {
			fiveLatestEquipment.add(rentalEquipment);
			counter++;
			if (counter == 5)
				return fiveLatestEquipment;
		}
		return latestEquipment;
	}

	@Override
	public RentalEquipment getEquipmentById(int equipId) {
		Optional<RentalEquipment> optionalEquipment = equipmentRepository.findById(equipId);
		RentalEquipment equipment = optionalEquipment
				.orElseThrow(() -> new UserException("Equipment is not found with id " + equipId));
		return equipment;
	}

	@Override
	public RentalEquipment getEquipmentByName(String equipName) {
		Optional<RentalEquipment> optionalEquipment = equipmentRepository.findByEquipmentName(equipName);
		RentalEquipment equipment = optionalEquipment
				.orElseThrow(() -> new UserException("Equipment is not found with Name " + equipName));
		return equipment;
	}

	@Override
	public RentalEquipment addNewEquipment(RentalEquipment equipment, int catId) {
		// get a category from category table
		Optional<Category> optionalUser = categoryRepository.findById(catId);
		Category category = optionalUser.orElseThrow(() -> new UserException("Category is not found with id " + catId));
		// set category to the equipment
		equipment.setCategory(category);
		// persist equipment into table
		equipment.setUpdatedDate(LocalDate.now());
		equipment.setRegistrationDate(LocalDate.now());
		RentalEquipment addedEquipement = equipmentRepository.save(equipment);
		// add equipment to category for bi-directional relationship between category
		// and equipment table
		List<RentalEquipment> equipmentsList = category.getEquipments();
		equipmentsList.add(addedEquipement);
		category.setEquipments(equipmentsList);
		// persist updated category.............
		categoryRepository.save(category);
		return addedEquipement;
	}

	@Override
	public RentalEquipment removeEquipment(int equipId) {
		Optional<RentalEquipment> optionalEquipment = equipmentRepository.findById(equipId);
		RentalEquipment equipment = optionalEquipment
				.orElseThrow(() -> new UserException("Equipment is not found with id " + equipId));
		equipmentRepository.deleteById(equipId);
		return equipment;
	}

	@Override
	public List<RentalEquipment> getEquipmentByCategoryName(@NotNull String catName) {
		Optional<Category> optionalUser = categoryRepository.findByCategoryName(catName);
		Category category = optionalUser
				.orElseThrow(() -> new UserException("Category is not found with name " + catName));
		return equipmentRepository.getEquipmentByCategoryName(category);
	}

	@Override
	public List<RentalEquipment> getEquipmentByCategoryId(@NotNull int catId) {
		Optional<Category> optionalCategory = categoryRepository.findById(catId);
		Category category = optionalCategory
				.orElseThrow(() -> new UserException("Category is not found with name " + catId));
		List<RentalEquipment> allEquipment = equipmentRepository.getEquipmentByCategoryName(category);
		List<RentalEquipment> allEquipmentList = new ArrayList<RentalEquipment>();
		for (RentalEquipment equipment : allEquipment) {
			if (equipment.getAvialableQuantity() > 0)
				allEquipmentList.add(equipment);
		}
		return allEquipmentList;
	}

	@Override
	public List<RentalEquipment> fetchEquipmentByCategoryId(@NotNull int catId) {
		Optional<Category> optionalCategory = categoryRepository.findById(catId);
		Category category = optionalCategory
				.orElseThrow(() -> new UserException("Category is not found with name " + catId));
		return equipmentRepository.getEquipmentByCategoryName(category);
	}

	@Override
	public RentalEquipment updateEquipmentById(@NotNull int equipId, RentalEquipment newEquipment) {
		Optional<RentalEquipment> optionalEquipment = equipmentRepository.findById(equipId);
		RentalEquipment equipment = optionalEquipment
				.orElseThrow(() -> new UserException("Equipment is not found with id " + equipId));
		equipment.setEquipmentName(newEquipment.getEquipmentName());
		equipment.setBrand(newEquipment.getBrand());
		equipment.setAvialableQuantity(newEquipment.getAvialableQuantity());
		equipment.setDelayCharges(newEquipment.getDelayCharges());
		equipment.setFinalRent(newEquipment.getFinalRent());
		equipment.setRentPerDay(newEquipment.getRentPerDay());
		equipment.setImage(newEquipment.getImage());
		equipment.setOfferDiscount(newEquipment.getOfferDiscount());
		equipment.setDecription(newEquipment.getDecription());
		equipment.setUpdatedDate(LocalDate.now());
		return equipmentRepository.save(equipment);
	}
}
