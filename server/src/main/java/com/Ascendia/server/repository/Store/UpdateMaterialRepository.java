package com.Ascendia.server.repository.Store;

import com.Ascendia.server.entity.Store.UpdateMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.Ascendia.server.dto.Store.UpdateMaterialDto;

import java.util.List;

public interface UpdateMaterialRepository extends JpaRepository<UpdateMaterial, Long> {

    @Query("SELECT new com.Ascendia.server.dto.Store.UpdatedMaterialDto(um.id, um.updatedQuantity, um.action, um.UpdatedDate, m.materialCode, m.materialName)" +
            " FROM UpdateMaterial um JOIN um.material m WHERE m.project.projectId = :projectId")
    List<UpdateMaterialDto> findAllUpdatedMaterialsByProjectId(@Param("projectId") Long projectId);
}
