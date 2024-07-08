package com.Ascendia.server.controller.ProjectManager;

import com.Ascendia.server.service.ProjectManager.SendEmailService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping
public class EmailController {

    @Autowired
    private SendEmailService sendEmailService;

    @GetMapping("pmanageronly/send/email")
    public String sendEmail() {
        sendEmailService.sendEmail("nethunirajapakse@gmail.com", "test body", "test");
        return"Send Successfully";
    }


}
