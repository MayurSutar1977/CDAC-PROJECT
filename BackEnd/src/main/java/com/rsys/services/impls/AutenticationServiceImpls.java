package com.rsys.services.impls;

import static com.rsys.utils.UserValidation.passwordValidation;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;
import java.util.UUID;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rsys.dao.IPasswordResetTokenRepository;
import com.rsys.dao.IUserRepository;
import com.rsys.dto.ForgotPasswordDto;
import com.rsys.dto.LoginDTO;
import com.rsys.dto.ResetPasswordDTO;
import com.rsys.exception.UserException;
import com.rsys.pojos.entity.PasswordResetToken;
import com.rsys.pojos.entity.User;
import com.rsys.services.interfaces.IAutenticationService;

@Service
@Transactional
public class AutenticationServiceImpls implements IAutenticationService {

	@Autowired
	private IUserRepository userRepository;
	@Autowired
	private IPasswordResetTokenRepository resetTokenRepository;
	@Value("${email.from.address}")
	private String fromAddress;
	@Autowired
	private EmailService emailService;

	// private BCryptPasswordEncoder passwordEncoder =new BCryptPasswordEncoder();

	public AutenticationServiceImpls() {

	}

	@Override
	public User autenticateUser(LoginDTO loginRequest) {
		Optional<User> optionalUser = userRepository.autenticateUser(loginRequest.getUserName(),
				/* passwordEncoder.encode( */loginRequest.getPassword());
		User user = optionalUser
				.orElseThrow(() -> new UserException("Please enter valid user name and password........."));
		// return user.getUserProfile();
		return user;
	}

	@Override
	public User forgotPassword(ForgotPasswordDto forgotPasswordDto) {
		System.out.println("in forgot password...");
		// Optional<User> optionalUser =
		// userRepository.findByUserName(forgotPasswordDto.getUserName());
		// User user = optionalUser.orElseThrow(() -> new UserException("Please enter
		// valid user name ........."));
		Optional<PasswordResetToken> optionalToken = resetTokenRepository.findByToken(forgotPasswordDto.getToken());
		PasswordResetToken passwordResetToken = optionalToken
				.orElseThrow(() -> new UserException("Sorry this is no valid token."));

//		if (Duration.between(passwordResetToken.getTokenTime(), LocalTime.now()).toMillis() < 5000) {
		if (Duration.between(passwordResetToken.getTokenTime(), LocalTime.now()).toMinutes() < 2) {
			Optional<User> optionalUser = userRepository.findById(passwordResetToken.getUserId());
			User user = optionalUser.orElseThrow(() -> new UserException("Please enter valid user name ........."));
			passwordValidation(forgotPasswordDto.getPassword(), forgotPasswordDto.getConfirmPassword());
			user.setPassword(forgotPasswordDto.getPassword());
			return userRepository.save(user);
		} else
			throw new UserException("Sorry your token is expired......");
	}

	@Override
	@Async
	public User resetPassword(ResetPasswordDTO resetPasswordDTO) throws MessagingException {
		Optional<User> optionalUser = userRepository.findByUserName(resetPasswordDTO.getUserName());
		User user = optionalUser.orElseThrow(() -> new UserException("Please enter valid user name ........."));

		String token = UUID.randomUUID().toString();
		PasswordResetToken myToken = new PasswordResetToken();
		myToken.setToken(token);
		myToken.setTokenCreationDate(LocalDateTime.now());
		myToken.setUserId(user.getId());
		myToken.setTokenTime(LocalTime.now());
		resetTokenRepository.save(myToken);
		emailService.sendMail(resetPasswordDTO.getEmail(), "Rentel System Reset password  ", "Hi "
				+ resetPasswordDTO.getUserName()
				+ ", \nWe heard that you lost your GitHub password. Sorry about that! There was recently a request to change the password on your account. To complete the password reset process, please click here: http://localhost:3000/reset-password/"
				+ resetPasswordDTO.getUserName() + "/token=/" + token
				+ "\nIf you don’t use this link within 2 minutes, it will expire.\n Please do not reply to this email with your password. We will never ask for your password, and we strongly discourage you from sharing it with anyone.\r\nThanks,\r\n"
				+ "The RSYS Team" + "");
		return user;
	}

}
