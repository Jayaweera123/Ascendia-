package com.Ascendia.server.mapper.Store;

import com.Ascendia.server.dto.Store.EquipmentDto;
import com.Ascendia.server.entity.Store.Equipment;
import com.Ascendia.server.entity.Project.Project;

public class EquipmentMapper {

    public static EquipmentDto mapToEquipmentDto(Equipment equipment){
        return new EquipmentDto(
                equipment.getEquipmentId(),
                equipment.getEquipmentCode(),
                equipment.getEquipmentName(),
                equipment.getQuantity(),
                equipment.getDescription(),
                equipment.getCreatedDate(),
                equipment.getProject().getProjectId()

        );
    }

    public static Equipment mapToEquipment(EquipmentDto equipmentDto, Project project){
        return new Equipment(
                equipmentDto.getEquipmentId(),
                equipmentDto.getEquipmentCode(),
                equipmentDto.getEquipmentName(),
                equipmentDto.getQuantity(),
                equipmentDto.getDescription(),
                equipmentDto.getCreatedDate(),
                project
        );
    }

}
