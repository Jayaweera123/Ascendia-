package com.Ascendia.server.controller.Store;

import com.Ascendia.server.dto.Store.MaterialDto;
import com.Ascendia.server.dto.Store.MaterialHistoryDto;
import com.Ascendia.server.dto.Store.UpdateMaterialDto;
import com.Ascendia.server.repository.Store.UpdateMaterialRepository;
import com.Ascendia.server.service.Store.MaterialService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/material")
@CrossOrigin("*")
@AllArgsConstructor

public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @Autowired
    private UpdateMaterialRepository updateMaterialRepository;

    //Build AddMaterial REST API
    @PostMapping("/createMaterial")
    public ResponseEntity<MaterialDto> createMaterial(@RequestBody MaterialDto materialDto){
        MaterialDto savedMaterial = materialService.createMaterial(materialDto);
        return new ResponseEntity<>(savedMaterial, HttpStatus.CREATED);
    }

    //Build get material REST API
    @GetMapping("/getMaterialById/{id}")
    public ResponseEntity<MaterialDto> getMaterialById(@PathVariable("id") Long materialId){
        MaterialDto materialDto = materialService.getMaterialById(materialId);
        return ResponseEntity.ok(materialDto);
    }

    //Build Get all material REST API
    @GetMapping("getAllMaterials/{projectId}")
    public ResponseEntity<List<MaterialDto>> getAllMaterials(@PathVariable Long projectId){
        List<MaterialDto> materials =  materialService.getAllMaterials(projectId);
        return ResponseEntity.ok(materials);
    }
    //Build Edit material REST API
    @PutMapping("/editMaterial/{id}")
    public ResponseEntity<MaterialDto> editMaterial(@PathVariable("id") Long materialId, @RequestBody MaterialDto editedMaterial) {
        MaterialDto materialDto = materialService.editMaterial(materialId, editedMaterial);
        return ResponseEntity.ok(materialDto);
    }

    //Build delete material REST API
    @DeleteMapping("/deleteMaterial/{id}")
    public ResponseEntity<String> deleteMaterial (@PathVariable("id") Long materialId){
        materialService.deleteMaterial(materialId);

        return ResponseEntity.ok("Material deleted successfully..");

    }

    //Build search REST API
    @GetMapping("/searchMaterial/{projectId}")
    public ResponseEntity<List<MaterialDto>> searchMaterial(@PathVariable Long projectId, @RequestParam("query") String query){
        return ResponseEntity.ok(materialService.searchMaterial(projectId, query));
    }

    //Build Update inventory REST API
    @PutMapping("/updateInventory/material/{id}")
    public ResponseEntity<MaterialDto> updateInventory(
            @PathVariable("id") Long materialId,
            @RequestBody UpdateMaterialDto updateMaterialDto) {
        MaterialDto materialDto = materialService.updateInventory(materialId, updateMaterialDto);
        return ResponseEntity.ok(materialDto);
    }


}