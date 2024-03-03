package com.Ascendia.server.repository.Store;

import com.Ascendia.server.entity.Store.Material;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRepository extends JpaRepository<Material, Long> {
}
