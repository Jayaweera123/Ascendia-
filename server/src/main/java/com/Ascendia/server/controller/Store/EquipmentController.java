package com.Ascendia.server.controller.Store;

import com.Ascendia.server.dto.Store.EquipmentDto;

import com.Ascendia.server.service.Store.EquipmentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipment")
@CrossOrigin("*")
@AllArgsConstructor

public class EquipmentController {

    @Autowired
    private EquipmentService equipmentService;

    //Build AddEquipment REST API
    @PostMapping("/createEquipment")
    public ResponseEntity<EquipmentDto> createEquipment(@RequestBody EquipmentDto equipmentDto){
        EquipmentDto savedEquipment = equipmentService.createEquipment(equipmentDto);
        return new ResponseEntity<>(savedEquipment, HttpStatus.CREATED);
    }

    //Build get Equipment REST API
    @CrossOrigin

    @GetMapping("/getEquipmentById{id}")
    public ResponseEntity<EquipmentDto> getEquipmentById(@PathVariable("id") Long equipmentId){
        EquipmentDto equipmentDto = equipmentService.getEquipmentById(equipmentId);
        return ResponseEntity.ok(equipmentDto);
    }

    //Build Get all Equipment REST API
    @GetMapping("/getAllEquipment")
    public ResponseEntity<List<EquipmentDto>> getAllEquipment(){
        List<EquipmentDto> equipment =  equipmentService.getAllEquipment();
        return ResponseEntity.ok(equipment);
    }

    //Build Edit Equipment REST API
    @PutMapping("/editEquipment{id}")
    public ResponseEntity<EquipmentDto> editEquipment(@PathVariable("id") Long equipmentId, @RequestBody EquipmentDto editedEquipment) {
        EquipmentDto equipmentDto = equipmentService.editEquipment(equipmentId, editedEquipment);
        return ResponseEntity.ok(equipmentDto);
    }

    //Build delete Equipment REST API
    @DeleteMapping("/deleteEquipment{id}")
    public ResponseEntity<String> deleteEquipment (@PathVariable("id") Long equipmentId){
        equipmentService.deleteEquipment(equipmentId);

        return ResponseEntity.ok("Equipment deleted successfully..");

    }

    @GetMapping("/searchEquipment")
    public ResponseEntity<List<EquipmentDto>> searchEquipment(@RequestParam("query") String query){
        return ResponseEntity.ok(equipmentService.searchEquipment(query));
    }

}
