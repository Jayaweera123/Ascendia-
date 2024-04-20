package com.Ascendia.server.service.Administrator.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import  com.Ascendia.server.dto.Administrator.UserDto;
import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.exception.Administrator.ResourceNotFoundException;
import com.Ascendia.server.mapper.Administrator.UserMapper;
import com.Ascendia.server.repository.Administrator.UserRepository;
import com.Ascendia.server.service.Administrator.UserService;



import java.sql.Blob;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;



@Service
//@AllArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final String uploadDir; // Path to the directory where profile images will be stored

    @Autowired
    public UserServiceImpl(UserRepository userRepository, @Value("${user.profile.image.upload-dir}") String uploadDir) {
        this.userRepository = userRepository;
        this.uploadDir = uploadDir;
    }

    @Override
    public UserDto addUser(UserDto userDto, MultipartFile profileImage) {

        // Check if a profile image is provided
        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                // Get the file name
                String fileName = StringUtils.cleanPath(profileImage.getOriginalFilename());
                // Set the file path where the image will be stored
                Path uploadPath = Paths.get(uploadDir + fileName);
                // Copy the file to the upload path
                Files.copy(profileImage.getInputStream(), uploadPath);
                // Set the profile picture URL in the DTO
                userDto.setProfilePicUrl(uploadPath.toString());
            } catch (IOException e) {
                e.printStackTrace(); // Handle the exception appropriately
            }


        User user = UserMapper.mapToUser(userDto);

        User savedUser = userRepository.save(user);

        return UserMapper.mapToUserDto(savedUser);
    }



    @Override
    public UserDto getUserById(Long userID) {
        User user = userRepository.findById(userID)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User is not exists with given Id : "+userID));
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map((user) -> UserMapper.mapToUserDto(user))
                .collect(Collectors.toList());
    }

    @Override
    public UserDto updateUser(Long userID, UserDto updatedUser) {

        User user = userRepository.findById(userID).orElseThrow(
                () -> new ResourceNotFoundException("User is not exists with given Id : "+userID)
        );

        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setUserName(updatedUser.getUserName());
        user.setPassword(updatedUser.getPassword());
        user.setEmail(updatedUser.getEmail());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        user.setAddedDate(updatedUser.getAddedDate());
        user.setDesignation(updatedUser.getDesignation());
        user.setDepartment(updatedUser.getDepartment());
        user.setProfilePicUrl(updatedUser.getProfilePicUrl());

        User updatedUserObj = userRepository.save(user);

        return UserMapper.mapToUserDto(updatedUserObj);
    }

    @Override
    public void deleteUser(Long userID) {

        User user = userRepository.findById(userID).orElseThrow(
                () -> new ResourceNotFoundException("User is not exists with given Id : "+userID)
        );

        userRepository.deleteById(userID);

    }

}



















