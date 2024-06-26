package com.Ascendia.server.controller.Store;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MessageController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping("/send")
    public void sendMessage(@RequestBody String message) {
        simpMessagingTemplate.convertAndSend("/topic/messages", message);
    }
}

