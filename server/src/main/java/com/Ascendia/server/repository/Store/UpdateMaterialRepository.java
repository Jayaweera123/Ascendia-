package com.Ascendia.server.repository.Store;

import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.Store.Material;
import com.Ascendia.server.entity.Store.UpdateMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UpdateMaterialRepository extends JpaRepository<UpdateMaterial, Long> {

    @Query("SELECT um FROM UpdateMaterial um WHERE um.material.project.projectId = :projectId")
    List<UpdateMaterial> findAllByProjectId(@Param("projectId") Long projectId);

}
