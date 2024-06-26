package com.Ascendia.server.controller.Store;


import com.Ascendia.server.entity.Store.Greeting;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("*")
@Controller
public class WebSocketController {

    @MessageMapping("/hello") // Defines the endpoint for receiving messages
    @SendTo("/topic/greetings") // Sends the response to the specified destination

    public Greeting greeting(String name) {
        return new Greeting("Hello, " + name + "!");
    }
}
