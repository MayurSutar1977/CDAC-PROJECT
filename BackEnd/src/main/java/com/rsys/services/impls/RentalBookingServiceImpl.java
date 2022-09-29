package com.rsys.services.impls;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rsys.dao.IBookingDetailRepository;
import com.rsys.dao.IPaymentRepository;
import com.rsys.dao.IRentBookingRepository;
import com.rsys.dao.IRentLineRepository;
import com.rsys.dao.IRentalEquipmentRepository;
import com.rsys.dao.IUserRepository;
import com.rsys.dto.ChartDataDto;
import com.rsys.dto.InChargeRequestDto;
import com.rsys.dto.PaymentDto;
import com.rsys.exception.UserException;
import com.rsys.pojos.entity.BookingDetail;
import com.rsys.pojos.entity.Payment;
import com.rsys.pojos.entity.RentBooking;
import com.rsys.pojos.entity.RentLine;
import com.rsys.pojos.entity.RentalEquipment;
import com.rsys.pojos.entity.User;
import com.rsys.pojos.enums.BookingStatus;
import com.rsys.pojos.enums.Currency;
import com.rsys.pojos.enums.PaymentGatway;
import com.rsys.pojos.enums.PaymentStatus;
import com.rsys.services.interfaces.IRentalBookingService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;

@Service
@Transactional
public class RentalBookingServiceImpl implements IRentalBookingService {
	@Autowired
	private IRentBookingRepository bookingRepository;
	@Autowired
	private IUserRepository userRepository;
	@Autowired
	private IRentLineRepository rentLineRepository;
	@Autowired
	private IRentalEquipmentRepository equipmentRepository;
	@Autowired
	private IBookingDetailRepository bookingDetailRepository;
	@Autowired
	private IPaymentRepository paymentRepository;
	@Autowired
	private EmailService emailService;

	@Value("${STRIPE_SECRET_KEY}")
	private String secretKey;

	@PostConstruct
	public void init() {
		Stripe.apiKey = secretKey;
	}

	@Override
	public int addBooking(int userId, double totalPrice, String timeSlot, String bookingDate, int rentDays) {
		System.out.println("rent booking");
		RentBooking rentBooking = new RentBooking();
		System.out.println("rent booking");
		rentBooking.setBookingStatus(BookingStatus.PENDING);
		rentBooking.setBookingDate(LocalDate.now());
		rentBooking.setBookingTime(LocalTime.now());
		rentBooking.setRentDate(LocalDate.parse(bookingDate));
		rentBooking.setRentDay(rentDays);
		rentBooking.setTotalRentAmount(totalPrice);
		rentBooking.setSecurityDeposit(totalPrice * 2);
		System.out.println(timeSlot);
		rentBooking.setTimeSlot(LocalTime.parse((timeSlot.equals("09:00AM")) ? ("09:00") : ("17:00")));
		System.out.println(rentBooking);
		rentBooking.setUser(userRepository.findById(userId).get());
		System.out.println(rentBooking);
		return bookingRepository.save(rentBooking).getId();
	}
	/*
	 * @Override public List<BookingDetail> addBookingDetails(int userId, int
	 * orderId) { List<BookingDetail> bookingDetail = new
	 * ArrayList<BookingDetail>(); RentBooking rentBooking =
	 * bookingRepository.findById(orderId).get(); User user =
	 * userRepository.findById(userId).get(); List<RentLine> lineItems =
	 * rentLineRepository.getRentByUserId(userId); for (RentLine line : lineItems) {
	 * RentalEquipment equipment =
	 * equipmentRepository.findByEquipmentName(line.getEquipmentName()).get(); if
	 * (equipment.getAvialableQuantity() > 0) { int qty =
	 * equipment.getAvialableQuantity() - 1; equipment.setAvialableQuantity(qty);
	 * BookingDetail booking = new BookingDetail();
	 * booking.setEquipementName(line.getEquipmentName());
	 * booking.setFinalRent(line.getFinalRent());
	 * booking.setOfferDiscount(line.getOfferDiscount()); booking.setQuantity(1);
	 * booking.setRentPerDay(line.getRentPerDay());
	 * booking.setRentalEquiepment(equipment); booking.setRentBooking(rentBooking);
	 * bookingDetail.add(bookingDetailRepository.save(booking)); } }
	 * rentLineRepository.deleteByUserId(userId); return bookingDetail; }
	 */

	@Override
	public List<BookingDetail> addBookingDetails(int userId, int orderId) {
		List<BookingDetail> bookingDetail = new ArrayList<BookingDetail>();
		RentBooking rentBooking = bookingRepository.findById(orderId).get();
		User user = userRepository.findById(userId).get();
		List<RentLine> lineItems = rentLineRepository.getRentByUserId(userId);
		for (RentLine line : lineItems) {
			RentalEquipment equipment = equipmentRepository.findByEquipmentName(line.getEquipmentName()).get();
			if (equipment.getAvialableQuantity() > 0 && equipment.getAvialableQuantity() >= line.getQuantity()) {
				int qty = equipment.getAvialableQuantity() - line.getQuantity();
				equipment.setAvialableQuantity(qty);
				BookingDetail booking = new BookingDetail();
				booking.setEquipementName(line.getEquipmentName());
				booking.setFinalRent(line.getFinalRent());
				booking.setOfferDiscount(line.getOfferDiscount());
				// added
				booking.setQuantity(line.getQuantity());
				booking.setRentPerDay(line.getRentPerDay());
				booking.setRentalEquiepment(equipment);
				booking.setRentBooking(rentBooking);
				bookingDetail.add(bookingDetailRepository.save(booking));
			}
		}
		rentLineRepository.deleteByUserId(userId);
		return bookingDetail;
	}

	@Override
	public Payment addPaymentDetails(PaymentDto paymentDto) {
		System.out.println(paymentDto);
		Payment payment = new Payment();
		payment.setPaymentDate(LocalDate.now());
		payment.setPaymentStatus(PaymentStatus.PAID);
		if (paymentDto.getPaymentGatway().equals("CREDIT"))
			payment.setPaymentGatway(PaymentGatway.CARD);
		if (paymentDto.getPaymentGatway().equals("COD")) {
			payment.setPaymentGatway(PaymentGatway.CASH_ON_DELIVERY);
			payment.setPaymentStatus(PaymentStatus.PENDING);
		}
		User user = userRepository.findById(paymentDto.getUserId()).get();
		payment.setUser(user);
		RentBooking booking = bookingRepository.findById(paymentDto.getOrderId()).get();
		payment.setRentBooking(booking);
		payment.setAmount(booking.getTotalRentAmount());
		return paymentRepository.save(payment);
	}

	@Override
	public Payment addPaymentDetailsCard(InChargeRequestDto chargeRequest) throws StripeException {
		List<Object> paymentMethodTypes = new ArrayList<>();
		paymentMethodTypes.add("card");
		Map<String, Object> chargeParams = new HashMap<>();
		chargeParams.put("amount", Math.round(chargeRequest.getAmount()));
		System.out.println(Math.round(chargeRequest.getAmount()));
		chargeParams.put("currency", chargeRequest.getCurrency());
		chargeParams.put("description", chargeRequest.getDescription());
		chargeParams.put("receipt_email", chargeRequest.getStripeEmail());
		chargeParams.put("source", chargeRequest.getStripeToken());
		Charge create = Charge.create(chargeParams);

		Payment payment = new Payment();
		payment.setAmount(create.getAmount());
		payment.setChId(create.getId());
		payment.setPaymentGatway(PaymentGatway.CARD);
		payment.setPaymentDate(LocalDate.now());
		payment.setPaymentStatus(PaymentStatus.PAID);
		payment.setReciptEmail(create.getReceiptEmail());
		payment.setCurrency(Currency.INR);
		User user = userRepository.findById(chargeRequest.getUserId()).get();
		payment.setUser(user);
		RentBooking o = bookingRepository.findById(chargeRequest.getOrderId()).get();
		payment.setRentBooking(o);
		return paymentRepository.save(payment);
	}


	@Override
	public List<RentBooking> loadRentBookingHistory(int userId) {
		User user = userRepository.findById(userId).get();
		return bookingRepository.findByUser(user);
	}

	@Override
	public List<BookingDetail> viewBookingDetails(int orderId) {
		RentBooking booking = bookingRepository.findById(orderId).get();
		return bookingDetailRepository.findByRentBooking(booking);

	}

	@Override
	public List<RentBooking> getBookingsByCriteria(String criteria, String search) {
		System.out.println(criteria + "  " + search);
		if (criteria.equals("bookingDate"))
			return bookingRepository.findByBookingDate(LocalDate.parse(search));
		else if (criteria.equals("userId"))
			return bookingRepository.findByUser(userRepository.findById(Integer.valueOf(search)).get());
		else if (criteria.equals("userName"))
			return bookingRepository.findByUser(userRepository.findByUserName(search).get());
		return bookingRepository.findAll();
	}

	// for cancel booking by user
	@Override
	public RentBooking cancelBooking(int bookingId) throws MessagingException {
		RentBooking booking = bookingRepository.findById(bookingId).get();
		if ((booking.getBookingStatus() == BookingStatus.PENDING
				|| booking.getBookingStatus() == BookingStatus.ACCEPTED)
				&& booking.getBookingStatus() != BookingStatus.PICKUPED_BY_CUSTOMER
				&& booking.getBookingStatus() != BookingStatus.RECIVED_AT_CENTER) {
			List<BookingDetail> bookingDetails = booking.getBookingDetails();
			for (BookingDetail bookingDetail : bookingDetails) {
				RentalEquipment rentalEquipment = equipmentRepository
						.findByEquipmentName(bookingDetail.getEquipementName()).get();
				rentalEquipment
						.setAvialableQuantity(rentalEquipment.getAvialableQuantity() + bookingDetail.getQuantity());
				equipmentRepository.save(rentalEquipment);
			}
			booking.setBookingStatus(BookingStatus.CANCELED);
			sendRentalCancelEmail(booking);
			return bookingRepository.save(booking);
		}
		throw new UserException("Failed to cancel booking");
	}

	// this method return the list of all bookings for admin purpose
	@Override
	public List<RentBooking> getAllBookings() {
		return bookingRepository.findAll();
	}

	@Override
	public ChartDataDto getBookingDataForChart() {
		List<Integer> bookingPerMonth = new ArrayList<>();
		List<Integer> montsOfBookings = bookingRepository.getMontsOfBookings();
		for (Integer month : montsOfBookings) {
			bookingPerMonth.add(bookingRepository.countForMonth(month));
		}
		ChartDataDto chartDataDto = new ChartDataDto(montsOfBookings, bookingPerMonth);
		System.out.println(chartDataDto);
		return chartDataDto;
	}

	@Override
	public ChartDataDto getBookingDataForChart(BookingStatus status) {
		List<Integer> bookingPerMonth = new ArrayList<>();
		List<Integer> montsOfBookings = bookingRepository.getMontsOfBookings();
//		List<Integer> montsOfBookings = bookingRepository.getMontsOfAcceptedBookings(status);
		for (Integer month : montsOfBookings) {
			bookingPerMonth.add(bookingRepository.countForMonthAccepted(month, status));
		}
		ChartDataDto chartDataDto = new ChartDataDto(montsOfBookings, bookingPerMonth);
		System.out.println(chartDataDto);
		return chartDataDto;
	}

	@Override
	public RentBooking getBookingById(int bookingId) {
		RentBooking rentBooking = bookingRepository.findById(bookingId).get();
		return rentBooking;
	}

	@Override
	public RentBooking updateBookingStatus(int id, BookingStatus status) throws MessagingException {
		RentBooking rentBooking = bookingRepository.findById(id).get();
		if (rentBooking.getBookingStatus() == BookingStatus.PENDING && status == BookingStatus.ACCEPTED) {
			rentBooking.setBookingStatus(status);
			sendRentalAcceptanceEmail(rentBooking);
			return bookingRepository.save(rentBooking);
		} else if (rentBooking.getBookingStatus() == BookingStatus.ACCEPTED
				&& status == BookingStatus.PICKUPED_BY_CUSTOMER) {
			rentBooking.setBookingStatus(status);
			sendRentalPickupEmail(rentBooking);
			return bookingRepository.save(rentBooking);
		} else if (rentBooking.getBookingStatus() == BookingStatus.PICKUPED_BY_CUSTOMER
				&& status == BookingStatus.RECIVED_AT_CENTER) {
			List<BookingDetail> bookingDetails = rentBooking.getBookingDetails();
			for (BookingDetail bookingDetail : bookingDetails) {
				RentalEquipment rentalEquipment = equipmentRepository
						.findByEquipmentName(bookingDetail.getEquipementName()).get();
				rentalEquipment
						.setAvialableQuantity(rentalEquipment.getAvialableQuantity() + bookingDetail.getQuantity());
				equipmentRepository.save(rentalEquipment);
			}
			rentBooking.setBookingStatus(status);
			rentBooking.setRecivedDate(LocalDate.now());
			rentBooking.setRecivedTimeSlot(LocalTime.now());
			rentBooking.setDelayCharges(calculateExtraChages(rentBooking.getTotalRentAmount(),
					rentBooking.getRentDate(), rentBooking.getRentDay(), rentBooking.getRecivedDate(),
					rentBooking.getTimeSlot(), rentBooking.getRecivedTimeSlot()));
			sendRentalRecivedEmail(rentBooking);
			return bookingRepository.save(rentBooking);
		}
		return null;
	}

	// helper method for extra charges..
	private int calculateExtraChages(double totalAmount, LocalDate rentDate, int rentDay, LocalDate recivedDate,
			LocalTime timeSlot, LocalTime recivedTimeSlot) {
		int days = Period.between(rentDate, recivedDate).getDays();
		long hours = Duration.between(timeSlot, recivedTimeSlot).toHours();
		hours = (hours < 1) ? 0 : hours;
		System.out.println(hours);
		if (days == rentDay && hours == 0) {
			return 0;
		}
		return (int) ((int) (totalAmount / 24) * hours);
	}

	// helper method for send email of rental retrived ....
	private void sendRentalRecivedEmail(RentBooking rentBooking) throws MessagingException {

		int hrs = (int) ((rentBooking.getDelayCharges() / (rentBooking.getTotalRentAmount() / 24)));
		String toEmail = rentBooking.getUser().getUserProfile().getEmail();
		String subject = "Confirmation of Rental Recived At Center";
		String message = "Hi " + rentBooking.getUser().getUserProfile().getFirstName() + ","
				+ "\nWe appreciate the recent rental equipments are recived successfull at center (Rental System For Camera Accessories) on date: "
				+ LocalDate.now().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL)) + "and at time: "
				+ LocalTime.now().format(DateTimeFormatter.ofPattern("hh:mm a"))
				+ ", your security deposit are refunded. "
				+ (((rentBooking.getDelayCharges()) > 0)
						? "\nYou are applicable LATE CAHREGES: " + rentBooking.getDelayCharges() + " Of " + hrs
								+ " hours" + ".\nBecause of you extended the time of return the equipment at center."
						: "")
				+ "\nThanks Visit Again!\n\nBest Regards\nRSYS (Mayuri Manjare) \\n+(91) 8208982567.";
		emailService.sendMail(toEmail, subject, message);
	}

	// helper method for send email of rental acceptance ....
	private void sendRentalAcceptanceEmail(RentBooking rentBooking) throws MessagingException {
		String toEmail = rentBooking.getUser().getUserProfile().getEmail();
		String subject = "Confirmation of Rental Booking Accepted.";
		String message = "Hi " + rentBooking.getUser().getUserProfile().getFirstName() + ","
				+ "\n    We appreciate the recent rental equipments booking are accepted successfull by (Rental System For Camera Accessories), Please diposit your security deposit and pickup the rental on date: "
				+ rentBooking.getRentDate().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL)) + "."
				+ "\nThanks Visit Again!\n\nBest Regards\nRSYS (Mayuri Manjare) \\n+(91) 8208982567";
		emailService.sendMail(toEmail, subject, message);
	}

	// helper method for send email of rental cancel ....
	private void sendRentalCancelEmail(RentBooking rentBooking) throws MessagingException {
		String toEmail = rentBooking.getUser().getUserProfile().getEmail();
		String subject = "Confirmation of  Rental Booking Cancellation ";
		String message = "Hi " + rentBooking.getUser().getUserProfile().getFirstName() + ","
				+ "\n    We appreciate the recent rental booking are canceled successfull by (Rental System For Camera Accessories) on date: "
				+ LocalDate.now().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL)) + " time: "
				+ LocalTime.now().format(DateTimeFormatter.ofPattern("hh:mm a")) + " ."
				+ "\nThanks Visit Again!\n\nBest Regards\nRSYS (Mayuri Manjare) \\n+(91) 8208982567";
		emailService.sendMail(toEmail, subject, message);
	}

	// helper method for send email of rental cancel ....
	private void sendRentalPickupEmail(RentBooking rentBooking) throws MessagingException {
		String toEmail = rentBooking.getUser().getUserProfile().getEmail();
		String subject = "Confirmation of Rental Booking Pickuped.";
		String message = "Hi " + rentBooking.getUser().getUserProfile().getFirstName() + ","
				+ "\n    We appreciate the recent rental equipments booking are pickuped successfull from center of RSYS(Rental System For Camera Accessories). Please take care of all equipments and please submit at "
				+ rentBooking.getTimeSlot().format(DateTimeFormatter.ofPattern("hh:mm a")) + " on date: "
				+ (rentBooking.getRentDate().plusDays(rentBooking.getRentDay())) + "."
				+ "\nThanks Visit Again!\n\nBest Regards\nRSYS (Mayuri Manjare) \n+(91) 8208982567.";
		emailService.sendMail(toEmail, subject, message);
	}

	@Override
	public Payment getPaymentDetailsByBookingId(int bookingId) {
		RentBooking booking = getBookingById(bookingId);
		return paymentRepository.findByRentBooking(booking).get();
	}
	
	@Override
	public double getBookingTotalAmount(int bookingId) {
		RentBooking booking = getBookingById(bookingId);
		return (bookingDetailRepository.getSumOfRentAmount(booking)*booking.getRentDay());
	}

	@Override
	public double getBookingSavingAmount(int bookingId) {
		// TODO Auto-generated method stub
		return 0;
	}

}
