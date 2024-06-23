package com.Ascendia.server.entity.Store;

import com.Ascendia.server.entity.Project.Project;
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
@Table(name = "Materials")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long materialId;
    @Column(name= "material_code", nullable = false)
    private String materialCode;
    @Column(name = "material_name", nullable = false)
    private String materialName;
    @Column(name = "quantity", nullable = false)
    private int quantity;
    @Column(name = "measuring_unit", nullable = false)
    private String measuringUnit;
    @Column(name = "minimum_level", nullable = false)
    private int minimumLevel;
    private  String description;
    @Column(name="created_date", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdDate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "projectId" , referencedColumnName = "projectId")
    private Project project;

}

