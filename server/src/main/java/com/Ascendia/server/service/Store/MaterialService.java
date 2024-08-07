package com.Ascendia.server.service.Store;

import com.Ascendia.server.dto.Store.MaterialDto;
import com.Ascendia.server.dto.Store.UpdateMaterialDto;

import java.time.LocalDateTime;
import java.util.List;

public interface MaterialService {
    MaterialDto createMaterial(MaterialDto materialDto);

    MaterialDto getMaterialById(Long materialId);

    List<MaterialDto> getAllMaterials(Long projectId);

    MaterialDto editMaterial(Long materialId, MaterialDto editedMaterial);

    void deleteMaterial(Long materialId);

    List<MaterialDto> searchMaterial(Long projectId, String query);

    MaterialDto updateInventory(Long materialId, UpdateMaterialDto updateMaterialDto);

    List<UpdateMaterialDto> getAllUpdatedMaterials(Long projectId);

    List<UpdateMaterialDto> searchUpdatedMaterials(Long projectId, String query);

    List<UpdateMaterialDto> getUpdatedMaterialsByDateRange(Long projectId, LocalDateTime startDate, LocalDateTime endDate);


}
