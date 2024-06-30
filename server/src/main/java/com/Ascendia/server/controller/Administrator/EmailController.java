package com.Ascendia.server.controller.Administrator;

import com.Ascendia.server.service.Administrator.SendEmailService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController("administratorEmailController")
@RequestMapping
public class EmailController {

    private final SendEmailService sendEmailService;

    public EmailController(@Qualifier("administratorSendEmailServiceImpl") SendEmailService sendEmailService) {
        this.sendEmailService = sendEmailService;
    }

    @GetMapping("admin/send/email")
    public String sendEmail() {
        sendEmailService.sendEmail("rashmijayawardhana2001@gmail.com", "test body", "test");
        return"Send Successfully";
    }


}
