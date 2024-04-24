package com.Ascendia.server.service.Administrator.impl;

import com.Ascendia.server.dto.Administrator.UserDto;
import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.mapper.Administrator.UserMapper;
import com.Ascendia.server.repository.Administrator.UserRepository;
import com.Ascendia.server.service.Administrator.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;


    @Override
    public List<UserDto> getAvailableEmployees() {
        List<User> users = userRepository.findByAvailableTrue();
        return users.stream().map(UserMapper::mapToUserDto).collect(Collectors.toList());
    }
}
