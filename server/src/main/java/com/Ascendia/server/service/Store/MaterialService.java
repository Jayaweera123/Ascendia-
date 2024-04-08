package com.Ascendia.server.service.Store;

import com.Ascendia.server.dto.Store.MaterialDto;
import com.Ascendia.server.dto.Store.UpdateMaterialDto;

import java.util.List;

public interface MaterialService {
    MaterialDto createMaterial(MaterialDto materialDto);

    MaterialDto getMaterialById(Long materialId);

    List<MaterialDto> getAllMaterials();

    MaterialDto editMaterial(Long materialId, MaterialDto editedMaterial);

    void deleteMaterial(Long materialId);

    List<MaterialDto> searchMaterial(String query);

    MaterialDto updateInventory(Long materialId, UpdateMaterialDto updateMaterialDto);

}
