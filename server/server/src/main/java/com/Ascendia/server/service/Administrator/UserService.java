package com.Ascendia.server.service.Administrator;

import com.Ascendia.server.dto.Administrator.UserDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface UserService {

    UserDto addUser(UserDto userDto, MultipartFile profileImage);

    UserDto getUserById(Long userID);

    List<UserDto> getAllUsers();

    UserDto updateUser(Long userID, UserDto updatedUser);

    void deleteUser(Long userID);
}












