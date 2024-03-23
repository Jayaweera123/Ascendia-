package com.Ascendia.server.repository.Store;

import com.Ascendia.server.entity.Store.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, Long> {

    @Query("SELECT p FROM Material p WHERE " +
            "p.materialCode LIKE CONCAT('%',:query, '%')" +
            "Or p.materialName LIKE CONCAT('%',:query, '%')")
    List<Material> searchMaterial(String query);
}
