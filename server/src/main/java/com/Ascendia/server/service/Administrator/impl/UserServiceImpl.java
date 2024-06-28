package com.Ascendia.server.service.Administrator.impl;

import com.Ascendia.server.repository.Project.ProjectRepository;
import com.Ascendia.server.repository.ProjectManager.UserProjectAssignmentRepository;
import com.Ascendia.server.service.Administrator.JWTUtils;
import com.Ascendia.server.service.Administrator.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final UserProjectAssignmentRepository userProjectAssignmentRepository;

    private final JWTUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final String uploadDir; // Path to the directory where profile images will be stored

    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           ProjectRepository projectRepository,
                           UserProjectAssignmentRepository userProjectAssignmentRepository,
                           JWTUtils jwtUtils,
                           AuthenticationManager authenticationManager,
                           PasswordEncoder passwordEncoder,
                           @Value("${user.profile.image.upload-dir}") String uploadDir) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.userProjectAssignmentRepository = userProjectAssignmentRepository;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.uploadDir = uploadDir;
    }

    @Override
    public UserDto addUser(UserDto userDto, MultipartFile profileImage) {
        UserDto userDto1 = new UserDto();

        try {
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

            if (userDto.getAddedDate() == null) {
                userDto.setAddedDate(LocalDate.now());
            }

            // Generate username
            String username = generateUsername(userDto.getFirstName(), userDto.getLastName(), userDto.getDepartment(), userDto.getPhoneNumber());
            userDto.setUsername(username);

            // Generate password
            String password = generatePassword(userDto.getFirstName(), userDto.getLastName(), userDto.getEmail(), userDto.getPhoneNumber());
            userDto.setPassword(passwordEncoder.encode(password));

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

            // Set active to true by default
            userDto.setActive(true);

            User user = UserMapper.mapToUser(userDto);
            User savedUser = userRepository.save(user);
            if (savedUser.getUserID() > 0) {
                userDto1 = UserMapper.mapToUserDto(savedUser);
                userDto1.setMessage("User Added Successfully");
                userDto1.setStatusCode(200);
            }


        }catch (Exception e){
            userDto1.setStatusCode(500);
            userDto1.setError(e.getMessage());
        }

        return userDto1;

    }

    @Override
    public UserDto login(UserDto loginRequest) {
        UserDto userDto = new UserDto();
        try {
            logger.info("Attempting login for username: {}", loginRequest.getUsername());
            logger.info("Password received: {}", loginRequest.getPassword());

            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            // If authentication is successful, retrieve user details from database
            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

            // Check if passwords match
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                throw new BadCredentialsException("Invalid username or password");
            }

            // Update last login date and set online status
            user.setLastLoginDate(LocalDateTime.now());
            user.setOnlineStatus(true);
            userRepository.save(user);

            // Fetch the projects the user is engaged with
            List<Long> projectIds = userProjectAssignmentRepository.findProjectIdsByUserId(user.getUserID());

            // Generate JWT token
            String jwtToken = jwtUtils.generateToken(user, projectIds);
            String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user, projectIds);

            // Prepare response
            userDto.setStatusCode(200);
            userDto.setToken(jwtToken);
            userDto.setUserID(user.getUserID()); // Set userID here
            userDto.setDesignation(user.getDesignation());
            userDto.setProjectIDs(projectIds);
            userDto.setRefreshToken(refreshToken);
            userDto.setExpirationTime("12 hours");
            userDto.setMessage("Successfully Logged In");

        } catch (BadCredentialsException e) {
            logger.error("Authentication failed: {}", e.getMessage());
            userDto.setStatusCode(401); // Unauthorized status code
            userDto.setMessage("Invalid username or password");
        } catch (Exception e) {
            logger.error("Error during login: {}", e.getMessage());
            userDto.setStatusCode(500); // Internal server error
            userDto.setMessage("Error occurred during login: " + e.getMessage());
        }
        return userDto;
    }

    @Override
    public void logout(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setOnlineStatus(false);
        userRepository.save(user);
    }

    public UserDto refreshToken(UserDto refreshTokenRequest) {
        UserDto userDto2 = new UserDto();
        try {
            String userUsername = jwtUtils.extractUsername(refreshTokenRequest.getToken());
            User user2 = userRepository.findByUsername(userUsername).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), user2)) {
                // Fetch the projects the user is engaged with
                List<Long> projectIds = userProjectAssignmentRepository.findProjectIdsByUserId(user2.getUserID());

                // Generate new JWT token with project IDs
                String jwt = jwtUtils.generateToken(user2, projectIds);

                userDto2.setStatusCode(200);
                userDto2.setToken(jwt);
                userDto2.setRefreshToken(refreshTokenRequest.getToken());
                userDto2.setExpirationTime("12 hours");
                userDto2.setMessage("Successfully Refreshed Token");
            } else {
                userDto2.setStatusCode(401);
                userDto2.setMessage("Invalid refresh token");
            }
        } catch (Exception e) {
            userDto2.setStatusCode(500);
            userDto2.setMessage("Error occurred during token refresh: " + e.getMessage());
        }
        return userDto2;
    }

    @Override
    public UserDto getUserById(Long userID) {
        UserDto userDto4 = new UserDto();
        try {
            User usersById = userRepository.findById(userID).orElseThrow(() -> new RuntimeException("User Not found"));
            userDto4.setUser(usersById);
            userDto4.setStatusCode(200);
            userDto4.setMessage("Users with id '" + userID + "' found successfully");
        } catch (Exception e) {
            userDto4.setStatusCode(500);
            userDto4.setMessage("Error occurred: " + e.getMessage());
        }
        return userDto4;
    }

    @Override
    public UserDto getAllUsers() {
        UserDto userDto3 = new UserDto();

        try {
            List<User> users = userRepository.findAll();
            if (!users.isEmpty()) {
                userDto3.setUsersList(users);
                userDto3.setStatusCode(200);
                userDto3.setMessage("Successful");
            } else {
                userDto3.setStatusCode(404);
                userDto3.setMessage("No users found");
            }
            return userDto3;
        } catch (Exception e) {
            userDto3.setStatusCode(500);
            userDto3.setMessage("Error occurred: " + e.getMessage());
            return userDto3;
        }
    }

    @Override
    public UserDto updateUser(Long userID, UserDto updatedUserDto, MultipartFile profileImage) {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userID));

        if (updatedUserDto.getFirstName() != null) {
            user.setFirstName(updatedUserDto.getFirstName());
        }
        if (updatedUserDto.getLastName() != null) {
            user.setLastName(updatedUserDto.getLastName());
        }
        if (updatedUserDto.getEmail() != null) {
            user.setEmail(updatedUserDto.getEmail());
        }
        if (updatedUserDto.getPhoneNumber() != null) {
            user.setPhoneNumber(updatedUserDto.getPhoneNumber());
        }
        if (updatedUserDto.getDesignation() != null) {
            user.setDesignation(updatedUserDto.getDesignation());
        }
        if (updatedUserDto.getDepartment() != null) {
            user.setDepartment(updatedUserDto.getDepartment());
        }

        // Check if a profile image is provided
        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                // Get the file name
                String fileName = StringUtils.cleanPath(profileImage.getOriginalFilename());
                // Set the file path where the image will be stored
                Path uploadPath = Paths.get(uploadDir + fileName);
                // Copy the file to the upload path
                Files.copy(profileImage.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
                // Set the profile picture URL in the user entity
                user.setProfilePicUrl(uploadPath.toString());
            } catch (IOException e) {
                e.printStackTrace(); // Handle the exception appropriately
            }
        }

        User updatedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(updatedUser);
    }

    {/*public ReqRes getMyInfo(String email){
        ReqRes reqRes = new ReqRes();
        try {
            Optional<OurUsers> userOptional = usersRepo.findByEmail(email);
            if (userOptional.isPresent()) {
                reqRes.setOurUsers(userOptional.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }

        }catch (Exception e){
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return reqRes;

    } */}


    @Override
    public void deactivateUser(Long userID) {
        // Find the user by ID
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new ResourceNotFoundException("User is not exists with given Id : " + userID));

        // Set the user's status to deactivated
        user.setActive(false); // Assuming there's a field named 'active' indicating user status

        // Set the user's online status to false
        user.setOnlineStatus(false);

        // Save the updated user entity
        userRepository.save(user);
    }

    @Override
    public UserDto getUserByFirstNameAndLastName(String firstName, String lastName) {
        UserDto userDto = new UserDto();
        try {
            User user = userRepository.findByFirstNameAndLastName(firstName, lastName)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with firstName: " + firstName + " and lastName: " + lastName));
            userDto = UserMapper.mapToUserDto(user);
            userDto.setStatusCode(200);
            userDto.setMessage("User found successfully");
        } catch (ResourceNotFoundException e) {
            userDto.setStatusCode(404);
            userDto.setMessage(e.getMessage());
        } catch (Exception e) {
            userDto.setStatusCode(500);
            userDto.setMessage("Error occurred: " + e.getMessage());
        }
        return userDto;
    }

    // Helper method to generate username
    @Override
    public String generateUsername(String firstName, String lastName, String department, String phoneNumber) {
        char firstLetter = Character.toLowerCase(firstName.charAt(0));
        // Generate last two digits of phoneNumber
        String lastTwoDigitsPhoneNumber = phoneNumber.substring(phoneNumber.length() - 2);

        // Remove spaces from department
        String sanitizedDepartment = (department != null) ? department.replaceAll("\\s+", "") : "";

        if (sanitizedDepartment.isEmpty()) {
            return (lastName + firstLetter + "." + lastTwoDigitsPhoneNumber).toLowerCase();
        } else {
            return (lastName + firstLetter + "." + sanitizedDepartment + lastTwoDigitsPhoneNumber).toLowerCase();
        }
    }

    // Helper method to generate password
    @Override
    public String generatePassword(String firstName, String lastName, String email, String phoneNumber) {
        // Get first letter of firstName and first letter of lastName
        char firstLetterFirstName = Character.toLowerCase(firstName.charAt(0));
        char firstLetterLastName = Character.toLowerCase(lastName.charAt(0)); // Get first letter of lastName

        // Get first two letters of email (assuming email has at least two characters)
        String firstTwoLettersEmail = email.substring(0, 2).toLowerCase();

        // Generate last two digits of phoneNumber
        String lastTwoDigitsPhoneNumber = phoneNumber.substring(phoneNumber.length() - 2);

        // Concatenate all parts to form the password
        return String.valueOf(firstLetterFirstName) + firstLetterLastName + firstTwoLettersEmail + lastTwoDigitsPhoneNumber;
    }

    @Override
    public int getTodayActiveUsers() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

        List<User> users = userRepository.findAllByLastLoginDateBetween(startOfDay, endOfDay);
        return users.size();
    }

    @Override
    public int countAllUsers() {
        try {
            return userRepository.findAll().size();
        } catch (Exception e) {
            logger.error("Error occurred while counting users: {}", e.getMessage());
            return -1; // or throw a custom exception
        }
    }

    @Override
    public int countActiveUsers() {
        try {
            return userRepository.countByActiveTrue();
        } catch (Exception e) {
            logger.error("Error occurred while counting active users: {}", e.getMessage());
            return -1; // or throw a custom exception
        }
    }

    @Override
    public int countDeactivatedUsers() {
        try {
            return userRepository.countByActiveFalse();
        } catch (Exception e) {
            logger.error("Error occurred while counting deactivated users: {}", e.getMessage());
            return -1; // or throw a custom exception
        }
    }

    @Override
    public List<UserDto> getOnlineUsers() {
        List<User> onlineUsers = userRepository.findByOnlineStatusTrue();
        return onlineUsers.stream().map(UserMapper::mapToUserDto).collect(Collectors.toList());
    }

    //Nethuni
    @Override
    public List<UserDto> getAllAvailableUsers() {
        List<String> designations = List.of("Technical Officer", "Site Engineer", "Supervisor", "Store Keeper");
        //return userRepository.findByAvailabilityTrueAndDesignations(designations);
        List<User> users = userRepository.findByAvailabilityTrueAndDesignations(designations);
        return users.stream().map(UserMapper::mapToUserDto).collect(Collectors.toList());

    }


    //Ravindu
    @Override
    public List<UserDto> getAllAvailableProjectManagers() {
        List<String> designations = List.of("Project Manager");
        //return userRepository.findByAvailabilityTrueAndDesignations(designations);
        List<User> users = userRepository.findByAvailabilityTrueAndDesignations(designations);
        return users.stream().map(UserMapper::mapToUserDto).collect(Collectors.toList());

    }
}