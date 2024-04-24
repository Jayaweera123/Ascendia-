package com.Ascendia.server.controller.Administrator;

import com.Ascendia.server.dto.Administrator.UserDto;
import com.Ascendia.server.service.Administrator.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private UserService userService;

    @GetMapping("/allavailable")
    public ResponseEntity<List<UserDto>> getAllAvailableUsers() {
        List<UserDto> users = userService.getAvailableEmployees();
        return ResponseEntity.ok(users);
    }
}
