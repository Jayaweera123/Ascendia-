package com.Ascendia.server.repository.Store;

import com.Ascendia.server.entity.Store.UpdateEquipment;
import com.Ascendia.server.entity.Store.UpdateMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UpdateEquipmentRepository extends JpaRepository<UpdateEquipment, Long>{

    @Query("SELECT ue FROM UpdateEquipment ue WHERE ue.equipment.project.projectId = :projectId")
    List<UpdateEquipment> findAllByProjectId(@Param("projectId") Long projectId);

    @Query("SELECT ue FROM UpdateEquipment ue WHERE ue.equipment.project.projectId = :projectId " +
            "AND (ue.equipment.equipmentCode LIKE %:query% OR ue.equipment.equipmentName LIKE %:query%)" )
    List<UpdateEquipment> searchUpdatedEquipment(@Param("projectId") Long projectId, @Param("query") String query);

}
