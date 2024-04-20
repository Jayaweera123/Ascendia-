package com.Ascendia.server.repository.Store;

import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.Store.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    @Query(
            "SELECT p FROM Equipment p WHERE " +
                    "p.project.projectId = :projectId AND " +
                    "(p.equipmentCode LIKE CONCAT('%',:query, '%') OR " +
                    "p.equipmentName LIKE CONCAT('%',:query, '%'))")
    List<Equipment> searchEquipment(Long projectId, String query);
    List<Equipment> findAllByProject(Project project);
}
