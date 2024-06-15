package com.Ascendia.server.mapper.Administrator;

import com.Ascendia.server.dto.Administrator.UserDto;
import com.Ascendia.server.entity.Administrator.User;

public class UserMapper {

    public static UserDto mapToUserDto(User user) {
        return new UserDto(
                user.getUserID(),
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
        return new User(
                userDto.getUserID(),
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getDesignation(),
                userDto.getDepartment(),
                userDto.getUsername(),
                userDto.getPassword(), // Map password from UserDto to User entity
                userDto.getEmail(),
                userDto.getPhoneNumber(),
                userDto.getAddedDate(),
                userDto.getProfilePicUrl(),
                userDto.isAvailability(),
                userDto.isActive()
        );
    }
}
