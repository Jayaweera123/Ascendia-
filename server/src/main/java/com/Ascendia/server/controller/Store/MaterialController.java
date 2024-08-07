package com.Ascendia.server.controller.Store;

import com.Ascendia.server.dto.Store.MaterialDto;
import com.Ascendia.server.dto.Store.UpdateMaterialDto;
import com.Ascendia.server.service.Store.MaterialService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping
@CrossOrigin("*")
@AllArgsConstructor

public class MaterialController {

    @Autowired
    private MaterialService materialService;

    //Build AddMaterial REST API
    @PostMapping("/skeeperonly/material/createMaterial")
    public ResponseEntity<MaterialDto> createMaterial(@RequestBody MaterialDto materialDto){
        MaterialDto savedMaterial = materialService.createMaterial(materialDto);
        return new ResponseEntity<>(savedMaterial, HttpStatus.CREATED);
    }

    //Build get material REST API
    @GetMapping("/store/material/getMaterialById/{id}")
    public ResponseEntity<MaterialDto> getMaterialById(@PathVariable("id") Long materialId){
        MaterialDto materialDto = materialService.getMaterialById(materialId);
        return ResponseEntity.ok(materialDto);
    }

    //Build Get all material REST API
    @GetMapping("/store/material/getAllMaterials/{projectId}")
    public ResponseEntity<List<MaterialDto>> getAllMaterials(@PathVariable Long projectId){
        List<MaterialDto> materials =  materialService.getAllMaterials(projectId);
        return ResponseEntity.ok(materials);
    }

    //Build Edit material REST API
    @PutMapping("/skeeperonly/material/editMaterial/{id}")
    public ResponseEntity<MaterialDto> editMaterial(@PathVariable("id") Long materialId, @RequestBody MaterialDto editedMaterial) {
        MaterialDto materialDto = materialService.editMaterial(materialId, editedMaterial);
        return ResponseEntity.ok(materialDto);
    }

    //Build delete material REST API
    @DeleteMapping("/skeeperonly/material/deleteMaterial/{id}")
    public ResponseEntity<String> deleteMaterial (@PathVariable("id") Long materialId){
        materialService.deleteMaterial(materialId);

        return ResponseEntity.ok("Material deleted successfully..");

    }

    //Build search REST API
    @GetMapping("/store/material/searchMaterial/{projectId}")
    public ResponseEntity<List<MaterialDto>> searchMaterial(@PathVariable Long projectId, @RequestParam("query") String query){
        return ResponseEntity.ok(materialService.searchMaterial(projectId, query));
    }

    //Build Update inventory REST API
    @PutMapping("/skeeperonly/material/updateInventory/material/{id}")
    public ResponseEntity<MaterialDto> updateInventory(
            @PathVariable("id") Long materialId,
            @RequestBody UpdateMaterialDto updateMaterialDto) {
        MaterialDto materialDto = materialService.updateInventory(materialId, updateMaterialDto);
        return ResponseEntity.ok(materialDto);
    }

    //Build get all updated materials REST API
    @GetMapping("/store/material/getAllUpdatedMaterials/{projectId}")
    public ResponseEntity<List<UpdateMaterialDto>> getUpdatedMaterials(@PathVariable Long projectId) {
        List<UpdateMaterialDto> updatedMaterials = materialService.getAllUpdatedMaterials(projectId);
        return ResponseEntity.ok(updatedMaterials);
    }

    // Build searchUpdatedMaterial REST API
    @GetMapping("/store/material/searchUpdatedMaterial/{projectId}")
    public ResponseEntity<List<UpdateMaterialDto>> searchUpdatedMaterial(
            @PathVariable Long projectId,
            @RequestParam("query") String query) {
        return ResponseEntity.ok(materialService.searchUpdatedMaterials(projectId, query));
    }

    // Endpoint to get updated materials by date range
    @GetMapping("/store/material/getUpdatedMaterialsByDateRange/{projectId}")
    public ResponseEntity<List<UpdateMaterialDto>> getUpdatedMaterialsByDateRange(
            @PathVariable Long projectId,
            @RequestParam("startDate") String startDateStr,
            @RequestParam("endDate") String endDateStr) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime startDate = LocalDateTime.parse(startDateStr, formatter);
        LocalDateTime endDate = LocalDateTime.parse(endDateStr, formatter);

        List<UpdateMaterialDto> updatedMaterials = materialService.getUpdatedMaterialsByDateRange(projectId, startDate, endDate);

        return ResponseEntity.ok(updatedMaterials);
    }
}