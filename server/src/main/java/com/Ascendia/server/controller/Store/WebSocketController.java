package com.Ascendia.server.controller.Store;


import com.Ascendia.server.entity.Store.Greeting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import com.Ascendia.server.entity.Store.Message;

@CrossOrigin("*")
@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/hello") // Defines the endpoint for receiving messages
    @SendTo("/topic/greetings") // Sends the response to the specified destination

    public Greeting greeting(String name) {
        return new Greeting("Hello, " + name + "!");
    }

    @MessageMapping("/private-message")
    public void receivePrivateMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getUserId(),"/private",message); // /user/{username}/private
        System.out.println(message.toString());
    }
}
