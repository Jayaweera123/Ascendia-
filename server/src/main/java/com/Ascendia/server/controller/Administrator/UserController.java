package com.Ascendia.server.controller.Administrator;

import lombok.AllArgsConstructor;

import  com.Ascendia.server.dto.Administrator.UserDto;

import com.Ascendia.server.service.Administrator.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
@AllArgsConstructor

public class UserController {

    @Autowired
    private UserService userService;

    // Build Add User REST API
    @PostMapping("/add")
    public ResponseEntity<UserDto> addUser(@ModelAttribute UserDto userDto,
                                           @RequestParam("profileImage") MultipartFile profileImage){
        UserDto savedUser = userService.addUser(userDto, profileImage);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    //Build Get User REST API
    @GetMapping("{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Long userID){
        UserDto userDto = userService.getUserById(userID);
        return ResponseEntity.ok(userDto);
    }

    //Build Get All Employees REST API
    @GetMapping("/getAll")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    //Build Update User REST API
    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Long userID, @RequestBody UserDto updatedUser){
        UserDto userDto = userService.updateUser(userID, updatedUser);
        return ResponseEntity.ok(userDto);
    }

    //Build Delete User REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deactivateUser(@PathVariable("id") Long userID){
        userService.deactivateUser(userID);
        return ResponseEntity.ok("User deactivated successfully!.");
    }



}