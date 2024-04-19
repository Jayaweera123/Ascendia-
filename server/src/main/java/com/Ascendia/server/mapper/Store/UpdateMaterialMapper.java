package com.Ascendia.server.mapper.Store;


import com.Ascendia.server.dto.Store.UpdateMaterialDto;
import com.Ascendia.server.entity.Store.Material;
import com.Ascendia.server.entity.Store.UpdateMaterial;

public class UpdateMaterialMapper {

    public static UpdateMaterialDto mapToUpdateMaterialDto(UpdateMaterial updateMaterial){
        return new UpdateMaterialDto(
                updateMaterial.getId(),
                updateMaterial.getUpdatedQuantity(),
                updateMaterial.getAction(),
                updateMaterial.getUpdatedDate(),
                updateMaterial.getMaterial().getMaterialId()
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
