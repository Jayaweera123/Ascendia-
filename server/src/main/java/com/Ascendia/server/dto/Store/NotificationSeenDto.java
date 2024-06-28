package com.Ascendia.server.dto.Store;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NotificationSeenDto {
    private Long notificationId;
    private String isSeen;
}
