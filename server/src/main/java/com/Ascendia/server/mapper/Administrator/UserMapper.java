package com.Ascendia.server.mapper.Administrator;

import com.Ascendia.server.dto.Administrator.UserDto;
import com.Ascendia.server.entity.Administrator.User;

public class UserMapper {
    public static UserDto mapToUserDto(User user){
        return new UserDto(
                user.getUserID(),
                user.getFirstName(),
                user.getLastName(),
                user.getDesignation(),
                user.getDepartment(),
                user.getUsername(), // Keep the username as it is, since it's already generated in the backend
                user.getPassword(), // Keep the password as it is, since it's already generated in the backend
                user.getEmail(),
                user.getPhoneNumber(),
                user.getAddedDate(),
                user.getProfilePicUrl(),
                user.isAvailability(), // Keep the availability as it is, since it's already generated in the backend
                user.isActive()
        );
    }

    public static User mapToUser(UserDto userDto){
        return new User(
                userDto.getUserID(),
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getDesignation(),
                userDto.getDepartment(),
                userDto.getUsername(), // Keep the username as it is, since it's already generated in the backend
                userDto.getPassword(), // Keep the password as it is, since it's already generated in the backend
                userDto.getEmail(),
                userDto.getPhoneNumber(),
                userDto.getAddedDate(),
                userDto.getProfilePicUrl(),
                userDto.isAvailability(), // Keep the availability as it is, since it's already generated in the backend
                userDto.isActive()
        );
    }
}