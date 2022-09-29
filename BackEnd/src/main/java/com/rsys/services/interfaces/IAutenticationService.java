package com.rsys.services.interfaces;

import javax.mail.MessagingException;

import com.rsys.dto.ForgotPasswordDto;
import com.rsys.dto.LoginDTO;
import com.rsys.dto.ResetPasswordDTO;
import com.rsys.pojos.entity.User;
import com.rsys.pojos.entity.UserProfile;

public interface IAutenticationService {

	User autenticateUser(LoginDTO loginRequest);

	User forgotPassword(ForgotPasswordDto forgotPasswordDto);

	User resetPassword(ResetPasswordDTO resetPasswordDTO) throws MessagingException;

}
