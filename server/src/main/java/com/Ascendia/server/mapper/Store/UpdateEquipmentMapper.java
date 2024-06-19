package com.Ascendia.server.mapper.Store;

import com.Ascendia.server.dto.Store.UpdateEquipmentDto;
import com.Ascendia.server.entity.Store.Equipment;
import com.Ascendia.server.entity.Store.UpdateEquipment;

public class UpdateEquipmentMapper {

    public static UpdateEquipmentDto mapToUpdateEquipmentDto(UpdateEquipment updateEquipment){
        Equipment equipment = updateEquipment.getEquipment();
        return new UpdateEquipmentDto(
                updateEquipment.getId(),
                updateEquipment.getUpdatedQuantity(),
                updateEquipment.getAction(),
                updateEquipment.getUpdatedDate(),
                updateEquipment.getEquipment().getEquipmentId(),
                equipment.getEquipmentCode(),
                equipment.getEquipmentName()
        );
    }

    public static UpdateEquipment mapToUpdateEquipment(UpdateEquipmentDto updateEquipmentDto){
        return new UpdateEquipment(
                updateEquipmentDto.getId(),
                updateEquipmentDto.getUpdatedQuantity(),
                updateEquipmentDto.getAction(),
                updateEquipmentDto.getUpdatedDate(),
                new Equipment()
        );
    }

}
