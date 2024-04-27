package com.Ascendia.server.service.Administrator.impl;

import com.Ascendia.server.service.Administrator.UserService;
import org.springframework.stereotype.Service;
import com.Ascendia.server.dto.Administrator.UserDto;
import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.exception.Administrator.ResourceNotFoundException;
import com.Ascendia.server.mapper.Administrator.UserMapper;
import com.Ascendia.server.repository.Administrator.UserRepository;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
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
        }

        // Generate username
        String username = generateUsername(userDto.getFirstName(), userDto.getLastName(), userDto.getDepartment(), userDto.getUserID());
        userDto.setUsername(username);

        // Generate password
        String password = generatePassword(userDto);
        userDto.setPassword(password);

        // Set isAvailability based on designation
        String designation = userDto.getDesignation();
        if (designation != null) {
            // Check if the designation is one of the project creation team, client, or consultant
            if (designation.equalsIgnoreCase("project creation team member") ||
                    designation.equalsIgnoreCase("client") ||
                    designation.equalsIgnoreCase("administrator") ||
                    designation.equalsIgnoreCase("consultant")) {
                userDto.setAvailability(false);
            } else {
                userDto.setAvailability(true);
            }
        }

        if (userDto.getAddedDate() == null) {
            userDto.setAddedDate(LocalDate.now());
        }

        // Set active to true by default
        userDto.setActive(true);


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
        user.setEmail(updatedUser.getEmail());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        user.setDesignation(updatedUser.getDesignation());
        user.setDepartment(updatedUser.getDepartment());
        user.setProfilePicUrl(updatedUser.getProfilePicUrl());

        User updatedUserObj = userRepository.save(user);

        return UserMapper.mapToUserDto(updatedUserObj);
    }

    @Override
    public void deactivateUser(Long userID) {
        // Find the user by ID
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new ResourceNotFoundException("User is not exists with given Id : " + userID));

        // Set the user's status to deactivated
        user.setActive(false); // Assuming there's a field named 'active' indicating user status

        // Save the updated user entity
        userRepository.save(user);
    }

    // Helper method to generate username
    @Override
    public String generateUsername(String firstName, String lastName, String department, long userId) {
        // Extract the first letter of the firstName
        char firstLetter = Character.toLowerCase(firstName.charAt(0));

        // Generate two unique numbers based on the userId
        int firstNumber = (int) (userId % 100);
        int secondNumber = (int) (userId % 50);

        // If the department is not specified, exclude it from the username
        if (department == null || department.isEmpty()) {
            return (lastName + firstLetter + "." + firstNumber + secondNumber).toLowerCase();
        } else {
            // Concatenate lastName, first letter of firstName, '.', department, and unique numbers
            return (lastName + firstLetter + "." + department + firstNumber + secondNumber).toLowerCase();
        }
    }


    // Helper method to generate password
    @Override
    public String generatePassword(UserDto userDto) {
        Random random = new Random();
        int userIdLength = String.valueOf(userDto.getUserID()).length(); // Length of the userID
        StringBuilder passwordBuilder = new StringBuilder();

        // Generate two random uppercase English alphabet characters
        for (int i = 0; i < 2; i++) {
            char randomChar = (char) (random.nextInt(26) + 'A');
            passwordBuilder.append(randomChar);
        }

        // Append userID to the password
        passwordBuilder.append(userDto.getUserID());

        // Extract month and date from addedDate
        LocalDate addedDate = userDto.getAddedDate();
        int month = addedDate.getMonthValue();
        int day = addedDate.getDayOfMonth();

        // Append month and date to the password
        passwordBuilder.append(month < 10 ? "0" + month : month); // Add leading zero if month < 10
        passwordBuilder.append(day < 10 ? "0" + day : day); // Add leading zero if day < 10

        return passwordBuilder.toString();
    }
}