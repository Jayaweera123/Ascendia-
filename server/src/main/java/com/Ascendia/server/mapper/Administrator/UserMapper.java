package com.Ascendia.server.mapper.Administrator;

import com.Ascendia.server.dto.Administrator.UserDto;
import com.Ascendia.server.entity.Administrator.User;

public class UserMapper {
        public static UserDto mapToUserDto(User user) {
            return new UserDto(
                    user.getUserID(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getUserName(),
                    user.getPassword(),
                    user.getEmail(),
                    user.getPhoneNumber(),
                    user.getAddedDate(),
                    user.getDesignation(),
                    user.isAvailable(),
                    user.getDepartment(),
                    user.getProfilePhotoURL()
            );
        }
    public static User mapToUser(UserDto userDTO) {
        User user = new User();
        user.setUserID(userDTO.getUserID());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setUserName(userDTO.getUserName());
        user.setPassword(userDTO.getPassword());
        user.setEmail(userDTO.getEmail());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAddedDate(userDTO.getAddedDate());
        user.setDesignation(userDTO.getDesignation());
        user.setAvailable(userDTO.isAvailable());
        user.setDepartment(userDTO.getDepartment());
        user.setProfilePhotoURL(userDTO.getProfilePhotoURL());
        return user;
    }
}
