package com.rsys.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rsys.pojos.entity.Category;
import com.rsys.pojos.entity.RentalEquipment;

public interface IRentalEquipmentRepository extends JpaRepository<RentalEquipment, Integer> {

	Optional<RentalEquipment> findByEquipmentName(String equipName);

	@Query(value = "SELECT e from RentalEquipment e WHERE e.category=:category ")
	List<RentalEquipment> getEquipmentByCategoryName(Category category);
	
	@Query(value="SELECT e FROM RentalEquipment e ORDER BY e.registrationDate DESC")
	//@Query(value = "select e FROM RentalEquipment e ORDER BY e.registrationDate DESC LIMIT 5")
	List<RentalEquipment> getLatestEquipment();

}
