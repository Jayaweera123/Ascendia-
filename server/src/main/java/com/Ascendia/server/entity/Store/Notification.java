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
@Table(name = "Notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;
    private String userId;
    private String content;
    private LocalDateTime notifyDate;

    public Notification(String userId, String content) {
        this.userId = userId;
        this.content = content;
        this.notifyDate = LocalDateTime.now(); // Initialize notifyDate to the current date and time
    }
}
