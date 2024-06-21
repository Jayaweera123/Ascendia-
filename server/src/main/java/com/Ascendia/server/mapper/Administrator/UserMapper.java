package com.Ascendia.server.mapper.Administrator;

import com.Ascendia.server.dto.Administrator.UserDto;
import com.Ascendia.server.entity.Administrator.User;

public class UserMapper {

    public static UserDto mapToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setUserID(user.getUserID()); // Set userID here
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setDesignation(user.getDesignation());
        userDto.setDepartment(user.getDepartment());
        userDto.setUsername(user.getUsername()); // Username is kept as it is
        // Password is not mapped to UserDto for security reasons
        userDto.setEmail(user.getEmail());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setAddedDate(user.getAddedDate());
        userDto.setProfilePicUrl(user.getProfilePicUrl());
        userDto.setAvailability(user.isAvailability()); // Availability is kept as it is
        userDto.setActive(user.isActive());
        userDto.setStatusCode(0); // default statusCode
        userDto.setError(null); // default error
        userDto.setMessage(null); // default message
        userDto.setToken(null); // default token
        userDto.setRefreshToken(null); // default refreshToken
        userDto.setExpirationTime(null); // default expirationTime
        userDto.setUser(null); // default User reference
        userDto.setUsersList(null); // default Users list
        userDto.setProjectIDs(null); // default projectIDs

        return userDto;
    }

    public static User mapToUser(UserDto userDto) {
        User user = new User();
        user.setUserID(userDto.getUserID()); // Set userID if provided
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setDesignation(userDto.getDesignation());
        user.setDepartment(userDto.getDepartment());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword()); // Map password from UserDto to User entity
        user.setEmail(userDto.getEmail());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setAddedDate(userDto.getAddedDate());
        user.setProfilePicUrl(userDto.getProfilePicUrl());
        user.setAvailability(userDto.isAvailability());
        user.setActive(userDto.isActive());

        return user;
    }
}
