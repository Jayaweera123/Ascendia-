package com.Ascendia.server.service.Administrator.impl;

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
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final String uploadDir; // Path to the directory where profile images will be stored

    @Autowired
    public UserServiceImpl(UserRepository userRepository, @Value("${user.profile.image.upload-dir}") String uploadDir) {
        this.userRepository = userRepository;
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
            String username = generateUsername(userDto.getFirstName(), userDto.getLastName(), userDto.getDepartment(), userDto.getUserID());
            userDto.setUsername(username);

            // Generate password
            String password = generatePassword(userDto);
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

            // Generate JWT token
            String jwtToken = jwtUtils.generateToken(user);
            String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

            // Prepare response
            userDto.setStatusCode(200);
            userDto.setToken(jwtToken);
            userDto.setDesignation(user.getDesignation());
            userDto.setRefreshToken(refreshToken);
            userDto.setExpirationTime("24 hours");
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



    {/*public UserDto login(UserDto loginRequest){
        UserDto userDto2 = new UserDto();
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            var user1 = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow();

            var jwt = jwtUtils.generateToken(user1);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user1);
            userDto2.setStatusCode(200);
            userDto2.setToken(jwt);
            userDto2.setDesignation(user1.getDesignation());
            userDto2.setRefreshToken(refreshToken);
            userDto2.setExpirationTime("24Hrs");
            userDto2.setMessage("Successfully Logged In");

        }catch (Exception e){
           userDto2.setStatusCode(500);
           userDto2.setMessage(e.getMessage());
        }
        return userDto2;
    }*/}

    public UserDto refreshToken(UserDto refreshTokenRequest){
        UserDto userDto2 = new UserDto();
        try{
            String userUsername = jwtUtils.extractUsername(refreshTokenRequest.getToken());
            User user2 = userRepository.findByUsername(userUsername).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), user2)) {
                var jwt = jwtUtils.generateToken(user2);
                userDto2.setStatusCode(200);
                userDto2.setToken(jwt);
                userDto2.setRefreshToken(refreshTokenRequest.getToken());
                userDto2.setExpirationTime("24Hr");
                userDto2.setMessage("Successfully Refreshed Token");
            }
            userDto2.setStatusCode(200);
            return userDto2;

        }catch (Exception e){
            userDto2.setStatusCode(500);
            userDto2.setMessage(e.getMessage());
            return userDto2;
        }
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
    public UserDto updateUser(Long userID, UserDto updatedUser, MultipartFile profileImage) {
        UserDto userDto4 = new UserDto();
        try {
            Optional<User> userOptional = userRepository.findById(userID);
            if (userOptional.isPresent()) {
                User existingUser = userOptional.get();

                // Update basic user details
                existingUser.setFirstName(updatedUser.getFirstName());
                existingUser.setLastName(updatedUser.getLastName());
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
                existingUser.setDesignation(updatedUser.getDesignation());
                existingUser.setDepartment(updatedUser.getDepartment());

                // Check if a new profile image is provided
                if (profileImage != null && !profileImage.isEmpty()) {
                    try {
                        // Get the file name
                        String fileName = StringUtils.cleanPath(profileImage.getOriginalFilename());
                        // Set the file path where the image will be stored
                        Path uploadPath = Paths.get(uploadDir + fileName);
                        // Copy the file to the upload path
                        Files.copy(profileImage.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
                        // Set the profile picture URL in the user entity
                        existingUser.setProfilePicUrl(uploadPath.toString());
                    } catch (IOException e) {
                        e.printStackTrace(); // Handle the exception appropriately
                        userDto4.setStatusCode(500);
                        userDto4.setMessage("Error occurred while uploading profile image: " + e.getMessage());
                        return userDto4;
                    }
                }

                // Save the user entity with updated details
                User savedUser = userRepository.save(existingUser);
                userDto4.setUser(savedUser);
                userDto4.setStatusCode(200);
                userDto4.setMessage("User updated successfully");
            } else {
                userDto4.setStatusCode(404);
                userDto4.setMessage("User not found for update");
            }
        } catch (Exception e) {
            userDto4.setStatusCode(500);
            userDto4.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return userDto4;
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

        // Save the updated user entity
        userRepository.save(user);
    }

    {/*public ReqRes deleteUser(Integer userId) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<OurUsers> userOptional = usersRepo.findById(userId);
            if (userOptional.isPresent()) {
                usersRepo.deleteById(userId);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User deleted successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return reqRes;
    } */}

    // Helper method to generate username
    @Override
    public String generateUsername(String firstName, String lastName, String department, long userId) {
        char firstLetter = Character.toLowerCase(firstName.charAt(0));
        String userIdString = String.valueOf(userId);

        if (department == null || department.isEmpty()) {
            return (lastName + firstLetter + "." + userIdString).toLowerCase();
        } else {
            return (lastName + firstLetter + "." + department + userIdString).toLowerCase();
        }
    }



    // Helper method to generate password
    @Override
    public String generatePassword(UserDto userDto) {
        StringBuilder passwordBuilder = new StringBuilder();

        // Append first letter of the first name (if available)
        if (!StringUtils.isEmpty(userDto.getFirstName())) {
            passwordBuilder.append(Character.toLowerCase(userDto.getFirstName().charAt(0)));
        }

        // Append first letter of the last name (if available)
        if (!StringUtils.isEmpty(userDto.getLastName())) {
            passwordBuilder.append(Character.toLowerCase(userDto.getLastName().charAt(0)));
        }

        // Append userID
        passwordBuilder.append(userDto.getUserID());

        return passwordBuilder.toString();
    }

}