package com.Ascendia.server.mapper.Administrator;


import  com.Ascendia.server.dto.Administrator.UserDto;

import com.Ascendia.server.entity.Administrator.User;

public class UserMapper {
    public static UserDto mapToUserDto(User user){
        return new UserDto(
                user.getUserID(),
                user.getFirstName(),
                user.getLastName(),
                user.getDesignation(),
                user.getDepartment(),
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getAddedDate(),
                user.getProfilePicUrl(),
                user.isAvailability()
        );
    }

    public static User mapToUser(UserDto userDto){
        return new User(
                userDto.getUserID(),
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getDesignation(),
                userDto.getDepartment(),
                userDto.getUsername(),
                userDto.getPassword(),
                userDto.getEmail(),
                userDto.getPhoneNumber(),
                userDto.getAddedDate(),
                userDto.getProfilePicUrl(),
                userDto.isAvailability()

        );
    }
}









