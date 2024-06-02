package com.Ascendia.server.service.Store.impl;

import com.Ascendia.server.dto.Store.EquipmentDto;
import com.Ascendia.server.dto.Store.UpdateEquipmentDto;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.Store.UpdateEquipment;
import com.Ascendia.server.mapper.Store.UpdateEquipmentMapper;
import com.Ascendia.server.repository.Store.UpdateEquipmentRepository;
import com.Ascendia.server.repository.Store.EquipmentRepository;
import com.Ascendia.server.entity.Store.Equipment;
import com.Ascendia.server.exceptions.Store.ResourceNotFoundException;
import com.Ascendia.server.mapper.Store.EquipmentMapper;
import com.Ascendia.server.repository.Project.ProjectRepository;
import com.Ascendia.server.service.Store.EquipmentService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    @Autowired
    private UpdateEquipmentRepository updateEquipmentRepository;

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
    public List<EquipmentDto> getAllEquipment(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + projectId));

        List<Equipment> equipments = equipmentRepository.findAllByProject(project);

        return equipments.stream().map(EquipmentMapper::mapToEquipmentDto)
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
    public List<EquipmentDto> searchEquipment(Long projectId, String query) {
        List<Equipment> equipments = equipmentRepository.searchEquipment(projectId, query);

        return equipments.stream().map(EquipmentMapper::mapToEquipmentDto)
                .collect(Collectors.toList());
    }

    @Override
    public EquipmentDto updateInventory(Long equipmentId, UpdateEquipmentDto updateEquipmentDto) {
        Equipment equipment = equipmentRepository.findById(equipmentId).orElseThrow(() ->
                new ResourceNotFoundException("Equipment not found with id: " + equipmentId));

        int updatedQuantity;
        if ("add".equalsIgnoreCase(updateEquipmentDto.getAction())) {
            updatedQuantity = equipment.getQuantity() + updateEquipmentDto.getUpdatedQuantity();
        } else if ("issue".equalsIgnoreCase(updateEquipmentDto.getAction())) {
            updatedQuantity = equipment.getQuantity() - updateEquipmentDto.getUpdatedQuantity();
        } else if ("return".equalsIgnoreCase(updateEquipmentDto.getAction())) {
            updatedQuantity = equipment.getQuantity() + updateEquipmentDto.getUpdatedQuantity();
        } else {
            throw new IllegalArgumentException("Invalid action provided.");
        }

        if (updatedQuantity < 0) {
            throw new IllegalArgumentException("Quantity cannot be negative.");
        }

        // Create entry in UpdateEquipment table
        UpdateEquipment updateEquipment = UpdateEquipmentMapper.mapToUpdateEquipment(updateEquipmentDto);

        equipment.setQuantity(updatedQuantity);
        updateEquipment.setUpdatedDate(LocalDateTime.now()); // Set the updatedDate to the current date and time
        equipmentRepository.save(equipment);


        updateEquipment.setEquipment(equipment); // Set the Equipment entity
        updateEquipmentRepository.save(updateEquipment);

        return EquipmentMapper.mapToEquipmentDto(equipment);
    }

    @Override
    public List<UpdateEquipmentDto> getAllUpdatedEquipments(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + projectId));
        List<UpdateEquipment> updatedEquipments = updateEquipmentRepository.findAllByProjectId(projectId);
        return updatedEquipments.stream()
                .map(UpdateEquipmentMapper::mapToUpdateEquipmentDto)
                .collect(Collectors.toList());
    }

}
