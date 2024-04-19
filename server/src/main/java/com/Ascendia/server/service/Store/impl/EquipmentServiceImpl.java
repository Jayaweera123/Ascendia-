package com.Ascendia.server.service.Store.impl;

import com.Ascendia.server.dto.Store.EquipmentDto;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.Store.Equipment;
import com.Ascendia.server.exceptions.Store.ResourceNotFoundException;
import com.Ascendia.server.mapper.Store.EquipmentMapper;
import com.Ascendia.server.repository.Project.ProjectRepository;
import com.Ascendia.server.repository.Store.EquipmentRepository;
import com.Ascendia.server.service.Store.EquipmentService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor

public class EquipmentServiceImpl implements EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public EquipmentDto createEquipment(EquipmentDto equipmentDto) {


        // Fetch the Project entity from the database
        Project project = projectRepository.findById(equipmentDto.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + equipmentDto.getProjectId()));

        Equipment equipment = EquipmentMapper.mapToEquipment(equipmentDto, project);


        Equipment savedEquipment = equipmentRepository.save(equipment);

        return EquipmentMapper.mapToEquipmentDto(savedEquipment);
    }

    @Override
    public EquipmentDto getEquipmentById(Long equipmentId) {

        Equipment equipment = equipmentRepository.findById(equipmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Equipment is not exist with given id: " + equipmentId));

        return EquipmentMapper.mapToEquipmentDto(equipment);
    }

    @Override
    public List<EquipmentDto> getAllEquipment() {

        List<Equipment> equipments = equipmentRepository.findAll();

        return equipments.stream().map((equipment)-> EquipmentMapper.mapToEquipmentDto(equipment))
                .collect(Collectors.toList());

    }

    @Override
    public EquipmentDto editEquipment(Long equipmentId, EquipmentDto editedEquipment) {
        Equipment equipment = equipmentRepository.findById(equipmentId).orElseThrow(
                () -> new ResourceNotFoundException("Equipment is not exist with given id: " + equipmentId)
        );

        equipment.setEquipmentCode(editedEquipment.getEquipmentCode());
        equipment.setEquipmentName(editedEquipment.getEquipmentName());
        equipment.setDescription(editedEquipment.getDescription());
        equipment.setQuantity(editedEquipment.getQuantity());

        Equipment editedEquipmentObj = equipmentRepository.save(equipment);

        return EquipmentMapper.mapToEquipmentDto(editedEquipmentObj);
    }

    @Override
    public void deleteEquipment(Long equipmentId) {

        Equipment equipment = equipmentRepository.findById(equipmentId).orElseThrow(
                () -> new ResourceNotFoundException("Equipment is not exist with given id: " + equipmentId)
        );

        equipmentRepository.deleteById(equipmentId);

    }

    @Override
    public List<EquipmentDto> searchEquipment(String query) {
        List<Equipment> equipments = equipmentRepository.searchEquipment(query);

        return equipments.stream().map((equipment) -> EquipmentMapper.mapToEquipmentDto(equipment))
                .collect(Collectors.toList());
    }
}
