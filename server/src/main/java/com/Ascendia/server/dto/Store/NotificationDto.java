package com.Ascendia.server.dto.Store;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {
    private Long notificationId;
    private String userId;
    private String content;
    private LocalDateTime notifyDate;
    private String isSeen;

    public NotificationDto(String userId, String content) {
        this.userId = userId;
        this.content = content;
        this.notifyDate = LocalDateTime.now(); // Initialize notifyDate to the current date and time
    }
}
