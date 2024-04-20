package com.Ascendia.server.entity.Store;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Equipment")
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long equipmentId;
    @Column(name= "equipment_code", nullable = false, unique = true)
    private String equipmentCode;
    @Column(name = "equipment_name", nullable = false, unique = true)
    private String equipmentName;
    @Column(name = "equipment_quantity", nullable = false)
    private int quantity;
    private  String description;
    @Column(name="created_date", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdDate;


}
