package com.Ascendia.server.mapper.Store;


import com.Ascendia.server.dto.Store.UpdateMaterialDto;
import com.Ascendia.server.entity.Store.Material;
import com.Ascendia.server.entity.Store.UpdateMaterial;

public class UpdateMaterialMapper {

    public static UpdateMaterialDto mapToUpdateMaterialDto(UpdateMaterial updateMaterial){
        Material material = updateMaterial.getMaterial();
        return new UpdateMaterialDto(
                updateMaterial.getId(),
                updateMaterial.getUpdatedQuantity(),
                updateMaterial.getAction(),
                updateMaterial.getUpdatedDate(),
                updateMaterial.getMaterial().getMaterialId(),
                material.getMaterialCode(),
                material.getMaterialName(),
                material.getMeasuringUnit()
        );
    }

    public static UpdateMaterial mapToUpdateMaterial(UpdateMaterialDto updateMaterialDto){
        return new UpdateMaterial(
                updateMaterialDto.getId(),
                updateMaterialDto.getUpdatedQuantity(),
                updateMaterialDto.getAction(),
                updateMaterialDto.getUpdatedDate(),
                new Material()
        );
    }
}
