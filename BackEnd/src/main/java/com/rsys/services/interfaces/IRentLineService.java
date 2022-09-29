package com.rsys.services.interfaces;

import java.util.List;

import com.rsys.dto.UserIdEquipmentIdDTO;
import com.rsys.pojos.entity.RentLine;

public interface IRentLineService {

	List<RentLine> getCartByUserId(int userId);

	RentLine addToRent(UserIdEquipmentIdDTO userIdEquipmentIdDTO);

	List<RentLine> updateCartByUserId(int userId);

	RentLine removeFromRent(int rentId);

	Double getRentTotalAmt(int userId);

	Double getRentTotalSavingAmt(int userId);

	RentLine addToRentOld(UserIdEquipmentIdDTO userIdEquipmentIdDTO);

	RentLine removeFromRentOld(int rentId);

	RentLine addToRentOldPlus(int rentId);

//	RentLine addToRentOld(UserIdEquipmentIdDTO userIdEquipmentIdDTO);


}
