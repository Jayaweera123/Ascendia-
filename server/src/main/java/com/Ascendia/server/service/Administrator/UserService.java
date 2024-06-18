package com.Ascendia.server.service.Administrator;

import com.Ascendia.server.dto.Administrator.UserDto;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    UserDto addUser(UserDto userDto, MultipartFile profileImage);

    UserDto login(UserDto loginRequest);

    UserDto refreshToken(UserDto refreshTokenRequest);

    UserDto getUserById(Long userID);

    UserDto getAllUsers();

    UserDto updateUser(Long userID, UserDto updatedUser, MultipartFile profileImage);

    void deactivateUser(Long userID);

    String generateUsername(String firstName, String lastName, String department, String phoneNumber);

    String generatePassword(String firstName, String lastName, String email, String phoneNumber);

    //Nethuni
    List<UserDto> getAllAvailableUsers();

}