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
@Table(name = "Equipment", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"equipment_code", "projectId"}),
        @UniqueConstraint(columnNames = {"equipment_name", "projectId"})
})
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long equipmentId;
    @Column(name= "equipment_code", nullable = false)
    private String equipmentCode;
    @Column(name = "equipment_name", nullable = false)
    private String equipmentName;
    @Column(name = "equipment_quantity", nullable = false)
    private int quantity;
    private  String description;
    @Column(name="created_date", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdDate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "projectId" , referencedColumnName = "projectId")
    private Project project;

}
