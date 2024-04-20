package com.Ascendia.server.service.Admin;

import com.Ascendia.server.dto.Admin.UserDto;

import java.util.List;

public interface UserService {
    public List<UserDto> getAvailableEmployees();
}
