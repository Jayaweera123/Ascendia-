package com.Ascendia.server.mapper.Store;

import com.Ascendia.server.dto.Store.MaterialDto;
import com.Ascendia.server.entity.Store.Material;

public class MaterialMapper {

    public static MaterialDto mapToMaterialDto(Material material){
        return new MaterialDto(
                material.getMaterialId(),
                material.getMaterialCode(),
                material.getMaterialName(),
                material.getQuantity(),
                material.getMeasuringUnit(),
                material.getMinimumLevel(),
                material.getDescription()
                //material.getCreatedDate()
        );
    }

    public static Material mapToMaterial(MaterialDto materialDto){
        return new Material(
                materialDto.getMaterialId(),
                materialDto.getMaterialCode(),
                materialDto.getMaterialName(),
                materialDto.getQuantity(),
                materialDto.getMeasuringUnit(),
                materialDto.getMinimumLevel(),
                materialDto.getDescription()
                // materialDto.getCreatedDate()
        );
    }
}

