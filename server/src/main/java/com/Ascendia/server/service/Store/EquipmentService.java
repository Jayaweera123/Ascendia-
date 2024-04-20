package com.Ascendia.server.service.Store;

import com.Ascendia.server.dto.Store.EquipmentDto;

import java.util.List;

public interface EquipmentService {
    EquipmentDto createEquipment(EquipmentDto equipmentDto);

    EquipmentDto getEquipmentById(Long equipmentId);

    List<EquipmentDto> getAllEquipment();

    EquipmentDto editEquipment(Long equipmentId, EquipmentDto editedEquipment);

    void deleteEquipment(Long equipmentId);

    List<EquipmentDto> searchEquipment(String query);
}
