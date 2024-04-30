package com.Ascendia.server.mapper.Administrator;

import com.Ascendia.server.dto.Administrator.UserDto;
import com.Ascendia.server.entity.Administrator.User;

public class UserMapper {
    public static UserDto mapToUserDto(User user){
        UserDto userDto = new UserDto();

        userDto.setUserID(user.getUserID());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setDesignation(user.getDesignation());
        userDto.setDepartment(user.getDepartment());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setEmail(user.getEmail());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setProfilePicUrl(user.getProfilePicUrl());
        userDto.setAvailability(user.isAvailability());
        userDto.setActive(user.isActive());

        return userDto;
    }

    public static User mapToUser(UserDto userDto){
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setDesignation(userDto.getDesignation());
        user.setDepartment(userDto.getDepartment());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setEmail(userDto.getEmail());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setProfilePicUrl(userDto.getProfilePicUrl());
        user.setAvailability(userDto.isAvailability());
        user.setActive(userDto.isActive());

        return user;
    }
}
