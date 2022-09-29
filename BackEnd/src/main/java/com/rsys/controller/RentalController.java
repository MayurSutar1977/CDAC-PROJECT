package com.rsys.controller;

import java.io.IOException;
import java.time.LocalDate;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.DocumentException;
import com.rsys.dto.InChargeRequestDto;
import com.rsys.dto.PaymentDto;
import com.rsys.dto.ResponseDTO;
import com.rsys.dto.UserIdEquipmentIdDTO;
import com.rsys.pojos.entity.Payment;
import com.rsys.pojos.enums.Currency;
import com.rsys.services.impls.BillPdfService;
import com.rsys.services.impls.UserPdfService;
import com.rsys.services.interfaces.IRentLineService;
import com.rsys.services.interfaces.IRentalBookingService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class RentalController {
	@Autowired
	private IRentLineService rentLineService;
	@Autowired
	private IRentalBookingService rentalBookingService;
	@Autowired
	private BillPdfService billPdfService;
	@Autowired
	private UserPdfService pdfService;

	@GetMapping("/cart/get-cart-user-id/{userId}")
	public ResponseDTO<?> getCartByUserId(@PathVariable int userId) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, rentLineService.getCartByUserId(userId),
					"Cart for user .... is found");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.NOT_FOUND, null, "sorry");
		}
	}

	@GetMapping("/cart/update-cart-user-id/{userId}")
	public ResponseDTO<?> updateCartByUserId(@PathVariable int userId) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, rentLineService.updateCartByUserId(userId),
					"Cart for user .... is found");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.NOT_FOUND, null, "sorry");
		}
	}

	@GetMapping("/cart/load-rent-lines-user-id/{userId}")
	public ResponseDTO<?> loadRentLineForUser(@PathVariable int userId) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, rentLineService.getCartByUserId(userId),
					"this is your rent line...");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Rent line not found.........");
		}
	}

	// fatch total rent amount
	@GetMapping("/cart/get-total-rent-amount/{userId}")
	public ResponseDTO<?> getRentTotalAmt(@PathVariable int userId) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, rentLineService.getRentTotalAmt(userId),
					"Cart for user .... is found");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.NOT_FOUND, null, "sorry");
		}
	}

	// fatch total saving rent amount
	@GetMapping("/cart/get-total-saving-amount/{userId}")
	public ResponseDTO<?> getRentTotalSavingAmt(@PathVariable int userId) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, rentLineService.getRentTotalSavingAmt(userId),
					"Cart for user .... is found");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.NOT_FOUND, null, "sorry");
		}
	}

	@PostMapping("/cart/add-to-rent")
	public ResponseDTO<?> addToRent(@RequestBody UserIdEquipmentIdDTO userIdEquipmentIdDTO) {
		try {
			System.out.println(userIdEquipmentIdDTO);
			return new ResponseDTO<>(HttpStatus.OK, rentLineService.addToRent(userIdEquipmentIdDTO),
					"! Added to rent !");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.NOT_FOUND, null, "Failed to add to rent....");
		}
	}
	
	@PostMapping("/cart/add-to-rent/old")
	public ResponseDTO<?> addToRentOld(@RequestBody UserIdEquipmentIdDTO userIdEquipmentIdDTO) {
		try {
			System.out.println(userIdEquipmentIdDTO);
			return new ResponseDTO<>(HttpStatus.OK, rentLineService.addToRentOld(userIdEquipmentIdDTO),
					"! Added to rent !");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.NOT_FOUND, null, "Failed to add to rent....");
		}
	}
	
	@GetMapping("/cart/add-to-rent/old/plus/{rentId}")
	public ResponseDTO<?> addToRentOldPlus(@PathVariable int rentId) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, rentLineService.addToRentOldPlus(rentId),
					"! Added to rent !");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.NOT_FOUND, null, "Failed to add to rent....");
		}
	}

	@DeleteMapping("/cart/remove-from-rent/{rentId}")
	public ResponseDTO<?> removeFromRent(@PathVariable int rentId) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, rentLineService.removeFromRent(rentId),
					"Removed successfully......");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.NOT_FOUND, null, "Failed to remove from rent......");
		}
	}
	
	@DeleteMapping("/cart/remove-from-rent/old/{rentId}")
	public ResponseDTO<?> removeFromRentOld(@PathVariable int rentId) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, rentLineService.removeFromRentOld(rentId),
					"Removed successfully......");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.NOT_FOUND, null, "Failed to remove from rent......");
		}

	}

	@GetMapping("/booking/add-booking/{userId}/price/{totalPrice}/time-slot/{timeSlot}/booking-date/{bookingDate}/rent-days/{rentDays}")
	public ResponseDTO<?> addBooking(@PathVariable int userId, @PathVariable double totalPrice,
			@PathVariable String timeSlot, @PathVariable String bookingDate ,@PathVariable int rentDays) {
		System.out.println("in addBooking: " + userId + "  " + totalPrice + " " + bookingDate+" "+rentDays);
		try {
			return new ResponseDTO<>(HttpStatus.OK,
					rentalBookingService.addBooking(userId, totalPrice, timeSlot, bookingDate,rentDays), "Order Added");
//			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Order Not Added");
		} catch (RuntimeException e) {
			System.out.println("err in addOrder : " + e);
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Order Not Added");
		}
	}

	@GetMapping("/booking/booking-details/{userId}/{orderId}")
	public ResponseDTO<?> addBookingDetails(@PathVariable int userId, @PathVariable int orderId) {
		System.out.println("in addorderDetails: " + userId);
		try {
			return new ResponseDTO<>(HttpStatus.OK, rentalBookingService.addBookingDetails(userId, orderId),
					"order Details Added");
		} catch (RuntimeException e) {
			System.out.println("err in addorderDetails : " + e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Order Details Not Added");
		}
	}
	@GetMapping("/booking/booking-cancel/{bookingId}")
	public ResponseDTO<?> cancelBooking(@PathVariable int bookingId) {
		System.out.println("in addorderDetails: " + bookingId);
		try {
			return new ResponseDTO<>(HttpStatus.OK, rentalBookingService.cancelBooking(bookingId),
					"Booking cancel successfully....");
		} catch (Exception e) {
			System.out.println("err in addorderDetails : " + e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Failed to cancel Booking....");
		}
	}

	@PostMapping("/payment/cod-payment")
	public ResponseDTO<?> addPaymentDetails(@RequestBody PaymentDto paymentDto) {
		System.out.println("in addpayment: " + paymentDto);
		try {
			Payment addPaymentDetails = rentalBookingService.addPaymentDetails(paymentDto);
			billPdfService.invoiceBill(paymentDto.getOrderId());
			return new ResponseDTO<>(HttpStatus.OK, addPaymentDetails, "Payment Successfully");
		} catch (RuntimeException | IOException | DocumentException | MessagingException e) {
			System.out.println("err in addpayment : " + e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Payment Not Done", null);
		}
	}

	@PostMapping("/payment/card-payment")
	public ResponseDTO<?> addPaymentDetailsCard(@RequestBody InChargeRequestDto chargeRequest) {
		System.out.println("in addpayment: " + chargeRequest);
		chargeRequest.setDescription("Example charge");
		chargeRequest.setCurrency(Currency.INR);
		try {
			Payment addPaymentDetailsCard = rentalBookingService.addPaymentDetailsCard(chargeRequest);
			billPdfService.invoiceBill(chargeRequest.getOrderId());
			return new ResponseDTO<>(HttpStatus.OK, addPaymentDetailsCard, "Payment Successfully");
		} catch (Exception e) {
			System.out.println("err in addpayment : " + e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Payment Not Done", null);
		}
	}

	@GetMapping("/booking/history/{userId}")
	public ResponseDTO<?> loadRentBookingHistory(@PathVariable int userId) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, rentalBookingService.loadRentBookingHistory(userId),
					"oreder history fatched successfully..........");
		} catch (RuntimeException e) {
			System.out.println("err in addorderDetails : " + e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Order Details Not Added");
		}
	}

	@GetMapping("/booking/booking-details/{orderId}")
	public ResponseDTO<?> viewBookingDetails(@PathVariable int orderId) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, rentalBookingService.viewBookingDetails(orderId),
					"oreder history fatched successfully..........");
		} catch (RuntimeException e) {
			System.out.println("err in addorderDetails : " + e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Order Details Not Added");
		}
	}

}