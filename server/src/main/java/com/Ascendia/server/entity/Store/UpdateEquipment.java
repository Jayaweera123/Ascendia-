package com.Ascendia.server.entity.Store;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "update_equipment")
public class UpdateEquipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int updatedQuantity;
    private String action; //Add ,Issue, or return
    private LocalDateTime UpdatedDate;

    @ManyToOne
    @JoinColumn(name = "equipmentId" , referencedColumnName = "equipmentId")
    private Equipment equipment;
}
