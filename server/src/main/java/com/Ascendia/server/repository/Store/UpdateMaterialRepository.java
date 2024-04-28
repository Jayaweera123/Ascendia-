package com.Ascendia.server.repository.Store;

import com.Ascendia.server.dto.Store.MaterialHistoryDto;
import com.Ascendia.server.entity.Store.UpdateMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.Ascendia.server.dto.Store.UpdateMaterialDto;

import java.util.List;

public interface UpdateMaterialRepository extends JpaRepository<UpdateMaterial, Long> {

}
