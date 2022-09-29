package com.rsys.services.interfaces;

import java.util.List;

import com.rsys.dto.ChartDataDto;
import com.rsys.dto.UserDetailsOutDTO;
import com.rsys.dto.UserProfileInDto;
import com.rsys.pojos.entity.User;
import com.rsys.pojos.entity.UserAddress;
import com.rsys.pojos.entity.UserProfile;

public interface IUserServices {

	User registerNew(User newUser);

	User getUserById(int userId);

	UserProfile addUserProfile(UserProfileInDto newUser);

	UserProfile getUserProfile(int userId);

	List<User> getUserAll();

	List<UserDetailsOutDTO> getAllUsersOnly();

	UserAddress getUserAddress(int userId);

	UserAddress updateUserAddress(int userId, UserAddress address);

	UserProfile updateProfileImage(int userId, UserProfileInDto newUser);

	User removeUser(int userId);

	ChartDataDto getUsersDataForChart();

	List<User> getAllUsersOnlyLength();

}
