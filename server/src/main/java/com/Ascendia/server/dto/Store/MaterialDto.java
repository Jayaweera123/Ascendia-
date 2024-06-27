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
public class MaterialDto {
    private Long materialId;
    private String materialCode;
    private String materialName;
    private int quantity;
    private String measuringUnit;
    private int minimumLevel;
    private String description;
    private LocalDateTime createdDate;
    private Long projectId;
    private String userId;
    private String status;

}
