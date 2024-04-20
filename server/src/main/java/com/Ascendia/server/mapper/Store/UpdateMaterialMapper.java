package com.Ascendia.server.mapper.Store;


import com.Ascendia.server.dto.Store.UpdateMaterialDto;
import com.Ascendia.server.entity.Store.UpdateMaterial;

public class UpdateMaterialMapper {

    public static UpdateMaterialDto mapToUpdateMaterialDto(UpdateMaterial updateMaterial){
        return new UpdateMaterialDto(
                updateMaterial.getId(),
                updateMaterial.getMaterialCode(),
                updateMaterial.getMaterialName(),
                updateMaterial.getUpdatedQuantity(),
                updateMaterial.getAction(),
                updateMaterial.getUpdatedDate()
        );
    }

    public static UpdateMaterial mapToUpdateMaterial(UpdateMaterialDto updateMaterialDto){
        return new UpdateMaterial(
                updateMaterialDto.getId(),
                updateMaterialDto.getMaterialCode(),
                updateMaterialDto.getMaterialName(),
                updateMaterialDto.getUpdatedQuantity(),
                updateMaterialDto.getAction(),
                updateMaterialDto.getUpdatedDate()
        );
    }
}
