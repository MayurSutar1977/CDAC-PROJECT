package com.rsys.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rsys.pojos.entity.RentLine;

public interface IRentLineRepository extends JpaRepository<RentLine, Integer> {
	
	@Query(value = "select r from RentLine r where r.userId=:userId")
	List<RentLine> getRentByUserId(int userId);
	
	@Query(value = "select sum(r.rentPerDay) from RentLine r where r.userId=:userId")
	Double getRentTotalAmt(int userId);
	
	@Query(value = "select sum(r.finalRent) from RentLine r where r.userId=:userId")
	double getRentTotalFinalAmt(int userId);

	void deleteByUserId(int userId);

	List<RentLine> findByUserId(int userId);

}
