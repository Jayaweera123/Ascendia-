package com.Ascendia.server.repository.Store;

import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.Store.Material;
import com.Ascendia.server.entity.Store.UpdateMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface UpdateMaterialRepository extends JpaRepository<UpdateMaterial, Long> {

    @Query("SELECT um FROM UpdateMaterial um WHERE um.material.project.projectId = :projectId")
    List<UpdateMaterial> findAllByProjectId(@Param("projectId") Long projectId);

    @Query("SELECT um FROM UpdateMaterial um WHERE um.material.project.projectId = :projectId " +
            "AND (um.material.materialCode LIKE %:query% OR um.material.materialName LIKE %:query% " +
            "OR CAST(um.UpdatedDate AS string) LIKE %:query%)")
    List<UpdateMaterial> searchUpdatedMaterials(@Param("projectId") Long projectId, @Param("query") String query);

    @Query("SELECT um FROM UpdateMaterial um WHERE um.material.project.projectId = :projectId AND um.UpdatedDate BETWEEN :startDate AND :endDate")
    List<UpdateMaterial> findAllByProjectIdAndDateRange(@Param("projectId") Long projectId, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

}

