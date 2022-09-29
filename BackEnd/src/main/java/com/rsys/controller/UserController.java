package com.rsys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rsys.dto.ChartDataDto;
import com.rsys.dto.ResponseDTO;
import com.rsys.dto.UserDetailsOutDTO;
import com.rsys.dto.UserProfileInDto;
import com.rsys.pojos.entity.User;
import com.rsys.pojos.entity.UserAddress;
import com.rsys.pojos.entity.UserProfile;
import com.rsys.services.impls.EmailService;
import com.rsys.services.interfaces.ICloudinaryService;
import com.rsys.services.interfaces.IUserServices;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	private IUserServices userServices;
	@Autowired
	private ICloudinaryService cloudinaryService;

	@Autowired
	private EmailService emailService;

	public UserController() {
		System.out.println("User controller invoked...............");
	}

	@PostMapping("/signup")
	public ResponseDTO<?> registerNew(@RequestBody User newUser) {
		try {
			User registerdUser = userServices.registerNew(newUser);
			return new ResponseDTO<>(HttpStatus.OK, registerdUser, "User registered successfully........");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, e.getMessage());
		}
	}

	@PostMapping("/remove-user")
	public ResponseDTO<?> removeUser(@RequestBody int userId) {
		try {
			User registerdUser = userServices.removeUser(userId);
			return new ResponseDTO<>(HttpStatus.OK, registerdUser, "User removed successfully........");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, e.getMessage());
		}
	}

	@PostMapping("/user_profile")
	public ResponseDTO<?> addUserProfile(@RequestBody UserProfileInDto newUser) {
		try {
			System.out.println(newUser);
			UserProfile profileDetails = userServices.addUserProfile(newUser);
			emailService.sendMail(profileDetails.getEmail(), "Registration successful on RSYS",
					"Hi " + profileDetails.getFirstName()
							+ "\n\t Welcome to rental system, registration successful.\n! Thanks !");
			return new ResponseDTO<>(HttpStatus.OK, profileDetails, "User profile details added successfully........");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, e.getMessage());
		}
	}

	@Async
	@GetMapping("/user-profile/{userId}")
	public ResponseDTO<?> getUserProfile(@PathVariable int userId) {
		try {
			UserProfile profileDetails = userServices.getUserProfile(userId);
			System.out.println(profileDetails);
			return new ResponseDTO<>(HttpStatus.OK, profileDetails, "User profile detrails added successfully........");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, e.getMessage());
		}
	}

	@GetMapping("/get_by_id/{userId}")
	public ResponseDTO<?> getUserById(@PathVariable int userId) {
		try {
			User user = userServices.getUserById(userId);
			return new ResponseDTO<>(HttpStatus.OK, user, "User is found with id  " + userId + " ........");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, e.getMessage());
		}
	}

	@GetMapping("/get-user-data-for-chart")
	public ResponseDTO<?> getUsersDataForChart() {
		try {
			ChartDataDto user = userServices.getUsersDataForChart();
			return new ResponseDTO<>(HttpStatus.OK, user, "User is loaded ........");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, e.getMessage());
		}
	}

	@GetMapping("/fatch-all-user")
	public ResponseDTO<?> getUserAll() {
		try {
			List<User> users = userServices.getUserAll();
			return new ResponseDTO<>(HttpStatus.OK, users, "User is found with.......");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, e.getMessage());
		}
	}

	@GetMapping("/fatch-all-users-only")
	public ResponseDTO<?> getAllUsersOnly() {
		try {
			List<User> users = userServices.getAllUsersOnlyLength();
			System.out.println(users);
			return new ResponseDTO<>(HttpStatus.OK, users, "User is found with.......");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, e.getMessage());
		}
	}

	@GetMapping("/fetch-user-address/{userId}")
	public ResponseDTO<?> getUserAddress(@PathVariable int userId) {
		try {
			UserAddress userAddress = userServices.getUserAddress(userId);
			return new ResponseDTO<>(HttpStatus.OK, userAddress, "User is found with id  " + userId + " ........");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, e.getMessage());
		}

	}

	@PutMapping("/update-user-address/{userId}")
	public ResponseDTO<?> updateUserAddress(@PathVariable int userId, @RequestBody UserAddress address) {
		try {
			System.out.println(address);
			UserAddress userAddress = userServices.updateUserAddress(userId, address);
			return new ResponseDTO<>(HttpStatus.OK, userAddress, "User is found with id  " + userId + " ........");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, e.getMessage());
		}

	}

	@PutMapping("/update-profile/{userId}")
	public ResponseDTO<?> updateProfile(@PathVariable int userId, @RequestBody UserProfileInDto newUser) {
		try {
			System.out.println(newUser);
			UserProfile profileImage = userServices.updateProfileImage(userId, newUser);
			return new ResponseDTO<>(HttpStatus.OK, profileImage, "User is found with id  " + userId + " ........");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, e.getMessage());
		}

	}

}
