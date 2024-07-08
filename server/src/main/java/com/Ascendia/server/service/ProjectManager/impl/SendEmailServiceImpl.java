package com.Ascendia.server.service.ProjectManager.impl;

import com.Ascendia.server.service.ProjectManager.SendEmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class SendEmailServiceImpl implements SendEmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String fromEmailId;

    @Override
    public void sendEmail(String recipient, String body, String subject) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(new InternetAddress(fromEmailId, "Ascendia"));
            helper.setTo(recipient);
            helper.setSubject(subject);
            helper.setText(body);

            javaMailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            // Handle the exception here
            e.printStackTrace();
        }
    }
}
