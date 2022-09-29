package com.rsys.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rsys.pojos.entity.Payment;
import com.rsys.pojos.entity.RentBooking;

public interface IPaymentRepository extends JpaRepository<Payment, Integer> {

	Optional<Payment> findByRentBooking(RentBooking rentBooking);

}
