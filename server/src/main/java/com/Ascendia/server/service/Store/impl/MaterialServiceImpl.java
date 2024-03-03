package com.Ascendia.server.service.Store.impl;

import com.Ascendia.server.dto.Store.MaterialDto;
import com.Ascendia.server.service.Store.MaterialService;
import com.Ascendia.server.entity.Store.Material;
import com.Ascendia.server.exceptions.Store.ResourceNotFoundException;
import com.Ascendia.server.mapper.Store.MaterialMapper;
import com.Ascendia.server.repository.Store.MaterialRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class MaterialServiceImpl implements MaterialService {
    @Autowired
    private MaterialRepository materialRepository;

    @Override
    public MaterialDto createMaterial(MaterialDto materialDto) {

        Material material = MaterialMapper.mapToMaterial(materialDto);
        Material savedMaterial = materialRepository.save(material);

        return MaterialMapper.mapToMaterialDto(savedMaterial);
    }

    @Override
    public MaterialDto getMaterialById(Long materialId) {
        Material material = materialRepository.findById(materialId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Material is not exist with given id: " + materialId) );

        return MaterialMapper.mapToMaterialDto(material);
    }

    @Override
    public List<MaterialDto> getAllMaterials() {
        List<Material> materials = materialRepository.findAll();
        return materials.stream().map((material) -> MaterialMapper.mapToMaterialDto(material))
                .collect(Collectors.toList());
    }

    @Override
    public MaterialDto editMaterial(Long materialId, MaterialDto editedMaterial) {
        Material material = materialRepository.findById(materialId).orElseThrow(
                () -> new ResourceNotFoundException("Material is not exists with given id: " + materialId)
        );

        material.setMaterialCode(editedMaterial.getMaterialCode());
        material.setMaterialName(editedMaterial.getMaterialName());
        material.setDescription(editedMaterial.getDescription());
        material.setQuantity(editedMaterial.getQuantity());
        material.setMeasuringUnit(editedMaterial.getMeasuringUnit());
        material.setDescription(editedMaterial.getDescription());

        Material editedMaterialObj = materialRepository.save(material);

        return MaterialMapper.mapToMaterialDto(editedMaterialObj);
    }

    @Override
    public void deleteMaterial(Long materialId) {

        Material material = materialRepository.findById(materialId).orElseThrow(
                () -> new ResourceNotFoundException("Material is not exists with given id: " + materialId)
        );

        materialRepository.deleteById(materialId);
    }
}
