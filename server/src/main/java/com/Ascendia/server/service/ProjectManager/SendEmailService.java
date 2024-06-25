package com.Ascendia.server.service.ProjectManager;

import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.UnsupportedEncodingException;

public interface SendEmailService {

    void sendEmail(String recipient, String body, String subject);
}
