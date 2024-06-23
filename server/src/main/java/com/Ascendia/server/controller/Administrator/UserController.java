package com.Ascendia.server.controller.Administrator;

import com.Ascendia.server.dto.Project.ProjectGetDto;
import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.service.Project.ProjectService;
import lombok.AllArgsConstructor;
import com.Ascendia.server.dto.Administrator.UserDto;
import com.Ascendia.server.service.Administrator.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping
@CrossOrigin("*")
@AllArgsConstructor

public class UserController {

    private final UserService userService;
    private final ProjectService projectService;

    @GetMapping("/projects/user")
    public ResponseEntity<List<ProjectGetDto>> getProjectsForCurrentUser(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<ProjectGetDto> projects = projectService.getProjectsForUser(user);
        return ResponseEntity.ok(projects);
    }

    @PostMapping(value = "/auth/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
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
    @GetMapping("/admin/getUser/{userID}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("userID") Long userID){
        return ResponseEntity.ok(userService.getUserById(userID));
    }

    //Build Get All Employees REST API
    @GetMapping("/admin/getAllUsers")
    public ResponseEntity<UserDto> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());

    }

    //Build Update User REST API
    @PutMapping(value = "/admin/update/{userID}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UserDto> updateUser(
            @PathVariable("userID") Long userID,
            @ModelAttribute UserDto updatedUser,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) {
        return ResponseEntity.ok(userService.updateUser(userID, updatedUser, profileImage));
    }


    //Build Delete User REST API
    @DeleteMapping("/admin/deactivate/{userID}")
    public ResponseEntity<String> deactivateUser(@PathVariable("userID") Long userID){
        userService.deactivateUser(userID);
        return ResponseEntity.ok("User deactivated successfully!.");
    }

    @GetMapping("/admin/todayActiveUsers")
    public int getTodayActiveUsers() {
        return userService.getTodayActiveUsers();
    }

    @GetMapping("/admin/countUsers")
    public ResponseEntity<Integer> countUsers() {
        int userCount = userService.countAllUsers();
        return ResponseEntity.ok(userCount);
    }

    @GetMapping("/admin/countActiveUsers")
    public ResponseEntity<Integer> countActiveUsers() {
        int activeUserCount = userService.countActiveUsers();
        return ResponseEntity.ok(activeUserCount);
    }

    @GetMapping("/admin/countDeactivatedUsers")
    public ResponseEntity<Integer> countDeactivatedUsers() {
        int deactivatedUserCount = userService.countDeactivatedUsers();
        return ResponseEntity.ok(deactivatedUserCount);
    }

    @GetMapping("/admin/onlineUsers")
    public ResponseEntity<List<UserDto>> getOnlineUsers() {
        List<UserDto> onlineUsers = userService.getOnlineUsers();
        return new ResponseEntity<>(onlineUsers, HttpStatus.OK);
    }

    {/*

    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<ReqRes> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = usersManagementService.getMyInfo(email);
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }

     */}

    //Nethuni - Get All available users
    @GetMapping("/pmanager/available/all")
    public ResponseEntity<List<UserDto>> getAllAvailableUsers(){
        List<UserDto> users = userService.getAllAvailableUsers();
        return ResponseEntity.ok(users);
    }

}