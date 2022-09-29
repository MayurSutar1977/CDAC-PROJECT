package com.rsys.controller;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.rsys.dto.ResponseDTO;
import com.rsys.services.impls.EmailService;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class SendEmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/testSendEmail" )
    public ResponseDTO<?>  sendEmail(){
        try {
            emailService.sendMail("manjarema99@gmail.com", "Test Subject", "TestMessage");
            return new ResponseDTO<>(HttpStatus.OK,null,"Sucessfull login...");

        } catch (MessagingException e) {
            e.printStackTrace();
            return new ResponseDTO<>(HttpStatus.OK,null,"Sucessfull...");
        }
	
    }

}
