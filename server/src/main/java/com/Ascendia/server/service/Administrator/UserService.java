package com.Ascendia.server.service.Administrator;

import com.Ascendia.server.dto.Administrator.UserDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    UserDto addUser(UserDto userDto, MultipartFile profileImage);

    UserDto login(UserDto loginRequest);

    void logout(Long userId);

    UserDto refreshToken(UserDto refreshTokenRequest);

    UserDto getUserById(Long userID);

    UserDto getAllUsers();

    UserDto updateUser(Long userID, UserDto updatedUser, MultipartFile profileImage);

    void deactivateUser(Long userID);

    String generateUsername(String firstName, String lastName, String department, String phoneNumber);

    String generatePassword(String firstName, String lastName, String email, String phoneNumber);

    int getTodayActiveUsers();

    int countAllUsers();

    int countActiveUsers();

    int countDeactivatedUsers();

    List<UserDto> getOnlineUsers();

    UserDto getUserByFirstNameAndLastName(String firstName, String lastName);

    //Nethuni
    List<UserDto> getAllAvailableUsers();

}