package com.Ascendia.server.service.Store.impl;

import com.Ascendia.server.dto.Store.MaterialDto;
import com.Ascendia.server.dto.Store.NotificationDto;
import com.Ascendia.server.dto.Store.UpdateMaterialDto;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.Store.Notification;
import com.Ascendia.server.entity.Store.UpdateMaterial;
import com.Ascendia.server.mapper.Store.NotificationMapper;
import com.Ascendia.server.mapper.Store.UpdateMaterialMapper;
import com.Ascendia.server.repository.Project.ProjectRepository;
import com.Ascendia.server.repository.Store.NotificationRepository;
import com.Ascendia.server.repository.Store.UpdateMaterialRepository;
import com.Ascendia.server.service.Store.MaterialService;
import com.Ascendia.server.entity.Store.Material;
import com.Ascendia.server.exceptions.Store.ResourceNotFoundException;
import com.Ascendia.server.mapper.Store.MaterialMapper;
import com.Ascendia.server.repository.Store.MaterialRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class MaterialServiceImpl implements MaterialService {
    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UpdateMaterialRepository updateMaterialRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public MaterialDto createMaterial(MaterialDto materialDto) {

        // Fetch the Project entity from the database
        Project project = projectRepository.findById(materialDto.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + materialDto.getProjectId()));

        Material material = MaterialMapper.mapToMaterial(materialDto, project);

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
    public List<MaterialDto> getAllMaterials(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + projectId));
        List<Material> materials = materialRepository.findAllByProject(project);
        return materials.stream().map(MaterialMapper::mapToMaterialDto)
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
        material.setMinimumLevel(editedMaterial.getMinimumLevel());

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

    @Override
    public List<MaterialDto> searchMaterial(Long projectId, String query) {
        List<Material> materials =  materialRepository.searchMaterial(projectId, query);
        return materials.stream().map(MaterialMapper::mapToMaterialDto)
                .collect(Collectors.toList());
    }

    @Override
    public MaterialDto updateInventory(Long materialId, UpdateMaterialDto updateMaterialDto) {
        Material material = materialRepository.findById(materialId).orElseThrow(() ->
                new ResourceNotFoundException("Material not found with id: " + materialId));

        int updatedQuantity;
        if ("add".equalsIgnoreCase(updateMaterialDto.getAction())) {
            updatedQuantity = material.getQuantity() + updateMaterialDto.getUpdatedQuantity();
        } else if ("issue".equalsIgnoreCase(updateMaterialDto.getAction())) {
            updatedQuantity = material.getQuantity() - updateMaterialDto.getUpdatedQuantity();
        } else {
            throw new IllegalArgumentException("Invalid action provided.");
        }

        if (updatedQuantity < 0) {
            throw new IllegalArgumentException("Quantity cannot be negative.");
        }

        // Create entry in UpdateMaterial table
        UpdateMaterial updateMaterial = UpdateMaterialMapper.mapToUpdateMaterial(updateMaterialDto);

        material.setQuantity(updatedQuantity);
        updateMaterial.setUpdatedDate(LocalDateTime.now()); // Set the updatedDate to the current date and time
        materialRepository.save(material);

        updateMaterial.setMaterial(material); // Set the Material entity
        updateMaterialRepository.save(updateMaterial);

        // Check if material quantity is less than minimum level and send notification if it is
        if (updatedQuantity < material.getMinimumLevel()) {
            sendLowStockNotification(material);
        }

        return MaterialMapper.mapToMaterialDto(material);
    }

    // Method to send notification
    private void sendLowStockNotification(Material material) {


        String storeKeeperId = material.getUserId(); // Assuming you have a way to get storekeeper ID
        String message = material.getMaterialCode() + " - " + material.getMaterialName()  +  " is running low !";

        Notification notification = new Notification(storeKeeperId, message);

        notification.setNotifyDate(LocalDateTime.now());
        // Save notification to the database
        notificationRepository.save(notification);

        // Use SimpMessagingTemplate to send notification
        simpMessagingTemplate.convertAndSendToUser(storeKeeperId, "/private", notification);
    }

    @Override
    public List<UpdateMaterialDto> getAllUpdatedMaterials(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + projectId));
        List<UpdateMaterial> updatedMaterials = updateMaterialRepository.findAllByProjectId(projectId);
        return updatedMaterials.stream()
                .map(UpdateMaterialMapper::mapToUpdateMaterialDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<UpdateMaterialDto> searchUpdatedMaterials(Long projectId, String query) {
        List<UpdateMaterial> updatedMaterials = updateMaterialRepository.searchUpdatedMaterials(projectId, query);
        return updatedMaterials.stream()
                .map(UpdateMaterialMapper::mapToUpdateMaterialDto)
                .collect(Collectors.toList());
    }



    public List<UpdateMaterialDto> getUpdatedMaterialsByDateRange(Long projectId, LocalDateTime startDate, LocalDateTime endDate) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + projectId));

        List<UpdateMaterial> updatedMaterials = updateMaterialRepository.findAllByProjectIdAndDateRange(projectId, startDate, endDate);

        return updatedMaterials.stream()
                .map(UpdateMaterialMapper::mapToUpdateMaterialDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<NotificationDto> getAllNotifications(String userId) {
        List<Notification> notifications = notificationRepository.findByUserId(userId);
        return notifications.stream()
                .map(NotificationMapper::mapToNotificationDto)
                .collect(Collectors.toList());
    }
}