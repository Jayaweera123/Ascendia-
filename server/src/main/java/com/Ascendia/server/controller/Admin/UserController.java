package com.Ascendia.server.controller.Admin;

import com.Ascendia.server.dto.Admin.UserDto;
import com.Ascendia.server.service.Admin.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Ascendia.server.service.Admin.UserService;
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
