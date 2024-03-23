package com.Ascendia.server.mapper.Store;

import com.Ascendia.server.dto.Store.EquipmentDto;
import com.Ascendia.server.entity.Store.Equipment;

public class EquipmentMapper {

    public static EquipmentDto mapToEquipmentDto(Equipment equipment){
        return new EquipmentDto(
                equipment.getEquipmentId(),
                equipment.getEquipmentCode(),
                equipment.getEquipmentName(),
                equipment.getQuantity(),
                equipment.getDescription(),
                equipment.getCreatedDate()
        );
    }

    public static Equipment mapToEquipment(EquipmentDto equipmentDto){
        return new Equipment(
                equipmentDto.getEquipmentId(),
                equipmentDto.getEquipmentCode(),
                equipmentDto.getEquipmentName(),
                equipmentDto.getQuantity(),
                equipmentDto.getDescription(),
                equipmentDto.getCreatedDate()
        );
    }

}
