/*package com.Ascendia.server.converter.ProjectManager;

import com.Ascendia.server.entity.ProjectManager.Task;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;


@Converter(autoApply = true)
public class TaskStatusConverter implements AttributeConverter<Task.TaskStatus, String> {

    @Override
    public String convertToDatabaseColumn(Task.TaskStatus taskStatus) {
        return taskStatus != null ? taskStatus.name() : null;
    }

    @Override
    public Task.TaskStatus convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        // Convert the string representation to the corresponding enum constant
        switch (dbData.toLowerCase()) {
            case "scheduled":
                return Task.TaskStatus.SCHEDULED;
            case "in-progress":
                return Task.TaskStatus.IN_PROGRESS;
            case "overdue":
                return Task.TaskStatus.OVERDUE;
            default:
                throw new IllegalArgumentException("Unknown database value: " + dbData);
        }
    }
}
*/