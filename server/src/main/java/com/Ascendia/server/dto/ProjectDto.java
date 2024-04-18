package com.Ascendia.server.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
    private String projectId;
    private String pTitle;
    private String pType; // Ensure this field is defined in your class
    private String pDescription; // Ensure this field is defined in your class
    private String pStatus;
    private LocalDate createdDate;
    private LocalDate endDate;
    private String pmId;
    private String gmId;
    private String image;

    // Constructor and other methods

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getPTitle() {
        return pTitle;
    }

    public void setPTitle(String pTitle) {
        this.pTitle = pTitle;
    }

    public String getPType() {
        return pType;
    }

    public void setPType(String pType) {
        this.pType = pType;
    }

    public String getPDescription() {
        return pDescription;
    }

    public void setPDescription(String pDescription) {
        this.pDescription = pDescription;
    }

    public String getPStatus() {
        return pStatus;
    }

    public void setPStatus(String pStatus) {
        this.pStatus = pStatus;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getPmId() {
        return pmId;
    }

    public void setPmId(String pmId) {
        this.pmId = pmId;
    }

    public String getGmId() {
        return gmId;
    }

    public void setGmId(String gmId) {
        this.gmId = gmId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}