package com.Ascendia.server.entity.Store;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long materialId;
    @Column(name= "material_code", nullable = false, unique = true)
    private String materialCode;
    @Column(name = "material_name", nullable = false, unique = true)
    private String materialName;
    @Column(name = "quantity", nullable = false)
    private int quantity;
    @Column(name = "measuring_unit", nullable = false)
    private String measuringUnit;
    @Column(name = "minimum_level", nullable = false)
    private int minimumLevel;
    private  String description;


}

