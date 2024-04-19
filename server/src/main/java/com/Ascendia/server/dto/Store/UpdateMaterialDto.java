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
public class UpdateMaterialDto {
    private Long id;
    private int updatedQuantity;
    private String action; //Add or Issue
    private LocalDateTime UpdatedDate;
    private Long materialId;

}
