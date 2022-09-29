package com.rsys.services.interfaces;

import java.util.List;

import javax.mail.MessagingException;

import com.rsys.dto.ChartDataDto;
import com.rsys.dto.InChargeRequestDto;
import com.rsys.dto.PaymentDto;
import com.rsys.pojos.entity.BookingDetail;
import com.rsys.pojos.entity.Payment;
import com.rsys.pojos.entity.RentBooking;
import com.rsys.pojos.enums.BookingStatus;

public interface IRentalBookingService {

	public int addBooking(int userId, double totalPrice, String timeSlot, String bookingDate, int rentDays) ;

	List<BookingDetail> addBookingDetails(int userId, int orderId);

	Payment addPaymentDetails(PaymentDto paymentDto);

	Payment addPaymentDetailsCard(InChargeRequestDto chargeRequest) throws Exception;

	public List<RentBooking> loadRentBookingHistory(int userId);

	public List<BookingDetail> viewBookingDetails(int orderId);

	public List<RentBooking> getAllBookings();

	public RentBooking updateBookingStatus(int id, BookingStatus status) throws MessagingException;

	public RentBooking getBookingById(int bookingId);

	ChartDataDto getBookingDataForChart();

	public ChartDataDto getBookingDataForChart(BookingStatus status);

	public RentBooking cancelBooking(int bookingId) throws MessagingException;

	public List<RentBooking> getBookingsByCriteria(String criteria, String search);

	public Payment getPaymentDetailsByBookingId(int bookingId);

	double getBookingSavingAmount(int bookingId);

	public double getBookingTotalAmount(int bookingId);

}
