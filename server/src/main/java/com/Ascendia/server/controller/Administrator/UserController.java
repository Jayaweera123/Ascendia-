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
@RequestMapping
@CrossOrigin("*")
@AllArgsConstructor

public class UserController {

    @Autowired
    private UserService userService;

    // Build Add User REST API
    @PostMapping("/auth/add")
    public ResponseEntity<UserDto> addUser(@ModelAttribute UserDto userDto,
                                           @RequestParam("profileImage") MultipartFile profileImage){
        UserDto savedUser = userService.addUser(userDto, profileImage);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<UserDto> login(@RequestBody UserDto req){
        return ResponseEntity.ok(userService.login(req));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<UserDto> refreshToken(@RequestBody UserDto req){
        return ResponseEntity.ok(userService.refreshToken(req));
    }

    //Build Get User REST API
    @GetMapping("/admin/get-users/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Long userID){
        UserDto userDto = userService.getUserById(userID);
        return ResponseEntity.ok(userDto);
    }

    //Build Get All Employees REST API
    @GetMapping("/admin/get-all-users")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    //Build Update User REST API
    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Long userID, @RequestBody UserDto updatedUser){
        UserDto userDto = userService.updateUser(userID, updatedUser);
        return ResponseEntity.ok(userDto);
    }

    //Build Delete User REST API
    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<String> deactivateUser(@PathVariable("id") Long userID){
        userService.deactivateUser(userID);
        return ResponseEntity.ok("User deactivated successfully!.");
    }

    {/*
     @PostMapping("/auth/register")
    public ResponseEntity<ReqRes> regeister(@RequestBody ReqRes reg){
        return ResponseEntity.ok(usersManagementService.register(reg));
    }@GetMapping("/admin/get-all-users")
    public ResponseEntity<ReqRes> getAllUsers(){
        return ResponseEntity.ok(usersManagementService.getAllUsers());

    }

    @GetMapping("/admin/get-users/{userId}")
    public ResponseEntity<ReqRes> getUSerByID(@PathVariable Integer userId){
        return ResponseEntity.ok(usersManagementService.getUsersById(userId));

    }

    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable Integer userId, @RequestBody OurUsers reqres){
        return ResponseEntity.ok(usersManagementService.updateUser(userId, reqres));
    }

    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<ReqRes> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = usersManagementService.getMyInfo(email);
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<ReqRes> deleteUSer(@PathVariable Integer userId){
        return ResponseEntity.ok(usersManagementService.deleteUser(userId));
    } */}



}