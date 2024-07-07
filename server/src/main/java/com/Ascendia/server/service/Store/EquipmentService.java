package com.Ascendia.server.service.Store;

import com.Ascendia.server.dto.Store.EquipmentDto;
import com.Ascendia.server.dto.Store.UpdateEquipmentDto;

import java.util.List;

public interface EquipmentService {
    EquipmentDto createEquipment(EquipmentDto equipmentDto);

    EquipmentDto getEquipmentById(Long equipmentId);

    List<EquipmentDto> getAllEquipment(Long projectId);

    EquipmentDto editEquipment(Long equipmentId, EquipmentDto editedEquipment);

    void deleteEquipment(Long equipmentId);

    List<EquipmentDto> searchEquipment(Long projectId, String query);

    EquipmentDto updateInventory(Long equipmentId, UpdateEquipmentDto updateEquipmentDto);

    List<UpdateEquipmentDto> getAllUpdatedEquipments(Long projectId);

    List<UpdateEquipmentDto> searchUpdatedEquipment(Long projectId, String query);
}
