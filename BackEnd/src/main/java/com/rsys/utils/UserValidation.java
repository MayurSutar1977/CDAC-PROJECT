package com.rsys.utils;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

import com.rsys.exception.UserException;
import com.rsys.pojos.entity.User;
import com.rsys.pojos.enums.UserRole;
import com.sun.el.parser.ParseException;



public class UserValidation 
{
	static final int MIN_LENGTH;
	static final int MAX_LENGTH;
	static final LocalDate currentDate;
	static {
		MIN_LENGTH = 8;
		MAX_LENGTH = 30;
		currentDate = LocalDate.now();
	}


	public static void nameValidation(String name) throws UserException {
		String regexp = "^[A-Za-z]\\w{3,15}$";
		if (!name.matches(regexp))
			throw new UserException("Invalid name....name can not contain number and name length 3 to 15");
	}

	public static void emailIdValidation(String emailId) throws UserException {
		if (!emailId.contains("@") || !emailId.endsWith(".com") || emailId.length() < MIN_LENGTH
				|| emailId.length() > MAX_LENGTH)
			throw new UserException("Invalid EmailId....");

	}

	public static LocalDate userDOB(LocalDate userDob) throws UserException, ParseException {
		if (Period.between(userDob, currentDate).getYears() < 10)
			throw new UserException("Invalid user age ..user age should be > 10 years...");
		return userDob;
	}
	
	public static void userNameValidation(String userName) throws UserException {
		if ( userName.length() < MIN_LENGTH
				 || userName.length() > MAX_LENGTH)
			throw new UserException("Invalid user name....");

	}

	public static void userNameDuplication(List<User> users, String email) throws UserException {
		for (User user : users) {
			if (email.equals(user.getUserName()))
				throw new UserException("userName already exist....");
		}
	}

	public static void passwordValidation(String password, String confirmPassword) throws UserException {
		String regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{8,16})";
		if (password.equals(confirmPassword)) {
			if (!password.matches(regexp))
				throw new UserException(
						"Password length should be more than 8 or less than 16 and contais Special charactor");
		} else
			throw new UserException("Password not matched.....");
	}

}
