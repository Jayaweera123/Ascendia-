package com.Ascendia.server.service.Project;

public interface SendEmailService {

    void sendEmail(String recipient, String body, String subject);
}