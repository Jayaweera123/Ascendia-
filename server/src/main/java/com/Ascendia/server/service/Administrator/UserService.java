package com.Ascendia.server.service.Administrator;

import com.Ascendia.server.dto.Administrator.UserDto;

import java.util.List;

public interface UserService {
    public List<UserDto> getAvailableEmployees();
}
