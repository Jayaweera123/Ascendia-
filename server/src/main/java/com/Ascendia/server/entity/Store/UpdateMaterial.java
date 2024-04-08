package com.Ascendia.server.entity.Store;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "UpdatedMaterial")
public class UpdateMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String materialCode;
    private String materialName;
    private int updatedQuantity;
    private String action; //Add or Issue
    private LocalDateTime UpdatedDate;



}
