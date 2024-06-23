package com.Ascendia.server.dto.Store;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateEquipmentDto {
    private Long id;
    private int updatedQuantity;
    private String action; //Add,Issue, or return
    private LocalDateTime UpdatedDate;
    private Long equipmentId;
    private String equipmentCode;
    private String equipmentName;

}
