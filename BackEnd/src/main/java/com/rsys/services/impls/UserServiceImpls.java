package com.rsys.services.impls;

import static com.rsys.utils.UserValidation.passwordValidation;
import static com.rsys.utils.UserValidation.userNameDuplication;
import static com.rsys.utils.UserValidation.userNameValidation;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rsys.dao.IUserAddressRepository;
import com.rsys.dao.IUserProfileRepository;
import com.rsys.dao.IUserRepository;
import com.rsys.dto.ChartDataDto;
import com.rsys.dto.UserDetailsOutDTO;
import com.rsys.dto.UserProfileInDto;
import com.rsys.exception.UserException;
import com.rsys.pojos.entity.User;
import com.rsys.pojos.entity.UserAddress;
import com.rsys.pojos.entity.UserProfile;
import com.rsys.pojos.enums.UserRole;
import com.rsys.services.interfaces.IUserServices;

@Service
@Transactional
public class UserServiceImpls implements IUserServices {
	@Autowired
	private IUserRepository userRepository;
	@Autowired
	private IUserProfileRepository userProfileRepository;
	@Autowired
	private IUserAddressRepository addressRepository;

//	private BCryptPasswordEncoder passwordEncoder =new BCryptPasswordEncoder();

	public UserServiceImpls() {

	}

	@Override
	public List<User> getUserAll() {
		// userName,firstName,lastName,email,idNumber,phoneNumber,dateOfBirth,profileImage
		return userRepository.findAll();
	}

	@Override
	public List<User> getAllUsersOnlyLength() {
		List<User> findByUsersRole = userRepository.findByUserRole(UserRole.CUSTOMER);
		return findByUsersRole;
	}
	@Override
	public List<UserDetailsOutDTO> getAllUsersOnly() {
		List<User> findByUsersRole = userRepository.findByUserRole(UserRole.CUSTOMER);
		System.out.println(findByUsersRole);
		List<UserDetailsOutDTO> userDetailsList = new ArrayList<>();
		for (User user : findByUsersRole) {
			UserProfile userProfile = user.getUserProfile();// user.getUserProfile();
			if (userProfile != null) {
				userDetailsList.add(new UserDetailsOutDTO(user.getId(), user.getUserName(), userProfile.getFirstName(),
						userProfile.getLastName(), userProfile.getPhoneNumber(), userProfile.getEmail(),
						userProfile.getDateOfBirth(), userProfile.getProfileImage()));
			}
		}
		System.out.println(userDetailsList);
		return userDetailsList;
	}

	@Override
	public User registerNew(User newUser) {
		userNameValidation(newUser.getUserName());
		userNameDuplication(userRepository.findAll(), newUser.getUserName());
		passwordValidation(newUser.getPassword(), newUser.getConfirmPassword());
		newUser.setRegistrationDate(LocalDate.now());
		// newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
		return userRepository.save(newUser);
	}

	@Override
	public User getUserById(int userId) {
		Optional<User> optionalUser = userRepository.findById(userId);
		User user = optionalUser.orElseThrow(() -> new UserException("user is no found with id " + userId));
		return user;
	}

	@Override
	public UserProfile addUserProfile(UserProfileInDto newUser) {
		System.out.println(newUser.getUserId());
		Optional<User> optionalUser = userRepository.findById(newUser.getUserId());
		User user = optionalUser.orElseThrow(() -> new UserException("User is not registered please register...... "));
		System.out.println(user);
		UserProfile validatedUser = new UserProfile();
		validatedUser.setFirstName(newUser.getFirstName());
		validatedUser.setLastName(newUser.getLastName());
		validatedUser.setDateOfBirth(newUser.getDateOfBirth());
		validatedUser.setEmail(newUser.getEmail());
		validatedUser.setPhoneNumber(newUser.getPhoneNumber());
		validatedUser.setIdNumber(newUser.getIdNumber());
		validatedUser.setUser(user);
		validatedUser.setProfileImage(newUser.getProfileImage());
		System.out.println(validatedUser + "   " + newUser.getProfileImage().length());
		UserProfile profile = userProfileRepository.save(validatedUser);
		user.setUserProfile(validatedUser);
		userRepository.save(user);
		return profile;
	}

	@Override
	public UserProfile getUserProfile(int userId) {
		Optional<User> optionalUser = userRepository.findById(userId);
		User user = optionalUser.orElseThrow(() -> new UserException("user is no found ......."));
		Optional<UserProfile> optionalUserProfile = userProfileRepository.getUserProfile(user);
		UserProfile userProfile = optionalUserProfile
				.orElseThrow(() -> new UserException("user profile  no found .... " + userId));
		return userProfile;
	}

	@Override
	public UserAddress getUserAddress(int userId) {
		UserProfile userProfile = getUserProfile(userId);
		// Retrieve address
		Optional<UserAddress> optionalUserAddress = addressRepository.findByUserProfile(userProfile);
		UserAddress address = optionalUserAddress.orElseThrow(() -> new UserException("Address is no found ......."));
		return address;
	}

	@Override
	public UserAddress updateUserAddress(int userId, UserAddress newAddress) {
		try {
			UserAddress userAddress = getUserAddress(userId);
			userAddress.setHomeNumber(newAddress.getHomeNumber());
			userAddress.setSociety(newAddress.getSociety());
			userAddress.setArea(newAddress.getArea());
			userAddress.setCity(newAddress.getCity());
			userAddress.setState(newAddress.getState());
			userAddress.setPinCode(newAddress.getPinCode());
			return addressRepository.save(userAddress);
		} catch (Exception e) {
			UserProfile userProfile = getUserProfile(userId);
			UserAddress userAddress = new UserAddress(newAddress.getHomeNumber(), newAddress.getSociety(),
					newAddress.getArea(), newAddress.getCity(), newAddress.getState(), newAddress.getPinCode());
			userAddress.setUserProfile(userProfile);
			UserAddress save = addressRepository.save(userAddress);
			System.out.println(save);
			return save;
		}
	}

	@Override
	public UserProfile updateProfileImage(int userId, UserProfileInDto newUser) {
		UserProfile userProfile = getUserProfile(userId);
		userProfile.setFirstName(newUser.getFirstName());
		userProfile.setLastName(newUser.getLastName());
		userProfile.setDateOfBirth(newUser.getDateOfBirth());
		userProfile.setEmail(newUser.getEmail());
		userProfile.setPhoneNumber(newUser.getPhoneNumber());
		userProfile.setIdNumber(newUser.getIdNumber());
		userProfile.setProfileImage(newUser.getProfileImage());
		return userProfileRepository.save(userProfile);
	}

	@Override
	public User removeUser(int userId) {
		Optional<User> optionalUser = userRepository.findById(userId);
		User user = optionalUser.orElseThrow(() -> new UserException("user is no found with id " + userId));
		userRepository.deleteById(userId);
		return user;
	}
		
	@Override
	public ChartDataDto getUsersDataForChart() {
		List<Integer> bookingPerMonth = new ArrayList<>();
		List<Integer> montsOfBookings = userRepository.getMontsOfRegistration(UserRole.CUSTOMER);
		for (Integer month : montsOfBookings) {
			bookingPerMonth.add(userRepository.countForMonth(month,UserRole.CUSTOMER));
		}
		ChartDataDto chartDataDto = new ChartDataDto(montsOfBookings, bookingPerMonth);
		System.out.println("User Chart "+chartDataDto);
		return chartDataDto;
	}

}
