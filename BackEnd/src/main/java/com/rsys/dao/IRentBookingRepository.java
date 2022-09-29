package com.rsys.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rsys.pojos.entity.RentBooking;
import com.rsys.pojos.entity.User;
import com.rsys.pojos.enums.BookingStatus;

public interface IRentBookingRepository extends JpaRepository<RentBooking, Integer> {

	List<RentBooking> findByUser(User user);

	@Query("SELECT distinct month(b.bookingDate) FROM RentBooking b ")
	List<Integer> getMontsOfBookings();

	@Query("select count(*) from RentBooking r where month(r.bookingDate) = :month")
	int countForMonth(int month);

	@Query("SELECT distinct month(b.bookingDate) FROM RentBooking b where b.bookingStatus=:status ")
	List<Integer> getMontsOfAcceptedBookings(BookingStatus status);

	@Query("select count(*) from RentBooking r where month(r.bookingDate) = :month and r.bookingStatus=:status")
	int countForMonthAccepted(int month,BookingStatus status);

	 List<RentBooking> findByBookingDate(LocalDate parse);

}
