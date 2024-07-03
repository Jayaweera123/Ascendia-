package com.Ascendia.server.repository.Store;

import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.Store.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, Long> {

    @Query("SELECT m FROM Material m WHERE " +
            "m.project.projectId = :projectId AND " +
            "(m.materialCode LIKE CONCAT('%',:query, '%') OR " +
            "m.materialName LIKE CONCAT('%',:query, '%'))")
    List<Material> searchMaterial(Long projectId, String query);
    List<Material> findAllByProject(Project project);

    @Query("SELECT m FROM Material m WHERE " +
            "m.project.projectId = :projectId AND " +
            "m.status = 'Low Stock'")
    List<Material> findProjectsWithLowStockMaterials(@Param("projectId") Long projectId);

}
