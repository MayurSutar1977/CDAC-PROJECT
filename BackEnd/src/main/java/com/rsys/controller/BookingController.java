package com.rsys.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rsys.dto.ChartDataDto;
import com.rsys.dto.ResponseDTO;
import com.rsys.pojos.entity.RentBooking;
import com.rsys.pojos.enums.BookingStatus;
import com.rsys.services.interfaces.IRentalBookingService;

@RestController
@CrossOrigin
@RequestMapping("/api/booking")
public class BookingController {

	@Autowired
	private IRentalBookingService bookingService;

	public BookingController() {
		// TODO Auto-generated constructor stub
	}

	@GetMapping("fatch-all-booking")
	public ResponseDTO<?> getAllBookings() {
		try {
			List<RentBooking> allBookings = bookingService.getAllBookings();
			return new ResponseDTO<>(HttpStatus.OK, allBookings, "These all are avialable rental bookings...");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "failed to load rental bookings...");
		}
	}

	@GetMapping("/fatch-booking-by-criteria/{criteria}/search/{search}")
	public ResponseDTO<?> getBookingsByCriteria(@PathVariable String criteria, @PathVariable String search) {
		try {
			System.out.println("invoked...");
			List<RentBooking> allBookings = bookingService.getBookingsByCriteria(criteria, search);
			return new ResponseDTO<>(HttpStatus.OK, allBookings, "These all are avialable rental bookings...");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "failed to load rental bookings...");
		}
	}

	@GetMapping("booking-by-id/{bookingId}")
	public ResponseDTO<?> getBookingById(@PathVariable int bookingId) {
		try {
			RentBooking booking = bookingService.getBookingById(bookingId);
			return new ResponseDTO<>(HttpStatus.OK, booking, "These all are avialable rental bookings...");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "failed to load rental bookings...");
		}
	}

	@PostMapping("/update-booking/{id}/status/{status}")
	public ResponseDTO<?> updateBookingStatus(@PathVariable int id, @PathVariable BookingStatus status) {
		try {
			System.out.println("invoked");
			RentBooking rentBooking = bookingService.updateBookingStatus(id, status);
			return new ResponseDTO<>(HttpStatus.OK, rentBooking, "These all are avialable rental bookings...");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "failed to load rental bookings...");
		}

	}

	@GetMapping("/booking-data-for-chart")
	public ResponseDTO<?> getBookingDataForChart() {
		try {
			return new ResponseDTO<>(HttpStatus.OK, bookingService.getBookingDataForChart(),
					"These all are avialable rental bookings...");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "failed to load rental bookings...");
		}

	}

	@GetMapping("/booking-data-for-chart/status/{status}")
	public ResponseDTO<?> getBookingDataForChart(@PathVariable BookingStatus status) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, bookingService.getBookingDataForChart(status),
					"These all are avialable rental bookings...");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "failed to load rental bookings...");
		}

	}
	
	// payment by booking 
	
	@GetMapping("/get-payment-by-booking/{bookingId}")
	public ResponseDTO<?> getPaymentDetailsByBookingId(@PathVariable int bookingId) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, bookingService.getPaymentDetailsByBookingId(bookingId),
					"These all are avialable rental bookings...");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "failed to load rental bookings...");
		}

	}
	@GetMapping("/get-booking-total-amount/{bookingId}")
	public ResponseDTO<?> getBookingTotalAmount(@PathVariable int bookingId) {
		try {
			System.out.println(bookingService.getBookingTotalAmount(bookingId));
			return new ResponseDTO<>(HttpStatus.OK, bookingService.getBookingTotalAmount(bookingId),
					"These all are avialable rental bookings...");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "failed to load rental bookings...");
		}

	}
	
	

}
