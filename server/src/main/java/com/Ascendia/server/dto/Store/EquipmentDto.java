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
public class EquipmentDto {

    private Long equipmentId;
    private String equipmentCode;
    private String equipmentName;
    private int quantity;
    private String description;
    private LocalDateTime createdDate;

}
