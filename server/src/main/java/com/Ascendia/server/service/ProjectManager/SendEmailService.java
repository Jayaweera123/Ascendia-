package com.Ascendia.server.service.ProjectManager;



public interface SendEmailService {

    void sendEmail(String recipient, String body, String subject);
}
