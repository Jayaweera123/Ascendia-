package com.Ascendia.server.mapper.Administrator;

import com.Ascendia.server.dto.Administrator.UserDto;
import com.Ascendia.server.entity.Administrator.User;

public class UserMapper {

    public static UserDto mapToUserDto(User user) {
        return new UserDto(
                user.getFirstName(),
                user.getLastName(),
                user.getDesignation(),
                user.getDepartment(),
                user.getUsername(), // Username is kept as it is
                null, // Password is not mapped to UserDto for security reasons
                user.getEmail(),
                user.getPhoneNumber(),
                user.getAddedDate(),
                user.getProfilePicUrl(),
                user.isAvailability(), // Availability is kept as it is
                user.isActive(),
                0, // default statusCode
                null, // default error
                null, // default message
                null, // default token
                null, // default refreshToken
                null, // default expirationTime
                null, // default User reference
                null // default Users list
        );
    }

    public static User mapToUser(UserDto userDto) {
        // For mapToUser method, userDto.getUserID() should be handled based on how you handle ID generation/assignment
        // Typically, ID would not be set for new User creation from DTO
        User user = new User();
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
