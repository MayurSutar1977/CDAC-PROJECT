package com.rsys.services.impls;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rsys.dao.IRentLineRepository;
import com.rsys.dao.IRentalEquipmentRepository;
import com.rsys.dto.UserIdEquipmentIdDTO;
import com.rsys.exception.UserException;
import com.rsys.pojos.entity.RentLine;
import com.rsys.pojos.entity.RentalEquipment;
import com.rsys.services.interfaces.IRentLineService;

@Service
@Transactional
public class RentLineServiceImpl implements IRentLineService {
	@Autowired
	private IRentLineRepository rentLineRepository;

	@Autowired
	IRentalEquipmentRepository equipmentRepository;

	@Override
	public List<RentLine> getCartByUserId(int userId) {
		return rentLineRepository.getRentByUserId(userId);
	}

	@Override
	public RentLine addToRent(UserIdEquipmentIdDTO userIdEquipmentIdDTO) {
		if (userIdEquipmentIdDTO.getUserId() > 0) {
			Optional<RentalEquipment> optionalEquipment = equipmentRepository
					.findById(userIdEquipmentIdDTO.getEquipmentId());
			RentalEquipment equipment = optionalEquipment
					.orElseThrow(() -> new UserException("Equipment is not found with id "));
			RentLine newRent = new RentLine(userIdEquipmentIdDTO.getUserId(), equipment.getEquipmentName(),
					// added one element to cart
					equipment.getBrand(), 1, equipment.getRentPerDay(), equipment.getOfferDiscount(),
					equipment.getFinalRent(), equipment.getDelayCharges(), equipment.getImage(),
					equipment.getDecription(), equipment.getCategory().getCategoryName());
			newRent.setUserId(userIdEquipmentIdDTO.getUserId());
			return rentLineRepository.save(newRent);
		} else {
			throw new UserException("Invalid user id....");
		}
	}

	@Override
	public RentLine addToRentOld(UserIdEquipmentIdDTO userIdEquipmentIdDTO) {
		List<RentLine> rentLines = rentLineRepository.findByUserId(userIdEquipmentIdDTO.getUserId());
		// **************************
		System.out.println("Rents Lines " + rentLines);

		Optional<RentalEquipment> optionalEquipment = equipmentRepository
				.findById(userIdEquipmentIdDTO.getEquipmentId());
		RentalEquipment equipment = optionalEquipment
				.orElseThrow(() -> new UserException("Equipment is not found with id "));
		// **************************
		System.out.println(equipment);

		for (RentLine rentLine : rentLines) {
			if (rentLine.getEquipmentName().equals(equipment.getEquipmentName())) {
				System.out.println(rentLine);
				rentLine.setRentPerDay(rentLine.getRentPerDay() + equipment.getRentPerDay());
//				rentLine.setOfferDiscount(rentLine.getOfferDiscount());
				rentLine.setQuantity(rentLine.getQuantity() + 1);
				rentLine.setFinalRent(rentLine.getFinalRent() + equipment.getFinalRent());
				rentLine.setDelayCharges(rentLine.getDelayCharges() + equipment.getDelayCharges());
				return rentLineRepository.save(rentLine);
			}
		}
		if (userIdEquipmentIdDTO.getUserId() > 0) {
			RentLine newRent = new RentLine(userIdEquipmentIdDTO.getUserId(), equipment.getEquipmentName(),
					equipment.getBrand(), 1, equipment.getRentPerDay(), equipment.getOfferDiscount(),
					equipment.getFinalRent(), equipment.getDelayCharges(), equipment.getImage(),
					equipment.getDecription(), equipment.getCategory().getCategoryName());
			newRent.setUserId(userIdEquipmentIdDTO.getUserId());
			return rentLineRepository.save(newRent);
		} else {
			throw new UserException("Invalid user id....");
		}
	}

	@Override
	public List<RentLine> updateCartByUserId(int userId) {

		List<RentLine> list = rentLineRepository.getRentByUserId(9999);
		for (RentLine cart : list) {
			cart.setUserId(userId);
		}
		return list;
	}

	@Override
	public RentLine removeFromRent(int rentId) {
		Optional<RentLine> optionalRentLine = rentLineRepository.findById(rentId);
		RentLine rentLine = optionalRentLine.orElseThrow(() -> new UserException("Rent line not found with id "));
		rentLineRepository.deleteById(rentId);
		return rentLine;
	}

	@Override
	public RentLine addToRentOldPlus(int rentId) {
		Optional<RentLine> optionalRentLine = rentLineRepository.findById(rentId);
		RentLine rentLine = optionalRentLine.orElseThrow(() -> new UserException("Rent line not found with id "));
//		 if (rentLine.getQuantity() > 1) {
		RentalEquipment equipment = equipmentRepository.findByEquipmentName(rentLine.getEquipmentName()).get();
//		System.out.println(rentLine);
		rentLine.setRentPerDay(rentLine.getRentPerDay() + equipment.getRentPerDay());
//				rentLine.setOfferDiscount(rentLine.getOfferDiscount());
		rentLine.setQuantity(rentLine.getQuantity() + 1);
		rentLine.setFinalRent(rentLine.getFinalRent() + equipment.getFinalRent());
		rentLine.setDelayCharges(rentLine.getDelayCharges() + equipment.getDelayCharges());
		return rentLineRepository.save(rentLine);
//		 }
//		 return rentLine;
	}

	@Override
	public RentLine removeFromRentOld(int rentId) {
		Optional<RentLine> optionalRentLine = rentLineRepository.findById(rentId);
		RentLine rentLine = optionalRentLine.orElseThrow(() -> new UserException("Rent line not found with id "));
		if (rentLine.getQuantity() > 1) {
			RentalEquipment equipment = equipmentRepository.findByEquipmentName(rentLine.getEquipmentName()).get();
			System.out.println(rentLine);
			rentLine.setRentPerDay(rentLine.getRentPerDay() - equipment.getRentPerDay());
//				rentLine.setOfferDiscount(rentLine.getOfferDiscount());
			rentLine.setQuantity(rentLine.getQuantity() - 1);
			rentLine.setFinalRent(rentLine.getFinalRent() - equipment.getFinalRent());
			rentLine.setDelayCharges(rentLine.getDelayCharges() - equipment.getDelayCharges());
			return rentLineRepository.save(rentLine);
		}
		rentLineRepository.deleteById(rentId);
		return rentLine;
	}

	@Override
	public Double getRentTotalAmt(int userId) {
		return rentLineRepository.getRentTotalAmt(userId);
	}

	@Override
	public Double getRentTotalSavingAmt(int userId) {
		double tamt = rentLineRepository.getRentTotalAmt(userId);
		double famt = rentLineRepository.getRentTotalFinalAmt(userId);
		return (tamt - famt);
	}

}
