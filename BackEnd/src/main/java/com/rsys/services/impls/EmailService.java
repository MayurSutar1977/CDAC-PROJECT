package com.rsys.services.impls;

import java.io.File;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${email.from.address}")
    private String fromAddress;

    public void sendMailMultipart(String toEmail, String subject, String message, File file) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setFrom(fromAddress);
        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(message);
        

        if(file != null){
            helper.addAttachment(file.getName(), file);
        }
        javaMailSender.send(mimeMessage);
    }

    public void sendMail(String toEmail, String subject, String message) throws MessagingException {
       sendMailMultipart(toEmail, subject, message, null);
    }

    public void sendMail(String toEmail, String subject, String message, File file) throws MessagingException {
        sendMailMultipart(toEmail, subject, message, file);
    }
}
