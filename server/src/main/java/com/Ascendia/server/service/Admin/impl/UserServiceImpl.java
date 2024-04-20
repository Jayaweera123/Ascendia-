package com.Ascendia.server.service.Admin.impl;

import com.Ascendia.server.dto.Admin.UserDto;
import com.Ascendia.server.entity.Admin.User;
import com.Ascendia.server.mapper.Admin.UserMapper;
import com.Ascendia.server.repository.Admin.UserRepository;
import com.Ascendia.server.service.Admin.UserService;
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
