package com.rsys.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rsys.pojos.entity.BookingDetail;
import com.rsys.pojos.entity.RentBooking;
import com.rsys.pojos.entity.User;

public interface IBookingDetailRepository extends JpaRepository<BookingDetail, Integer> {

	List<BookingDetail> findByRentBooking(RentBooking booking);
	
	@Query(value = "select sum(bd.quantity) from BookingDetail bd where bd.rentBooking=:rentBooking")
	double getSumOfQuantity(RentBooking rentBooking);

	@Query(value = "select sum(bd.rentPerDay) from BookingDetail bd where bd.rentBooking=:rentBooking")
	double getSumOfRentAmount(RentBooking rentBooking);
	
	@Query(value = "select sum(bd.finalRent) from BookingDetail bd where bd.rentBooking=:rentBooking")
	double getSumOfRentTotalAmount(RentBooking rentBooking);


	
}
